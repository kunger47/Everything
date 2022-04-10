namespace everything.Models
{
    public class IncomeSourceDeduction
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Amount { get; set; } //percentage?

        public int IncomeSourceId { get; set; }
        public IncomeSource IncomeSource { get; set; }

        //Only used if the deduction is for like 401K or something like that
        public int? DepositAccountId { get; set; }
        public Account DepositAccount { get; set; }

        // TODO: freqency?
    }
}
