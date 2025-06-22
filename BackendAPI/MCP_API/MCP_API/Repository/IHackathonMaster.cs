using MCP_API.Models.DTO;
using MCP_API.Models.Tables;

namespace MCP_API.Repository
{
    public interface IHackathonMaster
    {
        Task<List<HackathonStatus>> hackathonstatus();
        Task<HackathonsMasterDTO> addhackathon(AddHackathonmaster input);
        Task<HackathonsMasterDTO> gethackathonmaster(string id);
        Task<List<GetHackathons>> Getmyhackathons(int myuserid);

    }
}
