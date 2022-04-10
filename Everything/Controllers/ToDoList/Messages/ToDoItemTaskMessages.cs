namespace everything.Controllers
{
    public class GetToDoItemTaskMessage
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Sequence { get; set; }
        public bool Completed { get; set; }
        public int ToDoItemId { get; set; }
    }

    public class CreateToDoItemTaskMessage
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int Sequence { get; set; }
        public int ToDoItemId { get; set; }
    }

    public class UpdateToDoItemTaskMessage
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Sequence { get; set; }
        public bool Completed { get; set; }
        public int ToDoItemId { get; set; }
    }
}
