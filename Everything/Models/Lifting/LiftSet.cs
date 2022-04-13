using System;

namespace everything.Models
{
    public class LiftSet
    {
        public int Id { get; set; }
        public int? Number { get; set; }
        public int? Reps { get; set; }
        public int? Weight { get; set; }

        public int LiftSetLinkId { get; set; }
        public virtual LiftSetLink LiftSetLink { get; set; }
    }
}
