namespace everything.Models
{
    public class TripPackingItem : ISequenced
    {
        public TripPackingItem()
        {
        }

        public int Id { get; set; }
        public int Sequence { get; set; }
        public bool IsPacked { get; set; }

        public int TripId { get; set; }
        public virtual Trip Trip { get; set; }

        public int PackingItemId { get; set; }
        public virtual PackingItem PackingItem { get; set; }
    }
}
