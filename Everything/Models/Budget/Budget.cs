using System;
using System.Collections.Generic;

namespace everything.Models
{
    public class Budget
    {
        public Budget()
        {
            Accounts = new List<Account>();
            IncomeSources = new List<IncomeSource>();
            ExpenseBudgets = new List<ExpenseBudget>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedDate { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }

        public virtual IEnumerable<Account> Accounts { get; set; }
        public virtual IEnumerable<IncomeSource> IncomeSources { get; set; }
        public virtual IEnumerable<ExpenseBudget> ExpenseBudgets { get; set; }
    }
}
