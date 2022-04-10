using Microsoft.EntityFrameworkCore.Migrations;

namespace everything.Migrations
{
    public partial class LinkUpItemsToOverallBudget : Migration
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
                name: "FK_IncomeSources_Budgets_BudgetId",
                table: "IncomeSources");

            migrationBuilder.AlterColumn<int>(
                name: "BudgetId",
                table: "IncomeSources",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "BudgetId",
                table: "ExpenseBudgets",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "BudgetId",
                table: "Accounts",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

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
                name: "FK_IncomeSources_Budgets_BudgetId",
                table: "IncomeSources",
                column: "BudgetId",
                principalTable: "Budgets",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
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
                name: "FK_IncomeSources_Budgets_BudgetId",
                table: "IncomeSources");

            migrationBuilder.AlterColumn<int>(
                name: "BudgetId",
                table: "IncomeSources",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "BudgetId",
                table: "ExpenseBudgets",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "BudgetId",
                table: "Accounts",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

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
                name: "FK_IncomeSources_Budgets_BudgetId",
                table: "IncomeSources",
                column: "BudgetId",
                principalTable: "Budgets",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
