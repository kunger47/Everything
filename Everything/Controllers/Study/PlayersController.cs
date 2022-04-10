using everything.Data;
using everything.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace everything.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PlayersController : ControllerBase
    {
        readonly EverythingContext _context;

        public PlayersController(EverythingContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("forGame/{id:int}")]
        public IActionResult GetPlayersForGame(int id)
        {
            var players = _context.Games
                .Include(b => b.Players)
                    .ThenInclude(p => p.QuestionAnswers)
                .FirstOrDefault(l => l.Id == id)
                    .Players.Select(a =>
                        new GetPlayerMessage
                        {
                            Id = a.Id,
                            Name = a.Name,
                            Amount = a.Amount,
                            ColorHexCode = a.ColorHexCode,
                            NumberOfRightAnswers = a.QuestionAnswers.Count(qa => qa.WasRight),
                            NumberOfWrongAnswers = a.QuestionAnswers.Count(qa => !qa.WasRight)
                        });

            return Ok(players);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreatePlayerMessage item)
        {
            var player = new Player
            {
                Name = item.Name,
                Amount = 0,
                GameId = item.gameId
            };

            _context.Add(player);
            await _context.SaveChangesAsync();
            return Ok(true);
        }

        [HttpPut]
        public async Task<IActionResult> Update(UpdatePlayerMessage item)
        {
            var player = _context.Players.FirstOrDefault(l => l.Id == item.Id);
            player.Name = item.Name;
            player.Amount = item.Amount;
            player.ColorHexCode = item.ColorHexCode;
            await _context.SaveChangesAsync();
            return Ok(true);
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var player = await _context.Players.FirstOrDefaultAsync(p => p.Id == id);
            _context.Remove(player);
            await _context.SaveChangesAsync();
            return Ok(true);
        }
    }
}