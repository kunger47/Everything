namespace everything.Controllers
{
    public class GetPackingItemMessage
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool IsActive { get; set; }
    }

    public class CreatePackingItemMessage
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int UserId { get; set; }
    }

    public class UpdatePackingItemMessage
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
