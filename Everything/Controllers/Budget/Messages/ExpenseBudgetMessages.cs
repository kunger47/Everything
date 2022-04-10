namespace everything.Controllers
{
    public class GetExpenseBudgetMessage
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Amount { get; set; }
        public bool IsActual { get; set; }
        public int BudgetId { get; set; }
        public int? DeductionAccountId { get; set; }
    }

    public class CreateExpenseBudgetMessage
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Amount { get; set; }
        public bool IsActual { get; set; }
        public int BudgetId { get; set; }
        public int? DeductionAccountId { get; set; }
    }

    public class UpdateExpenseBudgetMessage
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Amount { get; set; }
        public bool IsActual { get; set; }
        public int? DeductionAccountId { get; set; }
    }
}
