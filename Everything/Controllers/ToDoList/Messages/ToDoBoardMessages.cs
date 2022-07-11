using System;

namespace everything.Controllers
{
    public class GetToDoBoardMessage
    {
        public int Id { get; set; }
        public DateTime CreatedDate { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Sequence { get; set; }
    }

    public class CreateToDoBoardMessage
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int Sequence { get; set; }
        // TODO: Replace the UserId in Create messages with context Current User
        public int UserId { get; set; }
    }

    public class UpdateToDoBoardMessage
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Sequence { get; set; }
    }
}
