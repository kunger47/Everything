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
    public class TripPackingItemsController : ControllerBase
    {
        readonly EverythingContext _context;
        readonly TripPackingItemUpdater _packingItemUpdater;

        public TripPackingItemsController(EverythingContext context)
        {
            _context = context;
            _packingItemUpdater = new TripPackingItemUpdater(_context);
        }

        [HttpGet]
        [Route("{tripId:int}")]
        public IActionResult GetForTrip(int tripId)
        {
            return Ok(_context.TripPackingItems
                .Where(i => i.TripId == tripId)
                .Select(l => new GetTripPackingItemMessage
                {
                    Id = l.Id,
                    Name = l.PackingItem.Name,
                    Description = l.PackingItem.Description,
                    Sequence = l.Sequence,
                    Tags = l.PackingItem.TagLinks.Select(t => new GetTravelTagMessage
                    {
                        Id = t.TravelTag.Id,
                        Name = t.TravelTag.Name,
                        Description = t.TravelTag.Description,
                        IsActive = t.TravelTag.IsActive,
                        ColorHexCode = t.TravelTag.ColorHexCode
                    })
                }));
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateTripPackingItemMessage item)
        {
            _packingItemUpdater.AddTripPackingItem(item);
            await _context.SaveChangesAsync();
            return Ok(true);
        }

        [HttpPut]
        public async Task<IActionResult> Update(UpdateTripPackingItemMessage item)
        {
            _packingItemUpdater.UpdateTripPackingItem(item);
            await _context.SaveChangesAsync();
            return Ok(true);
        }

        [HttpDelete]
        [Route("{itemId:int}")]
        public async Task<IActionResult> Delete(int itemId)
        {
            var item = await _context.TripPackingItems.FirstOrDefaultAsync(p => p.Id == itemId);
            _context.TripPackingItems.Remove(item);
            await _context.SaveChangesAsync();
            return Ok(true);
        }
    }
}