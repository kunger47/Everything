using System;
using System.Collections.Generic;

namespace everything.Models
{
    public class LiftingWorkout : IForUser
    {
        public LiftingWorkout()
        {
            LiftSetLinks = new List<LiftSetLink>();
        }

        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string Name { get; set; }
        public string Notes { get; set; }

        public int UserId { get; set; }
        public virtual User User { get; set; }

        public virtual IList<LiftSetLink> LiftSetLinks { get; set; }
    }
}
