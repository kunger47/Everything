namespace everything.Controllers
{
    public class GetIncomeSourceMessage
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Amount { get; set; }
        public int BudgetId { get; set; }
        public int? DepositAccountId { get; set; }
    }

    public class CreateIncomeSourceMessage
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Amount { get; set; }
        public int BudgetId { get; set; }
        public int? DepositAccountId { get; set; }
    }

    public class UpdateIncomeSourceMessage
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Amount { get; set; }
        public int? DepositAccountId { get; set; }
    }
}
