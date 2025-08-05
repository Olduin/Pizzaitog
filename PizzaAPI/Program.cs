using Infrastructure;
using PizzaSales.Infrastructure;
using Microsoft.Extensions.Logging;
using PizzaSales.Domain.Logger;
using Domain.Logger;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PizzaSales.Domain;
using Domain;

internal class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);


        // Add services to the container.
        builder.Services.AddControllersWithViews();
        builder.Services.AddDbContext<PizzaContext>(options => options.UseSqlServer());
        builder.Services.AddScoped<IRepository<PizzaModel>, Repository>();

        //builder.Logging.AddFile(Path.Combine(Directory.GetCurrentDirectory(), "logger.txt"));        
        builder.Logging.AddFile(Path.Combine("C:\\Temp", "logger.txt"));
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
