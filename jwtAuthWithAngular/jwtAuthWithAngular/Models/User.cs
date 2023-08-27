namespace jwtAuthWithAngular.Models
{
    public class User
    {
        public string Username { get; set; } = default!;
        public string FirstName { get; set; } = default!;
        public string Password { get; set; } = default!;
        public string UserType { get; set; } = default!;
    }
}
