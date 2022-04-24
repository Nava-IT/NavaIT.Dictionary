using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NavaIT.Dictionary.Core
{
    public class TextParser
    {
        public static Body Parse(string text)
        {
            var parts = text?.Split(new char[] { '\n', '\r' }, StringSplitOptions.RemoveEmptyEntries);
            return new Body(parts?.Select(p => new Paragraph(new Run(new TextElement(p))))?.ToArray());
        }
    }
}
