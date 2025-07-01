using MCP_API.Models.DTO;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;

namespace MCP_API.AiConfig
{
    public class EvaluationService
    {
        private readonly HttpClient _httpClient;
        private readonly ILogger<ResumeService> _logger;
        public readonly string AI_URL;

        public EvaluationService(HttpClient httpClient, ILogger<ResumeService> logger, IOptions<ApiSettings> apiSettings)
        {
            _httpClient = httpClient;
            _logger = logger;
            AI_URL = apiSettings.Value.AIUrl;
        }
        public async Task<EvaluationresultDTO> EvaluateHackathon(string input)
        {
            try
            {
                httinput obj = new httinput();
                obj.prompt = input;
                var response = await _httpClient.PostAsJsonAsync(AI_URL + "assessment/start", obj);
                var responseContent = await response.Content.ReadAsStringAsync();
                responseContent=responseContent.Replace("[", "");
                responseContent = responseContent.Replace("]", "");
                response.EnsureSuccessStatusCode();
                var parsed = JsonConvert.DeserializeObject<EvaluationresultDTO>(responseContent);


                return parsed;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in evaluation");
                throw;
            }
        }
        public async Task<caOutputDTO> Caimplementation(string input)
        {
            try
            {
                httinput obj = new httinput();
                obj.prompt = input;
                var response = await _httpClient.PostAsJsonAsync(AI_URL + "assessment/start", obj);
                var responseContent = await response.Content.ReadAsStringAsync();
                responseContent = responseContent.Replace("[", "");
                responseContent = responseContent.Replace("]", "");
                response.EnsureSuccessStatusCode();
                var parsed = JsonConvert.DeserializeObject<caOutputDTO>(responseContent);


                return parsed;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in chatbot");
                throw;
            }
        }
    }
    public class httinput
    {
        public string prompt { get; set; }
    }
}
