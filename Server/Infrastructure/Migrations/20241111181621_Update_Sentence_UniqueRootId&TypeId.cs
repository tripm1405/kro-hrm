using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Update_Sentence_UniqueRootIdTypeId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Sentence_RootId",
                table: "Sentence");

            migrationBuilder.CreateIndex(
                name: "IX_Sentence_RootId_TypeId",
                table: "Sentence",
                columns: new[] { "RootId", "TypeId" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Sentence_RootId_TypeId",
                table: "Sentence");

            migrationBuilder.CreateIndex(
                name: "IX_Sentence_RootId",
                table: "Sentence",
                column: "RootId");
        }
    }
}
