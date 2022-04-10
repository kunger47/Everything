namespace everything.Models
{
    public class MuscleGroupForLift
    {
        public int Id { get; set; }
        
        public int MuscleGroupId { get; set; }
        public virtual MuscleGroup MuscleGroup { get; set; }
        public int LiftId { get; set; }
        public virtual Lift Lift { get; set; }
    }
}
