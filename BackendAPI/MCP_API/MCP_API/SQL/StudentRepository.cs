using Azure.Core;
using MCP_API.Data;
using MCP_API.Models.DTO;
using MCP_API.Models.Tables;
using MCP_API.Repository;
using Microsoft.EntityFrameworkCore;
using System.Text;
using UglyToad.PdfPig;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Globalization;

namespace MCP_API.SQL
{
    public class StudentRepository : IUserRepository
    {
        private readonly ApplicationDbContext applicationDbContext;

        public StudentRepository(ApplicationDbContext applicationDbContext, ResumeService ResumeService)
        {
            this.applicationDbContext = applicationDbContext;
            this.ResumeService = ResumeService;
        }

        public ResumeService ResumeService { get; }

        public async Task<UserDTO> Login(LoginDTO LoginREQ)
        {
            var output = await applicationDbContext.Users.FirstOrDefaultAsync(x => x.Email == LoginREQ.Email && x.Password == LoginREQ.Password);
            if (output == null) return new UserDTO();
            return output;
        }

        async Task<DashboardDTO> IUserRepository.DashboardDTO(int userid)
        {
            DashboardDTO dashboardDTO = new DashboardDTO();
            dashboardDTO.Nextchallenge = await applicationDbContext.HackathonsMaster.Where(h => h.StartTime > DateTime.UtcNow).OrderByDescending(h => h.StartTime).FirstOrDefaultAsync();
            List<UserDTO> temp = await applicationDbContext.Users.Where(h => h.Points != null).OrderByDescending(h => h.Points).ToListAsync();
            List<OverallLeaderboardDTO>? LeaderboardDTOs = new List<OverallLeaderboardDTO>();
            int i = 0;
            foreach (UserDTO var in temp)
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
            dashboardDTO.RecentActivities = await applicationDbContext.Summary.OrderByDescending(h => h.Created).Take(3).ToListAsync();

            var user = await applicationDbContext.Users.FindAsync(userid);
            var skillsList = user != null ? user.Skills?.Split(',').Select(s => s.Trim()).ToList() : null;
            if (skillsList != null)
            {

                List<ChallengeDTO> recommendedChallenges = await applicationDbContext.HackathonsMaster.Where(h => skillsList.Contains(h.skill))
                    .Select(h => new ChallengeDTO
                    {
                        Id = h.Id,
                        Description = h.Problem,
                        Type = h.skill,
                        Level = h.difficulty,
                    }).Take(3).ToListAsync();

                dashboardDTO.RecommendedChallenges = recommendedChallenges;
                List<ChallengeDTO> teamChallenges = await applicationDbContext.HackathonsMaster.Where(h => skillsList.Contains(h.skill))
                    .Select(h => new ChallengeDTO
                    {
                        Id = h.Id,
                        Description = h.Problem,
                        Type = h.skill,
                        Level = h.difficulty,
                    }).Take(3).ToListAsync();
                dashboardDTO.TeamChallenges = teamChallenges;
            }

            return dashboardDTO;

        }

        async Task<List<UserDTO>> IUserRepository.GetUsers()
        {
            var output = await applicationDbContext.Users.ToListAsync();
            return output;
        }
        [Consumes("multipart/form-data")]
        async Task<UserDTO> IUserRepository.Register(RegisterDTO regddto)
        {

            UserDTO var = new UserDTO();
            {
                var.Email = regddto.Email;
                var.Password = regddto.Password;
                var.DateOfRegister = DateTime.Now;
                var.Role = regddto.Role;
                var.Username = regddto.Username;
                var.Degree = regddto.Degree;
                var.Specialization = regddto.Specialization;
                var.PhoneNumber = regddto.PhoneNumber;
                var.PhotoUrl = regddto.PhotoUrl;

                if (regddto.resumeText != null && regddto.resumeText.Length > 0)
                {
                    //profile agent call
                    using var ms = new MemoryStream();
                    await regddto.resumeText.CopyToAsync(ms);
                    var resumeText = ExtractTextFromPdf(ms.ToArray());
                    UploadResumeRequest obj = new UploadResumeRequest(); obj.Resume_Text = resumeText;
                    obj.Past_Performance = new Dictionary<string, double>();

                    UploadResumeResponse res = await ResumeService.UploadResumeAsync(obj);
                    var.AiRecommendations = res.AiRecommendations.ToString();
                    var.ProgrammingLanguagesKnown = res.ProgrmmingLangaugesKnown.ToString();
                    var.resume = res.Message;
                    var.Experience=res.Parsed_Experiences.ToString();
                    var.Skills=JsonConvert.SerializeObject(res.Parsed_Skills);    

                }


            }
            SummaryDto sd = new SummaryDto();



            UserDTO exsits = applicationDbContext.Users.FirstOrDefault(x => x.Email == regddto.Email);
            if (exsits == null)
            {
                await applicationDbContext.Users.AddAsync(var);
                sd.Created = DateTime.Now;
                sd.Username = regddto.Username;
                sd.userid = var.Id;
                sd.Summary = " Joined Mavericks coding platform";
                await applicationDbContext.Summary.AddAsync(sd);
                await applicationDbContext.SaveChangesAsync();
                return var;
            }
            return new UserDTO();



        }


        public string ExtractTextFromPdf(byte[] pdfBytes)
        {
            using (var ms = new MemoryStream(pdfBytes))
            using (var document = PdfDocument.Open(ms))
            {
                var text = new StringBuilder();

                foreach (var page in document.GetPages())
                {
                    text.AppendLine(page.Text);
                }

                return text.ToString();
            }
        }

        async Task IUserRepository.UpdateProfile(UpdateProfileDTO input)
        {
            UserDTO? var = await applicationDbContext.Users.FirstOrDefaultAsync(h => h.Id.ToString() == input.Id);
            var.Username = input.Username;
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

       async  Task<ProgrssDTO> IUserRepository.getprogress()
        {

            ProgrssDTO output = new ProgrssDTO();

            output.Progrssoversixmonths = new Dictionary<string, int>();
            int i = 6;
            while (i >= 0)
            {
                int k = DateTime.Now.AddMonths(-i).Month;
                if (k == 0) { k = 12; }
                string monthName = CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(k);
                int n = 0;
                n=applicationDbContext.Users.Where(h=>h.DateOfRegister>DateTime.Now.AddMonths(-i) && h.DateOfRegister<DateTime.Now.AddMonths(-i+1)).Count();
                output.Progrssoversixmonths.Add(monthName, n);
                i--;
            }
            output.newusers= applicationDbContext.Users.Where(h => h.DateOfRegister > DateTime.Now.AddMonths(-1) && h.DateOfRegister < DateTime.Now).Count();
           int p =  await applicationDbContext.Users.CountAsync();
            int b = p - output.newusers;
            //need to be changed
            output.StagnantUsers = p / 2;
            output.activeusers = p / 2;

            return output;




        }
    }
}
