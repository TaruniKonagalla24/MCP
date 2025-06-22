using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace MCP_API.Migrations
{
    /// <inheritdoc />
    public partial class test : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Hackathons",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    HackathonId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    Result = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Answer = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Score = table.Column<double>(type: "float", nullable: false),
                    DateRegistered = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LastSubmission = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Hackathons", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "HackathonsMaster",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Problem = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TestCases = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StartTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HackathonsMaster", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Username = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Role = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Degree = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Specialization = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PhotoUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Skills = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Experience = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AiRecommendations = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProgrammingLanguagesKnown = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DateOfRegister = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "AiRecommendations", "DateOfRegister", "Degree", "Email", "Experience", "Password", "PhoneNumber", "PhotoUrl", "ProgrammingLanguagesKnown", "Role", "Skills", "Specialization", "Username" },
                values: new object[,]
                {
                    { 1, "Consider mentoring students in system design.", new DateTime(2025, 6, 19, 20, 48, 24, 0, DateTimeKind.Unspecified), "M.Tech", "admin@example.com", "10 Years", "Admin@123", "9876543210", "admin-photo.jpg", "C#,Java", "Admin", "Leadership,Planning", "Software Engineering", "adminuser" },
                    { 2, "Focus on DSA and backend frameworks.", new DateTime(2025, 6, 19, 20, 48, 24, 0, DateTimeKind.Unspecified), "B.Tech", "john@example.com", "1 Year Internship", "Student@123", "9123456789", "john.jpg", "C++,Python", "Student", "C++,Java", "Computer Science", "johnstudent" },
                    { 3, "Explore Kaggle challenges and GitHub projects.", new DateTime(2025, 6, 19, 20, 48, 24, 0, DateTimeKind.Unspecified), "BCA", "ana@example.com", "6 Months Training", "Ana@321", "9988776655", "ana.jpg", "Python,JavaScript", "Student", "Python,ML", "AI", "anastudent" },
                    { 4, "Participate in CTFs and security blogs.", new DateTime(2025, 6, 19, 20, 48, 24, 0, DateTimeKind.Unspecified), "B.Sc", "rahul@example.com", "College Projects", "Rahul#456", "9001234567", "rahul.jpg", "Python,C", "Student", "Networking,Security", "Cybersecurity", "rahulstudent" },
                    { 5, "Enhance React and Node.js skills.", new DateTime(2025, 6, 19, 20, 48, 24, 0, DateTimeKind.Unspecified), "B.E", "divya@example.com", "Freelance projects", "Divya@789", "9876012345", "divya.jpg", "JavaScript,HTML,CSS", "Student", "Web Development", "Information Technology", "divyastudent" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Hackathons");

            migrationBuilder.DropTable(
                name: "HackathonsMaster");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
