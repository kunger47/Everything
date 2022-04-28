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
    public class LiftsController : ControllerBase
    {
        readonly EverythingContext _context;

        public LiftsController(EverythingContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _context.Lifts.ToListAsync());
        }

        [HttpGet]
        [Route("musclegroup/{groupId:int}")]
        public IActionResult GetForGroup(int groupId)
        {
            return Ok(_context.MuscleGroupForLifts
                .Include(p => p.Lift)
                .Where(l => l.MuscleGroupId == groupId)
                .Select(l => l.Lift));
        }

        [HttpGet]
        [Route("plan/{planId:int}")]
        public IActionResult GetForPlan(int planId)
        {
            return Ok(_context.MuscleGroupForLifts
                .Include(g => g.Lift)
                .Include(g => g.MuscleGroup)
                    .ThenInclude(mp => mp.MuscleGroupForPlanLinks)
                .Where(g => g.MuscleGroup.MuscleGroupForPlanLinks.Any(l => l.LiftDayPlanId == planId))
                .Select(g => g.Lift));
        }

        [HttpPost]
        public async Task<IActionResult> Create(Lift item)
        {
            item.CreatedDate = DateTime.Now;
            _context.Add(item);
            await _context.SaveChangesAsync();
            return Ok(item);
        }

        [HttpPut]
        public async Task<IActionResult> Update(Lift item)
        {
            var lift = _context.Lifts.FirstOrDefault(l => l.Id == item.Id);
            lift.VideoLink = item.VideoLink;
            await _context.SaveChangesAsync();
            return Ok(item);
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            var lift = await _context.Lifts.FirstOrDefaultAsync(p => p.Id == id);
            _context.Lifts.Remove(lift);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}