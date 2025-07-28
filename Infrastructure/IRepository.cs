using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace PizzaSales.Infrastructure
{
    public interface IRepository<T> : IDisposable where T : class
    {
        Task<List<T>> PizzaGetAll();
        T PizzaGetById(int? id);
        void PizzaDelete(int? id);
        void PizzaAdd(T item);
        void PizzaUpdate(T item);
        void Save();
    }
}
