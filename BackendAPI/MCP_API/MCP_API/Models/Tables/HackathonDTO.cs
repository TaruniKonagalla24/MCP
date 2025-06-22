namespace MCP_API.Models.Tables
{
    public class HackathonDTO
    {
        public int Id { get; set; } // Primary key
        public int HackathonId { get; set; } // FK to HackathonsMaster
        public int UserId { get; set; } // FK to User
        public string Result { get; set; } // e.g., "Pass", "Fail"
        public string Answer { get; set; }
        public double Score { get; set; }
        public string? Badge { get; set; }
        public DateTime DateRegistered { get; set; }
        public DateTime LastSubmission { get; set; }
    }

}
