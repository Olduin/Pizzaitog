using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class PizzaModel
    {
        [Key]
        public int? Id { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }
        public string Ingredients { get; set; }
        public int Price { get; set; }
        public int Weight { get; set; }

        public PizzaModel() { }

        public PizzaModel(PizzaModel pizzaModel)
        {
            Id = pizzaModel.Id;
            Name = pizzaModel.Name;
            Image = pizzaModel.Image;
            Ingredients = pizzaModel.Ingredients;
            Price = pizzaModel.Price;
            Weight = pizzaModel.Weight;
        }
    }
}
