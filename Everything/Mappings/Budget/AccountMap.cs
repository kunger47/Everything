using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using everything.Models;

namespace everything.Mappings
{
    public class AccountMap : IEntityTypeConfiguration<Account>
    {
        public void Configure(EntityTypeBuilder<Account> builder)
        {
            // Primary key
            builder.HasKey(m => m.Id);

            // Table & column mappings
            builder.ToTable("Accounts");
            builder.Property(m => m.Id).HasColumnName("Id");
            builder.Property(m => m.Name).HasColumnName("Name").IsRequired();

            builder.HasOne(i => i.Budget)
                .WithMany(i => i.Accounts)
                .IsRequired();
        }
    }
}