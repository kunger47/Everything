using System;

namespace everything.Controllers
{
    public class GetLiftMessage
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string VideoLink { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedDate { get; set; }
        public string LiftTypeName { get; set; }
    }
}
