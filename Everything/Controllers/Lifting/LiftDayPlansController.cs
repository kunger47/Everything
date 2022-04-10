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
            return Ok(await _context.LiftDayPlans.ToListAsync());
        }

        [HttpPost]
        public async Task<IActionResult> Create(LiftDayPlan item)
        {
            item.CreatedDate = DateTime.Now;
            _context.Add(item);
            await _context.SaveChangesAsync(); 
            return Ok(item);
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            var item = await _context.LiftDayPlans.FirstOrDefaultAsync(p => p.Id == id);
            _context.LiftDayPlans.Remove(item);
            await _context.SaveChangesAsync(); 
            return NoContent();
        }
    }
}