using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace everything.Migrations
{
    public partial class CreateLiftingTables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Lifts",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "Lifts",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "Type",
                table: "Lifts",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "VideoLink",
                table: "Lifts",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "LiftDayPlans",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LiftDayPlans", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "LiftRecords",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    LiftId = table.Column<int>(type: "int", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LiftRecords", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "LiftSets",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    LiftRecordId = table.Column<int>(type: "int", nullable: false),
                    Number = table.Column<int>(type: "int", nullable: false),
                    Reps = table.Column<int>(type: "int", nullable: false),
                    Weight = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LiftSets", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "MuscleGroupForLiftDayPlans",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MuscleGroupId = table.Column<int>(type: "int", nullable: false),
                    LiftDayPlanId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MuscleGroupForLiftDayPlans", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "MuscleGroupForLifts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MuscleGroupId = table.Column<int>(type: "int", nullable: false),
                    LiftId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MuscleGroupForLifts", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "MuscleGroups",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MuscleGroups", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "LiftDayPlans");

            migrationBuilder.DropTable(
                name: "LiftRecords");

            migrationBuilder.DropTable(
                name: "LiftSets");

            migrationBuilder.DropTable(
                name: "MuscleGroupForLiftDayPlans");

            migrationBuilder.DropTable(
                name: "MuscleGroupForLifts");

            migrationBuilder.DropTable(
                name: "MuscleGroups");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Lifts");

            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "Lifts");

            migrationBuilder.DropColumn(
                name: "Type",
                table: "Lifts");

            migrationBuilder.DropColumn(
                name: "VideoLink",
                table: "Lifts");
        }
    }
}
