using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using everything.Models;

namespace everything.Mappings
{
    public class QuestionAnswerMap : IEntityTypeConfiguration<QuestionAnswer>
    {
        public void Configure(EntityTypeBuilder<QuestionAnswer> builder)
        {
            // Primary key
            builder.HasKey(m => m.Id);

            // Table & column mappings
            builder.ToTable("QuestionAnswers");
            builder.Property(m => m.Id).HasColumnName("Id");

            builder.HasOne(i => i.Player)
                .WithMany(i => i.QuestionAnswers)
                .IsRequired();

            builder.HasOne(i => i.GameQuestion)
                .WithMany(i => i.QuestionAnswers)
                .IsRequired();
        }
    }
}