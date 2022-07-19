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
    public class PackingItemsController : ControllerBase
    {
        readonly EverythingContext _context;

        public PackingItemsController(EverythingContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("")]
        public IActionResult GetAll()
        {
            return Ok(_context.PackingItems
                .Select(l => new GetPackingItemMessage
                {
                    Id = l.Id,
                    Name = l.Name,
                    IsActive = l.IsActive,
                    Description = l.Description
                }));
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreatePackingItemMessage item)
        {
            var newItem = new PackingItem
            {
                Name = item.Name,
                Description = item.Description,
                IsActive = true,
                UserId = _context.Users.First().Id
            };

            _context.Add(newItem);
            await _context.SaveChangesAsync();
            return Ok(true);
        }

        [HttpPut]
        public async Task<IActionResult> Update(UpdatePackingItemMessage item)
        {
            var theItem = _context.PackingItems.FirstOrDefault(l => l.Id == item.Id);
            theItem.Name = item.Name;
            theItem.Description = item.Description;
            await _context.SaveChangesAsync();
            return Ok(true);
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            var item = await _context.PackingItems.FirstOrDefaultAsync(p => p.Id == id);
            item.IsActive = false;
            await _context.SaveChangesAsync();
            return Ok(true);
        }
    }
}