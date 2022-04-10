using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using everything.Models;

namespace everything.Mappings
{
    public class MuscleGroupForLiftDayPlanMap : IEntityTypeConfiguration<MuscleGroupForLiftDayPlan>
    {
        public void Configure(EntityTypeBuilder<MuscleGroupForLiftDayPlan> builder)
        {
            // Primary key
            builder.HasKey(m => m.Id);

            // Table & column mappings
            builder.ToTable("MuscleGroupForLiftDayPlan");
            builder.Property(m => m.Id).HasColumnName("Id");

            builder.HasOne(i => i.LiftDayPlan)
                .WithMany(i => i.MuscleGroupForLiftsLinks)
                .IsRequired();

            builder.HasOne(i => i.MuscleGroup)
                .WithMany(i => i.MuscleGroupForPlanLinks)
                .IsRequired();
        }
    }
}