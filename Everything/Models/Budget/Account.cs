using System.Collections.Generic;

namespace everything.Models
{
    public class Account
    {
        public Account()
        {
            IncomeDeposits = new List<IncomeSource>();
            IncomeDeductionDeposits = new List<IncomeSourceDeduction>();
            ExpenseBudgetDeductions = new List<ExpenseBudget>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Amount { get; set; }
        public bool IsInvesting { get; set; }

        public int BudgetId { get; set; }
        public virtual Budget Budget { get; set; }

        public virtual IEnumerable<IncomeSource> IncomeDeposits { get; set; }
        public virtual IEnumerable<IncomeSourceDeduction> IncomeDeductionDeposits { get; set; }
        public virtual IEnumerable<ExpenseBudget> ExpenseBudgetDeductions { get; set; }
    }
}
