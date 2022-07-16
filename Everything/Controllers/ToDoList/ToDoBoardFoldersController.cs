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
    public class ToDoBoardFoldersController : ControllerBase
    {
        readonly EverythingContext _context;

        public ToDoBoardFoldersController(EverythingContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _context.ToDoBoardFolders
                .Select(c => new GetToDoBoardFolderMessage
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
            return Ok(await _context.ToDoBoardFolders
                .Where(b => b.BoardFolderId == (foundId ? parsedId : null))
                .Select(c => new GetToDoBoardFolderMessage
                {
                    Id = c.Id,
                    Name = c.Name,
                    Description = c.Description,
                    CreatedDate = c.CreatedDate,
                    BoardFolderId = c.BoardFolderId
                }).ToListAsync());
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateToDoBoardFolderMessage item)
        {
            var folder = new ToDoBoardFolder
            {
                Name = item.Name,
                Description = item.Description,
                CreatedDate = DateTime.Now,
                UserId = _context.Users.First().Id,
                BoardFolderId = item.BoardFolderId
            };

            _context.Add(folder);
            await _context.SaveChangesAsync();
            return Ok(true);
        }

        [HttpPut]
        public async Task<IActionResult> Update(UpdateToDoBoardFolderMessage item)
        {
            var folder = await _context.ToDoBoardFolders.FirstOrDefaultAsync(p => p.Id == item.Id);

            folder.Name = item.Name;
            folder.Description = item.Description;
            folder.BoardFolderId = item.BoardFolderId;

            await _context.SaveChangesAsync();
            return Ok(true);
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var folder = await _context.ToDoBoardFolders.FirstOrDefaultAsync(p => p.Id == id);

            foreach (var board in folder.ToDoBoards)
            {
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
            }
            _context.ToDoBoardFolders.Remove(folder);


            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}