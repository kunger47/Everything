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
    public class ToDoColumnsController : ControllerBase
    {
        readonly EverythingContext _context;

        public ToDoColumnsController(EverythingContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("forboard/{boardId:int}")]
        public async Task<IActionResult> Get(int boardId)
        {
            return Ok(await _context.ToDoColumns
                .Where(c => c.ToDoBoardId == boardId)
                .Select(c => new GetToDoColumnMessage
                {
                    Id = c.Id,
                    ToDoBoardId = c.ToDoBoardId,
                    Name = c.Name,
                    Description = c.Description,
                    Sequence = c.Sequence,
                    CreatedDate = c.CreatedDate,
                    ToDoItems = c.ToDoItems.Select(i => new GetToDoItemMessage
                    {
                        Id = i.Id,
                        Name = i.Name,
                        Description = i.Description,
                        CreatedDate = i.CreatedDate,
                        DueDate = i.DueDate,
                        Sequence = i.Sequence,
                        ToDoColumnId = i.ToDoColumnId
                    })
                }).ToListAsync());
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateToDoColumnMessage item)
        {
            var column = new ToDoColumn
            {
                Name = item.Name,
                Description = item.Description,
                Sequence = item.Sequence,
                CreatedDate = DateTime.Now,
                ToDoBoardId = item.ToDoBoardId
            };

            _context.Add(column);
            await _context.SaveChangesAsync();
            return Ok(item);
        }

        [HttpPut]
        public async Task<IActionResult> Update(UpdateToDoColumnMessage item)
        {
            var column = await _context.ToDoColumns.FirstOrDefaultAsync(p => p.Id == item.Id);

            column.Name = item.Name;
            column.Description = item.Description;
            column.Sequence = item.Sequence;
            column.ToDoBoardId = item.ToDoBoardId;

            await _context.SaveChangesAsync();
            return Ok(true);
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var column = await _context.ToDoColumns.FirstOrDefaultAsync(p => p.Id == id);

            foreach (var item in column.ToDoItems)
            {
                foreach (var task in item.Tasks)
                {
                    _context.ToDoItemTasks.Remove(task);
                }
                _context.ToDoItems.Remove(item);
            }
            _context.ToDoColumns.Remove(column);

            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}