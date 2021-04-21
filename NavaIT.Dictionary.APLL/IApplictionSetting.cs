using Microsoft.Extensions.Configuration;
using NavaIT.Dictionary.Core;

namespace NavaIT.Dictionary.APLL
{
    public interface IApplictionSetting : IApplictionSettingBase
    {
        string ApllConnectionString { get; }
    }

    public class ApplictionSetting : ApplictionSettingBase, IApplictionSetting
    {
        public ApplictionSetting(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        public string ApllConnectionString => Configuration.GetConnectionString("ApllConnectionString");

        public IConfiguration Configuration { get; }
    }
}