using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using everything.Models;

namespace everything.Mappings
{
    public class LiftSetLinkMap : IEntityTypeConfiguration<LiftSetLink>
    {
        public void Configure(EntityTypeBuilder<LiftSetLink> builder)
        {
            // Primary key
            builder.HasKey(m => m.Id);

            // Table & column mappings
            builder.ToTable("LiftSetLinks");
            builder.Property(m => m.Id).HasColumnName("Id");
            builder.Property(m => m.Date).HasColumnName("Date").IsRequired();

            builder.HasOne(i => i.Lift)
                .WithMany(i => i.LiftSetLinks)
                .IsRequired();
        }
    }
}