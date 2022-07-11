using System.Collections.Generic;

namespace everything.Models
{
    public class QuestionCategory : IForUser
    {
        public QuestionCategory()
        {
            Questions = new List<Question>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public bool IsSelected { get; set; }

        public int UserId { get; set; }
        public virtual User User { get; set; }

        public virtual IEnumerable<Question> Questions { get; set; }
    }
}
