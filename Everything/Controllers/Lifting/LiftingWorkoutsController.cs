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
    public class LiftingWorkoutsController : ControllerBase
    {
        readonly EverythingContext _context;

        public LiftingWorkoutsController(EverythingContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("{date:datetime}")]
        public async Task<IActionResult> GetByDate(DateTime date)
        {
            return Ok(await _context.LiftingWorkouts
               .Where(w => w.Date.Date == date.Date)
                .Select(w => new GetLiftingWorkoutMessage
                {
                    Id = w.Id,
                    Date = w.Date,
                    Name = w.Name,
                    Notes = w.Notes
                }).ToListAsync());
        }

        [HttpGet]
        [Route("{id:int}")]
        public IActionResult GetById(int id)
        {
            var w = _context.LiftingWorkouts
                .Include(w => w.LiftSetLinks)
                    .ThenInclude(l => l.Lift)
                .FirstOrDefault(w => w.Id == id);

            return Ok(new GetLiftingWorkoutwithSetsMessage
            {
                Id = w.Id,
                Date = w.Date,
                Name = w.Name,
                Notes = w.Notes,
                LiftSetLinks = w.LiftSetLinks.Select(l => new GetSimpleLiftSetLinkForMessage { Id = l.Id, Name = l.Lift.Name }).ToList()
            });
        }

        [HttpPost]
        [Route("{liftDayPlanId:int}")]
        public async Task<IActionResult> Create(int liftDayPlanId, CreateLiftingWorkoutMessage item)
        {
            var workout = new LiftingWorkout
            {
                Date = item.Date ?? DateTime.Now.Date,
                Name = item.Name,
                Notes = item.Notes
            };

            var liftplan = await _context.LiftDayPlans
                .Include(p => p.MuscleGroupForLiftsLinks)
                    .ThenInclude(l => l.MuscleGroup)
                        .ThenInclude(g => g.MuscleGroupForLiftsLinks)
                            .ThenInclude(l => l.Lift)
                .FirstOrDefaultAsync(p => p.Id == liftDayPlanId);

            foreach (var group in liftplan.MuscleGroupForLiftsLinks.Select(l => l.MuscleGroup))
            {
                var lifts = group.MuscleGroupForLiftsLinks.Select(l => l.Lift).ToList();
                ArrayHelper.Shuffle(lifts);
                workout.LiftSetLinks.Add(new LiftSetLink { Lift = lifts[0] });
                workout.LiftSetLinks.Add(new LiftSetLink { Lift = lifts[1] });
                workout.LiftSetLinks.Add(new LiftSetLink { Lift = lifts[2] });
            }

            _context.Add(workout);
            await _context.SaveChangesAsync();
            return Ok(item);
        }

        [HttpPut]
        public async Task<IActionResult> Update(UpdateLiftingWorkoutMessage item)
        {
            var workout = await _context.LiftingWorkouts.FirstOrDefaultAsync(p => p.Id == item.Id);
            workout.Name = item.Name;
            workout.Date = item.Date;
            workout.Notes = item.Notes;
            await _context.SaveChangesAsync();
            return Ok(item);
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            var item = await _context.LiftingWorkouts.FirstOrDefaultAsync(p => p.Id == id);
            _context.LiftingWorkouts.Remove(item);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}