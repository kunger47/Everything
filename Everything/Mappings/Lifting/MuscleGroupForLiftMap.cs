using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using everything.Models;

namespace everything.Mappings
{
    public class MuscleGroupForLiftMap : IEntityTypeConfiguration<MuscleGroupForLift>
    {
        public void Configure(EntityTypeBuilder<MuscleGroupForLift> builder)
        {
            // Primary key
            builder.HasKey(m => m.Id);

            // Table & column mappings
            builder.ToTable("MuscleGroupForLifts");
            builder.Property(m => m.Id).HasColumnName("Id");

            builder.HasOne(i => i.Lift)
                .WithMany(i => i.MuscleGroupLinks)
                .IsRequired();

            builder.HasOne(i => i.MuscleGroup)
                .WithMany(i => i.MuscleGroupForLiftsLinks)
                .IsRequired();
        }
    }
}