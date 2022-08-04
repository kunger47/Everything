using System.Collections.Generic;

namespace everything.Models
{
    public class Trip
    {
        public Trip()
        {
            TagLinks = new List<TagForTrip>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool IsActive { get; set; }

        public int UserId { get; set; }
        public virtual User User { get; set; }

        public int? FolderId { get; set; }
        public virtual TripFolder Folder { get; set; }

        public virtual ICollection<TagForTrip> TagLinks { get; set; }
    }
}
