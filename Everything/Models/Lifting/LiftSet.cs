using System;

namespace everything.Models
{
    public class LiftSet
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public int? Number { get; set; }
        public int? Reps { get; set; }
        public int? Weight { get; set; }

        public int LiftId { get; set; }
        public virtual Lift Lift { get; set; }
    }
}
