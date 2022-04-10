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
    public class ToDoItemTasksController : ControllerBase
    {
        readonly EverythingContext _context;

        public ToDoItemTasksController(EverythingContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("foritem/{itemId:int}")]
        public async Task<IActionResult> Get(int itemid)
        {
            return Ok(await _context.ToDoItemTasks.Where(t => t.ToDoItemId == itemid).ToListAsync());
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateToDoItemTaskMessage item)
        {
            var task = new ToDoItemTask
            {
                Name = item.Name,
                Sequence = item.Sequence,
                ToDoItemId = item.ToDoItemId
            };

            _context.Add(task);
            await _context.SaveChangesAsync();
            return Ok(true);
        }

        [HttpPut]
        public async Task<IActionResult> Update(UpdateToDoItemTaskMessage item)
        {
            var todo = await _context.ToDoItemTasks.FirstOrDefaultAsync(p => p.Id == item.Id);

            todo.Name = item.Name;
            todo.Description = item.Description;
            todo.Sequence = item.Sequence;
            todo.ToDoItemId = item.ToDoItemId;
            todo.Completed = item.Completed;

            await _context.SaveChangesAsync();
            return Ok(true);
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var item = await _context.ToDoItemTasks.FirstOrDefaultAsync(p => p.Id == id);
            _context.ToDoItemTasks.Remove(item);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}