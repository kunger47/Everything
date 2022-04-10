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
    public class IncomeSourcesController : ControllerBase
    {
        readonly EverythingContext _context;

        public IncomeSourcesController(EverythingContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("forbudget/{id:int}")]
        public IActionResult GetSourcesForBudget(int id)
        {
            var sources = _context.Budgets
                .Include(b => b.IncomeSources)
                .FirstOrDefault(l => l.Id == id)
                .IncomeSources.Select(a =>
                    new GetIncomeSourceMessage
                    {
                        Id = a.Id,
                        Name = a.Name,
                        Description = a.Description,
                        Amount = a.Amount,
                        BudgetId = a.BudgetId,
                        DepositAccountId = a.DepositAccountId
                    });

            return Ok(sources);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateIncomeSourceMessage item)
        {
            var source = new IncomeSource
            {
                Name = item.Name,
                Description = item.Description,
                Amount = item.Amount,
                DepositAccountId = item.DepositAccountId,
                BudgetId = item.BudgetId
            };

            _context.Add(source);
            await _context.SaveChangesAsync();
            return Ok(true);
        }

        [HttpPut]
        public async Task<IActionResult> Update(UpdateIncomeSourceMessage item)
        {
            var source = _context.IncomeSources.FirstOrDefault(l => l.Id == item.Id);
            source.Name = item.Name;
            source.Description = item.Description;
            source.Amount = item.Amount;
            source.DepositAccountId = item.DepositAccountId;
            await _context.SaveChangesAsync();
            return Ok(true);
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            var source = await _context.IncomeSources.FirstOrDefaultAsync(p => p.Id == id);
            _context.Remove(source);
            await _context.SaveChangesAsync();
            return Ok(true);
        }
    }
}