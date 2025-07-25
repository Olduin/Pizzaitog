using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PizzaSales.Infrastructure;
using Domain;


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

        // get api/pizzas/5
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
                
        [HttpPost]
        public IActionResult PizzaCreate(PizzaModel pizza)
        {      
            if (pizza == null)
            {
                //Добавление
                var _newItem = new PizzaModel(pizza);
                _repository.PizzaAdd(_newItem);
            }
            _repository.Save();
            return Ok(pizza);
            //return RedirectToAction("Index");

            return CreatedAtAction(nameof(pizza), new { id = pizza.Id }, pizza);
        }

        [HttpPut("{id}")]
        public IActionResult PizzaUpdate(PizzaModel pizza) 
        {
            if (pizza.Id.HasValue)
            {
                //Обновление
                var _item = _repository.PizzaGetById(pizza.Id.Value);
                if (_item != null)
                {
                    _item.Name = pizza.Name;
                    _item.Ingredients = pizza.Ingredients;
                    _item.Image = pizza.Image;
                    _item.Weight = pizza.Weight;
                    _item.Price = pizza.Price;

                    //_repository.PizzaUpdate(_item);
                    _repository.Save();
                   
                }

            }
            return Ok(pizza);

        }

        // DELETE api/pizzas/5
        [HttpDelete("{id}")]
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
