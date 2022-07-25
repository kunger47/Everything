using Microsoft.EntityFrameworkCore.Migrations;

namespace everything.Migrations
{
    public partial class AddColorToTag : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ColorHexCode",
                table: "TravelTags",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ColorHexCode",
                table: "TravelTags");
        }
    }
}
