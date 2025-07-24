using Domain.Logger;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;

namespace PizzaAPI
{
    public class Startup
    {
        
        public void Configure(IApplicationBuilder app, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddFile(Path.Combine(Directory.GetCurrentDirectory(), "Logger.txt"));
            var logger = loggerFactory.CreateLogger("FileLogger");

            app.Run(async (context) =>
            {
                logger.LogInformation("Processing request {0}", context.Request.Path);
                
            });
        }
    }
}
