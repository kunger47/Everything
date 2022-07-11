using System.Collections.Generic;

namespace everything.Models
{
    public class LiftType : IForUser
    {
        public LiftType()
        {
            Lifts = new List<Lift>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public int UserId { get; set; }
        public virtual User User { get; set; }

        public virtual IEnumerable<Lift> Lifts { get; set; }
    }
}
