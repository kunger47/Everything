using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using everything.Models;

namespace everything.Mappings
{
    public class TagForTripMap : IEntityTypeConfiguration<TagForTrip>
    {
        public void Configure(EntityTypeBuilder<TagForTrip> builder)
        {
            builder.HasKey(m => m.Id);

            // Table & column mappings
            builder.ToTable("TagForTrips");
            builder.Property(m => m.Id).HasColumnName("Id");

            builder.HasOne(i => i.Trip)
                .WithMany(i => i.TagLinks)
                .IsRequired();

            builder.HasOne(i => i.TravelTag)
                .WithMany(i => i.TripLinks)
                .IsRequired();
        }
    }
}