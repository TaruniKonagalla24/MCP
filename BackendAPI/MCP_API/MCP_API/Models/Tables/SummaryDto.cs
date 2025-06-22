namespace MCP_API.Models.Tables
{
    public class SummaryDto
    {
        public int Id { get; set; } // Assuming primary key
        public string Username { get; set; }

        public int userid { get; set; }
        public string Summary { get; set; }

        public DateTime? Created { get; set; }

    }
}
