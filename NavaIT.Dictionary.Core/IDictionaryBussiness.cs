using NavaIT.Dictionary.Core.Models;

namespace NavaIT.Dictionary.Core
{
    public interface IDictionaryBussiness
    {
        SearchResult[] Search(string q);
        PageResult[] Extract(string term);
        ScopeModel[] Scopes();
        string[] Scope(string name);
    }
}