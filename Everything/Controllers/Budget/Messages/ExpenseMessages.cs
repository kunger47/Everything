using System;

namespace everything.Controllers
{
    public class GetExpenseMessage
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
        public int ExpenseBudgetId { get; set; }
    }

    public class CreateExpenseMessage
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
        public int ExpenseBudgetId { get; set; }
    }

    public class UpdateExpenseMessage
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
        public int ExpenseBudgetId { get; set; }
    }
}
