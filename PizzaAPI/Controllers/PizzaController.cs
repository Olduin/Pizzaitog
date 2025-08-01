using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PizzaSales.Infrastructure;
using Domain;
using System.Threading.Tasks;
using System.Net;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Domain.DTO;


namespace PizzaSales.PizzaAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PizzaController : ControllerBase
    {
        private readonly IRepository<PizzaModel> _repository;
        private readonly ILogger _logger;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public PizzaController(ILogger<PizzaController> logger, IRepository<PizzaModel> repository, IWebHostEnvironment appenvironment)
        {
            _logger = logger;
            _repository = repository;
            _webHostEnvironment = appenvironment;
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
                return Ok(pizzas);
                //return new JsonResult(pizza);
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

                return Ok(pizza);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ошибка при получении пиццы по ID {PizzaId}", id);
                return Problem(detail: "Произошла ошибка на сервере");
            }
        }
                
        [HttpPost]
        public IActionResult PizzaCreate([FromForm] PizzaDTO pizza)
        {
            PizzaModel _pizza = new PizzaModel();
            _pizza.Name = pizza.Name;
            _pizza.Ingredients = pizza.Ingredients;
            _pizza.Price = pizza.Price;
            _pizza.Weight = pizza.Weight;
                         
            _logger.LogInformation("Запрошено создание пиццы");
            try
            {
                if (pizza.Image != null)
                {
                    _pizza.Image = "/images/" + pizza.Image.FileName;

                    using (var fileStream = new FileStream(_webHostEnvironment.WebRootPath + _pizza.Image, FileMode.Create))
                    {
                        pizza.Image.CopyTo(fileStream);
                    }
                    var name = Request.Form["name"];
                }             

                _repository.PizzaAdd(_pizza);
                _repository.Save();
                return Ok(pizza);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ошибка при создании пиццы");
                return Problem(detail: "Произошла ошибка на сервере");
            }                          
        }

        [HttpPut("{id}")]
        public IActionResult PizzaUpdate([FromForm] PizzaDTO pizza)
        {
            if (pizza.Id.HasValue)
            {
                var _pizza = _repository.PizzaGetById(pizza.Id.Value);
                if (_pizza != null)
                {
                    _pizza.Name = pizza.Name;
                    _pizza.Ingredients = pizza.Ingredients;
                    _pizza.Price = pizza.Price;
                    _pizza.Weight = pizza.Weight;

                    if (pizza.Image != null)
                    {                       
                        _pizza.Image = "/images/" + pizza.Image.FileName;
                        if (pizza.Image.FileName != _pizza.Image)
                        {

                        }
                        var imagePath = Path.Combine(_webHostEnvironment.WebRootPath, _pizza.Image.TrimStart('/'));
                        using (var fileStream = new FileStream(imagePath, FileMode.Create))
                        {
                            pizza.Image.CopyTo(fileStream);
                        }
                    }

                    _repository.PizzaUpdate(_pizza);
                    _repository.Save();

                    return Ok(pizza);
                }
            }

            return NotFound();
        }

        // DELETE api/pizzas/5
        [HttpDelete("{id}")]
        public  IActionResult PizzaDelete(int? id)
        {
            if (id != null)
            {
                _repository.PizzaDelete(id);
                _repository.Save();                
            }
            return NoContent();

        }
    }
}
