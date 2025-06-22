using MCP_API.Models.DTO;
using MCP_API.Models.Tables;
using MCP_API.Repository;
using Microsoft.AspNetCore.Mvc;

namespace MCP_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeamController : Controller
    {
        private readonly ITeams TeamsRepository;

        public TeamController(ITeams TeamsRepository)
        {
            this.TeamsRepository = TeamsRepository;
        }

        [HttpPost("GetmyTeams")]
        public async Task<IActionResult> GetmyTeams([FromBody] int userid)
        {
            List<MyTeams> output = await TeamsRepository.GetmyTeams(userid);
            if (output == null)
            {
                return NotFound();
            }
            return Ok(output);
        }
        [HttpPost("createteam")]
        public IActionResult createteam([FromBody] CreateTeam input)
        {
            Task<TeamMaster> output = TeamsRepository.createteam(input);
            if (output == null)
            {
                return NotFound();
            }
            return Ok();
        }
        [HttpPost("jointeam")]
        public IActionResult jointeam([FromBody] JoinTeam input)
        {
            TeamsRepository.jointeam(input);

            return Ok();
        }


    }
}
