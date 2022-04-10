using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using everything.Models;

namespace everything.Mappings
{
    public class ExpenseBudgetMap : IEntityTypeConfiguration<ExpenseBudget>
    {
        public void Configure(EntityTypeBuilder<ExpenseBudget> builder)
        {
            // Primary key
            builder.HasKey(m => m.Id);

            // Table & column mappings
            builder.ToTable("ExpenseBudgets");
            builder.Property(m => m.Id).HasColumnName("Id");
            builder.Property(m => m.Name).HasColumnName("Name").IsRequired();

            builder.HasOne(i => i.Budget)
                .WithMany(i => i.ExpenseBudgets)
                .IsRequired();

            builder.HasOne(i => i.DeductionAccount)
                .WithMany(i => i.ExpenseBudgetDeductions);
        }
    }
}