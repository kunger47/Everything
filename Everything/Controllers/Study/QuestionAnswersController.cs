using everything.Data;
using everything.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace everything.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class QuestionAnswersController : ControllerBase
    {
        readonly EverythingContext _context;

        public QuestionAnswersController(EverythingContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("forGameQuestion/{id:int}")]
        public IActionResult GetAnswersForQuestions(int id)
        {
            var question = _context.GameQuestions
                .Include(g => g.QuestionAnswers)
                    .ThenInclude(a => a.Player)
                .Include(g => g.Game)
                    .ThenInclude(g => g.Players)
                .FirstOrDefault(g => g.Id == id);

            if (question == null)
                throw new Exception();

            var catsWithQuestons = new List<GetQuestionAnswerMessage>();

            foreach (var player in question.Game.Players)
            {
                var a = question.QuestionAnswers.FirstOrDefault(a => a.Player.Id == player.Id);
                if (a != null)
                {
                    catsWithQuestons.Add(new GetQuestionAnswerMessage
                    {
                        Id = a.Id,
                        PlayerId = a.Player.Id,
                        PlayerName = a.Player.Name,
                        Bet = a.Bet,
                        WasRight = a.WasRight,
                        GameQuestionId = a.GameQuestionId

                    });
                }
                else
                {
                    catsWithQuestons.Add(new GetQuestionAnswerMessage
                    {
                        PlayerId = player.Id,
                        PlayerName = player.Name,
                        WasRight = null,
                        GameQuestionId = question.Id
                    });
                }
            }

            return Ok(catsWithQuestons);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateQuestionAnswerMessage item)
        {
            var player = _context.Players.FirstOrDefault(p => p.Id == item.PlayerId);
            if (player == null)
                throw new Exception();

            var question = _context.GameQuestions.FirstOrDefault(p => p.Id == item.GameQuestionId);
            if (question == null)
                throw new Exception();

            var source = new QuestionAnswer
            {
                GameQuestionId = item.GameQuestionId,
                PlayerId = item.PlayerId,
                WasRight = item.WasRight,
                Bet = item.Bet,
                Player = player,
                GameQuestion = question
            };

            if (source.WasRight)
            {
                if (source.Bet == null || source.Bet == 0)
                    source.Player.Amount += source.GameQuestion.Points;
                else
                    source.Player.Amount += source.Bet.Value;
            }
            if (!source.WasRight)
            {
                if (source.Bet == null || source.Bet == 0)
                    source.Player.Amount -= source.GameQuestion.Points;
                else
                    source.Player.Amount -= source.Bet.Value;
            }

            _context.Add(source);
            await _context.SaveChangesAsync();
            return Ok(true);
        }

        [HttpPut]
        public async Task<IActionResult> Update(UpdateQuestionAnswerMessage item)
        {
            var source = _context.QuestionAnswers
                .Include(qa => qa.GameQuestion)
                .Include(qa => qa.Player)
                .FirstOrDefault(l => l.Id == item.Id);

            if (item.Bet > 0)
                throw new Exception();

            if (!item.WasRight && source.WasRight)
                source.Player.Amount -= source.GameQuestion.Points * 2;
            if (item.WasRight && !source.WasRight)
                source.Player.Amount += source.GameQuestion.Points * 2;

            source.WasRight = item.WasRight;
            source.Bet = item.Bet;

            await _context.SaveChangesAsync();
            return Ok(true);
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var source = _context.QuestionAnswers
                .Include(qa => qa.GameQuestion)
                .Include(qa => qa.Player)
                .FirstOrDefault(l => l.Id == id);

            if (source.WasRight)
            {
                if (source.Bet == null || source.Bet == 0)
                    source.Player.Amount -= source.GameQuestion.Points;
                else
                    source.Player.Amount -= source.Bet.Value;
            }
            if (!source.WasRight)
            {
                if (source.Bet == null || source.Bet == 0)
                    source.Player.Amount += source.GameQuestion.Points;
                else
                    source.Player.Amount += source.Bet.Value;
            }

            _context.Remove(source);
            await _context.SaveChangesAsync();
            return Ok(true);
        }
    }
}