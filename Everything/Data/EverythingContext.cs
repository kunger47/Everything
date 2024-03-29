using Microsoft.EntityFrameworkCore;
using everything.Models;
using System.Linq;

namespace everything.Data
{
    public class EverythingContext : DbContext
    {
        public EverythingContext(DbContextOptions<EverythingContext> options)
            : base(options) { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<User>().ToTable("Users");

            builder.Entity<ToDoBoard>().ToTable("ToDoBoardFolders");
            builder.Entity<ToDoBoard>().ToTable("ToDoBoards");
            builder.Entity<ToDoColumn>().ToTable("ToDoColumns");
            builder.Entity<ToDoItem>().ToTable("ToDoItems");
            builder.Entity<ToDoItemTask>().ToTable("ToDoItemTasks");

            builder.Entity<Lift>().ToTable("Lifts");
            builder.Entity<LiftDayPlan>().ToTable("LiftDayPlans");
            builder.Entity<LiftSet>().ToTable("LiftSets");
            builder.Entity<LiftSetLink>().ToTable("LiftSetLinks");
            builder.Entity<LiftingWorkout>().ToTable("LiftingWorkouts");
            builder.Entity<MuscleGroup>().ToTable("MuscleGroups");
            builder.Entity<MuscleGroupForLift>().ToTable("MuscleGroupForLifts");
            builder.Entity<MuscleGroupForLiftDayPlan>().ToTable("MuscleGroupForLiftDayPlans");

            builder.Entity<Budget>().ToTable("Budgets");
            builder.Entity<Account>().ToTable("Accounts");
            builder.Entity<ExpenseBudget>().ToTable("ExpenseBudgets");
            builder.Entity<Expense>().ToTable("Expenses");
            builder.Entity<IncomeSource>().ToTable("IncomeSources");
            builder.Entity<IncomeSourceDeduction>().ToTable("IncomeSourceDeductions");

            builder.Entity<Question>().ToTable("Questions");
            builder.Entity<QuestionCategory>().ToTable("QuestionCategories");
            builder.Entity<Game>().ToTable("Games");
            builder.Entity<Player>().ToTable("Players");
            builder.Entity<GameQuestion>().ToTable("GameQuestions");
            builder.Entity<QuestionAnswer>().ToTable("QuestionAnswers");

            builder.Entity<TravelTag>().ToTable("TravelTags");
            builder.Entity<PackingItem>().ToTable("PackingItems");
            builder.Entity<TagForPackingItem>().ToTable("TagForPackingItems");
            builder.Entity<TagForTrip>().ToTable("TagForTrips");
            builder.Entity<Trip>().ToTable("Trips");
            builder.Entity<TripFolder>().ToTable("TripFolders");
            builder.Entity<TripPackingItem>().ToTable("TripPackingItems");

            foreach (var relationship in builder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys()))
            {
                relationship.DeleteBehavior = DeleteBehavior.Restrict;
            }

            base.OnModelCreating(builder);
        }

        public DbSet<User> Users { get; set; }

        public DbSet<ToDoBoardFolder> ToDoBoardFolders { get; set; }
        public DbSet<ToDoBoard> ToDoBoards { get; set; }
        public DbSet<ToDoColumn> ToDoColumns { get; set; }
        public DbSet<ToDoItem> ToDoItems { get; set; }
        public DbSet<ToDoItemTask> ToDoItemTasks { get; set; }

        public DbSet<Lift> Lifts { get; set; }
        public DbSet<LiftDayPlan> LiftDayPlans { get; set; }
        public DbSet<LiftSet> LiftSets { get; set; }
        public DbSet<LiftSetLink> LiftSetLinks { get; set; }
        public DbSet<LiftingWorkout> LiftingWorkouts { get; set; }
        public DbSet<MuscleGroup> MuscleGroups { get; set; }
        public DbSet<MuscleGroupForLift> MuscleGroupForLifts { get; set; }
        public DbSet<MuscleGroupForLiftDayPlan> MuscleGroupForLiftDayPlans { get; set; }

        public DbSet<Budget> Budgets { get; set; }
        public DbSet<Account> Accounts { get; set; }
        public DbSet<IncomeSource> IncomeSources { get; set; }
        public DbSet<IncomeSourceDeduction> IncomeSourceDeductions { get; set; }
        public DbSet<ExpenseBudget> ExpenseBudgets { get; set; }
        public DbSet<Expense> Expenses { get; set; }

        public DbSet<Question> Questions { get; set; }
        public DbSet<QuestionCategory> QuestionCategories { get; set; }
        public DbSet<Game> Games { get; set; }
        public DbSet<Player> Players { get; set; }
        public DbSet<GameQuestion> GameQuestions { get; set; }
        public DbSet<QuestionAnswer> QuestionAnswers { get; set; }

        public DbSet<TravelTag> TravelTags { get; set; }
        public DbSet<PackingItem> PackingItems { get; set; }
        public DbSet<TagForPackingItem> TagForPackingItems { get; set; }
        public DbSet<TagForTrip> TagForTrips { get; set; }
        public DbSet<Trip> Trips { get; set; }
        public DbSet<TripFolder> TripFolders { get; set; }
        public DbSet<TripPackingItem> TripPackingItems { get; set; }
    }
}