using everything.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace everything.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LiftSetLinksController : ControllerBase
    {
        readonly EverythingContext _context;

        public LiftSetLinksController(EverythingContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("{linkId:int}")]
        public IActionResult GetById(int linkId)
        {
            var l = _context.LiftSetLinks
                .Include(l => l.Lift)
                    .ThenInclude(l => l.LiftType)
                .Include(l => l.LiftSets)
                .Where(l => l.Id == linkId)
                .FirstOrDefault();

            return Ok(new GetLiftSetLinkMessage
            {
                Id = l.Id,
                Notes = l.Notes,
                Lift = new GetLiftMessage
                {
                    Id = l.Lift.Id,
                    Name = l.Lift.Name,
                    Description = l.Lift.Description,
                    LiftTypeName = l.Lift.LiftType.Name,
                    LiftTypeId = l.Lift.LiftType.Id,
                    VideoLink = l.Lift.VideoLink
                },
                Sets = l.LiftSets.Select(s => new GetLiftSetMessage
                {
                    Id = s.Id,
                    Number = s.Number,
                    Reps = s.Reps,
                    Weight = s.Weight,
                    LiftSetLinkId = s.LiftSetLinkId
                })
            });
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

        //[HttpPost]
        //public async Task<IActionResult> Create(Lift item)
        //{
        //    item.CreatedDate = DateTime.Now;
        //    _context.Add(item);
        //    await _context.SaveChangesAsync();
        //    return Ok(item);
        //}

        //[HttpDelete]
        //public async Task<IActionResult> Delete(int id)
        //{
        //    var lift = await _context.Lifts.FirstOrDefaultAsync(p => p.Id == id);
        //    _context.Lifts.Remove(lift);
        //    await _context.SaveChangesAsync();
        //    return NoContent();
        //}
    }
}