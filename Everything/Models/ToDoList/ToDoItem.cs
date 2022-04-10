using System;
using System.Collections.Generic;

namespace everything.Models
{
    public class ToDoItem
    {
        public ToDoItem()
        {
            Tasks = new List<ToDoItemTask>();
        }

        public int Id { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime DueDate { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Sequence { get; set; }

        public int ToDoColumnId { get; set; }
        public virtual ToDoColumn ToDoColumn { get; set; }

        public virtual IEnumerable<ToDoItemTask> Tasks { get; set; }

        // TODO: Create topics (can dictate what color the cards is?... does this make tags pointlesss?)
        // TODO: create tags
        // TODO: attachments
    }
}
