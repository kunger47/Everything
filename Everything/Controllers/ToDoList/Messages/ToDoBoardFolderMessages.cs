using System;

namespace everything.Controllers
{
    public class GetToDoBoardFolderMessage
    {
        public int Id { get; set; }
        public DateTime CreatedDate { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int? BoardFolderId { get; set; }
    }

    public class CreateToDoBoardFolderMessage
    {
        public string Name { get; set; }
        public string Description { get; set; }
        // TODO: Replace the UserId in Create messages with context Current User
        public int UserId { get; set; }
        public int? BoardFolderId { get; set; }
    }

    public class UpdateToDoBoardFolderMessage
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int? BoardFolderId { get; set; }
    }
}
