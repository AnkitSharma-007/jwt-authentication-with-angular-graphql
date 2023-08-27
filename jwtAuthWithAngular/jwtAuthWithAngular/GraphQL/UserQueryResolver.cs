using HotChocolate.Authorization;
using jwtAuthWithAngular.Models;

namespace jwtAuthWithAngular.GraphQL
{
    public class UserQueryResolver
    {
        [Authorize(Policy = UserRoles.User)]
        [GraphQLDescription("Query to fetch info about normal user.")]
        public string GetUserData()
        {
            return "This is a normal user.";
        }

        [Authorize(Policy = UserRoles.Admin)]
        [GraphQLDescription("Query to fetch info about admin user.")]
        public string GetAdminData()
        {
            return "This is an admin user.";
        }
    }
}
