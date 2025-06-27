using MCP_API.AiConfig;
using MCP_API.Data;
using MCP_API.Repository;
using MCP_API.SQL;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowOrigins", policy =>
    {
        policy.WithOrigins(
            "http://localhost:3000",
            "https://mavericks-coding-platform.azurewebsites.net"
        )
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});
builder.Services.Configure<ApiSettings>(builder.Configuration.GetSection("ApiSettings"));

builder.Services.AddHttpClient<ResumeService>();
builder.Services.AddHttpClient<AddHackathonService>();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// DB
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("studentConnectionString")));

// Repos
builder.Services.AddScoped<IUserRepository, StudentRepository>();
builder.Services.AddScoped<ITeams, TeamSqlImp>();
builder.Services.AddScoped<IHackathonMaster, HackathonSqlImpl>();

var app = builder.Build();

// Swagger
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseCors("AllowOrigins");

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.Run();
