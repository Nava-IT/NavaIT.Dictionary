using NavaIT.Dictionary.Core;
using System.Data.SqlClient;
using Dapper;
using System.Linq;
using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;

namespace NavaIT.Dictionary.APLL
{
    public class DbDictionaryBussiness : IDictionaryBussiness
    {
        private IApplictionSetting ApplictionSetting { get; }
        public DbDictionaryBussiness(IApplictionSetting applictionSetting)
        {
            ApplictionSetting = applictionSetting;
        }
        public PageResult Extract(string term)
        {
            if (string.IsNullOrEmpty(term)) return null;
            string query = @"select new_worksheetId Id, new_Entry1worksheetIdName TermName, new_Entry2worksheetIdName Equivalent, new_Definition Definition, new_ScopeIdName Scope
from new_worksheet where new_Entry1worksheetIdName = @term

select new_ReferenceWorksheet ReferenceId, new_Entry1worksheetIdName ReferredTo
from new_worksheet where new_ReferenceWorksheetName = @term";
            using (var con = new SqlConnection(ApplictionSetting.ApllConnectionString))
            {
                var res = con.QueryMultiple(query, new { term = term });
                List<ExtractResult> r = res.Read<ExtractResult>().ToList();
                var s = res.Read<ReferredToResult>();
                r.ForEach(er => er.ReferredTo = s.Where(rt => rt.ReferenceId == er.Id).Select(rt => rt.ReferredTo).ToArray());

                var k = r.GroupBy(a => string.Join(",",
                    new String[] { a.TermName, a.Equivalent, a.Definition }.Union(
                        a.ReferredTo.OrderBy(s => s)).ToArray()).ToUpper());
                /*                DescriptionPart[] pd = r.Select(a =>
                                {
                                    List<string> strs = new List<string>();
                                    strs.Add(a.TermName);
                                    strs.AddRange(a.ReferredTo);

                                    return new DescriptionPart()
                                    {
                                        Description = a.Definition,
                                        Scopes = a.Scope
                                    };
                                }).ToArray();*/
                return new PageResult()
                {
                    Term = term,
                    Descriptions = k.Select(a => new DescriptionPart()
                    {
                        Description = a.First().Definition,
                        ForeignEquivalents = a.First().ReferredTo.OrderBy(s => s).ToArray(),
                        Translation = a.First().Equivalent,
                        Scopes = a.Select(s => s.Scope).OrderBy(s => s).ToArray()

                    }).ToArray()
                };
            }
        }

        public SearchResult[] Search(string q)
        {
            string query = @"select top 10 * from(
select distinct new_Entry1worksheetIdName Title, new_Definition Definition, new_ScopeIdName Scope from new_worksheet 
where new_Entry1worksheetIdName like '%'+@q+'%' 
union all
select distinct new_Entry2worksheetIdName Title, new_Definition Definition, new_ScopeIdName Scope from new_worksheet 
where new_Entry2worksheetIdName like '%'+@q+'%' 
) a order by 1";
            using (var con = new SqlConnection(ApplictionSetting.ApllConnectionString))
            {
                var res = con.Query<ApllSearchResult>(query, new { q = q });
                return res?.Select(r => new SearchResult()
                {
                    Title = $"{r.Title}",
                    ShortDescription = $"({r.Scope}){r.Definition}"
                })?.ToArray();
            }
        }

        private class ApllSearchResult
        {
            public object Title { get; internal set; }
            public object Scope { get; internal set; }
            public string Definition { get; internal set; }
        }

        private class ExtractResult : IComparable<ExtractResult>
        {
            public Guid Id { get; set; }
            public string TermName { get; set; }
            public string Equivalent { get; set; }
            public string Definition { get; set; }
            public string Scope { get; set; }
            public string[] ReferredTo { get; internal set; }

            public int CompareTo([AllowNull] ExtractResult other)
            {
                if (other == null)
                    return 1;
                if (string.Compare(TermName, other.TermName, true) != 0)
                    return string.Compare(TermName, other.TermName, true);
                if (string.Compare(Equivalent, other.Equivalent, true) != 0)
                    return string.Compare(Equivalent, other.Equivalent, true);
                if (string.Compare(Definition, other.Definition, true) != 0)
                    return string.Compare(Definition, other.Definition, true);
                if (ReferredTo == null)
                    return -1;
                else if (other.ReferredTo == null)
                    return 1;
                if (ReferredTo.Except(other.ReferredTo).Any())
                    return 1;
                else if (other.ReferredTo.Except(ReferredTo).Any())
                    return -1;
                return 0;
            }
        }

        private class ReferredToResult
        {
            public Guid ReferenceId { get; set; }
            public string ReferredTo { get; set; }
        }
    }
}