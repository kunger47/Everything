using System;
using System.Collections.Generic;

namespace everything.Controllers
{
    public class GetLiftingWorkoutMessage
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Notes { get; set; }
        public DateTime Date { get; set; }
    }

    public class GetLiftingWorkoutwithSetsMessage : GetLiftingWorkoutMessage
    {
        public IList<GetSimpleLiftSetLinkForMessage> LiftSetLinks { get; set; }
    }

    public class GetSimpleLiftSetLinkForMessage
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }


    public class CreateLiftingWorkoutMessage
    {
        public string Name { get; set; }
        public DateTime? Date { get; set; }
        public string Notes { get; set; }
    }

    public class UpdateLiftingWorkoutMessage
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime Date { get; set; }
        public string Notes { get; set; }
    }
}
