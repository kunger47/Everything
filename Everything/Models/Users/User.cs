using System;
using System.Collections.Generic;

namespace everything.Models
{
    public class User
    {
        public User()
        {
            Budgets = new List<Budget>();

            Games = new List<Game>();
            QuestionCategories = new List<QuestionCategory>();

            ToDoBoardFolders = new List<ToDoBoardFolder>();
            ToDoBoards = new List<ToDoBoard>();

            MuscleGroups = new List<MuscleGroup>();
            LiftTypes = new List<LiftType>();
            LiftingWorkouts = new List<LiftingWorkout>();
            LiftDayPlans = new List<LiftDayPlan>();
            Lifts = new List<Lift>();

            TravelTags = new List<TravelTag>();
            PackingItems = new List<PackingItem>();
        }

        public int Id { get; set; }
        public DateTime CreatedDate { get; set; }
        public string Name { get; set; }

        public virtual IEnumerable<Budget> Budgets { get; set; }

        public virtual IEnumerable<Game> Games { get; set; }
        public virtual IEnumerable<QuestionCategory> QuestionCategories { get; set; }

        public virtual IEnumerable<ToDoBoardFolder> ToDoBoardFolders { get; set; }
        public virtual IEnumerable<ToDoBoard> ToDoBoards { get; set; }

        public virtual IEnumerable<MuscleGroup> MuscleGroups { get; set; }
        public virtual IEnumerable<LiftType> LiftTypes { get; set; }
        public virtual IEnumerable<LiftingWorkout> LiftingWorkouts { get; set; }
        public virtual IEnumerable<LiftDayPlan> LiftDayPlans { get; set; }
        public virtual IEnumerable<Lift> Lifts { get; set; }

        public virtual IEnumerable<TravelTag> TravelTags { get; set; }
        public virtual IEnumerable<PackingItem> PackingItems { get; set; }
    }
}
