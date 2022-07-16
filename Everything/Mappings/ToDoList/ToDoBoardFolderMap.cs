using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using everything.Models;

namespace everything.Mappings
{
    public class ToDoBoardFolderMap : IEntityTypeConfiguration<ToDoBoardFolder>
    {
        public void Configure(EntityTypeBuilder<ToDoBoardFolder> builder)
        {
            builder.HasKey(m => m.Id);

            // Table & column mappings
            builder.ToTable("ToDoBoardFolders");
            builder.Property(m => m.Id).HasColumnName("Id");
            builder.Property(m => m.Name).HasColumnName("Name").IsRequired();
            builder.Property(m => m.UserId).HasDefaultValue(0);

            builder.HasOne(i => i.User)
                .WithMany(i => i.ToDoBoardFolders)
                .IsRequired();

            builder.HasOne(i => i.BoardFolder)
                .WithMany(i => i.BoardFolders);
        }
    }
}