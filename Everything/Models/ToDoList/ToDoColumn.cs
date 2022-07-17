using System;
using System.Collections.Generic;

namespace everything.Models
{
    public class ToDoColumn
    {
        public ToDoColumn()
        {
            ToDoItems = new List<ToDoItem>();
        }

        public int Id { get; set; }
        public DateTime CreatedDate { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Sequence { get; set; }

        public int ToDoBoardId { get; set; }
        public virtual ToDoBoard ToDoBoard { get; set; }

        public virtual ICollection<ToDoItem> ToDoItems { get; set; }
    }
}
