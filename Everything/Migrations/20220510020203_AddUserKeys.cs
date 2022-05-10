using Microsoft.EntityFrameworkCore.Migrations;

namespace everything.Migrations
{
    public partial class AddUserKeys : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "ToDoBoards",
                type: "int",
                nullable: false,
                defaultValue: 1);

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "QuestionCategories",
                type: "int",
                nullable: false,
                defaultValue: 1);

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "MuscleGroups",
                type: "int",
                nullable: false,
                defaultValue: 1);

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "LiftType",
                type: "int",
                nullable: false,
                defaultValue: 1);

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Lifts",
                type: "int",
                nullable: false,
                defaultValue: 1);

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "LiftingWorkouts",
                type: "int",
                nullable: false,
                defaultValue: 1);

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "LiftDayPlans",
                type: "int",
                nullable: false,
                defaultValue: 1);

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Games",
                type: "int",
                nullable: false,
                defaultValue: 1);

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Budgets",
                type: "int",
                nullable: false,
                defaultValue: 1);

            migrationBuilder.CreateIndex(
                name: "IX_ToDoBoards_UserId",
                table: "ToDoBoards",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_QuestionCategories_UserId",
                table: "QuestionCategories",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_MuscleGroups_UserId",
                table: "MuscleGroups",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_LiftType_UserId",
                table: "LiftType",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Lifts_UserId",
                table: "Lifts",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_LiftingWorkouts_UserId",
                table: "LiftingWorkouts",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_LiftDayPlans_UserId",
                table: "LiftDayPlans",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Games_UserId",
                table: "Games",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Budgets_UserId",
                table: "Budgets",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Budgets_Users_UserId",
                table: "Budgets",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Games_Users_UserId",
                table: "Games",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_LiftDayPlans_Users_UserId",
                table: "LiftDayPlans",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_LiftingWorkouts_Users_UserId",
                table: "LiftingWorkouts",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Lifts_Users_UserId",
                table: "Lifts",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_LiftType_Users_UserId",
                table: "LiftType",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_MuscleGroups_Users_UserId",
                table: "MuscleGroups",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_QuestionCategories_Users_UserId",
                table: "QuestionCategories",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ToDoBoards_Users_UserId",
                table: "ToDoBoards",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Budgets_Users_UserId",
                table: "Budgets");

            migrationBuilder.DropForeignKey(
                name: "FK_Games_Users_UserId",
                table: "Games");

            migrationBuilder.DropForeignKey(
                name: "FK_LiftDayPlans_Users_UserId",
                table: "LiftDayPlans");

            migrationBuilder.DropForeignKey(
                name: "FK_LiftingWorkouts_Users_UserId",
                table: "LiftingWorkouts");

            migrationBuilder.DropForeignKey(
                name: "FK_Lifts_Users_UserId",
                table: "Lifts");

            migrationBuilder.DropForeignKey(
                name: "FK_LiftType_Users_UserId",
                table: "LiftType");

            migrationBuilder.DropForeignKey(
                name: "FK_MuscleGroups_Users_UserId",
                table: "MuscleGroups");

            migrationBuilder.DropForeignKey(
                name: "FK_QuestionCategories_Users_UserId",
                table: "QuestionCategories");

            migrationBuilder.DropForeignKey(
                name: "FK_ToDoBoards_Users_UserId",
                table: "ToDoBoards");

            migrationBuilder.DropIndex(
                name: "IX_ToDoBoards_UserId",
                table: "ToDoBoards");

            migrationBuilder.DropIndex(
                name: "IX_QuestionCategories_UserId",
                table: "QuestionCategories");

            migrationBuilder.DropIndex(
                name: "IX_MuscleGroups_UserId",
                table: "MuscleGroups");

            migrationBuilder.DropIndex(
                name: "IX_LiftType_UserId",
                table: "LiftType");

            migrationBuilder.DropIndex(
                name: "IX_Lifts_UserId",
                table: "Lifts");

            migrationBuilder.DropIndex(
                name: "IX_LiftingWorkouts_UserId",
                table: "LiftingWorkouts");

            migrationBuilder.DropIndex(
                name: "IX_LiftDayPlans_UserId",
                table: "LiftDayPlans");

            migrationBuilder.DropIndex(
                name: "IX_Games_UserId",
                table: "Games");

            migrationBuilder.DropIndex(
                name: "IX_Budgets_UserId",
                table: "Budgets");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "ToDoBoards");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "QuestionCategories");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "MuscleGroups");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "LiftType");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Lifts");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "LiftingWorkouts");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "LiftDayPlans");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Games");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Budgets");
        }
    }
}
