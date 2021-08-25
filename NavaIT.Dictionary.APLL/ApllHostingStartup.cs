using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using NavaIT.Dictionary.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

[assembly: HostingStartup(typeof(NavaIT.Dictionary.APLL.ApllHostingStartup))]

namespace NavaIT.Dictionary.APLL
{
    public class ApllHostingStartup : IHostingStartup
    {
        public void Configure(IWebHostBuilder builder)
        {
            builder.ConfigureServices(ConfigureServices);
        }

        private void ConfigureServices(IServiceCollection services)
        {
            services.AddScoped<IDbDictionaryDA, DbDictionaryDA>();
            services.AddScoped<IDictionaryBussiness, DbDictionaryBussiness>();
        }
    }
}
