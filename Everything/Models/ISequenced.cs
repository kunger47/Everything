namespace everything.Models
{
    public interface ISequenced : IIdentifiable
    {
        public int Sequence { get; set; }
    }
}
