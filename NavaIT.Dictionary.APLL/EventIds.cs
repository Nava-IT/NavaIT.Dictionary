using Microsoft.Extensions.Logging;
using NavaIT.Dictionary.Logging;

namespace NavaIT.Dictionary.APLL
{
    class EventIds : EventIdsBase
    {
        protected EventIds() { }

        public static EventId DataAccessLayerHasError => new(1500, "Data access layer has error.");
    }
}
