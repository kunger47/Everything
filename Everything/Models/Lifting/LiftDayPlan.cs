using System;
using System.Collections.Generic;

namespace everything.Models
{
    public class LiftDayPlan : IForUser
    {
        public LiftDayPlan()
        {
            MuscleGroupForLiftsLinks = new List<MuscleGroupForLiftDayPlan>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime CreatedDate { get; set; }

        public int UserId { get; set; }
        public virtual User User { get; set; }

        public virtual IEnumerable<MuscleGroupForLiftDayPlan> MuscleGroupForLiftsLinks { get; set; }
    }
}
