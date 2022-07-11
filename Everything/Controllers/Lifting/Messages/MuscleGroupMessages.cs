using System;

namespace everything.Controllers
{
    public class GetMuscleGroupMessage
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime CreatedDate { get; set; }
    }

    public class CreateMuscleGroupMessage
    {
        public string Name { get; set; }
    }

    public class UpdatetMuscleGroupMessage
    {
        public string Name { get; set; }
    }
}
