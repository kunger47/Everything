using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using everything.Models;

namespace everything.Mappings
{
    public class TripFolderMap : IEntityTypeConfiguration<TripFolder>
    {
        public void Configure(EntityTypeBuilder<TripFolder> builder)
        {
            builder.HasKey(m => m.Id);

            // Table & column mappings
            builder.ToTable("TripFolders");
            builder.Property(m => m.Id).HasColumnName("Id");
            builder.Property(m => m.Name).HasColumnName("Name").IsRequired();
            builder.Property(m => m.UserId).HasDefaultValue(0);

            builder.HasOne(i => i.User)
                .WithMany(i => i.TripFolders)
                .IsRequired();

            builder.HasOne(i => i.Folder)
                .WithMany(i => i.Folders);
        }
    }
}