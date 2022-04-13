using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace everything.Migrations
{
    public partial class AddLiftingDayTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Date",
                table: "LiftSets");

            migrationBuilder.AddColumn<int>(
                name: "LiftingWorkoutId",
                table: "LiftSetLinks",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "LiftingWorkouts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Notes = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LiftingWorkouts", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_LiftSetLinks_LiftingWorkoutId",
                table: "LiftSetLinks",
                column: "LiftingWorkoutId");

            migrationBuilder.AddForeignKey(
                name: "FK_LiftSetLinks_LiftingWorkouts_LiftingWorkoutId",
                table: "LiftSetLinks",
                column: "LiftingWorkoutId",
                principalTable: "LiftingWorkouts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LiftSetLinks_LiftingWorkouts_LiftingWorkoutId",
                table: "LiftSetLinks");

            migrationBuilder.DropTable(
                name: "LiftingWorkouts");

            migrationBuilder.DropIndex(
                name: "IX_LiftSetLinks_LiftingWorkoutId",
                table: "LiftSetLinks");

            migrationBuilder.DropColumn(
                name: "LiftingWorkoutId",
                table: "LiftSetLinks");

            migrationBuilder.AddColumn<DateTime>(
                name: "Date",
                table: "LiftSets",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
