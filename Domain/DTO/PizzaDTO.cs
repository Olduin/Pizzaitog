using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Domain.DTO
{
    public class PizzaDTO
    {
        public int? Id { get; set; }
        public string Name { get; set; }
       // public string Image { get; set; }
        public IFormFile? Image {  get; set; }
        public string Ingredients { get; set; }
        public int Price { get; set; }
        public int Weight { get; set; }
    }
}
