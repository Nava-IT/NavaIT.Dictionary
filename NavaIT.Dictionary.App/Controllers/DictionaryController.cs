using Microsoft.AspNetCore.Mvc;
using NavaIT.Dictionary.Logging;
using NavaIT.Dictionary.Core;
using System;
using System.Collections.Generic;
using Microsoft.Extensions.Logging;

namespace NavaIT.Dictionary.App.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DictionaryController : ControllerBase
    {
        private readonly ILogger<DictionaryController> _logger;

        internal IDictionaryBussiness DictionaryBussiness { get; }

        public DictionaryController(IDictionaryBussiness dictionaryBussiness, ILogger<DictionaryController> logger) : base()
        {
            _logger = logger;
            DictionaryBussiness = dictionaryBussiness;
        }

        [HttpGet]
        [Route("search")]
        public SearchResult[] Search(string q)
        {
            _logger.Debug(EventIds.StartMethod, new { Method = "Sreach", Parameters = new[] { new { q } } });
            return DictionaryBussiness.Search(q);
        }

        [HttpGet]
        [Route("extract")]
        public PageResult[] Extract(string term)
        {
            _logger.Info(EventIds.StartMethod, new { Method = "Extract", Parameters = new[] { new { term } } });
            return DictionaryBussiness.Extract(term);
        }

        [HttpGet]
        [Route("scopes")]
        public String[] Scopes()
        {
            _logger.Debug(EventIds.StartMethod, new { Method = "Scopes" });
            return DictionaryBussiness.Scopes();
        }

        [HttpGet]
        [Route("scope")]
        public String[] Scope(string name)
        {
            _logger.Debug(EventIds.StartMethod, new { Method = "Extract", Parameters = new[] { new { name } } });
            return DictionaryBussiness.Scope(name);
        }
    }
}
