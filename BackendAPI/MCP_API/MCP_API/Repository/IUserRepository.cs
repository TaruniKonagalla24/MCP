using MCP_API.Models.DTO;
using MCP_API.Models.Tables;

namespace MCP_API.Repository
{
    public interface IUserRepository
    {
        Task<UserDTO> Login(LoginDTO LoginREQ);
        Task<UserDTO> Register(RegisterDTO regddto);
        Task<List<UserDTO>> GetUsers();
        Task<DashboardDTO> DashboardDTO(int userid);
        Task UpdateProfile(UpdateProfileDTO input);
    }
}
