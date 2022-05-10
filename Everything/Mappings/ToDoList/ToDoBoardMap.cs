using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using everything.Models;

namespace everything.Mappings
{
    public class ToDoBoardMap : IEntityTypeConfiguration<ToDoBoard>
    {
        public void Configure(EntityTypeBuilder<ToDoBoard> builder)
        {
            builder.HasKey(m => m.Id);

            // Table & column mappings
            builder.ToTable("ToDoBoards");
            builder.Property(m => m.Id).HasColumnName("Id");
            builder.Property(m => m.Name).HasColumnName("Name").IsRequired();
            builder.Property(m => m.UserId).HasDefaultValue(0);

            builder.HasOne(i => i.User)
                .WithMany(i => i.ToDoBoards)
                .IsRequired();
        }
    }
}