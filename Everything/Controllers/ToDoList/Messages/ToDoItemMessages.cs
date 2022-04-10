using System;

namespace everything.Controllers
{
    public class GetToDoItemMessage
    {
        public int Id { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime DueDate { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Sequence { get; set; }
        public int ToDoColumnId { get; set; }
    }

    public class CreateToDoItemMessage
    {
        public DateTime DueDate { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Sequence { get; set; }
        public int ToDoColumnId { get; set; }
    }

    public class UpdateToDoItemMessage
    {
        public int Id { get; set; }
        public DateTime DueDate { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Sequence { get; set; }
        public int ToDoColumnId { get; set; }
    }
}
