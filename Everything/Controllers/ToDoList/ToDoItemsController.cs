using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using everything.Data;
using everything.Models;
using System.Linq;

namespace everything.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ToDoItemsController : ControllerBase
    {
        readonly EverythingContext _context;

        public ToDoItemsController(EverythingContext context)
        {
            _context = context;
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
            var todo = new ToDoItem
            {
                Name = item.Name,
                Description = item.Description,
                Sequence = item.Sequence,
                CreatedDate = DateTime.Now,
                ToDoColumnId = item.ToDoColumnId
            };

            _context.Add(todo);
            await _context.SaveChangesAsync();
            return Ok(item);
        }

        [HttpPut]
        public async Task<IActionResult> Update(UpdateToDoItemMessage item)
        {
            var todo = await _context.ToDoItems.FirstOrDefaultAsync(p => p.Id == item.Id);

            todo.Name = item.Name;
            todo.Description = item.Description;
            todo.Sequence = item.Sequence;
            todo.ToDoColumnId = item.ToDoColumnId;
            todo.DueDate = item.DueDate;

            await _context.SaveChangesAsync();
            return Ok(true);
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var item = await _context.ToDoItems.FirstOrDefaultAsync(p => p.Id == id);

            foreach (var task in item.Tasks)
            {
                _context.ToDoItemTasks.Remove(task);
            }

            _context.ToDoItems.Remove(item);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}