using System;
using System.Collections.Generic;

namespace everything.Models
{
    public class LiftingWorkout
    {
        public LiftingWorkout()
        {
            LiftSetLinks = new List<LiftSetLink>();
        }

        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string Name { get; set; }
        public string Notes { get; set; }

        public IList<LiftSetLink> LiftSetLinks { get; set; }
    }
}
