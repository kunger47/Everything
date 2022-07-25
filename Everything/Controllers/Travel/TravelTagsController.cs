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
    public class TravelTagsController : ControllerBase
    {
        readonly EverythingContext _context;

        public TravelTagsController(EverythingContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("")]
        public IActionResult GetAll()
        {
            return Ok(_context.TravelTags
                .Select(l => new GetTravelTagMessage
                {
                    Id = l.Id,
                    Name = l.Name,
                    IsActive = l.IsActive,
                    Description = l.Description,
                    ColorHexCode = l.ColorHexCode
                }));
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateTravelTagMessage item)
        {
            var tag = new TravelTag
            {
                Name = item.Name,
                Description = item.Description,
                IsActive = true,
                UserId = _context.Users.First().Id,
                ColorHexCode = item.ColorHexCode
            };

            _context.Add(tag);
            await _context.SaveChangesAsync();
            return Ok(true);
        }

        [HttpPut]
        public async Task<IActionResult> Update(UpdateTravelTagMessage item)
        {
            var tag = _context.TravelTags.FirstOrDefault(l => l.Id == item.Id);
            tag.Name = item.Name;
            tag.Description = item.Description;
            tag.ColorHexCode = item.ColorHexCode;
            await _context.SaveChangesAsync();
            return Ok(true);
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            var tag = await _context.TravelTags.FirstOrDefaultAsync(p => p.Id == id);
            tag.IsActive = false;
            await _context.SaveChangesAsync();
            return Ok(true);
        }
    }
}