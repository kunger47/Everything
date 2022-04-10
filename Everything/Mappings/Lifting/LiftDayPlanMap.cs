using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using everything.Models;

namespace everything.Mappings
{
    public class LiftDayPlanMap : IEntityTypeConfiguration<LiftDayPlan>
    {
        public void Configure(EntityTypeBuilder<LiftDayPlan> builder)
        {
            // Primary key
            builder.HasKey(m => m.Id);

            // Table & column mappings
            builder.ToTable("LiftDayPlans");
            builder.Property(m => m.Id).HasColumnName("Id");
        }
    }
}