using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Update_Sentence_OnDelete : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Sentence_Translate_RootId",
                table: "Sentence");

            migrationBuilder.AddForeignKey(
                name: "FK_Sentence_Translate_RootId",
                table: "Sentence",
                column: "RootId",
                principalTable: "Translate",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Sentence_Translate_RootId",
                table: "Sentence");

            migrationBuilder.AddForeignKey(
                name: "FK_Sentence_Translate_RootId",
                table: "Sentence",
                column: "RootId",
                principalTable: "Translate",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
