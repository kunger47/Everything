using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using everything.Models;

namespace everything.Mappings
{
    public class BudgetMap : IEntityTypeConfiguration<Budget>
    {
        public void Configure(EntityTypeBuilder<Budget> builder)
        {
            // Primary key
            builder.HasKey(m => m.Id);

            // Table & column mappings
            builder.ToTable("Budgets");
            builder.Property(m => m.Id).HasColumnName("Id");
            builder.Property(m => m.Name).HasColumnName("Name").IsRequired();
            builder.Property(m => m.IsActive).HasColumnName("IsActive").IsRequired().HasDefaultValue(1);
            builder.Property(m => m.CreatedDate).HasColumnName("CreatedDate").IsRequired();
        }
    }
}