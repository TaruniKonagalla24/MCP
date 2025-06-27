using MCP_API.AiConfig;
using MCP_API.Models.DTO;
using MCP_API.Models.Tables;
using System.Reflection.Metadata;

namespace MCP_API.Repository
{
    public interface IHackathonMaster
    {
        Task newhackathon(NewHackathon inp);
        Task<AdminDashboardDTO> admindashboard();
        Task<List<HackathonStatus>> hackathonstatus();
        Task<List<AdminOverallLeaderboardDTO>> AdminLeaderboard();
        Task<Hackathonout> addhackathon(Hackathonin input);
        Task<HackathonsMasterDTO> gethackathonmaster(string id);
        Task<List<HackathonsMasterDTO>> getallhackathons();
        Task deleteHackathon(string id);
        Task<List<HackathonReportDTO>> generatehackathonreport(string hackathonid);

        Task<List<GetHackathons>> Getmyhackathons(int myuserid);

    }
}
