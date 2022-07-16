using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace everything.Migrations
{
    public partial class CreateBoardFolder : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Sequence",
                table: "ToDoBoards");

            migrationBuilder.AddColumn<int>(
                name: "BoardFolderId",
                table: "ToDoBoards",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ToDoBoardFolders",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    BoardFolderId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ToDoBoardFolders", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ToDoBoardFolders_ToDoBoardFolders_BoardFolderId",
                        column: x => x.BoardFolderId,
                        principalTable: "ToDoBoardFolders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ToDoBoardFolders_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ToDoBoards_BoardFolderId",
                table: "ToDoBoards",
                column: "BoardFolderId");

            migrationBuilder.CreateIndex(
                name: "IX_ToDoBoardFolders_BoardFolderId",
                table: "ToDoBoardFolders",
                column: "BoardFolderId");

            migrationBuilder.CreateIndex(
                name: "IX_ToDoBoardFolders_UserId",
                table: "ToDoBoardFolders",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_ToDoBoards_ToDoBoardFolders_BoardFolderId",
                table: "ToDoBoards",
                column: "BoardFolderId",
                principalTable: "ToDoBoardFolders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ToDoBoards_ToDoBoardFolders_BoardFolderId",
                table: "ToDoBoards");

            migrationBuilder.DropTable(
                name: "ToDoBoardFolders");

            migrationBuilder.DropIndex(
                name: "IX_ToDoBoards_BoardFolderId",
                table: "ToDoBoards");

            migrationBuilder.DropColumn(
                name: "BoardFolderId",
                table: "ToDoBoards");

            migrationBuilder.AddColumn<int>(
                name: "Sequence",
                table: "ToDoBoards",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
