using System.Linq;
using System;
using System.Diagnostics.CodeAnalysis;

namespace NavaIT.Dictionary.APLL
{
    class ExtractResult : IComparable<ExtractResult>
    {
        public Guid Id { get; set; }
        public string TermName { get; set; }
        public string ReferenceWorksheetName { get; set; }
        public string Equivalent { get; set; }
        public string Definition { get; set; }
        public string Scope { get; set; }
        public string[] ReferredTo { get; internal set; }

        public int CompareTo([AllowNull] ExtractResult other)
        {
            if (other == null)
                return 1;
            if (string.Compare(TermName, other.TermName, true) != 0)
                return string.Compare(TermName, other.TermName, true);
            if (string.Compare(Equivalent, other.Equivalent, true) != 0)
                return string.Compare(Equivalent, other.Equivalent, true);
            if (string.Compare(Definition, other.Definition, true) != 0)
                return string.Compare(Definition, other.Definition, true);
            if (ReferredTo == null)
                return -1;
            else if (other.ReferredTo == null)
                return 1;
            if (ReferredTo.Except(other.ReferredTo).Any())
                return 1;
            else if (other.ReferredTo.Except(ReferredTo).Any())
                return -1;
            return 0;
        }
    }
}
