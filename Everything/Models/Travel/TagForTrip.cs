namespace everything.Models
{
    public class TagForTrip
    {
        public int Id { get; set; }

        public int TripId { get; set; }
        public virtual Trip Trip { get; set; }

        public int TravelTagId { get; set; }
        public virtual TravelTag TravelTag { get; set; }
    }
}
