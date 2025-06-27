namespace MCP_API.Models.DTO
{
    public class OverallLeaderboardDTO
    {
        public int? points { get; set; }
        public string username { get; set; }
    }
    public class AdminOverallLeaderboardDTO
    {
        public int? points { get; set; }
        public string username { get; set; }
        public string Languagesknown { get; set; }
        public string learningpath { get; set; }
        public int progresspercentage { get; set; }
    }
}
