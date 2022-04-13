using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace everything.Migrations
{
    public partial class AddLiftLink : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "LiftSetLinkId",
                table: "LiftSets",
                type: "int",
                nullable: true,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "LiftSetLinks",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Notes = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LiftId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LiftSetLink", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LiftSetLink_Lifts_LiftId",
                        column: x => x.LiftId,
                        principalTable: "Lifts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_LiftSets_LiftSetLinkId",
                table: "LiftSets",
                column: "LiftSetLinkId");

            migrationBuilder.CreateIndex(
                name: "IX_LiftSetLink_LiftId",
                table: "LiftSetLink",
                column: "LiftId");

            migrationBuilder.AddForeignKey(
                name: "FK_LiftSets_LiftSetLink_LiftSetLinkId",
                table: "LiftSets",
                column: "LiftSetLinkId",
                principalTable: "LiftSetLink",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LiftSets_LiftSetLink_LiftSetLinkId",
                table: "LiftSets");

            migrationBuilder.DropTable(
                name: "LiftSetLink");

            migrationBuilder.DropIndex(
                name: "IX_LiftSets_LiftSetLinkId",
                table: "LiftSets");

            migrationBuilder.DropColumn(
                name: "LiftSetLinkId",
                table: "LiftSets");
        }
    }
}
