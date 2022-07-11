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
        public int LiftTypeId { get; set; }
        public string LiftTypeName { get; set; }
    }

    public class CreateLiftMessage
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string VideoLink { get; set; }
        public bool IsActive { get; set; }
        public int LiftTypeId { get; set; }
        public int UserId { get; set; }
    }

    public class UpdateLiftMessage
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string VideoLink { get; set; }
        public int LiftTypeId { get; set; }
        public bool IsActive { get; set; }
    }
}
