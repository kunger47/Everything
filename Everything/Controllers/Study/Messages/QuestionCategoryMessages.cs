namespace everything.Controllers
{
    public class GetQuestionCategoryMessage
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool IsSelected { get; set; }
        public bool ContainsAllDifficulties { get; set; }
    }

    public class CreateQuestionCategoryMessage
    {
        public string Name { get; set; }
        public int UserId { get; set; }
    }

    public class UpdateQuestionCategoryMessage
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool IsSelected { get; set; }
    }
}
