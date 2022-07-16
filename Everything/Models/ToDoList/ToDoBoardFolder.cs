using System;
using System.Collections.Generic;

namespace everything.Models
{
    public class ToDoBoardFolder : IForUser
    {
        public ToDoBoardFolder()
        {
            ToDoBoards = new List<ToDoBoard>();
            BoardFolders = new List<ToDoBoardFolder>();
        }

        public int Id { get; set; }
        public DateTime CreatedDate { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public int UserId { get; set; }
        public virtual User User { get; set; }

        public int? BoardFolderId { get; set; }
        public virtual ToDoBoardFolder BoardFolder { get; set; }

        public virtual IEnumerable<ToDoBoard> ToDoBoards { get; set; }
        public virtual IEnumerable<ToDoBoardFolder> BoardFolders { get; set; }
    }
}
