using System;
using System.Collections.Generic;

namespace everything.Controllers
{
    public class GetGameMessage
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime Date { get; set; }
    }

    public class CreateGameMessage
    {
        public string Name { get; set; }
    }

    public class UpdateGameMessage
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }

    public class GetGameQuestionCategoryMessage
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public IEnumerable<GetGameQuestionMessage> GameQuestions { get; set; }
    }

    public class GetGameQuestionMessage
    {
        public int Id { get; set; }
        public string Statement { get; set; }
        public string Answer { get; set; }
        public int Round { get; set; }
        public int Points { get; set; }
        public bool IsDouble { get; set; }
        public bool IsFinal { get; set; }
        public bool NobodyGotRight { get; set; }
    }

    public class UpdateGameQuestionMessage
    {
        public int Id { get; set; }
        public bool NobodyGotRight { get; set; }
    }

    public class GetQuestionAnswerMessage
    {
        public int Id { get; set; }
        public int GameQuestionId { get; set; }
        public int PlayerId { get; set; }
        public string PlayerName { get; set; }
        public int? Bet { get; set; }
        public bool? WasRight { get; set; }
    }

    public class CreateQuestionAnswerMessage
    {
        public int GameQuestionId { get; set; }
        public int PlayerId { get; set; }
        public int? Bet { get; set; }
        public bool WasRight { get; set; }
    }

    public class UpdateQuestionAnswerMessage
    {
        public int Id { get; set; }
        public int? Bet { get; set; }
        public bool WasRight { get; set; }
    }
}
