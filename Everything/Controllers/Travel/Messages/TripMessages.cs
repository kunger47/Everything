using System.Collections.Generic;

namespace everything.Controllers
{
    public class GetTripMessage
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int? FolderId { get; set; }
        public IEnumerable<GetTravelTagMessage> Tags { get; set; }
    }

    public class CreateTripMessage
    {
        public string Name { get; set; }
        public string Description { get; set; }
        // TODO: Replace the UserId in Create messages with context Current User
        public int UserId { get; set; }
        public int? FolderId { get; set; }
    }

    public class UpdateTripMessage
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int? FolderId { get; set; }
    }
}
