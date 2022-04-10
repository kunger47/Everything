using everything.Data;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;

namespace everything.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GameQuestionsController : ControllerBase
    {
        readonly EverythingContext _context;

        public GameQuestionsController(EverythingContext context)
        {
            _context = context;
        }

        [HttpPut]
        public async Task<IActionResult> Update(UpdateGameQuestionMessage item)
        {
            var source = _context.GameQuestions.FirstOrDefault(l => l.Id == item.Id);
            source.NobodyGotRight = item.NobodyGotRight;
            await _context.SaveChangesAsync();
            return Ok(true);
        }
    }
}