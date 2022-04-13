using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using everything.Models;

namespace everything.Mappings
{
    public class LiftingWorkoutMap : IEntityTypeConfiguration<LiftingWorkout>
    {
        public void Configure(EntityTypeBuilder<LiftingWorkout> builder)
        {
            // Primary key
            builder.HasKey(m => m.Id);

            // Table & column mappings
            builder.ToTable("LiftingWorkouts");
            builder.Property(m => m.Id).HasColumnName("Id");
            builder.Property(m => m.Date).HasColumnName("Date").IsRequired();
        }
    }
}