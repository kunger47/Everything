using System;
using System.Collections.Generic;

namespace everything.Models
{
    public class MuscleGroup : IForUser
    {
        public MuscleGroup()
        {
            MuscleGroupForLiftsLinks = new List<MuscleGroupForLift>();
            MuscleGroupForPlanLinks = new List<MuscleGroupForLiftDayPlan>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime CreatedDate { get; set; }

        public int UserId { get; set; }
        public virtual User User { get; set; }

        public virtual IEnumerable<MuscleGroupForLift> MuscleGroupForLiftsLinks { get; set; }
        public virtual IEnumerable<MuscleGroupForLiftDayPlan> MuscleGroupForPlanLinks { get; set; }
    }
}
