using System;

namespace everything.Controllers
{
    public class GetLiftDayPlanMessage
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime CreatedDate { get; set; }
        public int UserId { get; set; }
    }

    public class CreateLiftDayPlanMessage
    {
        public string Name { get; set; }
        public DateTime CreatedDate { get; set; }
        public int UserId { get; set; }
    }
}
