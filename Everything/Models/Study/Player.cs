using System.Collections.Generic;

namespace everything.Models
{
    public class Player
    {
        public Player()
        {
            QuestionAnswers = new List<QuestionAnswer>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public int Amount { get; set; }
        public string ColorHexCode { get; set; }

        public int GameId { get; set; }
        public virtual Game Game { get; set; }

        public virtual IEnumerable<QuestionAnswer> QuestionAnswers { get; set; }
    }
}
