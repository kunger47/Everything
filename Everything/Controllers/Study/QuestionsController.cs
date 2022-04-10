using everything.Data;
using everything.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace everything.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class QuestionsController : ControllerBase
    {
        readonly EverythingContext _context;

        public QuestionsController(EverythingContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("forCategory/{id:int}")]
        public IActionResult GetQuestionsForCategory(int id)
        {
            var questions = _context.QuestionCategories
                .Include(b => b.Questions)
                .FirstOrDefault(l => l.Id == id)
                .Questions.Select(a =>
                    new GetQuestionMessage
                    {
                        Id = a.Id,
                        Statement = a.Statement,
                        Answer = a.Answer,
                        Difficulty = a.Difficulty
                    });

            return Ok(questions);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateQuestionMessage item)
        {
            var question = new Question
            {
                Statement = item.Statement,
                Answer = item.Answer,
                QuestionCategoryId = item.categoryId,
                Difficulty = item.Difficulty >= 0 && item.Difficulty < 6 ? item.Difficulty : 0
            };

            _context.Add(question);
            await _context.SaveChangesAsync();
            return Ok(true);
        }

        [HttpPut]
        public async Task<IActionResult> Update(UpdateQuestionMessage item)
        {
            var question = _context.Questions.FirstOrDefault(l => l.Id == item.Id);
            question.Statement = item.Statement;
            question.Answer = item.Answer;
            if (item.Difficulty >= 0 && item.Difficulty < 6)
                question.Difficulty = item.Difficulty;
            await _context.SaveChangesAsync();
            return Ok(true);
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var question = await _context.Questions.FirstOrDefaultAsync(p => p.Id == id);
            _context.Remove(question);
            await _context.SaveChangesAsync();
            return Ok(true);
        }
    }
}