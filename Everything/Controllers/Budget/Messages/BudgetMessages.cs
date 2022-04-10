using System;
using System.Collections.Generic;

namespace everything.Controllers
{
    public class GetBudgetMessage
    {
        public int Id { get; set; }
        public DateTime CreatedDate { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool IsActive { get; set; }
    }

    public class GetBudgetMessageWithEverything
    {
        public int Id { get; set; }
        public DateTime CreatedDate { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool IsActive { get; set; }

        public virtual IEnumerable<GetAccountMessage> Accounts { get; set; }
        public virtual IEnumerable<GetIncomeSourceMessage> IncomeSources { get; set; }
        public virtual IEnumerable<GetExpenseBudgetMessage> ExpenseBudgets { get; set; }
    }

    public class CreateBudgetMessage
    {
        public string Name { get; set; }
        public string Description { get; set; }
    }

    public class UpdateBudgetMessage
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
