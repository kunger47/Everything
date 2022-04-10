using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using everything.Models;

namespace everything.Mappings
{
    public class GameQuestionMap : IEntityTypeConfiguration<GameQuestion>
    {
        public void Configure(EntityTypeBuilder<GameQuestion> builder)
        {
            // Primary key
            builder.HasKey(m => m.Id);

            // Table & column mappings
            builder.ToTable("GameQuestions");
            builder.Property(m => m.Id).HasColumnName("Id");

            builder.HasOne(i => i.Game)
                .WithMany(i => i.GameQuestions)
                .IsRequired();

            builder.HasOne(i => i.Question)
                .WithMany(i => i.GameQuestions)
                .IsRequired();
        }
    }
}