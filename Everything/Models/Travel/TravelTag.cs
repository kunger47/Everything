using System.Collections.Generic;

namespace everything.Models
{
    public class TravelTag
    {
        public TravelTag()
        {
            PackingItemLinks = new List<TagForPackingItem>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool IsActive { get; set; }
        public string ColorHexCode { get; set; }

        public int UserId { get; set; }
        public virtual User User { get; set; }

        public virtual IEnumerable<TagForPackingItem> PackingItemLinks { get; set; }
    }
}
