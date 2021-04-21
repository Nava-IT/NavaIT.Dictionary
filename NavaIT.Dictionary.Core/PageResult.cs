namespace NavaIT.Dictionary.Core
{
    public class DescriptionPart
    {
        public string Description { get; set; }
        public string Scopes { get; set; }
    }
    public class PageResult
    {
        public string Title { get; set; }

        public DescriptionPart[] Descriptions { get; set; }
    }
}