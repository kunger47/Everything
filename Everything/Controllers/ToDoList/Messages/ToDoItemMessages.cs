using System;

namespace everything.Controllers
{
    public class BaseToDoItemMessage
    {
        public DateTime DueDate { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Sequence { get; set; }
        public int ToDoColumnId { get; set; }
    }

    public class GetToDoItemMessage : BaseToDoItemMessage
    {
        public int Id { get; set; }
        public DateTime CreatedDate { get; set; }
    }

    public class CreateToDoItemMessage : BaseToDoItemMessage
    {
    }

    public class UpdateToDoItemMessage : BaseToDoItemMessage
    {
        public int Id { get; set; }
    }
}
