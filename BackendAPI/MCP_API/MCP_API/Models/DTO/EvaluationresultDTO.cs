using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;

namespace MCP_API.Models.DTO
{
    public class EvaluationresultDTO
    {
        public int score {  get; set; }
        public string messages { get; set; }

    }
    public class SubmitHackathon
    {
        public int HackathonId { get; set; }
        public int Userid { get; set; }


        public int score { get; set; }
        public string messages { get; set; }

    }
}
