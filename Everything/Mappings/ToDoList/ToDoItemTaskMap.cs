using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using everything.Models;

namespace everything.Mappings
{
    public class ToDoItemTaskMap : IEntityTypeConfiguration<ToDoItemTask>
    {
        public void Configure(EntityTypeBuilder<ToDoItemTask> builder)
        {
            builder.HasKey(m => m.Id);

            // Table & column mappings
            builder.ToTable("ToDoItemTasks");
            builder.Property(m => m.Id).HasColumnName("Id");
            builder.Property(m => m.Name).HasColumnName("Name").IsRequired();

            builder.HasOne(i => i.ToDoItem)
                .WithMany(i => i.Tasks)
                .IsRequired();
        }
    }
}