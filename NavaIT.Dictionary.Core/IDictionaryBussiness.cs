namespace NavaIT.Dictionary.Core
{
    public interface IDictionaryBussiness
    {
        SearchResult[] Search(string q);
        PageResult[] Extract(string term);
        string[] Scopes();
        string[] Scope(string name);
    }
}