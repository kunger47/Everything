using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using everything.Models;

namespace everything.Mappings
{
    public class PackingItemMap : IEntityTypeConfiguration<PackingItem>
    {
        public void Configure(EntityTypeBuilder<PackingItem> builder)
        {
            builder.HasKey(m => m.Id);

            // Table & column mappings
            builder.ToTable("PackingItems");
            builder.Property(m => m.Id).HasColumnName("Id");
            builder.Property(m => m.Name).HasColumnName("Name").IsRequired();
            builder.Property(m => m.UserId).HasDefaultValue(0);

            builder.HasOne(i => i.User)
                .WithMany(i => i.PackingItems)
                .IsRequired();
        }
    }
}