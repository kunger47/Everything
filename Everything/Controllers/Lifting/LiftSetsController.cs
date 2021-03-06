using everything.Data;
using everything.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace everything.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LiftSetsController : ControllerBase
    {
        readonly EverythingContext _context;

        public LiftSetsController(EverythingContext context)
        {
            _context = context;
        }
        //TODO: Add check for current user

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _context.LiftSets.ToListAsync());
        }

        [HttpGet]
        [Route("{liftId:int}/{date:datetime}")]
        public IActionResult GetByLiftByDay(int liftId, DateTime date)
        {
            var sets = _context.LiftSets
                .Include(l => l.LiftSetLink)
                .ThenInclude(l => l.LiftingWorkout)
                .Where(l => l.LiftSetLink.LiftId == liftId && l.LiftSetLink.LiftingWorkout.Date == date);
            return Ok(sets);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateLiftSetMessage item)
        {
            var set = new LiftSet
            {
                Number = item.Number,
                Reps = item.Reps,
                Weight = item.Weight,
                LiftSetLinkId = item.LiftSetLinkId
            };

            _context.Add(set);
            await _context.SaveChangesAsync();
            return Ok(set);
        }

        [HttpPut]
        public async Task<IActionResult> Update(UpdateLiftSetMessage item)
        {
            var set = _context.LiftSets.FirstOrDefault(l => l.Id == item.Id);

            set.Number = item.Number;
            set.Reps = item.Reps;
            set.Weight = item.Weight;

            await _context.SaveChangesAsync();
            return Ok(item);
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var item = await _context.LiftSets.FirstOrDefaultAsync(p => p.Id == id);
            _context.LiftSets.Remove(item);
            await _context.SaveChangesAsync();
            return Ok(true);
        }
    }
}