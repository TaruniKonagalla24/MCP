namespace MCP_API.Models.DTO
{
    public class AddHackathonmaster
    {
        public string Problem { get; set; }
        public string TestCases { get; set; } // Optional JSON/string
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string CreatedBy { get; set; } // You can link to User Id if needed
    }
}
