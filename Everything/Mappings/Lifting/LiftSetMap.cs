using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using everything.Models;

namespace everything.Mappings
{
    public class LiftSetMap : IEntityTypeConfiguration<LiftSet>
    {
        public void Configure(EntityTypeBuilder<LiftSet> builder)
        {
            // Primary key
            builder.HasKey(m => m.Id);

            // Table & column mappings
            builder.ToTable("LiftRecords");
            builder.Property(m => m.Id).HasColumnName("Id");
            builder.Property(m => m.Date).HasColumnName("Date").IsRequired();

            builder.HasOne(i => i.Lift)
                .WithMany(i => i.LiftSets)
                .IsRequired();
        }
    }
}