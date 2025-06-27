namespace MCP_API.Models.DTO
{
    public class ProgrssDTO
    {
        public Dictionary<string, int>  Progrssoversixmonths { get; set; }
        public int newusers { get; set; }
        public int StagnantUsers { get; set; }
        public int activeusers { get; set; }
    }
}
