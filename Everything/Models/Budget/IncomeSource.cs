using System.Collections.Generic;

namespace everything.Models
{
    public class IncomeSource
    {
        public IncomeSource()
        {
            Deductions = new List<IncomeSourceDeduction>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Amount { get; set; }

        public int BudgetId { get; set; }
        public virtual Budget Budget { get; set; }

        //thinking this will only be used for savings accounts?
        public int? DepositAccountId { get; set; }
        public virtual Account DepositAccount { get; set; }

        public virtual IEnumerable<IncomeSourceDeduction> Deductions { get; set; }

        // TODO: freqency?
    }
}
