using Microsoft.EntityFrameworkCore.Migrations;

namespace everything.Migrations
{
    public partial class AddAbilityToSelectQuestionCategories : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsSelected",
                table: "QuestionCategories",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsSelected",
                table: "QuestionCategories");
        }
    }
}
