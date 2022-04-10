using System.Collections.Generic;

namespace everything.Models
{
    public class LiftType
    {
        public LiftType()
        {
            Lifts = new List<Lift>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public virtual IEnumerable<Lift> Lifts { get; set; }
    }
}
