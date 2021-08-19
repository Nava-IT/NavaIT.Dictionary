using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using RestSharp;

namespace NavaIT.Dictionary.Web.Utils
{
    public class ServiceUtil : IServiceUtil
    {
        private ILogger<ServiceUtil> _logger;

        public ServiceUtil(ILogger<ServiceUtil> logger)
        {
            _logger = logger;
        }
        public T Get<T>(string url)
        {
            var client = new RestClient();
            var req = new RestRequest(url);
            var resp = client.Get(req);
            if(resp.ErrorException != null)
            {
                _logger.LogError(resp.ErrorException, $"Calling {url} has error.");
            }
            return JsonConvert.DeserializeObject<T>(resp.Content);
        }
    }
}
