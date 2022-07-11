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
    public class BudgetsController : ControllerBase
    {
        readonly EverythingContext _context;

        public BudgetsController(EverythingContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("")]
        public IActionResult GetAll()
        {
            return Ok(_context.Budgets
                .Select(l => new GetBudgetMessage
                {
                    Id = l.Id,
                    Name = l.Name,
                    IsActive = l.IsActive,
                    Description = l.Description,
                    CreatedDate = l.CreatedDate
                }));
        }

        [HttpGet]
        [Route("{id:int}")]
        public IActionResult GetBudget(int id)
        {
            var budget = _context.Budgets
                .Where(l => l.Id == id)
                .Select(l => new GetBudgetMessageWithEverything
                {
                    Id = l.Id,
                    Name = l.Name,
                    IsActive = l.IsActive,
                    Description = l.Description,
                    CreatedDate = l.CreatedDate,
                    IncomeSources = l.IncomeSources.Select(a => new GetIncomeSourceMessage
                    {
                        Id = a.Id,
                        Name = a.Name,
                        Description = a.Description,
                        Amount = a.Amount,
                        DepositAccountId = a.DepositAccountId,
                        BudgetId = l.Id
                    }),
                    ExpenseBudgets = l.ExpenseBudgets.Select(a => new GetExpenseBudgetMessage
                    {
                        Id = a.Id,
                        Name = a.Name,
                        Description = a.Description,
                        Amount = a.Amount,
                        IsActual = a.IsActual,
                        DeductionAccountId = a.DeductionAccountId,
                        BudgetId = l.Id
                    })
                })
                .FirstOrDefault();

            return Ok(budget);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateBudgetMessage item)
        {
            var budget = new Budget
            {
                Name = item.Name,
                Description = item.Description,
                CreatedDate = DateTime.Now,
                IsActive = true,
                UserId = item.UserId
            };

            _context.Add(budget);
            await _context.SaveChangesAsync();
            return Ok(true);
        }

        [HttpPut]
        public async Task<IActionResult> Update(UpdateBudgetMessage item)
        {
            var budget = _context.Budgets.FirstOrDefault(l => l.Id == item.Id);
            budget.Name = item.Name;
            budget.Description = item.Description;
            await _context.SaveChangesAsync();
            return Ok(true);
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            var budget = await _context.Budgets.FirstOrDefaultAsync(p => p.Id == id);
            budget.IsActive = false;
            await _context.SaveChangesAsync();
            return Ok(true);
        }
    }
}