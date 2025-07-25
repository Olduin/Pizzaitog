using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PizzaSales.Infrastructure;
using PizzaSales.Domain;


namespace PizzaSales.PizzaAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PizzaController : ControllerBase
    {
        private readonly IRepository<PizzaModel> _repository;
        private readonly ILogger _logger;

        public PizzaController(ILogger<PizzaController> logger, IRepository<PizzaModel> repository)
        {
            _logger = logger;
            _repository = repository;
        }

        [HttpGet]
        public IActionResult PizzaGetAll()
        {
            _logger.LogInformation("Запрошен список всех пицц (JSON)");
            try
            {
                var pizzas = _repository.PizzaGetAll();
                if (pizzas == null)
                {
                    _logger.LogWarning("Пиццы не найдены (PizzaGetAll вернул null)");
                    return Problem(detail: "Пицца не найдена");
                }
                return new JsonResult(pizzas);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ошибка при получении списка пицц");
                return Problem(detail: "Произошла ошибка на сервере");
            }            
        }

        [HttpGet("{id}")]
        public IActionResult GetPizzaById(int id)
        {
            _logger.LogInformation("Запрошена пицца по ID: {PizzaId}", id);
            try
            {
                var pizza = _repository.PizzaGetById(id);
                if (pizza == null)
                {
                    _logger.LogWarning("Пицца с ID {PizzaId} не найдена", id);
                    return Problem(detail: "Пицца не найдена");
                }

                return new JsonResult(pizza);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ошибка при получении пиццы по ID {PizzaId}", id);
                return Problem(detail: "Произошла ошибка на сервере");
            }
        }

        [HttpPost("{id}")]
        public ActionResult PizzaDelete(int? id)
        {
            if (id != null)
            {
                _repository.PizzaDelete(id);
                _repository.Save();
                return RedirectToAction("Index");
            }
            return NotFound();

        }

    }
}
