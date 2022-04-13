using System;
using System.Collections.Generic;

namespace everything.Models
{
    public class LiftingWorkout
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string Name { get; set; }
        public string Notes { get; set; }

        public IEnumerable<LiftSetLink> LiftSetLinks { get; set; }
    }
}
