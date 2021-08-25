using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using NavaIT.Dictionary.Core;
using NavaIT.Dictionary.Logging;
using NavaIT.Dictionary.Web.Configuration;
using NavaIT.Dictionary.Web.Models;
using NavaIT.Dictionary.Web.Utils;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace NavaIT.Dictionary.Web.Controllers
{
    [Route("/")]
    public class HomeController : Controller
    {
        private readonly IServiceUtil _serviceUtil;
        private readonly ILogger<HomeController> _logger;
        private readonly ExternalServicesConfiguration _ServiceConfiguration;

        public HomeController(ILogger<HomeController> logger, IServiceUtil serviceUtil
            , IOptions<ExternalServicesConfiguration> serviceConfiguration)
        {
            _serviceUtil = serviceUtil;
            _logger = logger;
            _ServiceConfiguration = serviceConfiguration.Value;
        }

        public IActionResult Index()
        {
            _logger.Debug(EventIds.StartMethod, new { Method = "Index" });
            var model = _serviceUtil.Get<string[]>($"{_ServiceConfiguration.Apll.BaseUrl}/dictionary/Scopes");
            return View(model);
        }

        [HttpGet("/dictionary/{term?}")]
        public IActionResult Dictionary(string term)
        {
            _logger.Debug(EventIds.StartMethod, new { Method = "Dictionary", Parameters = new[] { new { term = term } } });
            try
            {
                _logger.Info(EventIds.ReadingDataIsStarted, new { Url = $"{ _ServiceConfiguration.Apll.BaseUrl}/dictionary/Extract?term={term}" });
                var model = _serviceUtil.Get<PageResult[]>(
                    $"{ _ServiceConfiguration.Apll.BaseUrl}/dictionary/Extract?term={term}");
                _logger.Info(EventIds.ReadingDataIsEnded, new { Url = $"{ _ServiceConfiguration.Apll.BaseUrl}/dictionary/Extract?term={term}" });
                return View("Dictionary", model);
            }
            catch (Exception ex)
            {
                _logger.Error(EventIds.ReadingDataHasError, new { Url = $"{ _ServiceConfiguration.Apll.BaseUrl}/dictionary/Extract?term={term}" }, ex);
                return View("Dictionary");
            }
        }

        [HttpGet("/scope/{scope}")]
        public IActionResult Scope(string scope)
        {
            _logger.Debug(EventIds.StartMethod, new { Method = "Scope", Parameters = new[] { new { term = scope } } });
            try
            {
                _logger.Info(EventIds.ReadingDataIsStarted, new { Url = $"{ _ServiceConfiguration.Apll.BaseUrl}/dictionary/Scope?name={scope}" });
                var model = _serviceUtil.Get<string[]>($"{ _ServiceConfiguration.Apll.BaseUrl}/dictionary/Scope?name={scope}");
                _logger.Info(EventIds.ReadingDataIsEnded, new { Url = $"{ _ServiceConfiguration.Apll.BaseUrl}/dictionary/Scope?name={scope}" });
                return View(model);
            }
            catch (Exception ex)
            {
                _logger.Error(EventIds.ReadingDataHasError, new { Url = $"{ _ServiceConfiguration.Apll.BaseUrl}/dictionary/Scope?name={scope}" }, ex);
                return View("Dictionary");
            }
        }

        [HttpGet("/search")]
        public IActionResult Search(string term)
        {
            return Redirect($"/dictionary/{term}");
        }

        /*        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
                public IActionResult Error()
                {
                    return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
                }*/
    }
}
