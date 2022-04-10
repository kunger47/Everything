using everything.Data;
using everything.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace everything.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ExpenseBudgetsController : ControllerBase
    {
        readonly EverythingContext _context;

        public ExpenseBudgetsController(EverythingContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("forbudget/{id:int}")]
        public IActionResult GetExpenseBudgetsForBudget(int id)
        {
            var budgets = _context.Budgets
                .Include(b => b.ExpenseBudgets)
                .FirstOrDefault(l => l.Id == id)
                .ExpenseBudgets.Select(a =>
                    new GetExpenseBudgetMessage
                    {
                        Id = a.Id,
                        Name = a.Name,
                        Description = a.Description,
                        Amount = a.Amount,
                        BudgetId = a.BudgetId,
                        DeductionAccountId = a.DeductionAccountId,
                        IsActual = a.IsActual
                    });

            return Ok(budgets);
        }


        [HttpPost]
        public async Task<IActionResult> Create(CreateExpenseBudgetMessage item)
        {
            var source = new ExpenseBudget
            {
                Name = item.Name,
                Description = item.Description,
                Amount = item.Amount,
                DeductionAccountId = item.DeductionAccountId,
                BudgetId = item.BudgetId,
                IsActual = item.IsActual
            };

            _context.Add(source);
            await _context.SaveChangesAsync();
            return Ok(true);
        }

        [HttpPut]
        public async Task<IActionResult> Update(UpdateExpenseBudgetMessage item)
        {
            var source = _context.ExpenseBudgets.FirstOrDefault(l => l.Id == item.Id);
            source.Name = item.Name;
            source.Description = item.Description;
            source.Amount = item.Amount;
            source.DeductionAccountId = item.DeductionAccountId;
            source.IsActual = item.IsActual;
            await _context.SaveChangesAsync();
            return Ok(true);
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            var source = await _context.ExpenseBudgets.FirstOrDefaultAsync(p => p.Id == id);
            _context.Remove(source);
            await _context.SaveChangesAsync();
            return Ok(true);
        }
    }
}