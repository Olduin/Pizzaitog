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
       
        public PizzaController(IRepository<PizzaModel> repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public JsonResult Get()
        {
            return new JsonResult(_repository.PizzaGetAll());
        }

        ///Get api/pizzas
        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<PizzaModel>>> Get()
        //{
        //    return _repository.PizzaGetAll();
        //}

    }
}
