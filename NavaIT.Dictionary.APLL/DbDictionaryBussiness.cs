using NavaIT.Dictionary.Core;
using System.Data.SqlClient;
using Dapper;
using System.Linq;
using System;
using System.Collections.Generic;

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
            string query = @"select new_worksheetId Id, new_Entry1worksheetIdName TermName, new_Entry2worksheetIdName Equvalent, new_Definition Definition, new_ScopeIdName Scope
from new_worksheet where new_Entry1worksheetIdName = @term

select new_ReferenceWorksheet ReferenceId, new_Entry1worksheetIdName ReferredTo
from new_worksheet where new_ReferenceWorksheetName = @term";
            using (var con = new SqlConnection(ApplictionSetting.ApllConnectionString))
            {
                var res = con.QueryMultiple(query, new { term = term });
                List<ExtractResult> r = res.Read<ExtractResult>().ToList();
                var s = res.Read<ReferredToResult>();
                r.ForEach(er => er.ReferredTo = s.Where(rt => rt.ReferenceId == er.Id).Select(rt => rt.ReferredTo).ToArray());
                DescriptionPart[] pd = r.Select(a =>
                {
                    List<string> strs = new List<string>();
                    strs.Add(a.TermName);
                    strs.AddRange(a.ReferredTo);

                    return new DescriptionPart()
                    {
                        Description = $@"<div class='row'>
<div class='d-block'>
    <div class='float-start mr-auto'>{a.Equvalent}</div>
    <div class='float-left' dir='ltr'>{string.Join(",<div class='float-left' dir='ltr'>\n<div>", strs)}</div>
<div class='row'><p>{a.Definition}</p></div>",
                        Scopes = a.Scope
                    };
                }).ToArray();
                return new PageResult()
                {
                    Title = term,
                    Descriptions = pd
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
                    Title = $"{r.Title} ({r.Scope})",
                    ShortDescription = r.Definition
                })?.ToArray();
            }
        }

        private class ApllSearchResult
        {
            public object Title { get; internal set; }
            public object Scope { get; internal set; }
            public string Definition { get; internal set; }
        }

        private class ExtractResult
        {
            public Guid Id { get; set; }
            public string TermName { get; set; }
            public string Equvalent { get; set; }
            public string Definition { get; set; }
            public string Scope { get; set; }
            public string[] ReferredTo { get; internal set; }
        }

        private class ReferredToResult
        {
            public Guid ReferenceId { get; set; }
            public string ReferredTo { get; set; }
        }
    }
}