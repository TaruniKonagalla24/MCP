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
        public EvaluationService EvalualteHackahon { get; }

        public HackathonSqlImpl(ApplicationDbContext applicationDbContext,AddHackathonService addHackathonService,EvaluationService e)
        {
            this.applicationDbContext = applicationDbContext;
            AddHackathonService = addHackathonService;
            this.EvalualteHackahon = e;
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
            SummaryDto sd = new SummaryDto();
                sd.Created = DateTime.Now;
                sd.Username = "Admin";
                sd.userid =1;
                sd.Summary = "Created a New Challenge "+ input.Problem;
                await applicationDbContext.Summary.AddAsync(sd);

            
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

        async Task<HackathonsMasterDTO> IHackathonMaster.gethackathon(string id)
        {
            return await applicationDbContext.HackathonsMaster.FirstOrDefaultAsync(h => h.Id.ToString()==id);
        }

        async Task<EvaluationresultDTO> IHackathonMaster.evaluateHackathon(EvaluationDTO input)
        {
            HackathonsMasterDTO hack = await applicationDbContext.HackathonsMaster.FirstOrDefaultAsync(h=>h.Id.ToString()==input.hackathonid);
            string temp = Newtonsoft.Json.JsonConvert.SerializeObject(hack);
            string temp2 = Newtonsoft.Json.JsonConvert.SerializeObject(input);
            string inputstring = " need to evaluate a hackathon question is "+ temp+"user answer is "+ temp2 + "  Return a single valid JSON object with these **exact field names** only: score, messages . if the anwer passes alla test cases score should be out of hundred as max if no test cases is passed  or something failed say what went wrong in messages . No comments, no explanation, just raw JSON inside a code block.";
            // logic to be builded
            EvaluationresultDTO output = await  EvalualteHackahon.EvaluateHackathon(inputstring);
            return output;
           
        }
        async Task<caOutputDTO> IHackathonMaster.chatbot(CAinputDTO input)
        {
            HackathonsMasterDTO hack = await applicationDbContext.HackathonsMaster.FirstOrDefaultAsync(h => h.Id.ToString() == input.hackathonid);
            string temp = Newtonsoft.Json.JsonConvert.SerializeObject(hack);
            string temp2 = Newtonsoft.Json.JsonConvert.SerializeObject(input);
            string inputstring = "you are a coding assitant chat bot this the poblem user solving  " + temp + "an the input from the user and query is " + temp2 + "  Return a single valid JSON object with these **exact field name** only:  messages . help user where he is stuckwith hints like wherr he is stuck and please dont give full answer, please dont add like this content or role i just need the raw json with messages, its not a list im deserializing as a string just string   No comments, no explanation, just raw JSON inside a code block.";
            // logic to be builded
            caOutputDTO output = await EvalualteHackahon.Caimplementation(inputstring);
            return output;

        }

        async Task IHackathonMaster.submitHackathon(SubmitHackathon input)
        {
            HackathonDTO add =  applicationDbContext.Hackathons.FirstOrDefault(h=> h.HackathonId==input.HackathonId && h.UserId==input.Userid);
            HackathonsMasterDTO hackathonsMasterDTO =  applicationDbContext.HackathonsMaster.FirstOrDefault(h => h.Id == input.HackathonId);
            UserDTO userDTO = applicationDbContext.Users.FirstOrDefault(h => h.Id==input.Userid);
            if (add == null) {
                add = new HackathonDTO();
                add.UserId = input.Userid;
                add.HackathonId = input.HackathonId;
                add.Score = input.score;
                add.Answer = input.messages;
                if (input.score > 50)
                {
                    add.Result = "Passed";
                    add.Badge = hackathonsMasterDTO.Badges;                   
                    //new summary
                    SummaryDto sd = new SummaryDto();
                    sd.Created = DateTime.Now;
                    sd.Username =userDTO.Username;
                    sd.userid = userDTO.Id;
                    userDTO.Points += input.score;
                    if (userDTO.streak == null) userDTO.streak = 1;
                    else userDTO.streak += 1;
                    sd.Summary = " Completed "+ hackathonsMasterDTO.Problem + "earned badge: "+hackathonsMasterDTO.Badges ;
                    await applicationDbContext.Summary.AddAsync(sd);
                   
                }
                else
                {
                    add.Result = "Failed";
                }
                add.DateRegistered = DateTime.Now;
                add.LastSubmission = DateTime.Now;
                await applicationDbContext.Hackathons.AddAsync(add);


            }
            else
            {
                add.Score = input.score;
                add.Answer = input.messages;
                if (input.score > 50)
                {
                    add.Result = "Passed";
                    add.Badge = hackathonsMasterDTO.Badges;
                    //new summary
                    SummaryDto sd = new SummaryDto();
                    sd.Created = DateTime.Now;
                    sd.Username = userDTO.Username;
                    sd.userid = userDTO.Id;
                    userDTO.Points += input.score;
                    if (userDTO.streak == null) userDTO.streak = 1;
                    else userDTO.streak += 1;
                    sd.Summary = " Completed " + hackathonsMasterDTO.Problem + "earned badge: " + hackathonsMasterDTO.Badges;
                    await applicationDbContext.Summary.AddAsync(sd);

                }
                else
                {
                    add.Result = "Failed";
                }
                add.DateRegistered = DateTime.Now;
                add.LastSubmission = DateTime.Now;

            }
            await applicationDbContext.SaveChangesAsync();
        }
    }
}
