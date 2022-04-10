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
    public class QuestionCategoriesController : ControllerBase
    {
        readonly EverythingContext _context;

        public QuestionCategoriesController(EverythingContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("")]
        public IActionResult GetAll()
        {
            return Ok(_context.QuestionCategories
                .Select(l => new GetQuestionCategoryMessage
                {
                    Id = l.Id,
                    Name = l.Name,
                    IsSelected = l.IsSelected,
                    ContainsAllDifficulties = !(l.Questions.Any(q => q.Difficulty == 0)
                        && l.Questions.Any(q => q.Difficulty == 1)
                        && l.Questions.Any(q => q.Difficulty == 2)
                        && l.Questions.Any(q => q.Difficulty == 3)
                        && l.Questions.Any(q => q.Difficulty == 4)
                        && l.Questions.Any(q => q.Difficulty == 5))
                }));
        }

        [HttpGet]
        [Route("{id:int}")]
        public IActionResult GetCategory(int id)
        {
            var category = _context.QuestionCategories
                .FirstOrDefault(c => c.Id == id);

            return Ok(new GetQuestionCategoryMessage
            {
                Id = category.Id,
                Name = category.Name,
                IsSelected = category.IsSelected
            });
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateQuestionCategoryMessage item)
        {
            var questionCategory = new QuestionCategory
            {
                Name = item.Name
            };

            _context.Add(questionCategory);
            await _context.SaveChangesAsync();
            return Ok(true);
        }

        [HttpPut]
        public async Task<IActionResult> Update(UpdateQuestionCategoryMessage item)
        {
            var questionCategory = _context.QuestionCategories.FirstOrDefault(l => l.Id == item.Id);
            questionCategory.Name = item.Name;
            questionCategory.IsSelected = item.IsSelected;
            await _context.SaveChangesAsync();
            return Ok(true);
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var questionCategory = await _context.QuestionCategories.FirstOrDefaultAsync(p => p.Id == id);
            _context.Remove(questionCategory);
            await _context.SaveChangesAsync();
            return Ok(true);
        }
    }
}