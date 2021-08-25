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
insert into @wsIds select new_worksheetId from new_worksheet where new_Entry1worksheetId in (select new_termId from new_term where new_name = @term)
or new_Entry2worksheetId in (select new_termId from new_term where new_name = @term)
select new_worksheetId Id, new_Entry1worksheetIdName TermName, new_ReferenceWorksheetName ReferenceWorksheetName, new_Entry2worksheetIdName Equivalent, new_Definition Definition, new_ScopeIdName Scope
from new_worksheet where new_worksheetId in (select id from @wsIds)

select new_ReferenceWorksheet ReferenceId, new_Entry1worksheetIdName ReferredTo
from new_worksheet where new_ReferenceWorksheet in (select id from @wsIds)";
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
            string query = @"select distinct new_name from new_worksheet where new_ScopeIdName = @name
                    order by new_name";
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
            string query = @"select distinct new_name from new_scopeBase
                order by new_name";
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
select distinct 1 type, new_Entry1worksheetIdName Title, new_Definition Definition, new_ScopeIdName Scope from new_worksheet 
where new_Entry1worksheetIdName COLLATE Latin1_general_CI_AI like @q+'%' COLLATE Latin1_general_CI_AI
union all
select distinct 1 type, new_Entry2worksheetIdName Title, new_Definition Definition, new_ScopeIdName Scope from new_worksheet 
where new_Entry2worksheetIdName COLLATE Latin1_general_CI_AI like @q+'%' COLLATE Latin1_general_CI_AI
union all
select distinct 2 type, new_Entry1worksheetIdName Title, new_Definition Definition, new_ScopeIdName Scope from new_worksheet 
where new_Entry1worksheetIdName COLLATE Latin1_general_CI_AI like '%'+@q+'%' COLLATE Latin1_general_CI_AI
union all
select distinct 2, new_Entry2worksheetIdName Title, new_Definition Definition, new_ScopeIdName Scope from new_worksheet 
where new_Entry2worksheetIdName COLLATE Latin1_general_CI_AI like '%'+@q+'%' COLLATE Latin1_general_CI_AI
) a order by type, title";
            using var con = new SqlConnection(ApplictionSetting.ApllConnectionString);
            return con.Query<ApllSearchResult>(query, new { q });
        }
    }
}
