namespace MCP_API.Models.Tables
{
    public class HackathonsMasterDTO
    {
        public int Id { get; set; }
        public string Problem { get; set; }
        public string TestCases { get; set; } // Optional JSON/string
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }

        public string CreatedBy { get; set; }
        public string? Badges { get; set; }
        public string? difficulty { get; set; }
        public string? skill { get; set; }

    }

}
