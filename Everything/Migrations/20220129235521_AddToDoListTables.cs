using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace everything.Migrations
{
    public partial class AddToDoListTables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "DueDate",
                table: "ToDoItems",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "Sequence",
                table: "ToDoItems",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ToDoColumnId",
                table: "ToDoItems",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "ToDoColumns",
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
                    table.PrimaryKey("PK_ToDoColumns", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ToDoItemTasks",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Sequence = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Completed = table.Column<bool>(type: "bit", nullable: false),
                    ToDoItemId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ToDoItemTasks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ToDoItemTasks_ToDoItems_ToDoItemId",
                        column: x => x.ToDoItemId,
                        principalTable: "ToDoItems",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ToDoItems_ToDoColumnId",
                table: "ToDoItems",
                column: "ToDoColumnId");

            migrationBuilder.CreateIndex(
                name: "IX_ToDoItemTasks_ToDoItemId",
                table: "ToDoItemTasks",
                column: "ToDoItemId");

            migrationBuilder.AddForeignKey(
                name: "FK_ToDoItems_ToDoColumns_ToDoColumnId",
                table: "ToDoItems",
                column: "ToDoColumnId",
                principalTable: "ToDoColumns",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ToDoItems_ToDoColumns_ToDoColumnId",
                table: "ToDoItems");

            migrationBuilder.DropTable(
                name: "ToDoColumns");

            migrationBuilder.DropTable(
                name: "ToDoItemTasks");

            migrationBuilder.DropIndex(
                name: "IX_ToDoItems_ToDoColumnId",
                table: "ToDoItems");

            migrationBuilder.DropColumn(
                name: "DueDate",
                table: "ToDoItems");

            migrationBuilder.DropColumn(
                name: "Sequence",
                table: "ToDoItems");

            migrationBuilder.DropColumn(
                name: "ToDoColumnId",
                table: "ToDoItems");
        }
    }
}
