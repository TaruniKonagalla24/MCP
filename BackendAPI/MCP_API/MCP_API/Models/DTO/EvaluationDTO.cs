namespace MCP_API.Models.DTO
{
    public class EvaluationDTO
    {
        public string hackathonid {  get; set; }
        public string answer { get; set; }
        public string ProgrammingLanguage { get; set; }
    }
    public class CAinputDTO
    {
        public string usermessage { get; set; }
        public string hackathonid { get; set; }
        public string answer { get; set; }
        public string ProgrammingLanguage { get; set; }
    }
    public class caOutputDTO
    {
        public string messages { get; set; }

    }
}
