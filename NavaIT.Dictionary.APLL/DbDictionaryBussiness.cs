using NavaIT.Dictionary.Core;
using System;
using System.Collections.Generic;
using System.Linq;

namespace NavaIT.Dictionary.APLL
{
    internal class DbDictionaryBussiness : IDictionaryBussiness
    {

        private IDbDictionaryDA DictionaryDA { get; }

        public DbDictionaryBussiness(IDbDictionaryDA dictionaryDA)
        {
            DictionaryDA = dictionaryDA;
        }

        public PageResult[] Extract(string term)
        {
            if (string.IsNullOrEmpty(term)) return null;

            List<ExtractResult> r = DictionaryDA.Extract(term);

            var groups = r.GroupBy(a => a.TermName);
            var result = groups.Select(g =>
            {
                var termDefs = g.GroupBy(a => string.Join(",",
                new String[] { a.TermName, a.Equivalent, a.ReferenceWorksheetName, a.Definition }.Union(
                    a.ReferredTo.OrderBy(s => s)).ToArray()).ToUpper());
                return new PageResult()
                {
                    Term = g.Key,
                    Descriptions = termDefs.Select(a => new DescriptionPart()
                    {
                        Description = a.First().Definition,
                        ReferenceWorksheetName = a.First().ReferenceWorksheetName,
                        ForeignEquivalents = a.First().ReferredTo.OrderBy(s => s).ToArray(),
                        Translation = a.First().Equivalent,
                        Scopes = a.Select(s => s.Scope).OrderBy(s => s).ToArray()

                    }).ToArray()
                };
            }).OrderBy(e => e.Term).ToArray();
            return result;
        }

        public SearchResult[] Search(string q)
        {
            var res = DictionaryDA.Search(q);
            return res?.Select(r => new SearchResult()
            {
                Title = $"{r.Title}",
                ShortDescription = $"({r.Scope}){r.Definition}"
            })?.ToArray();

        }

        public string[] Scopes()
        {
            return DictionaryDA.Scopes();
        }

        public string[] Scope(string name)
        {
            return DictionaryDA.Scope(name);
        }
    }
}