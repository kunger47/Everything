using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using everything.Models;

namespace everything.Mappings
{
    public class ToDoItemMap : IEntityTypeConfiguration<ToDoItem>
    {
        public void Configure(EntityTypeBuilder<ToDoItem> builder)
        {
            builder.HasKey(m => m.Id);

            // Table & column mappings
            builder.ToTable("ToDoItems");
            builder.Property(m => m.Id).HasColumnName("Id");
            builder.Property(m => m.Name).HasColumnName("Name").IsRequired();

            builder.HasOne(i => i.ToDoColumn)
                .WithMany(i => i.ToDoItems)
                .IsRequired();
        }
    }
}