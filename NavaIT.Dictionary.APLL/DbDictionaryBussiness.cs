﻿using Dapper;
using NavaIT.Dictionary.Core;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Diagnostics.CodeAnalysis;
using System.Linq;

namespace NavaIT.Dictionary.APLL
{
    public class DbDictionaryBussiness : IDictionaryBussiness
    {
        private IApplictionSetting ApplictionSetting { get; }
        public DbDictionaryBussiness(IApplictionSetting applictionSetting)
        {
            ApplictionSetting = applictionSetting;
        }
        public PageResult[] Extract(string term)
        {
            if (string.IsNullOrEmpty(term)) return null;
            string query = @"declare @wsIds table(Id uniqueidentifier)

insert into @wsIds select worksheetId from worksheet where Entry1worksheetId in (select termId from term where name = @term)
or Entry2worksheetId in (select termId from term where name = @term)
select worksheetId Id, Entry1worksheetIdName TermName, ReferenceWorksheetName ReferenceWorksheetName, Entry2worksheetIdName Equivalent, Definition Definition, ScopeIdName Scope
from worksheet where worksheetId in (select id from @wsIds)

select ReferenceWorksheet ReferenceId, Entry1worksheetIdName ReferredTo
from worksheet where ReferenceWorksheet in (select id from @wsIds)";
            using (var con = new SqlConnection(ApplictionSetting.ApllConnectionString))
            {
                var res = con.QueryMultiple(query, new { term = term });
                List<ExtractResult> r = res.Read<ExtractResult>().ToList();
                var s = res.Read<ReferredToResult>();
                r.ForEach(er => er.ReferredTo = s.Where(rt => rt.ReferenceId == er.Id).Select(rt => rt.ReferredTo).ToArray());

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
                var k = r.GroupBy(a => string.Join(",",
                    new String[] { a.TermName, a.Equivalent, a.ReferenceWorksheetName, a.Definition }.Union(
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

                var b = k.Select(item => new PageResult()
                {
                    Term = item.First().TermName,
                    Descriptions = item.Select(a => new DescriptionPart()
                    {
                        Description = a.Definition,
                        ReferenceWorksheetName = a.ReferenceWorksheetName,
                        ForeignEquivalents = a.ReferredTo.OrderBy(s => s).ToArray(),
                        Translation = a.Equivalent,
                        //Scopes = item.
                    }).ToArray()
                });
                return new PageResult[]{
                    new PageResult()
                    {
                        Term = k.First().First().TermName,
                        Descriptions = k.Select(a => new DescriptionPart()
                        {
                            Description = a.First().Definition,
                            ReferenceWorksheetName = a.First().ReferenceWorksheetName,
                            ForeignEquivalents = a.First().ReferredTo.OrderBy(s => s).ToArray(),
                            Translation = a.First().Equivalent,
                            Scopes = a.Select(s => s.Scope).OrderBy(s => s).ToArray()

                        }).ToArray()
                    }
                };
            }
        }

        public SearchResult[] Search(string q)
        {
            string query = @"select top 10 Title, Definition, Scope from(
select distinct 1 type, Entry1worksheetIdName Title, Definition Definition, ScopeIdName Scope from dictionary.worksheet 
where Entry1worksheetIdNameNomalised COLLATE Latin1_general_CI_AI = @q COLLATE Latin1_general_CI_AI
union all
select distinct 1 type, Entry2worksheetIdName Title, Definition Definition, ScopeIdName Scope from dictionary.worksheet 
where Entry2worksheetIdNameNomalised COLLATE Latin1_general_CI_AI = @q COLLATE Latin1_general_CI_AI
union all
select distinct 2 type, Entry1worksheetIdName Title, Definition Definition, ScopeIdName Scope from dictionary.worksheet 
where Entry1worksheetIdNameNomalised COLLATE Latin1_general_CI_AI like @q+'%' COLLATE Latin1_general_CI_AI
union all
select distinct 2 type, Entry2worksheetIdName Title, Definition Definition, ScopeIdName Scope from dictionary.worksheet 
where Entry2worksheetIdNameNomalised COLLATE Latin1_general_CI_AI like @q+'%' COLLATE Latin1_general_CI_AI
union all
select distinct 3 type, Entry1worksheetIdName Title, Definition Definition, ScopeIdName Scope from dictionary.worksheet 
where Entry1worksheetIdNameNomalised COLLATE Latin1_general_CI_AI like '%'+@q+'%' COLLATE Latin1_general_CI_AI
union all
select distinct 3, Entry2worksheetIdName Title, Definition Definition, ScopeIdName Scope from dictionary.worksheet 
where Entry2worksheetIdName COLLATE Latin1_general_CI_AI like '%'+@q+'%' COLLATE Latin1_general_CI_AI
) a order by type, title";
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

        public string[] Scopes()
        {
            string query = @"select distinct name from Scope
                order by name";
            using (var con = new SqlConnection(ApplictionSetting.ApllConnectionString))
            {
                var res = con.Query<String>(query);
                return res.ToArray();
            }
        }

        public string[] Scope(string name)
        {
            string query = @"select distinct name from worksheet where ScopeIdName = @name
                    order by name";
            using (var con = new SqlConnection(ApplictionSetting.ApllConnectionString))
            {
                var res = con.Query<String>(query, new { name = name });
                return res.ToArray();
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
            public string ReferenceWorksheetName { get; set; }
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