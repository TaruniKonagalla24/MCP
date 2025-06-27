using MCP_API.Models.Tables;

namespace MCP_API.Models.DTO
{
    public class AdminDashboardDTO
    {

        public List<SummaryDto>? RecentActivities { get; set; }


        public List<HackathonsMasterDTO>? openchallenge { get; set; }
        public List<HackathonsMasterDTO>? completedchallenges { get; set; }
        public int? TotalRegistrationsToday { get; set; }
    }
}
