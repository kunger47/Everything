using System;

namespace everything.Models
{
    public class Expense
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }

        public int ExpenseBudgetId { get; set; }
        public virtual ExpenseBudget ExpenseBudget { get; set; }
    }
}
