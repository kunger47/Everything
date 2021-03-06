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

            builder.HasOne(i => i.LiftSetLink)
                .WithMany(i => i.LiftSets)
                .IsRequired();
        }
    }
}