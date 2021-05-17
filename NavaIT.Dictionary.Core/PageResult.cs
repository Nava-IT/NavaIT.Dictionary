namespace NavaIT.Dictionary.Core
{
    public class DescriptionPart
    {
        public string[] ForeignEquivalents { get; set; }
        public string Translation { get; set; }
        public string[] TranslationEquivalents { get; set; }
        public string Description { get; set; }
        public string[] Scopes { get; set; }
        public string ReferenceWorksheetName { get; set; }
    }
    public class PageResult
    {
        public string Term { get; set; }

        public DescriptionPart[] Descriptions { get; set; }
    }
}