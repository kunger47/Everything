using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using everything.Models;

namespace everything.Mappings
{
    public class TravelTagMap : IEntityTypeConfiguration<TravelTag>
    {
        public void Configure(EntityTypeBuilder<TravelTag> builder)
        {
            builder.HasKey(m => m.Id);

            // Table & column mappings
            builder.ToTable("TravelTags");
            builder.Property(m => m.Id).HasColumnName("Id");
            builder.Property(m => m.Name).HasColumnName("Name").IsRequired();
            builder.Property(m => m.UserId).HasDefaultValue(0);

            builder.HasOne(i => i.User)
                .WithMany(i => i.TravelTags)
                .IsRequired();
        }
    }
}