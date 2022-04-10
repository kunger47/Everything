namespace everything.Controllers
{
    public class GetAccountMessage
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool IsInvesting { get; set; }
        public decimal Amount { get; set; }
        public int BudgetId { get; set; }
    }


    public class CreateAccountMessage
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Amount { get; set; }
        public bool IsInvesting { get; set; }
        public int BudgetId { get; set; }
    }

    public class UpdateAccountMessage
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Amount { get; set; }
        public string Description { get; set; }
        public bool IsInvesting { get; set; }
    }
}
