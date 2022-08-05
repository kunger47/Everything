namespace everything.Models
{
    public class TagForPackingItem
    {
        public int Id { get; set; }

        public int PackingItemId { get; set; }
        public virtual PackingItem PackingItem { get; set; }

        public int TravelTagId { get; set; }
        public virtual TravelTag TravelTag { get; set; }
    }
}
