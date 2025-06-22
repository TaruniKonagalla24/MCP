using MCP_API.Data;
using MCP_API.Models.DTO;
using MCP_API.Models.Tables;
using MCP_API.Repository;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace MCP_API.SQL
{
    public class HackathonSqlImpl : IHackathonMaster
    {
        private readonly ApplicationDbContext applicationDbContext;

        public HackathonSqlImpl(ApplicationDbContext applicationDbContext)
        {
            this.applicationDbContext = applicationDbContext;
        }
        Task<HackathonsMasterDTO> IHackathonMaster.addhackathon(AddHackathonmaster input)
        {
            throw new NotImplementedException();
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
                obj.successpercentage = (((tests.Where(h => h.Result == "Passed").Count() * 100 )/ tests.Count()) ).ToString();


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
    }
}
