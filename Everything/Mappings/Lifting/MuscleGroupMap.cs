using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using everything.Models;

namespace everything.Mappings
{
    public class MuscleGroupMap : IEntityTypeConfiguration<MuscleGroup>
    {
        public void Configure(EntityTypeBuilder<MuscleGroup> builder)
        {
            // Primary key
            builder.HasKey(m => m.Id);

            // Table & column mappings
            builder.ToTable("MuscleGroups");
            builder.Property(m => m.Id).HasColumnName("Id");
            builder.Property(m => m.Name).HasColumnName("Name").IsRequired();

            builder.HasOne(i => i.User)
                .WithMany(i => i.MuscleGroups)
                .IsRequired();
        }
    }
}