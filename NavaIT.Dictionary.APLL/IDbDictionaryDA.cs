using System.Collections.Generic;

namespace NavaIT.Dictionary.APLL
{
    internal interface IDbDictionaryDA
    {
        List<ExtractResult> Extract(string term);
        string[] Scope(string name);
        string[] Scopes();
        IEnumerable<ApllSearchResult> Search(string q);
    }
}