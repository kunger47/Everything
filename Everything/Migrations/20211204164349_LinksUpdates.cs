using Microsoft.EntityFrameworkCore.Migrations;

namespace everything.Migrations
{
    public partial class LinksUpdates : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_MuscleGroupForLiftDayPlans_LiftDayPlanId",
                table: "MuscleGroupForLiftDayPlans",
                column: "LiftDayPlanId");

            migrationBuilder.CreateIndex(
                name: "IX_MuscleGroupForLiftDayPlans_MuscleGroupId",
                table: "MuscleGroupForLiftDayPlans",
                column: "MuscleGroupId");

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
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MuscleGroupForLiftDayPlans_LiftDayPlans_LiftDayPlanId",
                table: "MuscleGroupForLiftDayPlans");

            migrationBuilder.DropForeignKey(
                name: "FK_MuscleGroupForLiftDayPlans_MuscleGroups_MuscleGroupId",
                table: "MuscleGroupForLiftDayPlans");

            migrationBuilder.DropIndex(
                name: "IX_MuscleGroupForLiftDayPlans_LiftDayPlanId",
                table: "MuscleGroupForLiftDayPlans");

            migrationBuilder.DropIndex(
                name: "IX_MuscleGroupForLiftDayPlans_MuscleGroupId",
                table: "MuscleGroupForLiftDayPlans");
        }
    }
}
