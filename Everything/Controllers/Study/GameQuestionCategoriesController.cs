using everything.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;

namespace everything.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GameQuestionCategoriesController : ControllerBase
    {
        readonly EverythingContext _context;

        public GameQuestionCategoriesController(EverythingContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("forGame/{id:int}")]
        public IActionResult GetQuestionsForGame(int id)
        {
            var game = _context.Games
                .Include(g => g.GameQuestions)
                    .ThenInclude(gq => gq.Question)
                        .ThenInclude(q => q.QuestionCategory)
                .FirstOrDefault(g => g.Id == id);

            if (game == null)
                throw new Exception();
            var catsWithQuestons = game.GameQuestions
                .GroupBy(q => q.Question.QuestionCategory)
                .Select(group =>
                    new GetGameQuestionCategoryMessage
                    {
                        Id = group.Key.Id,
                        Name = group.Key.Name,
                        GameQuestions = group.OrderBy(g => g.Points)
                            .Select(q => new GetGameQuestionMessage
                            {
                                Id = q.Id,
                                Statement = q.Question.Statement,
                                Answer = q.Question.Answer,
                                Points = q.Points,
                                IsDouble = q.IsDouble,
                                Round = q.Round,
                                NobodyGotRight = q.NobodyGotRight,
                                IsFinal = q.IsFinal
                            })
                    });

            return Ok(catsWithQuestons);
        }
    }
}