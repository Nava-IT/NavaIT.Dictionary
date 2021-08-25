using Microsoft.Extensions.Logging;

namespace NavaIT.Dictionary.Logging
{
    public class EventIdsBase
    {
        protected EventIdsBase() { }

        public static EventId StartMethod => new(1000, "Start method.");

    }
}