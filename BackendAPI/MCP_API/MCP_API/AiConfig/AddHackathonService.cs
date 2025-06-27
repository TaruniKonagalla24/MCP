using MCP_API.AiConfig;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace MCP_API.AiConfig
{
    public class AddHackathonService
    {
        private readonly HttpClient _httpClient;
        private readonly ILogger<ResumeService> _logger;
        public readonly string AI_URL;

        public AddHackathonService(HttpClient httpClient, ILogger<ResumeService> logger, IOptions<ApiSettings> apiSettings)
        {
            _httpClient = httpClient;
            _logger = logger;
            AI_URL = apiSettings.Value.AIUrl;
        }
        public async Task<Hackathonout> createhackathon(string input)
        {
            Hackathonin inputdto = new Hackathonin()
            {
                Title = input,
            };
            try
            {

                var response = await _httpClient.PostAsJsonAsync(AI_URL + "hackathon/setup", inputdto);
                var responseContent = await response.Content.ReadAsStringAsync();
                response.EnsureSuccessStatusCode();
                var parsed = JsonConvert.DeserializeObject<Hackathonout>(responseContent);


                return parsed;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error uploading resume");
                throw;
            }
        }
    }
    public class Hackathonin
    {
        public string Title { get; set; }
    }

    public class Badge
    {
        public string Criteria { get; set; }
        public string Name { get; set; }
    }

    public class TestCase
    {
        public JToken Input { get; set; }          
        public JToken Output { get; set; }        
        public int? OutputCount { get; set; }
    }        // Nullable for cases with detailed output


    public class Hackathonout
    {
        public Badge Badge { get; set; }
        public List<string> Hints { get; set; }
        public List<TestCase> TestCases { get; set; }
        public string Description { get; set; }
        public string Message { get; set; }
        public List<string> Skills { get; set; }
        public string Title { get; set; }
    }

}
