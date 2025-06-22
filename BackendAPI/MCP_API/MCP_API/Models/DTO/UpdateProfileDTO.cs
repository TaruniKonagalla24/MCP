namespace MCP_API.Models.DTO
{
    public class UpdateProfileDTO
    {
        public string Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
        public string? Degree { get; set; }
        public string? Specialization { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Skills { get; set; } // Comma-separated or list
        public string? Experience { get; set; } 
        public string? ProgrammingLanguagesKnown { get; set; }


    }
}
