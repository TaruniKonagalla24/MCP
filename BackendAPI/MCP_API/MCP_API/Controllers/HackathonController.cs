using MCP_API.AiConfig;
using MCP_API.Models.DTO;
using MCP_API.Repository;
using Microsoft.AspNetCore.Mvc;

namespace MCP_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HackathonController : Controller
    {
        private readonly IHackathonMaster hackathonMaster;

        public HackathonController(IHackathonMaster hackathonMaster)
        {
            this.hackathonMaster = hackathonMaster;
        }
        [HttpPost("gethackathon")]
        public async Task<IActionResult> gethackathon(int hackathonid)
        {
            var output = await hackathonMaster.gethackathon(hackathonid.ToString());
            if (output == null)
            {
                return NotFound();
            }
            return Ok(output);

        }
        [HttpPost("evaluateHackathon")]
        public async Task<IActionResult> evaluateHackathon(EvaluationDTO input)
        {
            var output = await hackathonMaster.evaluateHackathon(input);
            if (output == null)
            {
                return NotFound();
            }
            return Ok(output);

        }
        [HttpPost("submitHackathon")]
        public async Task<IActionResult> submitHackathon(SubmitHackathon input)
        {
         await hackathonMaster.submitHackathon(input);

            return Ok();

        }
        [HttpPost("Getmyhackathons")]
        public async Task<IActionResult> Getmyhackathons([FromBody] int userid)
        {
            List<GetHackathons> output = await hackathonMaster.Getmyhackathons(userid);
            if (output == null)
            {
                return NotFound();
            }
            return Ok(output);
        }
        [HttpPost("createnewhackathon")]
        public async Task<IActionResult> createnewhackathon([FromBody] NewHackathon input)
        {
           await hackathonMaster.newhackathon(input);

            return Ok();
        }
        [HttpPost("createHackathon")]
        public async Task<IActionResult> createHackathon([FromBody] string content)
        {
            Hackathonin input = new Hackathonin()
            {
                Title = content,
            };
            Hackathonout output = await hackathonMaster.addhackathon(input);
            if (output == null)
            {
                return NotFound();
            }
            return Ok(output);
        }
        [HttpGet("hackathonstatus")]
        public async Task<IActionResult> Getmyhackathons()
        {
            List<HackathonStatus> output = await hackathonMaster.hackathonstatus();
            if (output == null)
            {
                return NotFound();
            }
            return Ok(output);
        }
        [HttpGet("AdminLeaderboard")]
        public async Task<IActionResult> AdminLeaderboard()
        {
            var output = await hackathonMaster.AdminLeaderboard();
            if (output == null)
            {
                return NotFound();
            }
            return Ok(output);
        }
        
             [HttpGet("admindashboard")]
        public async Task<IActionResult> admindashboard()
        {
            var output = await hackathonMaster.admindashboard();
            if (output == null)
            {
                return NotFound();
            }
            return Ok(output);
        }
        [HttpGet("getallhackathons")]
        public async Task<IActionResult> getallhackathons()
        {
            var output = await hackathonMaster.getallhackathons();
            if (output == null)
            {
                return NotFound();
            }
            return Ok(output);
        }
        [HttpPost("delethackathon")]
        public async Task<IActionResult> delethackathon([FromBody] int hackarthonid)
        {
         await hackathonMaster.deleteHackathon(hackarthonid.ToString());

            return Ok();
        }
        [HttpPost("generatereport")]
        public async Task<IActionResult> generatereport([FromBody] int userid)
        {
            var output = await hackathonMaster.generatehackathonreport(userid.ToString());

            if (output == null)
            {
                return NotFound();
            }
            return Ok(output);
        }

    }
}
