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
    public class TripsController : ControllerBase
    {
        readonly EverythingContext _context;

        public TripsController(EverythingContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _context.Trips
                .Select(c => new GetTripMessage
                {
                    Id = c.Id,
                    Name = c.Name,
                    Description = c.Description,
                    FolderId = c.FolderId,
                    Tags = c.TagLinks.Select(t => new GetTravelTagMessage
                    {
                        Id = t.TravelTag.Id,
                        Name = t.TravelTag.Name,
                        Description = t.TravelTag.Description,
                        IsActive = t.TravelTag.IsActive,
                        ColorHexCode = t.TravelTag.ColorHexCode
                    })
                }).ToListAsync());
        }

        [HttpGet]
        [Route("forfolder/{folderId}")]
        public async Task<IActionResult> GetForFolder(string folderId)
        {
            var foundId = int.TryParse(folderId, out int parsedId);
            return Ok(await _context.Trips
                .Where(b => b.FolderId == (foundId ? parsedId : null))
                .Select(c => new GetTripMessage
                {
                    Id = c.Id,
                    Name = c.Name,
                    Description = c.Description,
                    FolderId = c.FolderId,
                    Tags = c.TagLinks.Select(t => new GetTravelTagMessage
                    {
                        Id = t.TravelTag.Id,
                        Name = t.TravelTag.Name,
                        Description = t.TravelTag.Description,
                        IsActive = t.TravelTag.IsActive,
                        ColorHexCode = t.TravelTag.ColorHexCode
                    })
                }).ToListAsync());
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateTripMessage item)
        {
            var board = new Trip
            {
                Name = item.Name,
                Description = item.Description,
                UserId = _context.Users.First().Id,
                FolderId = item.FolderId
            };

            _context.Add(board);
            await _context.SaveChangesAsync();
            return Ok(true);
        }

        [HttpPut]
        public async Task<IActionResult> Update(UpdateTripMessage item)
        {
            var board = await _context.Trips.FirstOrDefaultAsync(p => p.Id == item.Id);

            board.Name = item.Name;
            board.Description = item.Description;
            board.FolderId = item.FolderId;

            await _context.SaveChangesAsync();
            return Ok(true);
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var trip = await _context.Trips.FirstOrDefaultAsync(p => p.Id == id);

            //foreach (var link in trip.TagLinks)
            //{
            //    _context.TagForTrips.Remove(link);
            //}
            //_context.Trips.Remove(trip);

            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}