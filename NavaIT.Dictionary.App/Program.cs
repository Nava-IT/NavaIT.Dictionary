using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using NLog.Web;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NavaIT.Dictionary.App
{
    public class Program
    {
        public static void Main(string[] args)
        {
            Console.WriteLine("ASPNETCORE_HOSTINGSTARTUPASSEMBLIES: " +
                Environment.GetEnvironmentVariable("ASPNETCORE_HOSTINGSTARTUPASSEMBLIES"));
            Console.WriteLine("DOTNET_ADDITIONAL_DEPS: " +
                Environment.GetEnvironmentVariable("DOTNET_ADDITIONAL_DEPS"));

            var logger = NLogBuilder.ConfigureNLog("nlog.config").GetCurrentClassLogger();
            try
            {
                logger.Debug("init main");
                CreateHostBuilder(args).Build().Run();
            }
            catch (Exception exception)
            {
                //NLog: catch setup errors
                logger.Error(exception, "Stopped program because of exception");
                throw;
            }
            finally
            {
                // Ensure to flush and stop internal timers/threads before application-exit (Avoid segmentation fault on Linux)
                NLog.LogManager.Shutdown();
            }
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    var a = WebHostDefaults.HostingStartupAssembliesKey;
                    webBuilder.UseSetting(WebHostDefaults.HostingStartupAssembliesKey, "NavaIT.Dictionary.APLL")
                        .UseUrls("http://localhost:5500")
                        .UseStartup<Startup>();
                }).ConfigureLogging(logging =>
                {
                    logging.ClearProviders();
                    logging.SetMinimumLevel(LogLevel.Trace);
                })
                .UseNLog(new NLogAspNetCoreOptions()
                {
                    IncludeScopes = true,
                });  // NLog: Setup NLog for Dependency injection
    }
}
