using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using everything.Models;

namespace everything.Mappings
{
    public class ToDoColumnMap : IEntityTypeConfiguration<ToDoColumn>
    {
        public void Configure(EntityTypeBuilder<ToDoColumn> builder)
        {
            builder.HasKey(m => m.Id);

            // Table & column mappings
            builder.ToTable("ToDoColumns");
            builder.Property(m => m.Id).HasColumnName("Id");
            builder.Property(m => m.Name).HasColumnName("Name").IsRequired();

            builder.HasOne(i => i.ToDoBoard)
                .WithMany(i => i.ToDoColumns)
                .IsRequired();
        }
    }
}