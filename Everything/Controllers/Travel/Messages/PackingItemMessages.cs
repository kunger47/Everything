using System.Collections.Generic;

namespace everything.Controllers
{
    public class BasePackingItemMessage
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int Sequence { get; set; }
    }

    public class GetPackingItemMessage : BasePackingItemMessage
    {
        public int Id { get; set; }
        public bool IsActive { get; set; }
        public IEnumerable<GetTravelTagMessage> Tags { get; set; }
    }

    public class CreatePackingItemMessage : BasePackingItemMessage
    {
    }

    public class UpdatePackingItemMessage : BasePackingItemMessage
    {
        public int Id { get; set; }
    }
}
