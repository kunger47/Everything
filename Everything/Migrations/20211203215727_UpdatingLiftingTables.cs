using Microsoft.EntityFrameworkCore.Migrations;

namespace everything.Migrations
{
    public partial class UpdatingLiftingTables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_MuscleGroupForLifts_LiftId",
                table: "MuscleGroupForLifts",
                column: "LiftId");

            migrationBuilder.CreateIndex(
                name: "IX_MuscleGroupForLifts_MuscleGroupId",
                table: "MuscleGroupForLifts",
                column: "MuscleGroupId");

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
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MuscleGroupForLifts_Lifts_LiftId",
                table: "MuscleGroupForLifts");

            migrationBuilder.DropForeignKey(
                name: "FK_MuscleGroupForLifts_MuscleGroups_MuscleGroupId",
                table: "MuscleGroupForLifts");

            migrationBuilder.DropIndex(
                name: "IX_MuscleGroupForLifts_LiftId",
                table: "MuscleGroupForLifts");

            migrationBuilder.DropIndex(
                name: "IX_MuscleGroupForLifts_MuscleGroupId",
                table: "MuscleGroupForLifts");
        }
    }
}
