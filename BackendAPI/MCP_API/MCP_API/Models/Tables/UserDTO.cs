namespace MCP_API.Models.Tables
{
    public class UserDTO
    {
        public int Id { get; set; } // Assuming primary key
        public string Username { get; set; }
        public string Password { get; set; } // Store hashed password ideally
        public string Email { get; set; }
        public string Role { get; set; }
        public string? Degree { get; set; }
        public string? Specialization { get; set; }
        public string? PhoneNumber { get; set; }
        public string? PhotoUrl { get; set; }
        public string? Skills { get; set; } // Comma-separated or list
        public string? Experience { get; set; } // Years/Details
        public string? AiRecommendations { get; set; } // Optional field from AI
        public string? ProgrammingLanguagesKnown { get; set; }
        public int? streak { get; set; } // Optional field from AI
        public string? resume { get; set; }
        public int? Points { get; set; }

        public DateTime DateOfRegister { get; set; }
    }

}
