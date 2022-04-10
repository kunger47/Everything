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
    public class ToDoBoardsController : ControllerBase
    {
        readonly EverythingContext _context;

        public ToDoBoardsController(EverythingContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _context.ToDoBoards
                .Select(c => new GetToDoBoardMessage
                {
                    Id = c.Id,
                    Name = c.Name,
                    Description = c.Description,
                    Sequence = c.Sequence,
                    CreatedDate = c.CreatedDate
                }).ToListAsync());
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateToDoBoardMessage item)
        {
            var board = new ToDoBoard
            {
                Name = item.Name,
                Description = item.Description,
                Sequence = item.Sequence,
                CreatedDate = DateTime.Now
            };

            _context.Add(board);
            await _context.SaveChangesAsync();
            return Ok(true);
        }

        [HttpPut]
        public async Task<IActionResult> Update(UpdateToDoBoardMessage item)
        {
            var board = await _context.ToDoBoards.FirstOrDefaultAsync(p => p.Id == item.Id);

            board.Name = item.Name;
            board.Description = item.Description;
            board.Sequence = item.Sequence;

            await _context.SaveChangesAsync();
            return Ok(true);
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var board = await _context.ToDoBoards.FirstOrDefaultAsync(p => p.Id == id);

            foreach (var column in board.ToDoColumns)
            {
                foreach (var item in column.ToDoItems)
                {
                    foreach (var task in item.Tasks)
                    {
                        _context.ToDoItemTasks.Remove(task);
                    }
                    _context.ToDoItems.Remove(item);
                }
                _context.ToDoColumns.Remove(column);
            }
            _context.ToDoBoards.Remove(board);

            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}