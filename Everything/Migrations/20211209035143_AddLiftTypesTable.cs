using Microsoft.EntityFrameworkCore.Migrations;

namespace everything.Migrations
{
    public partial class AddLiftTypesTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Type",
                table: "Lifts",
                newName: "LiftTypeId");

            migrationBuilder.CreateTable(
                name: "LiftType",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LiftType", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Lifts_LiftTypeId",
                table: "Lifts",
                column: "LiftTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Lifts_LiftType_LiftTypeId",
                table: "Lifts",
                column: "LiftTypeId",
                principalTable: "LiftType",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Lifts_LiftType_LiftTypeId",
                table: "Lifts");

            migrationBuilder.DropTable(
                name: "LiftType");

            migrationBuilder.DropIndex(
                name: "IX_Lifts_LiftTypeId",
                table: "Lifts");

            migrationBuilder.RenameColumn(
                name: "LiftTypeId",
                table: "Lifts",
                newName: "Type");
        }
    }
}
