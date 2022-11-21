

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using medcursos.models;
using medcursos.services;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Name = "Authorization",
        Description = "Bearer Authentication with JWT Token",
        Type = SecuritySchemeType.Http
    });
    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Id = "Bearer",
                    Type = ReferenceType.SecurityScheme
                }
            },
            new List<string>()
        }
    });
});

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidateActor = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    };
});

builder.Services.AddCors();
builder.Services.AddAuthorization();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSingleton<IProductService, ProductService>();
builder.Services.AddSingleton<IUserService, UserService>();

var app = builder.Build();

app.UseCors(c =>
{
    c.AllowAnyHeader();
    c.AllowAnyMethod();
    c.AllowAnyOrigin();
});

app.UseSwagger();
app.UseAuthorization();
app.UseAuthentication();


app.MapPost("/login",
(UserLogin user, IUserService service) => Login(user, service))
    .Accepts<UserLogin>("application/json")
    .Produces<JsonContent>();

app.MapPost("/create-product",
[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator")]
(Product product, IProductService service) => Create(product, service))
    .Accepts<Product>("application/json")
    .Produces<Product>(statusCode: 200, contentType: "application/json");

app.MapGet("/get-product",
[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = " Administrator")]
(int id, IProductService service) => Get(id, service))
    .Produces<Product>();

app.MapGet("/list-products",
    (IProductService service) => List(service))
    .Produces<List<Product>>(statusCode: 200, contentType: "application/json");

app.MapPut("/update-product",
[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator")]
(Product newProduct, IProductService service) => Update(newProduct, service))
    .Accepts<Product>("application/json")
    .Produces<Product>(statusCode: 200, contentType: "application/json");

app.MapDelete("/delete-product",

(int id, IProductService service) => Delete(id, service));

IResult Login(UserLogin user, IUserService service)
{
    if (!string.IsNullOrEmpty(user.Username) &&
        !string.IsNullOrEmpty(user.Password))
    {
        var loggedInUser = service.Get(user);
        if (loggedInUser is null) return Results.NotFound("User not found");

        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, loggedInUser.Username),
            new Claim(ClaimTypes.Email, loggedInUser.EmailAddress),
            new Claim(ClaimTypes.GivenName, loggedInUser.GivenName),
            new Claim(ClaimTypes.Surname, loggedInUser.Surname),
            new Claim(ClaimTypes.Role, loggedInUser.Role)
        };

        var token = new JwtSecurityToken
        (
            issuer: builder.Configuration["Jwt:Issuer"],
            audience: builder.Configuration["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddDays(60),
            notBefore: DateTime.UtcNow,
            signingCredentials: new SigningCredentials(
                new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"])),
                SecurityAlgorithms.HmacSha256)
        );

        var tokenString = new JwtSecurityTokenHandler().WriteToken(token);
        loggedInUser.Password = tokenString;

        return Results.Ok(loggedInUser);
    }
    return Results.BadRequest("Invalid user credentials");
}

IResult Create(Product product, IProductService service)
{
    var result = service.Create(product);
    return Results.Ok(result);
}

IResult Get(int id, IProductService service)
{
    var product = service.Get(id);

    if (product is null) return Results.NotFound("Product not found");

    return Results.Ok(product);
}

IResult List(IProductService service)
{
    var products = service.List();

    return Results.Ok(products);
}

IResult Update(Product newProduct, IProductService service)
{
    var updatedProduct = service.Update(newProduct);

    if (updatedProduct is null) Results.NotFound("Product not found");

    return Results.Ok(updatedProduct);
}

IResult Delete(int id, IProductService service)
{
    var result = service.Delete(id);

    if (!result) Results.BadRequest("Something went wrong");

    return Results.Ok(result);
}

app.UseSwaggerUI();

app.Run();
