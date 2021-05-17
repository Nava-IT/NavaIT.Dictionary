using Microsoft.AspNetCore.Mvc;
using NavaIT.Dictionary.Core;
using System;
using System.Collections.Generic;

namespace NavaIT.Dictionary.App.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DictionaryController : ControllerBase
    {
        internal IDictionaryBussiness DictionaryBussiness { get; }

        public DictionaryController(IDictionaryBussiness dictionaryBussiness) : base()
        {
            DictionaryBussiness = dictionaryBussiness;
        }

        [HttpGet]
        [Route("search")]
        public SearchResult[] Search(string q)
        {
            return DictionaryBussiness.Search(q);
        }

        [HttpGet]
        [Route("extract")]
        public PageResult Extract(string term)
        {
            return DictionaryBussiness.Extract(term);
        }

        [HttpGet]
        [Route("scopes")]
        public String[] Scopes()
        {
            return DictionaryBussiness.Scopes();
        }

        [HttpGet]
        [Route("scope")]
        public String[] Scope(string name)
        {
            return DictionaryBussiness.Scope(name);
        }
    }
}
