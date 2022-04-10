using System.Collections.Generic;

namespace everything.Models
{
    public class Question
    {
        public Question()
        {
            GameQuestions = new List<GameQuestion>();
        }

        public int Id { get; set; }
        public string Statement { get; set; }
        public string Answer { get; set; }
        public int Difficulty { get; set; }

        public int QuestionCategoryId { get; set; }
        public virtual QuestionCategory QuestionCategory { get; set; }

        public virtual IEnumerable<GameQuestion> GameQuestions { get; set; }
    }
}
