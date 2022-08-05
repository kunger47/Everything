using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using everything.Models;

namespace everything.Mappings
{
    public class TripPackingItemMap : IEntityTypeConfiguration<TripPackingItem>
    {
        public void Configure(EntityTypeBuilder<TripPackingItem> builder)
        {
            builder.HasKey(m => m.Id);

            // Table & column mappings
            builder.ToTable("PackingItems");
            builder.Property(m => m.Id).HasColumnName("Id");

            builder.HasOne(i => i.Trip)
                .WithMany(i => i.TripPackingItems)
                .IsRequired();

            builder.HasOne(i => i.PackingItem)
                .WithMany(i => i.TripPackingItems)
                .IsRequired();
        }
    }
}