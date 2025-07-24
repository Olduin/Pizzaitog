using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using PizzaSales.Domain;

namespace PizzaSales.Infrastructure
{
    //public interface IPizzaContext
    //{

    //}
    public partial class PizzaContext : DbContext
    {
        public PizzaContext()
        {
        }

        public PizzaContext(DbContextOptions<PizzaContext> options)
            : base(options)
        {
        }

        public virtual DbSet<PizzaModel> Pizzas { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer("Data Source=localhost\\MSSQLSERVER01;Database=Pizza;Trusted_Connection=True;TrustServerCertificate=True");
        //=> optionsBuilder.UseSqlServer("Data Source=localhost\\SQLEXPRESS;Database=TestKotsiuck;Trusted_Connection=True;TrustServerCertificate=True");
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<PizzaModel>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK__Pizzas__3214EC075CEC0408");

                entity.Property(e => e.Id).ValueGeneratedOnAdd();
                entity.Property(e => e.Image).HasMaxLength(255);
                entity.Property(e => e.Name).HasMaxLength(100);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);

    }
}
