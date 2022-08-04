namespace everything.Controllers
{
    public class GetTripFolderMessage
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int? FolderId { get; set; }
    }

    public class CreateTripFolderMessage
    {
        public string Name { get; set; }
        public string Description { get; set; }
        // TODO: Replace the UserId in Create messages with context Current User
        public int UserId { get; set; }
        public int? FolderId { get; set; }
    }

    public class UpdateTripFolderMessage
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int? FolderId { get; set; }
    }
}
