using System;

namespace everything.Controllers
{
    public class GetLiftSetMessage
    {
        public int Id { get; set; }
        public int? Number { get; set; }
        public int? Reps { get; set; }
        public int? Weight { get; set; }
    }
}
