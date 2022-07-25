using System.Collections.Generic;

namespace everything.Models
{
    public class PackingItem
    {
        public PackingItem()
        {
            TagLinks = new List<TagForPackingItem>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool IsActive { get; set; }

        //public PackingItemStatus Status { get; set; }

        public int UserId { get; set; }
        public virtual User User { get; set; }

        public virtual ICollection<TagForPackingItem> TagLinks { get; set; }
    }
}
