namespace everything.Models
{
    public class ToDoItemTask
    {
        public int Id { get; set; }
        public int Sequence { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool Completed { get; set; }

        public int ToDoItemId { get; set; }
        public virtual ToDoItem ToDoItem { get; set; }
    }
}
