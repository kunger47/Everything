using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace everything.Migrations
{
    public partial class AddBoards : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ToDoBoardId",
                table: "ToDoColumns",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ToDoBoards",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Sequence = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ToDoBoards", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ToDoColumns_ToDoBoardId",
                table: "ToDoColumns",
                column: "ToDoBoardId");

            migrationBuilder.AddForeignKey(
                name: "FK_ToDoColumns_ToDoBoards_ToDoBoardId",
                table: "ToDoColumns",
                column: "ToDoBoardId",
                principalTable: "ToDoBoards",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ToDoColumns_ToDoBoards_ToDoBoardId",
                table: "ToDoColumns");

            migrationBuilder.DropTable(
                name: "ToDoBoards");

            migrationBuilder.DropIndex(
                name: "IX_ToDoColumns_ToDoBoardId",
                table: "ToDoColumns");

            migrationBuilder.DropColumn(
                name: "ToDoBoardId",
                table: "ToDoColumns");
        }
    }
}
