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
                    CreatedDate = c.CreatedDate,
                    BoardFolderId = c.BoardFolderId
                }).ToListAsync());
        }

        [HttpGet]
        [Route("forfolder/{folderId}")]
        public async Task<IActionResult> GetForFolder(string folderId)
        {
            var foundId = int.TryParse(folderId, out int parsedId);
            return Ok(await _context.ToDoBoards
                .Where(b => b.BoardFolderId == (foundId ? parsedId : null))
                .Select(c => new GetToDoBoardMessage
                {
                    Id = c.Id,
                    Name = c.Name,
                    Description = c.Description,
                    CreatedDate = c.CreatedDate,
                    BoardFolderId = c.BoardFolderId
                }).ToListAsync());
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateToDoBoardMessage item)
        {
            var board = new ToDoBoard
            {
                Name = item.Name,
                Description = item.Description,
                CreatedDate = DateTime.Now,
                UserId = _context.Users.First().Id,
                BoardFolderId = item.BoardFolderId
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
            board.BoardFolderId = item.BoardFolderId;

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