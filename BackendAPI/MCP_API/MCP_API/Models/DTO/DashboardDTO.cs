using MCP_API.Models.Tables;

namespace MCP_API.Models.DTO
{
    public class DashboardDTO
    {

        public HackathonsMasterDTO? Nextchallenge { get; set; }
        public List<SummaryDto>? RecentActivities { get; set; }
        public List<OverallLeaderboardDTO>? LeaderboardDTOs { get; set; }

    }
}
