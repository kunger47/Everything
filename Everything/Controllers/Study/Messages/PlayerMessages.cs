namespace everything.Controllers
{
    public class GetPlayerMessage
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Amount { get; set; }
        public string ColorHexCode { get; set; }
        public int NumberOfRightAnswers { get; set; }
        public int NumberOfWrongAnswers { get; set; }
    }

    public class CreatePlayerMessage
    {
        public string Name { get; set; }
        public int gameId { get; set; }
    }

    public class UpdatePlayerMessage
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Amount { get; set; }
        public string ColorHexCode { get; set; }
    }
}
