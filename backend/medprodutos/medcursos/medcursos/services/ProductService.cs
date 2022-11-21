using medcursos.models;
using medcursos.repository;

namespace medcursos.services
{
    public class ProductService: IProductService
    {
        public Product Create(Product product)
        {
            product.Id = ProductRepository.Product.Count + 1;
            ProductRepository.Product.Add(product);

            return product;
        }

        public Product Get(int id)
        {
            var product = ProductRepository.Product.FirstOrDefault(o => o.Id == id);

            if (product is null) return null;

            return product;
        }

        public List<Product> List()
        {
            var products = ProductRepository.Product;

            return products;
        }

        public Product Update(Product newProduct)
        {
            var oldProduct = ProductRepository.Product.FirstOrDefault(o => o.Id == newProduct.Id);

            if (oldProduct is null) return null;

            oldProduct.Title = newProduct.Title;
            oldProduct.Description = newProduct.Description;
            oldProduct.QuantitySold = newProduct.QuantitySold;
            oldProduct.ImageUrl = newProduct.ImageUrl;


            return newProduct;
        }

        public bool Delete(int id)
        {
            var oldProduct = ProductRepository.Product.FirstOrDefault(o => o.Id == id);

            if (oldProduct is null) return false;

            ProductRepository.Product.Remove(oldProduct);

            return true;
        }

    }
}
