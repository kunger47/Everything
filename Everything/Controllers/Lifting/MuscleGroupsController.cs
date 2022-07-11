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
    public class MuscleGroupsController : ControllerBase
    {
        readonly EverythingContext _context;

        public MuscleGroupsController(EverythingContext context)
        {
            _context = context;
        }
        //TODO: Add current user check

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _context.MuscleGroups.ToListAsync());
        }

        [HttpGet]
        [Route("{liftPlanDayId:int}")]
        public IActionResult GetForPlan(int liftPlanDayId)
        {
            return Ok(_context.MuscleGroupForLiftDayPlans
                .Include(p => p.MuscleGroup)
                .Where(l => l.LiftDayPlanId == liftPlanDayId)
                .Select(l => l.MuscleGroup));
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateMuscleGroupMessage item)
        {
            var group = new MuscleGroup
            {
                CreatedDate = DateTime.Now,
                Name = item.Name
            };

            _context.Add(group);
            await _context.SaveChangesAsync();
            return Ok(group);
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            var item = await _context.MuscleGroups.FirstOrDefaultAsync(p => p.Id == id);
            _context.MuscleGroups.Remove(item);
            await _context.SaveChangesAsync();
            return Ok(true);
        }
    }
}