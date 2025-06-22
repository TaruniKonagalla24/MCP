using MCP_API.Models.Tables;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Reflection.Emit;

namespace MCP_API.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
        {
        }

        public DbSet<UserDTO> Users { get; set; }
        public DbSet<HackathonsMasterDTO> HackathonsMaster { get; set; }
        public DbSet<HackathonDTO> Hackathons { get; set; }

        public DbSet<TeamMaster> TeamsMaster { get; set; }
        public DbSet<Teams> Teams { get; set; }
        public DbSet<SummaryDto> Summary { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<UserDTO>().ToTable("Users");
            modelBuilder.Entity<UserDTO>().HasData(
    new UserDTO
    {
        Id = 1,
        Username = "adminuser",
        Password = "Admin@123", // Hash in real app
        Email = "admin@example.com",
        Role = "Admin",
        Degree = "M.Tech",
        Specialization = "Software Engineering",
        PhoneNumber = "9876543210",
        PhotoUrl = "admin-photo.jpg",
        Skills = "Leadership,Planning",
        Experience = "10 Years",
        AiRecommendations = "Consider mentoring students in system design.",
        ProgrammingLanguagesKnown = "C#,Java",
        DateOfRegister = new DateTime(2025, 6, 19, 20, 48, 24)
    },
    new UserDTO
    {
        Id = 2,
        Username = "johnstudent",
        Password = "Student@123",
        Email = "john@example.com",
        Role = "Student",
        Degree = "B.Tech",
        Specialization = "Computer Science",
        PhoneNumber = "9123456789",
        PhotoUrl = "john.jpg",
        Skills = "C++,Java",
        Experience = "1 Year Internship",
        AiRecommendations = "Focus on DSA and backend frameworks.",
        ProgrammingLanguagesKnown = "C++,Python",
        DateOfRegister = new DateTime(2025, 6, 19, 20, 48, 24)
    },
    new UserDTO
    {
        Id = 3,
        Username = "anastudent",
        Password = "Ana@321",
        Email = "ana@example.com",
        Role = "Student",
        Degree = "BCA",
        Specialization = "AI",
        PhoneNumber = "9988776655",
        PhotoUrl = "ana.jpg",
        Skills = "Python,ML",
        Experience = "6 Months Training",
        AiRecommendations = "Explore Kaggle challenges and GitHub projects.",
        ProgrammingLanguagesKnown = "Python,JavaScript",
        DateOfRegister = new DateTime(2025, 6, 19, 20, 48, 24)
    },
    new UserDTO
    {
        Id = 4,
        Username = "rahulstudent",
        Password = "Rahul#456",
        Email = "rahul@example.com",
        Role = "Student",
        Degree = "B.Sc",
        Specialization = "Cybersecurity",
        PhoneNumber = "9001234567",
        PhotoUrl = "rahul.jpg",
        Skills = "Networking,Security",
        Experience = "College Projects",
        AiRecommendations = "Participate in CTFs and security blogs.",
        ProgrammingLanguagesKnown = "Python,C",
        DateOfRegister = new DateTime(2025, 6, 19, 20, 48, 24)
    },
    new UserDTO
    {
        Id = 5,
        Username = "divyastudent",
        Password = "Divya@789",
        Email = "divya@example.com",
        Role = "Student",
        Degree = "B.E",
        Specialization = "Information Technology",
        PhoneNumber = "9876012345",
        PhotoUrl = "divya.jpg",
        Skills = "Web Development",
        Experience = "Freelance projects",
        AiRecommendations = "Enhance React and Node.js skills.",
        ProgrammingLanguagesKnown = "JavaScript,HTML,CSS",
        DateOfRegister = new DateTime(2025, 6, 19, 20, 48, 24)
    }
);

            modelBuilder.Entity<HackathonsMasterDTO>().ToTable("HackathonsMaster");
            modelBuilder.Entity<HackathonDTO>().ToTable("Hackathons");
        }
    }

}
