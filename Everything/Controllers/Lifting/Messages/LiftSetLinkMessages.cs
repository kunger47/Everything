using System.Collections.Generic;

namespace everything.Controllers
{
    public class GetLiftSetLinkMessage
    {
        public int Id { get; set; }
        public string Notes { get; set; }
        public GetLiftMessage Lift { get; set; }
        public IEnumerable<GetLiftSetMessage> Sets { get; set; }
    }
}
