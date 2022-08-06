using everything.Data;
using everything.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
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
        public async Task<IActionResult> GetAll()
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
        [Route("{id:int}")]
        public IActionResult GetById(int id)
        {
            return Ok(_context.Trips
                .Where(t => t.Id == id)
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
                }).FirstOrDefault());
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
                FolderId = item.FolderId,
                TripPackingItems = _context.PackingItems
                    .Where(pi => pi.TagLinks.Count() == 0)
                    .Select(pi => new TripPackingItem
                    {
                        PackingItem = pi,
                        Sequence = pi.Sequence
                    }).ToList()
            };

            _context.Add(board);
            await _context.SaveChangesAsync();
            return Ok(true);
        }

        [HttpPut]
        public async Task<IActionResult> Update(UpdateTripMessage item)
        {
            var trip = await _context.Trips.FirstOrDefaultAsync(p => p.Id == item.Id);

            trip.Name = item.Name;
            trip.Description = item.Description;
            trip.FolderId = item.FolderId;

            await _context.SaveChangesAsync();
            return Ok(true);
        }

        [HttpPut]
        [Route("tags/{id:int}")]
        public async Task<IActionResult> UpdateTags(int id, IEnumerable<int> tagIds)
        {
            var theTrip = _context.Trips
                .Include(p => p.TagLinks)
                    .ThenInclude(l => l.TravelTag)
                .Include(t => t.TripPackingItems)
                    .ThenInclude(i => i.PackingItem)
                .FirstOrDefault(l => l.Id == id);

            if (theTrip == null)
                throw new Exception("Trip doesn't exist");

            var tripTagLinks = theTrip.TagLinks;

            var tagsToRemove = new List<int>();
            foreach (var tagId in tripTagLinks.Select(l => l.TravelTag.Id))
                if (!tagIds.Contains(tagId))
                    tagsToRemove.Add(tagId);

            foreach (var tagId in tagsToRemove)
            {
                var tagLink = tripTagLinks.FirstOrDefault(l => l.TravelTagId == tagId);
                _context.TagForTrips.Remove(tagLink);
            }

            var itemsTags = tripTagLinks.Select(l => l.TravelTagId);
            var tagsToAdd = new List<int>();
            foreach (var tagId in tagIds)
                if (!itemsTags.Contains(tagId))
                    tagsToAdd.Add(tagId);

            foreach (var tagId in tagsToAdd)
                tripTagLinks.Add(new TagForTrip { TripId = id, TravelTagId = tagId });

            await _context.SaveChangesAsync();

            var theUpdatedTrip = _context.Trips
                .Include(p => p.TagLinks)
                    .ThenInclude(l => l.TravelTag)
                .Include(t => t.TripPackingItems)
                    .ThenInclude(i => i.PackingItem)
                .FirstOrDefault(l => l.Id == id);

            var tripsPackingItems = theTrip.TripPackingItems;
            var itemsAlreadyInTrip = tripsPackingItems.Select(i => i.PackingItem);
            var currentSequenceNumber = tripsPackingItems.Count > 0 ? tripsPackingItems.Select(i => i.Sequence).Max() : -1;
            var tripTags = theUpdatedTrip.TagLinks.Select(l => l.TravelTag);

            var usersPackingItems = _context.PackingItems
                .Include(i => i.TagLinks)
                    .ThenInclude(l => l.TravelTag)
                .Where(i => i.UserId == 1);

            var itemsToAddToTrip = new List<TripPackingItem>();
            foreach (var item in usersPackingItems)
            {
                if (!itemsAlreadyInTrip.Any(i => i.Id == item.Id))
                {
                    var foundAllTags = true;
                    foreach (var tag in item.TagLinks.Select(l => l.TravelTag))
                    {
                        if (tripTags != null && tripTags.Any(t => t.Id == tag.Id))
                        {
                            foundAllTags = foundAllTags && true;
                            currentSequenceNumber++;
                        }
                        else
                        {
                            foundAllTags = false;
                        }
                    }

                    if (foundAllTags)
                    {
                        itemsToAddToTrip.Add(new TripPackingItem
                        {
                            PackingItem = item,
                            Sequence = currentSequenceNumber
                        });
                    }
                }
            }

            foreach (var item in itemsToAddToTrip)
            {
                theUpdatedTrip.TripPackingItems.Add(item);
            }

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
            _context.Trips.Remove(trip);

            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}