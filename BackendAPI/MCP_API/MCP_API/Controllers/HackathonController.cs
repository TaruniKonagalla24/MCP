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

    }
}
