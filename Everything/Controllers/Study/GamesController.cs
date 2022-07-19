using everything.Data;
using everything.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace everything.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GamesController : ControllerBase
    {
        readonly EverythingContext _context;

        public GamesController(EverythingContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetGames()
        {
            var games = _context.Games
                .Select(a =>
                    new GetGameMessage
                    {
                        Id = a.Id,
                        Name = a.Name,
                        Date = a.Date
                    });

            return Ok(games);
        }

        [HttpGet]
        [Route("{id:int}")]
        public IActionResult GetGame(int id)
        {
            var game = _context.Games
                .FirstOrDefault(g => g.Id == id);

            return Ok(new GetGameMessage
            {
                Id = game.Id,
                Name = game.Name,
                Date = game.Date
            });
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateGameMessage item)
        {
            var source = new Game
            {
                Name = item.Name,
                Date = DateTime.Now,
                UserId = _context.Users.First().Id
            };

            var categories = _context.QuestionCategories
                .Include(qc => qc.Questions)
                .Where(qc => qc.IsSelected
                    && qc.Questions.Any(q => q.Difficulty == 0)
                    && qc.Questions.Any(q => q.Difficulty == 1)
                    && qc.Questions.Any(q => q.Difficulty == 2)
                    && qc.Questions.Any(q => q.Difficulty == 3)
                    && qc.Questions.Any(q => q.Difficulty == 4)
                    && qc.Questions.Any(q => q.Difficulty == 5))
                .ToList();

            if (categories.Count() < 10)
                throw new Exception("You must select at least 10 categories to create a game each with at least one question in each difficulty rating!");

            ArrayHelper.Shuffle(categories);

            var categoryCount = 1;
            var randomGenerator = new Random();
            var randomDouble1 = randomGenerator.Next(1, 25);
            var randomDouble2 = randomGenerator.Next(26, 50);

            foreach (var cat in categories)
            {
                if (categoryCount < 11)
                {
                    var categoryQuestions = cat.Questions.ToList();

                    ArrayHelper.Shuffle(categoryQuestions);

                    for (int diff = 0; diff < 5; diff++)
                    {
                        var gameQuestionNumber = (categoryCount - 1) * 5 + (diff + 1);
                        var round = categoryCount < 6 ? 1 : 2;

                        var question = categoryQuestions.First(q => q.Difficulty == diff);

                        source.GameQuestions.Add(new GameQuestion
                        {
                            IsDouble = gameQuestionNumber == randomDouble1 || gameQuestionNumber == randomDouble2,
                            Points = (diff + 1) * 100 * round,
                            Question = question,
                            Round = round
                        });
                    }
                }

                categoryCount++;
            }

            var hardQuestion = _context.Questions
                .Include(q => q.QuestionCategory)
                .Where(q => q.QuestionCategory.IsSelected
                    && q.Difficulty == 5)
                .ToList();

            ArrayHelper.Shuffle(hardQuestion);

            source.GameQuestions.Add(new GameQuestion
            {
                IsFinal = true,
                Points = 0,
                Question = hardQuestion.FirstOrDefault(),
                Round = 3
            });

            _context.Add(source);
            await _context.SaveChangesAsync();
            return Ok(true);
        }

        [HttpPut]
        public async Task<IActionResult> Update(UpdateGameMessage item)
        {
            var source = _context.Games.FirstOrDefault(l => l.Id == item.Id);
            source.Name = item.Name;
            await _context.SaveChangesAsync();
            return Ok(true);
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var game = await _context.Games
                .Include(g => g.GameQuestions)
                    .ThenInclude(gq => gq.QuestionAnswers)
                .Include(g => g.Players)
                .FirstOrDefaultAsync(p => p.Id == id);

            foreach (var question in game.GameQuestions)
            {
                foreach (var answer in question.QuestionAnswers)
                {
                    _context.QuestionAnswers.Remove(answer);
                }
                _context.GameQuestions.Remove(question);
            }

            foreach (var player in game.Players)
            {
                _context.Players.Remove(player);
            }

            _context.Remove(game);
            await _context.SaveChangesAsync();
            return Ok(true);
        }
    }
}