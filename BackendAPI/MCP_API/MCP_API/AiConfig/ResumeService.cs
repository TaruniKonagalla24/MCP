// Services/ResumeService.cs
using System.Net.Http;
using System.Net.Http.Json;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using JsonSerializer = System.Text.Json.JsonSerializer;
using Microsoft.Extensions.Options;

public class ResumeService
{
    private readonly HttpClient _httpClient;
    private readonly ILogger<ResumeService> _logger;
    public readonly string AI_URL;

    public ResumeService(HttpClient httpClient, ILogger<ResumeService> logger, IOptions<ApiSettings> apiSettings)
    {
        _httpClient = httpClient;
        _logger = logger;
        AI_URL = apiSettings.Value.AIUrl;
    }



    public async Task<UploadResumeResponse> UploadResumeAsync(UploadResumeRequest request)
    {
        try
        {

            var response = await _httpClient.PostAsJsonAsync(AI_URL+"profile/upload_resume", request);
            var responseContent = await response.Content.ReadAsStringAsync();
            //Console.WriteLine("Response JSON:\n" + responseContent);
            response.EnsureSuccessStatusCode();
            var parsed = JsonConvert.DeserializeObject<UploadResumeResponse>(responseContent);


            return parsed;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error uploading resume");
            throw;
        }
    }
}

public class ApiSettings
{
    public string AIUrl { get; set; }
}


// Models/UploadResumeResponse.cs
public class UploadResumeResponse
{
    public string AiRecommendations { get; set; }

    public string ProgrmmingLangaugesKnown { get; set; }

    public string Message { get; set; }

    public string Parsed_Experiences { get; set; }

    public List<string> Parsed_Skills { get; set; }


}

// Models/ParsedExperience.cs
public class ParsedExperience
{
    public string Company { get; set; }
    public string Duration { get; set; }
    public string Role { get; set; }
    public List<string> Key_Responsibilities { get; set; }
}


// Models/UploadResumeRequest.cs
public class UploadResumeRequest
{
    public string Resume_Text { get; set; }

    public Dictionary<string, double> Past_Performance { get; set; }
}
