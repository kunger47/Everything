using Microsoft.EntityFrameworkCore.Migrations;

namespace everything.Migrations
{
    public partial class MakeBoardRequired : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ToDoColumns_ToDoBoards_ToDoBoardId",
                table: "ToDoColumns");

            migrationBuilder.AlterColumn<int>(
                name: "ToDoBoardId",
                table: "ToDoColumns",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_ToDoColumns_ToDoBoards_ToDoBoardId",
                table: "ToDoColumns",
                column: "ToDoBoardId",
                principalTable: "ToDoBoards",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ToDoColumns_ToDoBoards_ToDoBoardId",
                table: "ToDoColumns");

            migrationBuilder.AlterColumn<int>(
                name: "ToDoBoardId",
                table: "ToDoColumns",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_ToDoColumns_ToDoBoards_ToDoBoardId",
                table: "ToDoColumns",
                column: "ToDoBoardId",
                principalTable: "ToDoBoards",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
