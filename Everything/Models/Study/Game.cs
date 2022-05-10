using System;
using System.Collections.Generic;

namespace everything.Models
{
    public class Game
    {
        public Game()
        {
            Players = new List<Player>();
            GameQuestions = new List<GameQuestion>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime Date { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }

        public virtual IEnumerable<Player> Players { get; set; }
        public virtual IList<GameQuestion> GameQuestions { get; set; }
    }
}
