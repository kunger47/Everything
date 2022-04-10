using System.Collections.Generic;

namespace everything.Models
{
    public class ExpenseBudget
    {
        public ExpenseBudget()
        {
            Expenses = new List<Expense>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Amount { get; set; }
        public bool IsActual { get; set; }

        public int BudgetId { get; set; }
        public virtual Budget Budget { get; set; }

        //Only used if this is actual and is coming out of an Investing Account?
        public int? DeductionAccountId { get; set; }
        public virtual Account DeductionAccount { get; set; }

        public virtual IEnumerable<Expense> Expenses { get; set; }

        // TODO: freqency?
    }
}
