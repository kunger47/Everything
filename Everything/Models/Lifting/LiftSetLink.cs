using System.Collections.Generic;

namespace everything.Models
{
    public class LiftSetLink
    {
        public int Id { get; set; }
        public string Notes { get; set; }

        public int LiftId { get; set; }
        public virtual Lift Lift { get; set; }

        public int? LiftingWorkoutId { get; set; }
        public virtual LiftingWorkout LiftingWorkout { get; set; }

        public IEnumerable<LiftSet> LiftSets { get; set; }
    }
}
