using System;
using System.Collections.Generic;

namespace NavaIT.Dictionary.Core
{
    public class FakeDictionaryBussiness : IDictionaryBussiness
    {
        public PageResult Extract(string term)
        {
            if (string.IsNullOrEmpty(term)) return null;
            return new PageResult()
            {
                Term = term,
                Descriptions = new DescriptionPart[]{
                    new DescriptionPart()
                {
                    Description = @"
<div class='row'>
<div class='d-block'>
    <div class='float-start mr-auto'>رمزینۀ پاس</div>
    <div class='float-start mr-auto'>رمزینۀ پاس</div>
    <div class='float-left' dir='ltr'>QR-code 1,</div>
    <div class='float-left' dir='ltr'>QR-code 2,</div>
    <div class='float-left' dir='ltr'>QR-code 3,</div>
    <div class='float-left' dir='ltr'>QR-code 4,</div>
    <div class='float-left' dir='ltr'>QR-code 5,</div>
    <div class='float-left' dir='ltr'>QR-code 6,</div>
    <div class='float-left' dir='ltr'>QR-code 7,</div>
    <div class='float-left' dir='ltr'>QR-code 8,</div>
    <div class='float-left' dir='ltr'>QR-code 9,</div>
    <div class='float-left' dir='ltr'>QR-code 10,</div>
    <div class='float-left' dir='ltr'>QR-code 11</div>
</div>
</div>
<div class='row'><p>رمزینۀ پاس رمزینۀ پاس رمزینۀ پاس رمزینۀ پاس رمزینۀ پاس رمزینۀ پاس </p></div>",
                    Scopes = new string[]{"Scope" + new Random().Next(10) }
                } }
            };
        }

        public SearchResult[] Search(string q)
        {
            List<SearchResult> results = new List<SearchResult>();
            results.Add(new SearchResult()
            {
                Title = $"{q}Nazer",
                ShortDescription = "This is search Test"
            });
            results.Add(new SearchResult()
            {
                Title = $"Nazer  {q} 2",
                ShortDescription = "This is search Test"
            });
            results.Add(new SearchResult()
            {
                Title = $"Nazer  {q} 3",
                ShortDescription = "This is search Test"
            });
            return results.ToArray();
        }
    }
}
