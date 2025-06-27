using MCP_API.AiConfig;
using MCP_API.Data;
using MCP_API.Models.DTO;
using MCP_API.Models.Tables;
using MCP_API.Repository;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace MCP_API.SQL
{
    public class HackathonSqlImpl : IHackathonMaster
    {
        private readonly ApplicationDbContext applicationDbContext;

        public AddHackathonService AddHackathonService { get; }

        public HackathonSqlImpl(ApplicationDbContext applicationDbContext,AddHackathonService addHackathonService)
        {
            this.applicationDbContext = applicationDbContext;
            AddHackathonService = addHackathonService;
        }
        async Task<Hackathonout> IHackathonMaster.addhackathon(Hackathonin input)
        {
            Hackathonout output = new Hackathonout();
            output = await  AddHackathonService.createhackathon(input.Title);
            return output;

        }

        async Task<List<HackathonStatus>> IHackathonMaster.hackathonstatus()
        {
            List<HackathonsMasterDTO> temp = await applicationDbContext.HackathonsMaster.ToListAsync();
            List<HackathonDTO> user = await applicationDbContext.Hackathons.ToListAsync();
            List<HackathonStatus> output = new List<HackathonStatus>();
            int totaluser = await applicationDbContext.Users.CountAsync();
            foreach (HackathonsMasterDTO cur in temp)
            {
                HackathonStatus obj = new HackathonStatus();
                List<HackathonDTO> tests = user.Where(x => x.HackathonId==cur.Id).ToList();
                obj.participationpercent = (((tests.Count * 100) / totaluser) ).ToString();
                obj.Hackathonid = cur.Id.ToString();
                if (tests.Count() == 0) obj.successpercentage = 0.ToString();
                else   obj.successpercentage = (((tests.Where(h => h.Result == "Passed").Count() * 100 )/ tests.Count()) ).ToString();


                output.Add(obj);
            }
            return output;
        }

        Task<HackathonsMasterDTO> IHackathonMaster.gethackathonmaster(string id)
        {
            throw new NotImplementedException();
        }

        async Task<List<GetHackathons>> IHackathonMaster.Getmyhackathons(int myuserid)
        {
            List<GetHackathons> output = new List<GetHackathons>();
            List<HackathonsMasterDTO> temp = await applicationDbContext.HackathonsMaster.Where(H => H.EndTime > DateTime.UtcNow).ToListAsync();
            List<HackathonDTO> user = await applicationDbContext.Hackathons.Where(h => h.UserId == myuserid).ToListAsync();
            foreach (HackathonsMasterDTO var in temp)
            {
                GetHackathons obj = new GetHackathons();
                obj.Id = var.Id;
                obj.Problem = var.Problem;
                obj.TestCases = var.TestCases;
                obj.StartTime = var.StartTime;
                obj.EndTime = var.EndTime;
                obj.CreatedBy = var.CreatedBy;
                obj.Badges = var.Badges;
                obj.difficulty = var.difficulty;
                obj.skill = var.skill;
                if (user.Count > 0 && user.Exists(h => h.HackathonId == var.Id))
                {
                    HackathonDTO obj2 = user.Find(h => h.HackathonId == var.Id);
                    obj.Answer = obj2.Answer;
                    obj.Score = obj2.Score;
                    obj.Result = obj2.Result;
                    obj.Badge = obj2.Badge;
                    obj.DateRegistered = obj2.DateRegistered;
                    obj.LastSubmission = obj2.LastSubmission;

                }
                output.Add(obj);
            }

            return output;

        }

        async Task<List<AdminOverallLeaderboardDTO>> IHackathonMaster.AdminLeaderboard()
        {
            List<UserDTO> temp = await applicationDbContext.Users.Where(h => h.Points != null).OrderByDescending(h => h.Points).ToListAsync();
            int count = await applicationDbContext.HackathonsMaster.CountAsync()*100;
            List<AdminOverallLeaderboardDTO>? LeaderboardDTOs = new List<AdminOverallLeaderboardDTO>();
            int i = 0;
            foreach (UserDTO var in temp)
            {
                if (i < 3)
                {
                    AdminOverallLeaderboardDTO t = new AdminOverallLeaderboardDTO();
                    t.points = var.Points;
                    t.username = var.Username;
                    t.learningpath = var.Specialization;
                    t.Languagesknown = var.ProgrammingLanguagesKnown;
                    
                    t.progresspercentage = (Convert.ToInt16(var.Points) * 100) / count;

                    LeaderboardDTOs.Add(t);

                    i++;
                }
                else
                {
                    break;
                }

            }

            return LeaderboardDTOs;

        }

        async Task<AdminDashboardDTO> IHackathonMaster.admindashboard()
        {
            AdminDashboardDTO output = new AdminDashboardDTO();
            output.RecentActivities = await applicationDbContext.Summary.OrderByDescending(h => h.Created).Take(3).ToListAsync();
            output.openchallenge = await applicationDbContext.HackathonsMaster.Where(h => h.EndTime > DateTime.UtcNow).ToListAsync();
            output.completedchallenges = await applicationDbContext.HackathonsMaster.Where(h => h.EndTime < DateTime.UtcNow).ToListAsync();
            output.TotalRegistrationsToday = await applicationDbContext.Users.Where(h => h.DateOfRegister > DateTime.UtcNow.AddDays(-1)).CountAsync();
            return output;
        }

        async Task IHackathonMaster.newhackathon(NewHackathon input)
        {
            HackathonsMasterDTO dt = new HackathonsMasterDTO()
            {
                Problem = input.Problem,
                TestCases= input.TestCases,
                StartTime= input.StartTime,
                EndTime=input.EndTime,
                CreatedBy=input.CreatedBy,
                Badges=input.Badges,
                difficulty=input.difficulty,
                skill = input.skill,
                description = input.description,
                hints=input.hints
            };
            await applicationDbContext.HackathonsMaster.AddAsync(dt);
            applicationDbContext.SaveChanges();


        }

        private void Ok()
        {
            throw new NotImplementedException();
        }

        async Task<List<HackathonsMasterDTO>> IHackathonMaster.getallhackathons()
        {
            List<HackathonsMasterDTO> output = new List<HackathonsMasterDTO>();
            output = await applicationDbContext.HackathonsMaster.ToListAsync();
            return output;
        }

        public async Task deleteHackathon(string id)
        {
            var hackathon = await applicationDbContext.HackathonsMaster
                                  .FirstOrDefaultAsync(h => h.Id.ToString() == id);

            if (hackathon != null)
            {
                applicationDbContext.HackathonsMaster.Remove(hackathon);
                await applicationDbContext.SaveChangesAsync();
            }
        }


       async Task<List<HackathonReportDTO>> IHackathonMaster.generatehackathonreport(string hackathonid)
        {
            List< HackathonReportDTO > output = new List<HackathonReportDTO>();
            List<HackathonDTO> thishackathon = await applicationDbContext.Hackathons.Where(h=>h.HackathonId.ToString()==hackathonid).ToListAsync();
            foreach (var h in thishackathon)
            {
                HackathonReportDTO report = new HackathonReportDTO();
                report.Lastsubmission = h.LastSubmission;
                report.result = h.Result;
                report.DateRegistered = h.DateRegistered;
                report.score = h.Score.ToString();
                UserDTO? user = await applicationDbContext.Users.FirstOrDefaultAsync(x=>x.Id==h.Id);
                if (user != null)
                {
                    report.username = user.Username;
                }
                output.Add(report);

            }

            return output;
        }
    }
}
