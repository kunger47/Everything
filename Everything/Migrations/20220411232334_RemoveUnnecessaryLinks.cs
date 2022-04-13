using Microsoft.EntityFrameworkCore.Migrations;

namespace everything.Migrations
{
    public partial class RemoveUnnecessaryLinks : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LiftSetLink_Lifts_LiftId",
                table: "LiftSetLink");

            migrationBuilder.DropForeignKey(
                name: "FK_LiftSets_Lifts_LiftId",
                table: "LiftSets");

            migrationBuilder.DropForeignKey(
                name: "FK_LiftSets_LiftSetLink_LiftSetLinkId",
                table: "LiftSets");

            migrationBuilder.DropIndex(
                name: "IX_LiftSets_LiftId",
                table: "LiftSets");

            migrationBuilder.DropPrimaryKey(
                name: "PK_LiftSetLink",
                table: "LiftSetLink");

            migrationBuilder.DropColumn(
                name: "LiftId",
                table: "LiftSets");

            migrationBuilder.RenameTable(
                name: "LiftSetLink",
                newName: "LiftSetLinks");

            migrationBuilder.RenameIndex(
                name: "IX_LiftSetLink_LiftId",
                table: "LiftSetLinks",
                newName: "IX_LiftSetLinks_LiftId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_LiftSetLinks",
                table: "LiftSetLinks",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_LiftSetLinks_Lifts_LiftId",
                table: "LiftSetLinks",
                column: "LiftId",
                principalTable: "Lifts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_LiftSets_LiftSetLinks_LiftSetLinkId",
                table: "LiftSets",
                column: "LiftSetLinkId",
                principalTable: "LiftSetLinks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LiftSetLinks_Lifts_LiftId",
                table: "LiftSetLinks");

            migrationBuilder.DropForeignKey(
                name: "FK_LiftSets_LiftSetLinks_LiftSetLinkId",
                table: "LiftSets");

            migrationBuilder.DropPrimaryKey(
                name: "PK_LiftSetLinks",
                table: "LiftSetLinks");

            migrationBuilder.RenameTable(
                name: "LiftSetLinks",
                newName: "LiftSetLink");

            migrationBuilder.RenameIndex(
                name: "IX_LiftSetLinks_LiftId",
                table: "LiftSetLink",
                newName: "IX_LiftSetLink_LiftId");

            migrationBuilder.AddColumn<int>(
                name: "LiftId",
                table: "LiftSets",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_LiftSetLink",
                table: "LiftSetLink",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_LiftSets_LiftId",
                table: "LiftSets",
                column: "LiftId");

            migrationBuilder.AddForeignKey(
                name: "FK_LiftSetLink_Lifts_LiftId",
                table: "LiftSetLink",
                column: "LiftId",
                principalTable: "Lifts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_LiftSets_Lifts_LiftId",
                table: "LiftSets",
                column: "LiftId",
                principalTable: "Lifts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_LiftSets_LiftSetLink_LiftSetLinkId",
                table: "LiftSets",
                column: "LiftSetLinkId",
                principalTable: "LiftSetLink",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
