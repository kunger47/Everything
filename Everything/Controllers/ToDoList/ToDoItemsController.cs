using everything.Core;
using everything.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace everything.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ToDoItemsController : ControllerBase
    {
        readonly EverythingContext _context;
        readonly ToDoItemUpdater _toDoItemUpdater;

        public ToDoItemsController(EverythingContext context)
        {
            _context = context;
            _toDoItemUpdater = new ToDoItemUpdater(_context);
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _context.ToDoItems.ToListAsync());
        }

        [HttpGet]
        [Route("column/{columnId:int}")]
        public IActionResult GetForGroup(int columnId)
        {
            return Ok(_context.ToDoColumns
                .FirstOrDefault(l => l.Id == columnId)
                .ToDoItems);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateToDoItemMessage item)
        {
            _toDoItemUpdater.AddToDoItem(item);
            await _context.SaveChangesAsync();
            return Ok(item);
        }

        [HttpPut]
        public async Task<IActionResult> Update(UpdateToDoItemMessage item)
        {
            _toDoItemUpdater.UpdateToDoItem(item);
            await _context.SaveChangesAsync();
            return Ok(true);
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            _toDoItemUpdater.RemoveToDoItem(id);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}