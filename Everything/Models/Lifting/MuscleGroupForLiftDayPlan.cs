namespace everything.Models
{
    public class MuscleGroupForLiftDayPlan
    {
        public int Id { get; set; }

        public int MuscleGroupId { get; set; }
        public virtual MuscleGroup MuscleGroup { get; set; }
        public int LiftDayPlanId { get; set; }
        public virtual LiftDayPlan LiftDayPlan { get; set; }
    }
}
