using MCP_API.Models.DTO;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;

namespace MCP_API.AiConfig
{
    public class ReportService
    {
        private readonly HttpClient _httpClient;
        private readonly ILogger<ResumeService> _logger;
        public readonly string AI_URL;

        public ReportService(HttpClient httpClient, ILogger<ResumeService> logger, IOptions<ApiSettings> apiSettings)
        {
            _httpClient = httpClient;
            _logger = logger;
            AI_URL = apiSettings.Value.AIUrl;
        }

        public async Task<string> GenerateAIReport(string input)
        {
            try
            {
                reportin obj = new reportin();
                obj.about = input;
                var response = await _httpClient.PostAsJsonAsync(AI_URL + "/recommender/recommend", obj);
                var responseContent = await response.Content.ReadAsStringAsync();
                response.EnsureSuccessStatusCode();
                var parsed = JsonConvert.DeserializeObject<reportout>(responseContent);


                return parsed.narrative;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in reort api call");
                throw;
            }
        }
    }
    public class reportout
    {
        public string narrative { get; set; }
    }
    public class reportin
    {
        public string about { get; set; }
    }
}
