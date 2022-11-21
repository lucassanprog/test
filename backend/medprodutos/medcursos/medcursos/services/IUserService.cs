using medcursos.models;


namespace medcursos.services
{
    public interface IUserService
    {
        public User Get(UserLogin userLogin);
    }
}
