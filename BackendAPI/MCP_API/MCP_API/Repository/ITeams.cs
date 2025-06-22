using MCP_API.Models.DTO;
using MCP_API.Models.Tables;

namespace MCP_API.Repository
{
    public interface ITeams
    {
        Task<List<MyTeams>> GetmyTeams(int userid);
        Task<TeamMaster> createteam(CreateTeam input);
        Task jointeam(JoinTeam input);
    }
}
