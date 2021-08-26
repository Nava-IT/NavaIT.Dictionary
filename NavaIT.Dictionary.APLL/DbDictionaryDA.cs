using Dapper;
using Microsoft.Extensions.Logging;
using NavaIT.Dictionary.Logging;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NavaIT.Dictionary.APLL
{
    class DbDictionaryDA : IDbDictionaryDA
    {
        private IApplictionSetting ApplictionSetting { get; }

        private readonly ILogger<DbDictionaryBussiness> _logger;

        public DbDictionaryDA(IApplictionSetting applictionSetting, ILogger<DbDictionaryBussiness> logger)
        {
            ApplictionSetting = applictionSetting;
            _logger = logger;
        }
        public List<ExtractResult> Extract(string term)
        {
            string query = @"declare @wsIds table(Id uniqueidentifier)
insert into @wsIds select worksheetId from worksheet where Entry1worksheetId in (select termId from term where name = @term)
or Entry2worksheetId in (select termId from term where name = @term)
select worksheetId Id, Entry1worksheetIdName TermName, ReferenceWorksheetName ReferenceWorksheetName, Entry2worksheetIdName Equivalent, Definition Definition, ScopeIdName Scope
from worksheet where worksheetId in (select id from @wsIds)

select ReferenceWorksheet ReferenceId, Entry1worksheetIdName ReferredTo
from worksheet where ReferenceWorksheet in (select id from @wsIds)";
            try
            {
                using var con = new SqlConnection(ApplictionSetting.ApllConnectionString);
                var res = con.QueryMultiple(query, new { term });
                List<ExtractResult> r = res.Read<ExtractResult>().ToList();
                var s = res.Read<ReferredToResult>();
                r.ForEach(er => er.ReferredTo = s.Where(rt => rt.ReferenceId == er.Id).Select(rt => rt.ReferredTo).ToArray());
                return r;
            }
            catch (Exception ex)
            {
                _logger.Error(EventIds.DataAccessLayerHasError, new { Method = nameof(Extract), Parameters = new[] { new { term } } }, ex);
                throw;
            }
        }

        public string[] Scope(string name)
        {
            string query = @"select distinct name from worksheet where ScopeIdName = @name
                    order by name";
            try
            {
                using var con = new SqlConnection(ApplictionSetting.ApllConnectionString);
                var res = con.Query<string>(query, new { name });
                return res.ToArray();
            }
            catch (Exception ex)
            {
                _logger.Error(EventIds.DataAccessLayerHasError, new
                {
                    Method = nameof(Scope),
                    Parameters = new[] { new { term = name } }
                }, ex);
                throw;
            }
        }

        public string[] Scopes()
        {
            string query = @"select distinct name from Scope
                order by name";
            try {
                using var con = new SqlConnection(ApplictionSetting.ApllConnectionString);
                var res = con.Query<String>(query);
                return res.ToArray();
            }
            catch (Exception ex)
            {
                _logger.Error(EventIds.DataAccessLayerHasError, new
                {
                    Method = nameof(Scopes),
                }, ex);
                throw;
            }

        }

        public IEnumerable<ApllSearchResult> Search(string q)
        {
            string query = @"select top 10 Title, Definition, Scope from(
select distinct 1 type, Entry1worksheetIdName Title, Definition Definition, ScopeIdName Scope from worksheet 
where Entry1worksheetIdName COLLATE Latin1_general_CI_AI like @q+'%' COLLATE Latin1_general_CI_AI
union all
select distinct 1 type, Entry2worksheetIdName Title, Definition Definition, ScopeIdName Scope from worksheet 
where Entry2worksheetIdName COLLATE Latin1_general_CI_AI like @q+'%' COLLATE Latin1_general_CI_AI
union all
select distinct 2 type, Entry1worksheetIdName Title, Definition Definition, ScopeIdName Scope from worksheet 
where Entry1worksheetIdName COLLATE Latin1_general_CI_AI like '%'+@q+'%' COLLATE Latin1_general_CI_AI
union all
select distinct 2, Entry2worksheetIdName Title, Definition Definition, ScopeIdName Scope from worksheet 
where Entry2worksheetIdName COLLATE Latin1_general_CI_AI like '%'+@q+'%' COLLATE Latin1_general_CI_AI
) a order by type, title";
            using var con = new SqlConnection(ApplictionSetting.ApllConnectionString);
            return con.Query<ApllSearchResult>(query, new { q });
        }
    }
}
