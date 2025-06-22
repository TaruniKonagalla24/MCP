using MCP_API.Data;
using MCP_API.Models.DTO;
using MCP_API.Models.Tables;
using MCP_API.Repository;
using Microsoft.EntityFrameworkCore;

namespace MCP_API.SQL
{
    public class TeamSqlImp : ITeams
    {
        private readonly ApplicationDbContext applicationDbContext;

        public TeamSqlImp(ApplicationDbContext applicationDbContext)
        {
            this.applicationDbContext = applicationDbContext;
        }
        public async Task<TeamMaster> createteam(CreateTeam input)
        {
            TeamMaster team = new TeamMaster()
            {
                TeamMajor = input.TeamMajor,
                Teamname = input.Teamname,
                CreatedBy = input.CreatedBy,
                CreatedOn = DateTime.UtcNow

            };
            await applicationDbContext.AddAsync(team);
            await applicationDbContext.SaveChangesAsync();
            return team;
        }

        public async Task<List<MyTeams>> GetmyTeams(int userid)
        {
            List<MyTeams> myTeams = new List<MyTeams>();
            List<TeamMaster> teams = await applicationDbContext.TeamsMaster.ToListAsync();
            List<Teams> userteams = await applicationDbContext.Teams.Where(h=>h.userid==userid).ToListAsync();

            foreach (TeamMaster team in teams)
            {
                MyTeams myTeam = new MyTeams()
                {
                    TeamMajor = team.TeamMajor,
                    Teamname = team.Teamname,
                    CreatedBy = team.CreatedBy,
                    CreatedOn = team.CreatedOn,
                    Id = team.Id
                    
                };
                if (userteams.Exists(h => h.teamid == team.Id.ToString())) myTeam.Joined = true;
                myTeams.Add(myTeam);

            }

            return myTeams;
      
        }

        public async Task jointeam(JoinTeam input)
        {
            Teams teams = new Teams()
            {
                teamid = input.teamid,
                userid = input.userid
            };
            await applicationDbContext.Teams.AddAsync(teams);
            await applicationDbContext.SaveChangesAsync();   


        }
    }
}
