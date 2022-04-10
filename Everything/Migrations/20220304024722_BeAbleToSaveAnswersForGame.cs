using Microsoft.EntityFrameworkCore.Migrations;

namespace everything.Migrations
{
    public partial class BeAbleToSaveAnswersForGame : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Accounts_Budgets_BudgetId",
                table: "Accounts");

            migrationBuilder.DropForeignKey(
                name: "FK_ExpenseBudgets_Budgets_BudgetId",
                table: "ExpenseBudgets");

            migrationBuilder.DropForeignKey(
                name: "FK_Expenses_ExpenseBudgets_ExpenseBudgetId",
                table: "Expenses");

            migrationBuilder.DropForeignKey(
                name: "FK_IncomeSourceDeductions_IncomeSources_IncomeSourceId",
                table: "IncomeSourceDeductions");

            migrationBuilder.DropForeignKey(
                name: "FK_IncomeSources_Budgets_BudgetId",
                table: "IncomeSources");

            migrationBuilder.DropForeignKey(
                name: "FK_Lifts_LiftType_LiftTypeId",
                table: "Lifts");

            migrationBuilder.DropForeignKey(
                name: "FK_LiftSets_Lifts_LiftId",
                table: "LiftSets");

            migrationBuilder.DropForeignKey(
                name: "FK_MuscleGroupForLiftDayPlans_LiftDayPlans_LiftDayPlanId",
                table: "MuscleGroupForLiftDayPlans");

            migrationBuilder.DropForeignKey(
                name: "FK_MuscleGroupForLiftDayPlans_MuscleGroups_MuscleGroupId",
                table: "MuscleGroupForLiftDayPlans");

            migrationBuilder.DropForeignKey(
                name: "FK_MuscleGroupForLifts_Lifts_LiftId",
                table: "MuscleGroupForLifts");

            migrationBuilder.DropForeignKey(
                name: "FK_MuscleGroupForLifts_MuscleGroups_MuscleGroupId",
                table: "MuscleGroupForLifts");

            migrationBuilder.DropForeignKey(
                name: "FK_Players_Games_GameId",
                table: "Players");

            migrationBuilder.DropForeignKey(
                name: "FK_Questions_QuestionCategories_QuestionCategoryId",
                table: "Questions");

            migrationBuilder.DropForeignKey(
                name: "FK_ToDoColumns_ToDoBoards_ToDoBoardId",
                table: "ToDoColumns");

            migrationBuilder.DropForeignKey(
                name: "FK_ToDoItems_ToDoColumns_ToDoColumnId",
                table: "ToDoItems");

            migrationBuilder.DropForeignKey(
                name: "FK_ToDoItemTasks_ToDoItems_ToDoItemId",
                table: "ToDoItemTasks");

            migrationBuilder.CreateTable(
                name: "GameQuestions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Round = table.Column<int>(type: "int", nullable: false),
                    Points = table.Column<int>(type: "int", nullable: false),
                    IsDouble = table.Column<bool>(type: "bit", nullable: false),
                    GameId = table.Column<int>(type: "int", nullable: false),
                    QuestionId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GameQuestions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GameQuestions_Games_GameId",
                        column: x => x.GameId,
                        principalTable: "Games",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_GameQuestions_Questions_QuestionId",
                        column: x => x.QuestionId,
                        principalTable: "Questions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "QuestionAnswers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Bet = table.Column<int>(type: "int", nullable: true),
                    WasRight = table.Column<bool>(type: "bit", nullable: false),
                    PlayerId = table.Column<int>(type: "int", nullable: false),
                    GameQuestionId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QuestionAnswers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_QuestionAnswers_GameQuestions_GameQuestionId",
                        column: x => x.GameQuestionId,
                        principalTable: "GameQuestions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_QuestionAnswers_Players_PlayerId",
                        column: x => x.PlayerId,
                        principalTable: "Players",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_GameQuestions_GameId",
                table: "GameQuestions",
                column: "GameId");

            migrationBuilder.CreateIndex(
                name: "IX_GameQuestions_QuestionId",
                table: "GameQuestions",
                column: "QuestionId");

            migrationBuilder.CreateIndex(
                name: "IX_QuestionAnswers_GameQuestionId",
                table: "QuestionAnswers",
                column: "GameQuestionId");

            migrationBuilder.CreateIndex(
                name: "IX_QuestionAnswers_PlayerId",
                table: "QuestionAnswers",
                column: "PlayerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Accounts_Budgets_BudgetId",
                table: "Accounts",
                column: "BudgetId",
                principalTable: "Budgets",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ExpenseBudgets_Budgets_BudgetId",
                table: "ExpenseBudgets",
                column: "BudgetId",
                principalTable: "Budgets",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Expenses_ExpenseBudgets_ExpenseBudgetId",
                table: "Expenses",
                column: "ExpenseBudgetId",
                principalTable: "ExpenseBudgets",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_IncomeSourceDeductions_IncomeSources_IncomeSourceId",
                table: "IncomeSourceDeductions",
                column: "IncomeSourceId",
                principalTable: "IncomeSources",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_IncomeSources_Budgets_BudgetId",
                table: "IncomeSources",
                column: "BudgetId",
                principalTable: "Budgets",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Lifts_LiftType_LiftTypeId",
                table: "Lifts",
                column: "LiftTypeId",
                principalTable: "LiftType",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_LiftSets_Lifts_LiftId",
                table: "LiftSets",
                column: "LiftId",
                principalTable: "Lifts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_MuscleGroupForLiftDayPlans_LiftDayPlans_LiftDayPlanId",
                table: "MuscleGroupForLiftDayPlans",
                column: "LiftDayPlanId",
                principalTable: "LiftDayPlans",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_MuscleGroupForLiftDayPlans_MuscleGroups_MuscleGroupId",
                table: "MuscleGroupForLiftDayPlans",
                column: "MuscleGroupId",
                principalTable: "MuscleGroups",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_MuscleGroupForLifts_Lifts_LiftId",
                table: "MuscleGroupForLifts",
                column: "LiftId",
                principalTable: "Lifts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_MuscleGroupForLifts_MuscleGroups_MuscleGroupId",
                table: "MuscleGroupForLifts",
                column: "MuscleGroupId",
                principalTable: "MuscleGroups",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Players_Games_GameId",
                table: "Players",
                column: "GameId",
                principalTable: "Games",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Questions_QuestionCategories_QuestionCategoryId",
                table: "Questions",
                column: "QuestionCategoryId",
                principalTable: "QuestionCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ToDoColumns_ToDoBoards_ToDoBoardId",
                table: "ToDoColumns",
                column: "ToDoBoardId",
                principalTable: "ToDoBoards",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ToDoItems_ToDoColumns_ToDoColumnId",
                table: "ToDoItems",
                column: "ToDoColumnId",
                principalTable: "ToDoColumns",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ToDoItemTasks_ToDoItems_ToDoItemId",
                table: "ToDoItemTasks",
                column: "ToDoItemId",
                principalTable: "ToDoItems",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Accounts_Budgets_BudgetId",
                table: "Accounts");

            migrationBuilder.DropForeignKey(
                name: "FK_ExpenseBudgets_Budgets_BudgetId",
                table: "ExpenseBudgets");

            migrationBuilder.DropForeignKey(
                name: "FK_Expenses_ExpenseBudgets_ExpenseBudgetId",
                table: "Expenses");

            migrationBuilder.DropForeignKey(
                name: "FK_IncomeSourceDeductions_IncomeSources_IncomeSourceId",
                table: "IncomeSourceDeductions");

            migrationBuilder.DropForeignKey(
                name: "FK_IncomeSources_Budgets_BudgetId",
                table: "IncomeSources");

            migrationBuilder.DropForeignKey(
                name: "FK_Lifts_LiftType_LiftTypeId",
                table: "Lifts");

            migrationBuilder.DropForeignKey(
                name: "FK_LiftSets_Lifts_LiftId",
                table: "LiftSets");

            migrationBuilder.DropForeignKey(
                name: "FK_MuscleGroupForLiftDayPlans_LiftDayPlans_LiftDayPlanId",
                table: "MuscleGroupForLiftDayPlans");

            migrationBuilder.DropForeignKey(
                name: "FK_MuscleGroupForLiftDayPlans_MuscleGroups_MuscleGroupId",
                table: "MuscleGroupForLiftDayPlans");

            migrationBuilder.DropForeignKey(
                name: "FK_MuscleGroupForLifts_Lifts_LiftId",
                table: "MuscleGroupForLifts");

            migrationBuilder.DropForeignKey(
                name: "FK_MuscleGroupForLifts_MuscleGroups_MuscleGroupId",
                table: "MuscleGroupForLifts");

            migrationBuilder.DropForeignKey(
                name: "FK_Players_Games_GameId",
                table: "Players");

            migrationBuilder.DropForeignKey(
                name: "FK_Questions_QuestionCategories_QuestionCategoryId",
                table: "Questions");

            migrationBuilder.DropForeignKey(
                name: "FK_ToDoColumns_ToDoBoards_ToDoBoardId",
                table: "ToDoColumns");

            migrationBuilder.DropForeignKey(
                name: "FK_ToDoItems_ToDoColumns_ToDoColumnId",
                table: "ToDoItems");

            migrationBuilder.DropForeignKey(
                name: "FK_ToDoItemTasks_ToDoItems_ToDoItemId",
                table: "ToDoItemTasks");

            migrationBuilder.DropTable(
                name: "QuestionAnswers");

            migrationBuilder.DropTable(
                name: "GameQuestions");

            migrationBuilder.AddForeignKey(
                name: "FK_Accounts_Budgets_BudgetId",
                table: "Accounts",
                column: "BudgetId",
                principalTable: "Budgets",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ExpenseBudgets_Budgets_BudgetId",
                table: "ExpenseBudgets",
                column: "BudgetId",
                principalTable: "Budgets",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Expenses_ExpenseBudgets_ExpenseBudgetId",
                table: "Expenses",
                column: "ExpenseBudgetId",
                principalTable: "ExpenseBudgets",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_IncomeSourceDeductions_IncomeSources_IncomeSourceId",
                table: "IncomeSourceDeductions",
                column: "IncomeSourceId",
                principalTable: "IncomeSources",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_IncomeSources_Budgets_BudgetId",
                table: "IncomeSources",
                column: "BudgetId",
                principalTable: "Budgets",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Lifts_LiftType_LiftTypeId",
                table: "Lifts",
                column: "LiftTypeId",
                principalTable: "LiftType",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_LiftSets_Lifts_LiftId",
                table: "LiftSets",
                column: "LiftId",
                principalTable: "Lifts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_MuscleGroupForLiftDayPlans_LiftDayPlans_LiftDayPlanId",
                table: "MuscleGroupForLiftDayPlans",
                column: "LiftDayPlanId",
                principalTable: "LiftDayPlans",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_MuscleGroupForLiftDayPlans_MuscleGroups_MuscleGroupId",
                table: "MuscleGroupForLiftDayPlans",
                column: "MuscleGroupId",
                principalTable: "MuscleGroups",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_MuscleGroupForLifts_Lifts_LiftId",
                table: "MuscleGroupForLifts",
                column: "LiftId",
                principalTable: "Lifts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_MuscleGroupForLifts_MuscleGroups_MuscleGroupId",
                table: "MuscleGroupForLifts",
                column: "MuscleGroupId",
                principalTable: "MuscleGroups",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Players_Games_GameId",
                table: "Players",
                column: "GameId",
                principalTable: "Games",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Questions_QuestionCategories_QuestionCategoryId",
                table: "Questions",
                column: "QuestionCategoryId",
                principalTable: "QuestionCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ToDoColumns_ToDoBoards_ToDoBoardId",
                table: "ToDoColumns",
                column: "ToDoBoardId",
                principalTable: "ToDoBoards",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ToDoItems_ToDoColumns_ToDoColumnId",
                table: "ToDoItems",
                column: "ToDoColumnId",
                principalTable: "ToDoColumns",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ToDoItemTasks_ToDoItems_ToDoItemId",
                table: "ToDoItemTasks",
                column: "ToDoItemId",
                principalTable: "ToDoItems",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
