using everything.Core;
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
        readonly PackingItemUpdater _packingItemUpdater;

        public PackingItemsController(EverythingContext context)
        {
            _context = context;
            _packingItemUpdater = new PackingItemUpdater(_context);
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
                    Sequence = l.Sequence,
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
            _packingItemUpdater.AddPackingItem(item);
            await _context.SaveChangesAsync();
            return Ok(true);
        }

        [HttpPut]
        public async Task<IActionResult> Update(UpdatePackingItemMessage item)
        {
            _packingItemUpdater.UpdatePackingItem(item);
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
                _context.TagForPackingItems.Remove(tagLink);
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