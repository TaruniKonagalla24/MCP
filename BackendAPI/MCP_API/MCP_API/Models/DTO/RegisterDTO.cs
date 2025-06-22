namespace MCP_API.Models.DTO
{
    public class RegisterDTO
    {
        public string Username { get; set; }
        public string Password { get; set; } // Store hashed password ideally
        public string Email { get; set; }
        public string Role { get; set; }
        public string? Degree { get; set; }
        public string? Specialization { get; set; }
        public string? PhoneNumber { get; set; }
        public string? PhotoUrl { get; set; }

    }
}
