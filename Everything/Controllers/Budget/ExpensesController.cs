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
    public class ExpensesController : ControllerBase
    {
        readonly EverythingContext _context;

        public ExpensesController(EverythingContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("forBudget/{id:int}")]///forDate{date:DateTime}")]
        public IActionResult GetExpensesForDate(int id)//, DateTime date)
        {
            var expenses = _context.Expenses
                .Include(e => e.ExpenseBudget)
                .Where(e => e.ExpenseBudget.BudgetId == id)
                //.Where(e => e.Date.Month == date.Month && e.Date.Year == date.Year)
                .Select(e =>
                    new GetExpenseMessage
                    {
                        Id = e.Id,
                        Name = e.Name,
                        Description = e.Description,
                        Amount = e.Amount,
                        ExpenseBudgetId = e.ExpenseBudgetId,
                        Date = e.Date
                    });

            return Ok(expenses);
        }


        [HttpPost]
        public async Task<IActionResult> Create(CreateExpenseMessage item)
        {
            var source = new Expense
            {
                Name = item.Name,
                Description = item.Description,
                Amount = item.Amount,
                ExpenseBudgetId = item.ExpenseBudgetId,
                Date = item.Date
            };

            _context.Add(source);
            await _context.SaveChangesAsync();
            return Ok(true);
        }

        [HttpPut]
        public async Task<IActionResult> Update(UpdateExpenseMessage item)
        {
            var source = _context.Expenses.FirstOrDefault(l => l.Id == item.Id);
            source.Name = item.Name;
            source.Description = item.Description;
            source.Amount = item.Amount;
            source.ExpenseBudgetId = item.ExpenseBudgetId;
            source.Date = item.Date;
            await _context.SaveChangesAsync();
            return Ok(true);
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            var source = await _context.Expenses.FirstOrDefaultAsync(p => p.Id == id);
            _context.Remove(source);
            await _context.SaveChangesAsync();
            return Ok(true);
        }
    }
}