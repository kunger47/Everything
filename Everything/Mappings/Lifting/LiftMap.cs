using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using everything.Models;

namespace everything.Mappings
{
    public class LiftMap : IEntityTypeConfiguration<Lift>
    {
        public void Configure(EntityTypeBuilder<Lift> builder)
        {
            // Primary key
            builder.HasKey(m => m.Id);

            // Table & column mappings
            builder.ToTable("Lifts");
            builder.Property(m => m.Id).HasColumnName("Id");
            builder.Property(m => m.Name).HasColumnName("Name").IsRequired();
            builder.Property(m => m.IsActive).HasColumnName("IsActive").IsRequired().HasDefaultValue(1);

            builder.HasOne(i => i.LiftType)
                .WithMany(i => i.Lifts)
                .IsRequired();
        }
    }
}