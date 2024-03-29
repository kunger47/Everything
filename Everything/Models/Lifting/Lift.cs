using System;
using System.Collections.Generic;

namespace everything.Models
{
    public class Lift : IForUser
    {
        public Lift()
        {
            MuscleGroupLinks = new List<MuscleGroupForLift>();
            LiftSetLinks = new List<LiftSetLink>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string VideoLink { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedDate { get; set; }

        public int UserId { get; set; }
        public virtual User User { get; set; }

        public int LiftTypeId { get; set; }
        public virtual LiftType LiftType { get; set; }

        public virtual IEnumerable<MuscleGroupForLift> MuscleGroupLinks { get; set; }
        public virtual IEnumerable<LiftSetLink> LiftSetLinks { get; set; }
    }
}
