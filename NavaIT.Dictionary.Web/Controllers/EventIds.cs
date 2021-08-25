using Microsoft.Extensions.Logging;

namespace NavaIT.Dictionary.Logging
{
    internal class EventIds : EventIdsBase
    {
        public static EventId ReadingDataIsStarted => new EventId(2000, "Reading data from service is started.");
        public static EventId ReadingDataIsEnded => new EventId(2001, "Reading data from service is ended.");
        public static EventId ReadingDataHasError => new EventId(2002, "Reading data from service has error.");
    }
}