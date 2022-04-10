using System;
using System.Collections.Generic;

namespace everything.Controllers
{
    public class GetToDoColumnMessage
    {
        public int Id { get; set; }
        public int ToDoBoardId { get; set; }
        public DateTime CreatedDate { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Sequence { get; set; }

        public virtual IEnumerable<GetToDoItemMessage> ToDoItems { get; set; }
    }

    public class CreateToDoColumnMessage
    {
        public int ToDoBoardId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Sequence { get; set; }
    }

    public class UpdateToDoColumnMessage
    {
        public int Id { get; set; }
        public int ToDoBoardId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Sequence { get; set; }
    }
}
