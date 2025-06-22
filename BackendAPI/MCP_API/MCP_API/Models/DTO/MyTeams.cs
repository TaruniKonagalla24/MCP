namespace MCP_API.Models.DTO
{
    public class MyTeams
    {
        public int Id { get; set; }
        public string Teamname { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public string TeamMajor { get; set; }
        public bool Joined { get; set; }

    }
}
