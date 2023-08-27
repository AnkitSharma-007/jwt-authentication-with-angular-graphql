using jwtAuthWithAngular.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace jwtAuthWithAngular.GraphQL
{
    public class AuthMutationResolver
    {
        readonly IConfiguration _config;

        // user details are hardcoded for simplicity. Ideally it should be stored in a database.
        readonly List<User> allowedUsers = new()
        {
            new User {  FirstName = "Admin",  Username = "admin", Password = "1234", UserType = UserRoles.Admin },
            new User {  FirstName = "Ankit",  Username = "ankit", Password = "1234", UserType = UserRoles.User }
        };

        public AuthMutationResolver(IConfiguration config)
        {
            _config = config;
        }

        [GraphQLDescription("Authenticate the user.")]
        public AuthResponse? UserLogin(UserLogin userDetails)
        {
            User? authenticatedUser = AuthenticateUser(userDetails);

            if (authenticatedUser is not null)
            {
                string tokenString = GenerateJSONWebToken(authenticatedUser);

                return new AuthResponse { Token = tokenString };
            }
            else
            {
                return null;
            }

        }

        string GenerateJSONWebToken(User userInfo)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:SecretKey"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            List<Claim> userClaims = new()
            {
                new Claim(JwtRegisteredClaimNames.Name, userInfo.Username),
                new Claim(JwtRegisteredClaimNames.Sub, userInfo.UserType),
                new Claim("firstName", userInfo.FirstName),
                new Claim(ClaimTypes.Role,userInfo.UserType),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: userClaims,
                expires: DateTime.Now.AddMinutes(1),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        User? AuthenticateUser(UserLogin loginCredentials)
        {
            User? user = allowedUsers.FirstOrDefault
                (user => user.Username == loginCredentials.Username && user.Password == loginCredentials.Password);

            return user;
        }
    }
}
