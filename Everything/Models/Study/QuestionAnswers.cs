namespace everything.Models
{
    public class QuestionAnswer
    {
        public int Id { get; set; }
        public int? Bet { get; set; }
        public bool WasRight { get; set; }

        public int PlayerId { get; set; }
        public virtual Player Player { get; set; }

        public int GameQuestionId { get; set; }
        public virtual GameQuestion GameQuestion { get; set; }
    }
}
