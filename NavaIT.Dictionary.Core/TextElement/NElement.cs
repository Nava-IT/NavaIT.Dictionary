namespace NavaIT.Dictionary.Core
{
    public class NElement
    {
        public NElement() { }

        public NElement(params NElement[] elements)
        {
            ChildElements = elements;
        }
        public NElement[] ChildElements { get; set; }
    }

    public class Body : NElement
    {
        public Body() { }

        public Body(params NElement[] elements) : base(elements) { }
    }
    public class Paragraph : NElement
    {
        public Paragraph() { }

        public Paragraph(params NElement[] elements) : base(elements) { }
    }

    public class ParagraphProperty : NElement
    {
        public ParagraphProperty() { }

        public ParagraphProperty(params NElement[] elements) : base(elements) { }

        public bool Bidi { get; set; } = true;
    }

    public class Run : NElement
    {
        public Run() { }

        public Run(params NElement[] elements) : base(elements) { }

        public RunProperty Property { get; set; }
    }

    public class RunProperty : NElement
    {
        public RunProperty() { }

        public RunProperty(params NElement[] elements) : base(elements) { }

        public bool Bold { get; set; } = false;
        public bool Italic { get; set; } = false;
    }

    public class TextElement : NElement
    {
        public TextElement() { }
        public TextElement(params NElement[] elements) : base(elements) { }
        public TextElement(string text)
        {
            Text = text;
        }
        public string Text { get; set; }
    }
}
