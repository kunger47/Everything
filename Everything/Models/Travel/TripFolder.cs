using System.Collections.Generic;

namespace everything.Models
{
    public class TripFolder
    {
        public TripFolder()
        {
            Trips = new List<Trip>();
            Folders = new List<TripFolder>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public bool IsActive { get; set; }

        public int UserId { get; set; }
        public virtual User User { get; set; }

        public int? FolderId { get; set; }
        public virtual TripFolder Folder { get; set; }

        public virtual ICollection<Trip> Trips { get; set; }
        public virtual ICollection<TripFolder> Folders { get; set; }
    }
}
