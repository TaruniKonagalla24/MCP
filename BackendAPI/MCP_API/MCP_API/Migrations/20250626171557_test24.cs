using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MCP_API.Migrations
{
    /// <inheritdoc />
    public partial class test24 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "description",
                table: "HackathonsMaster",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "hints",
                table: "HackathonsMaster",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "description",
                table: "HackathonsMaster");

            migrationBuilder.DropColumn(
                name: "hints",
                table: "HackathonsMaster");
        }
    }
}
