using medcursos.models;

namespace medcursos.repository
{
    public class UserRepository
    {
        public static List<User> Users = new()
        {
            new() { Username = "lucas_admin", EmailAddress = "lucas.admin@email.com", Password = "123456", GivenName = "Lucas", Surname = "Santos", Role = "Administrator" },
            new() { Username = "felipe_standard", EmailAddress = "felipe.standard@email.com", Password = "123456", GivenName = "Felipe", Surname = "Santos", Role = "Standard" },
        };
    }
}
