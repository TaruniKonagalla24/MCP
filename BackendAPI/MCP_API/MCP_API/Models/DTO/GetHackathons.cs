namespace MCP_API.Models.DTO
{
    public class GetHackathons
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


        public string? Result { get; set; } // e.g., "Pass", "Fail"
        public string? Answer { get; set; }
        public double? Score { get; set; }
        public string? Badge { get; set; }
        public DateTime? DateRegistered { get; set; }
        public DateTime? LastSubmission { get; set; }
    }
}
