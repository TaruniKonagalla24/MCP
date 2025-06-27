namespace MCP_API.Models.DTO
{
    public class NewHackathon
    {
        public string Problem { get; set; }
        public string TestCases { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }

        public string CreatedBy { get; set; }
        public string? Badges { get; set; }
        public string? difficulty { get; set; }
        public string? skill { get; set; }
        public string? description { get; set; } // O
        public string? hints { get; set; } // O
    }
}
