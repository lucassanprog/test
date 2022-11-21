using medcursos.models;

namespace medcursos.services
{
    public interface IProductService
    {
        public Product Create(Product product);
        public Product Get(int id);
        public List<Product> List();
        public Product Update(Product product);
        public bool Delete(int id);
    }
}
