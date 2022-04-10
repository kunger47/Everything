using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using everything.Models;

namespace everything.Mappings
{
    public class IncomeSourceDeductionMap : IEntityTypeConfiguration<IncomeSourceDeduction>
    {
        public void Configure(EntityTypeBuilder<IncomeSourceDeduction> builder)
        {
            // Primary key
            builder.HasKey(m => m.Id);

            // Table & column mappings
            builder.ToTable("IncomeSourceDeductions");
            builder.Property(m => m.Id).HasColumnName("Id");
            builder.Property(m => m.Name).HasColumnName("Name").IsRequired();

            builder.HasOne(i => i.IncomeSource)
                .WithMany(i => i.Deductions)
                .IsRequired();

            builder.HasOne(i => i.DepositAccount)
                .WithMany(i => i.IncomeDeductionDeposits);
        }
    }
}