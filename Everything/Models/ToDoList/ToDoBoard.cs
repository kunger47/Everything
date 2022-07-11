using System;
using System.Collections.Generic;

namespace everything.Models
{
    public class ToDoBoard : IForUser
    {
        public ToDoBoard()
        {
            ToDoColumns = new List<ToDoColumn>();
        }

        public int Id { get; set; }
        public DateTime CreatedDate { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Sequence { get; set; }

        public int UserId { get; set; }
        public virtual User User { get; set; }

        public virtual IEnumerable<ToDoColumn> ToDoColumns { get; set; }
    }
}
