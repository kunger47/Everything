using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using everything.Models;

namespace everything.Mappings
{
    public class QuestionMap : IEntityTypeConfiguration<Question>
    {
        public void Configure(EntityTypeBuilder<Question> builder)
        {
            // Primary key
            builder.HasKey(m => m.Id);

            // Table & column mappings
            builder.ToTable("Questions");
            builder.Property(m => m.Id).HasColumnName("Id");
            builder.Property(m => m.Statement).HasColumnName("Statement").IsRequired();

            builder.HasOne(i => i.QuestionCategory)
                .WithMany(i => i.Questions)
                .IsRequired();
        }
    }
}