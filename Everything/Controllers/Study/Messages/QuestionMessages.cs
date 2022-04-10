namespace everything.Controllers
{
    public class GetQuestionMessage
    {
        public int Id { get; set; }
        public string Statement { get; set; }
        public string Answer { get; set; }
        public int Difficulty { get; set; }
    }

    public class CreateQuestionMessage
    {
        public string Statement { get; set; }
        public string Answer { get; set; }
        public int categoryId { get; set; }
        public int Difficulty { get; set; }
    }

    public class UpdateQuestionMessage
    {
        public int Id { get; set; }
        public string Statement { get; set; }
        public string Answer { get; set; }
        public int Difficulty { get; set; }
    }
}
