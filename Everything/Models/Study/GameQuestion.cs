using System.Collections.Generic;

namespace everything.Models
{
    public class GameQuestion
    {
        public GameQuestion()
        {
            QuestionAnswers = new List<QuestionAnswer>();
        }

        public int Id { get; set; }
        public int Round { get; set; }
        public int Points { get; set; }
        public bool IsDouble { get; set; }
        public bool IsFinal { get; set; }
        public bool NobodyGotRight { get; set; }

        public int GameId { get; set; }
        public virtual Game Game { get; set; }

        public int QuestionId { get; set; }
        public virtual Question Question { get; set; }

        public virtual IEnumerable<QuestionAnswer> QuestionAnswers { get; set; }
    }
}
