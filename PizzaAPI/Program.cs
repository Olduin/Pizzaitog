using Domain;
using Domain.Logger;
using Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using PizzaSales.Domain;
using PizzaSales.Domain.Logger;
using PizzaSales.Infrastructure;
using System.Threading.Tasks;

internal class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        string connetion = builder.Configuration.GetConnectionString("DefaultConnection");
        var logFilePath = builder.Configuration["Logging:FileLogger:Path"];

        //var section = builder.Configuration.GetSection("Logging: File");
        builder.Logging.AddFile(logFilePath);

        // Add services to the container.
        builder.Services.AddControllersWithViews();
        builder.Services.AddDbContext<PizzaContext>(options => options.UseSqlServer(connetion));
        builder.Services.AddScoped<IRepository<PizzaModel>, Repository>();
                  
        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (!app.Environment.IsDevelopment())
            if (!app.Environment.IsDevelopment())
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

        app.UseHttpsRedirection();
                
        app.UseDefaultFiles();

        app.UseStaticFiles();

        app.UseRouting();

        app.UseAuthorization();

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();

            //endpoints.MapFallbackToFile("index.html");
        });
        //app.MapControllerRoute(
        //    name: "default",
        //    pattern: "{controller=Home}/{action=Index}/{id?}");

        app.Run(async (context) =>
        {
            app.Logger.LogInformation($"Path: {context.Request.Path} Time:{DateTime.Now.ToLongTimeString()}");
            //await context.Response.WriteAsync("Hello");
            context.Response.StatusCode = 204; // No Content

        });

        app.Run();


    }
}
