using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using everything.Data;
using everything.Models;

namespace everything.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LiftDayPlansController : ControllerBase
    {
        readonly EverythingContext _context;

        public LiftDayPlansController(EverythingContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            //TODO: For current User
            return Ok(await _context.LiftDayPlans.ToListAsync());
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateLiftDayPlanMessage item)
        {
            var plan = new LiftDayPlan
            {
                CreatedDate = DateTime.Now,
                Name = item.Name,
                UserId = item.UserId
            };

            _context.Add(plan);
            await _context.SaveChangesAsync();
            return Ok(plan);
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            var item = await _context.LiftDayPlans
                //TODO: For Current User
                .FirstOrDefaultAsync(p => p.Id == id);
            _context.LiftDayPlans.Remove(item);
            await _context.SaveChangesAsync();
            return Ok(true);
        }
    }
}