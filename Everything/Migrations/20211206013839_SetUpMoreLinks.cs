using Microsoft.EntityFrameworkCore.Migrations;

namespace everything.Migrations
{
    public partial class SetUpMoreLinks : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_LiftSets_LiftRecordId",
                table: "LiftSets",
                column: "LiftRecordId");

            migrationBuilder.CreateIndex(
                name: "IX_LiftRecords_LiftId",
                table: "LiftRecords",
                column: "LiftId");

            migrationBuilder.AddForeignKey(
                name: "FK_LiftRecords_Lifts_LiftId",
                table: "LiftRecords",
                column: "LiftId",
                principalTable: "Lifts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_LiftSets_LiftRecords_LiftRecordId",
                table: "LiftSets",
                column: "LiftRecordId",
                principalTable: "LiftRecords",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LiftRecords_Lifts_LiftId",
                table: "LiftRecords");

            migrationBuilder.DropForeignKey(
                name: "FK_LiftSets_LiftRecords_LiftRecordId",
                table: "LiftSets");

            migrationBuilder.DropIndex(
                name: "IX_LiftSets_LiftRecordId",
                table: "LiftSets");

            migrationBuilder.DropIndex(
                name: "IX_LiftRecords_LiftId",
                table: "LiftRecords");
        }
    }
}
