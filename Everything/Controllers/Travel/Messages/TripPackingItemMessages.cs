using System.Collections.Generic;

namespace everything.Controllers
{
    public class SequencedTripPackingItemMessage
    {
        public int Sequence { get; set; }
    }

    public class GetTripPackingItemMessage : SequencedTripPackingItemMessage
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int PackingItemId { get; set; }
        public int TripId { get; set; }
        public IEnumerable<GetTravelTagMessage> Tags { get; set; }
    }

    public class CreateTripPackingItemMessage : SequencedTripPackingItemMessage
    {
        public int PackingItemId { get; set; }
        public int TripId { get; set; }
    }

    public class UpdateTripPackingItemMessage : SequencedTripPackingItemMessage
    {
        public int Id { get; set; }
    }
}
