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
    public class AccountsController : ControllerBase
    {
        readonly EverythingContext _context;

        public AccountsController(EverythingContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("forbudget/{id:int}")]
        public IActionResult GetAccountsForBudget(int id)
        {
            var accounts = _context.Budgets
                .Include(b => b.Accounts)
                .FirstOrDefault(l => l.Id == id)
                .Accounts.Select(a =>
                    new GetAccountMessage
                    {
                        Id = a.Id,
                        Name = a.Name,
                        Description = a.Description,
                        Amount = a.Amount,
                        IsInvesting = a.IsInvesting,
                        BudgetId = a.BudgetId
                    });

            return Ok(accounts);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateAccountMessage item)
        {
            var account = new Account
            {
                Name = item.Name,
                Description = item.Description,
                Amount = item.Amount,
                IsInvesting = item.IsInvesting,
                BudgetId = item.BudgetId
            };

            _context.Add(account);
            await _context.SaveChangesAsync();
            return Ok(true);
        }

        [HttpPut]
        public async Task<IActionResult> Update(UpdateAccountMessage item)
        {
            var account = _context.Accounts.FirstOrDefault(l => l.Id == item.Id);
            account.Name = item.Name;
            account.Description = item.Description;
            account.Amount = item.Amount;
            account.IsInvesting = item.IsInvesting;
            await _context.SaveChangesAsync();
            return Ok(true);
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            var account = await _context.Accounts.FirstOrDefaultAsync(p => p.Id == id);
            _context.Remove(account);
            await _context.SaveChangesAsync();
            return Ok(true);
        }
    }
}