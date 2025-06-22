using MCP_API.Data;
using MCP_API.Models.DTO;
using MCP_API.Models.Tables;
using MCP_API.Repository;
using Microsoft.EntityFrameworkCore;

namespace MCP_API.SQL
{
    public class StudentRepository : IUserRepository
    {
        private readonly ApplicationDbContext applicationDbContext;

        public StudentRepository(ApplicationDbContext applicationDbContext)
        {
            this.applicationDbContext = applicationDbContext;
        }
       public async Task<UserDTO> Login(LoginDTO LoginREQ)
        {
            var output = await applicationDbContext.Users.FirstOrDefaultAsync(x => x.Email == LoginREQ.Email && x.Password == LoginREQ.Password);
            if (output == null) return new UserDTO();
            return output;           
        }

       async  Task<DashboardDTO> IUserRepository.DashboardDTO(int userid)
        {
            DashboardDTO dashboardDTO = new DashboardDTO();
            dashboardDTO.Nextchallenge = await applicationDbContext.HackathonsMaster.Where(h => h.StartTime > DateTime.UtcNow).OrderByDescending(h => h.StartTime).FirstOrDefaultAsync();
            List<UserDTO> temp = await applicationDbContext.Users.Where(h => h.Points != null).OrderByDescending(h => h.Points).ToListAsync();
            List<OverallLeaderboardDTO>? LeaderboardDTOs = new List<OverallLeaderboardDTO>();
            int i = 0;
            foreach(UserDTO var in temp)
            {
                if (i < 3)
                {
                    OverallLeaderboardDTO t = new OverallLeaderboardDTO();
                    t.points = var.Points;
                    t.username = var.Username;

                    LeaderboardDTOs.Add(t);

                    i++;
                }
                else
                {
                    break;
                }

            }          

            dashboardDTO.LeaderboardDTOs = LeaderboardDTOs;
            dashboardDTO .RecentActivities= await applicationDbContext.Summary.OrderByDescending(h => h.Created).Take(3).ToListAsync();

            return dashboardDTO;

        }

        async Task<List<UserDTO>> IUserRepository.GetUsers()
        {
            var output = await applicationDbContext.Users.ToListAsync();
            return output;
        }

        async Task<UserDTO> IUserRepository.Register(RegisterDTO regddto)
        {

            UserDTO  var = new UserDTO();
            {
                var.Email = regddto.Email;
                var.Password = regddto.Password;
                var.DateOfRegister=DateTime.Now;
                var.Role = regddto.Role;
                var.Username = regddto.Username;
                var.Degree
                    = regddto.Degree;
                var.Specialization = regddto.Specialization;
                var.PhoneNumber = regddto.PhoneNumber;
                var.PhotoUrl = regddto.PhotoUrl;
                // call to profile agent?

            }
            SummaryDto sd = new SummaryDto();


            
            UserDTO exsits= applicationDbContext.Users.FirstOrDefault(x => x.Email == regddto.Email);
            if (exsits == null)
            {
                await applicationDbContext.Users.AddAsync(var);
                sd.Created = DateTime.Now;
                sd.Username = regddto.Username;
                sd.userid = var.Id;
                sd.Summary =  " Joined Mavericks coding platform";
                await applicationDbContext.Summary.AddAsync(sd);
                await applicationDbContext.SaveChangesAsync();
                return var;
            }
            return new UserDTO();
            


        }

       async Task IUserRepository.UpdateProfile(UpdateProfileDTO input)
        {
            UserDTO? var = await applicationDbContext.Users.FirstOrDefaultAsync(h => h.Id.ToString() == input.Id);
            var.Username= input.Username;
            var.Email = input.Email;
            var.Role = input.Role;
            var.Degree = input.Degree;
            var.Specialization = input.Specialization;
            var.PhoneNumber = input.PhoneNumber;
            var.Skills = input.Skills;
            var.Experience = input.Experience;
            var.ProgrammingLanguagesKnown = input.ProgrammingLanguagesKnown;
            await applicationDbContext.SaveChangesAsync();            
        }
    }
}
