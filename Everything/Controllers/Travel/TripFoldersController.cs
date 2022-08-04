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
    public class TripFoldersController : ControllerBase
    {
        readonly EverythingContext _context;

        public TripFoldersController(EverythingContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _context.TripFolders
                .Select(c => new GetTripFolderMessage
                {
                    Id = c.Id,
                    Name = c.Name,
                    FolderId = c.FolderId
                }).ToListAsync());
        }

        [HttpGet]
        [Route("forfolder/{folderId}")]
        public async Task<IActionResult> GetForFolder(string folderId)
        {
            var foundId = int.TryParse(folderId, out int parsedId);
            return Ok(await _context.TripFolders
                .Where(b => b.FolderId == (foundId ? parsedId : null))
                .Select(c => new GetTripFolderMessage
                {
                    Id = c.Id,
                    Name = c.Name,
                    FolderId = c.FolderId
                }).ToListAsync());
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateTripFolderMessage item)
        {
            var folder = new TripFolder
            {
                Name = item.Name,
                UserId = _context.Users.First().Id,
                FolderId = item.FolderId
            };

            _context.Add(folder);
            await _context.SaveChangesAsync();
            return Ok(true);
        }

        [HttpPut]
        public async Task<IActionResult> Update(UpdateTripFolderMessage item)
        {
            var folder = await _context.TripFolders.FirstOrDefaultAsync(p => p.Id == item.Id);

            folder.Name = item.Name;
            folder.FolderId = item.FolderId;

            await _context.SaveChangesAsync();
            return Ok(true);
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var folder = await _context.TripFolders.FirstOrDefaultAsync(p => p.Id == id);

            // Add Confirm delete before allowing this
            //foreach (var trip in folder.Trips)
            //{
            //    foreach (var link in trip.TagLinks)
            //    {
            //        _context.TagForTrips.Remove(link);
            //    }
            //    _context.Trips.Remove(trip);
            //}
            //_context.TripFolders.Remove(folder);

            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}