using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using NavaIT.Dictionary.Core;
using NavaIT.Dictionary.Web.Configuration;
using NavaIT.Dictionary.Web.Models;
using NavaIT.Dictionary.Web.Utils;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text.RegularExpressions;
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
            var model = GetScopes();
            return View(model);
        }

        [HttpGet("/dictionary/{term?}")]
        public IActionResult Dictionary(string term)
        {
            _logger.LogInformation($"{ _ServiceConfiguration.Apll.BaseUrl}/dictionary/Extract?term={term}");
            try
            {
                _logger.LogInformation($"/dictionary/{term} started.");
                var model = _serviceUtil.Get<PageResult[]>(
                    $"{ _ServiceConfiguration.Apll.BaseUrl}/dictionary/Extract?term={term}");
                _logger.LogInformation($"/dictionary/{term} end (model.count={model?.Count()}).");
                foreach (var page in model)
                {
                    foreach (var desc in page.Descriptions)
                    {
                        string[] parts = desc.Description?.Split(new string[] { "\n", "\r" }, StringSplitOptions.RemoveEmptyEntries);
                        if (parts != null)
                            desc.Description = string.Join(" </p><p class='description-paragraph'>", parts);
                    }
                }
                var view = View("Dictionary", model);
                return view;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"/dictionary/{term} has error.");
                return View("Dictionary");
            }
        }

        [HttpGet("/scope/{scope}")]
        public IActionResult Scope(string scope)
        {
            var model = _serviceUtil.Get<string[]>($"{ _ServiceConfiguration.Apll.BaseUrl}/dictionary/Scope?name={scope}");
            return View(model);
        }

        [HttpGet("/scopes")]
        public IActionResult Scopes()
        {
            string[] model = GetScopes();
            return View(model);
        }

        private string[] GetScopes()
        {
            return _serviceUtil.Get<string[]>($"{_ServiceConfiguration.Apll.BaseUrl}/dictionary/Scopes");
        }


        [HttpGet("/search")]
        public IActionResult Search(string term)
        {
            var searchResult = _serviceUtil.Get<SearchResult[]>($"{_ServiceConfiguration.Apll.BaseUrl}/dictionary/search?q={term}");
            var convertedSearchResult = searchResult?.Select(sr => new SearchResultUI()
            {
                Title = sr.Title,
                ShortDescription = sr.ShortDescription,
                UITitle = ToUITile(sr.Title, term)
            }).ToArray();
            ViewBag.Name = term;
            if (convertedSearchResult?.Length == 1 && Compare(convertedSearchResult[0].Title, term))
                return Redirect($"/dictionary/{term}");
            else
                return View(convertedSearchResult);
        }

        private const string accentsPattern = "[ًٌٍَُِّْ]?";
        private string ToUITile(string title, string term)
        {
            var pattern = $"({string.Join(accentsPattern, term.ToArray())})";
            return Regex.Replace(title, pattern, "<span class='searchText'>$1</span>");
        }

        private bool Compare(string title, string term)
        {
            return title == term;
        }

        /*        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
                public IActionResult Error()
                {
                    return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
                }*/
    }
}
