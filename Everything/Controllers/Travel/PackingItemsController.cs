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
                    Description = l.Description,
                    Tags = l.TagLinks.Select(t => new GetTravelTagMessage
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

        [HttpPut]
        [Route("tags/{itemId:int}")]
        public async Task<IActionResult> UpdateTags(int itemId, IEnumerable<int> tagIds)
        {
            var theItem = _context.PackingItems
                .Include(p => p.TagLinks)
                .ThenInclude(l => l.TravelTag)
                .FirstOrDefault(l => l.Id == itemId);

            if (theItem == null)
                throw new Exception("Packing Item doesn't exist");

            var itemsTagLinks = theItem.TagLinks;

            var tagsToRemove = new List<int>();
            foreach (var tagId in itemsTagLinks.Select(l => l.TravelTag.Id))
                if (!tagIds.Contains(tagId))
                    tagsToRemove.Add(tagId);

            foreach (var tagId in tagsToRemove)
            {
                var tagLink = itemsTagLinks.FirstOrDefault(l => l.TravelTagId == tagId);
                itemsTagLinks.Remove(tagLink);
            }

            var itemsTags = itemsTagLinks.Select(l => l.TravelTagId);
            var tagsToAdd = new List<int>();
            foreach (var tagId in tagIds)
                if (!itemsTags.Contains(tagId))
                    tagsToAdd.Add(tagId);

            foreach (var tagId in tagsToAdd)
                itemsTagLinks.Add(new TagForPackingItem { PackingItemId = itemId, TravelTagId = tagId });


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