using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace everything.Migrations
{
    public partial class RemoveUnnecessaryTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LiftSets_LiftRecords_LiftRecordId",
                table: "LiftSets");

            migrationBuilder.DropTable(
                name: "LiftRecords");

            migrationBuilder.RenameColumn(
                name: "LiftRecordId",
                table: "LiftSets",
                newName: "LiftId");

            migrationBuilder.RenameIndex(
                name: "IX_LiftSets_LiftRecordId",
                table: "LiftSets",
                newName: "IX_LiftSets_LiftId");

            migrationBuilder.AlterColumn<int>(
                name: "Weight",
                table: "LiftSets",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "Reps",
                table: "LiftSets",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "Number",
                table: "LiftSets",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<DateTime>(
                name: "Date",
                table: "LiftSets",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddForeignKey(
                name: "FK_LiftSets_Lifts_LiftId",
                table: "LiftSets",
                column: "LiftId",
                principalTable: "Lifts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LiftSets_Lifts_LiftId",
                table: "LiftSets");

            migrationBuilder.DropColumn(
                name: "Date",
                table: "LiftSets");

            migrationBuilder.RenameColumn(
                name: "LiftId",
                table: "LiftSets",
                newName: "LiftRecordId");

            migrationBuilder.RenameIndex(
                name: "IX_LiftSets_LiftId",
                table: "LiftSets",
                newName: "IX_LiftSets_LiftRecordId");

            migrationBuilder.AlterColumn<int>(
                name: "Weight",
                table: "LiftSets",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "Reps",
                table: "LiftSets",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "Number",
                table: "LiftSets",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "LiftRecords",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LiftId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LiftRecords", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LiftRecords_Lifts_LiftId",
                        column: x => x.LiftId,
                        principalTable: "Lifts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_LiftRecords_LiftId",
                table: "LiftRecords",
                column: "LiftId");

            migrationBuilder.AddForeignKey(
                name: "FK_LiftSets_LiftRecords_LiftRecordId",
                table: "LiftSets",
                column: "LiftRecordId",
                principalTable: "LiftRecords",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
