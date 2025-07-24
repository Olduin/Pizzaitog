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
       
        public PizzaController(ILogger<PizzaController> logger , IRepository<PizzaModel> repository)
        {
            //_logger = logger;
            _repository = repository;
        }

        [HttpGet]
        public JsonResult Get()
        {
            var pizzas = _repository.PizzaGetAll();
            return new JsonResult(pizzas);
        }

        [HttpGet]
        public JsonResult GetPizzaById(int id)
        {            
            var pizza = _repository.PizzaGetById(id);         
            if (pizza == null)
            {
                //return NotFound();
            }

            return new JsonResult(pizza);               
        }



    }
}
