using MCP_API.Models.DTO;
using MCP_API.Models.Tables;
using MCP_API.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MCP_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class UserController : ControllerBase
    {
        private readonly IUserRepository userRepository;

        public UserController( IUserRepository userRepository) {
            this.userRepository = userRepository;
        }
        [HttpGet]
        public async Task<IActionResult> getall()
        {
             var o= await userRepository.GetUsers();
            return Ok(o);

        }
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO Login)
        {
            UserDTO userDTO = await userRepository.Login(Login);
            if (userDTO == null)
            {
                return NotFound();
            }
            return Ok(userDTO);
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDTO register)
        {
            if (register != null)
            {
                UserDTO var = await userRepository.Register(register);
                if (var == new UserDTO())
                {
                    return Conflict(new { message = "user already exists" });
                }
                else
                {
                    return Ok(var);
                }
            }
            else
            {
                return Conflict(new { message = "Empty request" });
            }
        }
        [HttpPost("DashboardDTO")]
        public async Task<IActionResult> DashboardDTO(int userid)
        {
            var output = await userRepository.DashboardDTO(userid);
            if (output == null)
            {
                return NotFound();
            }
            return Ok(output);

        }
        [HttpPost("Upadateprofile")]
        public async Task<IActionResult> Upadateprofile(UpdateProfileDTO input)
        {
            await userRepository.UpdateProfile(input);

            return Ok();

        }

    }
}
