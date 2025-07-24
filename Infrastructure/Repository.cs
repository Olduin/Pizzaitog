using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using PizzaSales.Infrastructure;
using PizzaSales.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure
{
    public class Repository : IRepository<PizzaModel>
    {
        private readonly ILogger<Repository> _logger;

        private PizzaContext _pizzaContext;

        //private readonly IDbContextFactory<PizzaContext> _pizzaContext;       

        //public Repository(ILogger<Repository> logger, IDbContextFactory<PizzaContext> dbContextFactory)
        //{
        //    _pizzaContext = dbContextFactory;
        //    // _logger = logger;
        //}

        public Repository()
        {
            _pizzaContext = new PizzaContext();
            // _logger = logger;
        }
        public Repository(ILogger<Repository> logger)
        {
            _pizzaContext = new PizzaContext();
           // _logger = logger;
        }

        public List<PizzaModel> PizzaGetAll()
        {
            var pizzas = _pizzaContext.Pizzas.ToList();
           // _logger.LogInformation("Выполнен запрос на получение всех пицц. Количество: {Count}", pizzas.Count());
            return pizzas;
        }

        public PizzaModel PizzaGetById(int? id)
        {
            _logger.LogInformation("Выполнен запрос на получение пиццы по ID: {Id}", id);
            var pizza = _pizzaContext.Pizzas.FirstOrDefault(p => p.Id == id);
            if (pizza == null)
            {
                _logger.LogWarning("Пицца с ID {Id} не найдена", id);
            }
            else
            {
                _logger.LogInformation("Пицца найдена: {Name}, Цена: {Price}", pizza.Name, pizza.Price);
            }
            return pizza;
        }

        public void PizzaAdd(PizzaModel pizza)
        {

            _pizzaContext.Pizzas.Add(pizza);
        }

        public void PizzaUpdate(PizzaModel pizza)
        {
            _pizzaContext.Entry(pizza).State = EntityState.Modified;
        }

        public void PizzaDelete(int? id)
        {
            var pizza = PizzaGetById(id);
            if (pizza != null)
            {
                _pizzaContext.Pizzas.Remove(pizza);
            }
        }

        public void Save()
        {
            _pizzaContext.SaveChanges();
        }

        public void Dispose()
        {
            //_logger.LogInformation("Repository disposed");
        }
    }
}
