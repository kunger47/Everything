using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using everything.Models;

namespace everything.Mappings
{
    public class IncomeSourceMap : IEntityTypeConfiguration<IncomeSource>
    {
        public void Configure(EntityTypeBuilder<IncomeSource> builder)
        {
            // Primary key
            builder.HasKey(m => m.Id);

            // Table & column mappings
            builder.ToTable("IncomeSources");
            builder.Property(m => m.Id).HasColumnName("Id");
            builder.Property(m => m.Name).HasColumnName("Name").IsRequired();

            builder.HasOne(i => i.Budget)
                .WithMany(i => i.IncomeSources)
                .IsRequired();


            builder.HasOne(i => i.DepositAccount)
                .WithMany(i => i.IncomeDeposits);
        }
    }
}