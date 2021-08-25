using Microsoft.Extensions.Logging;

namespace NavaIT.Dictionary.Logging
{
    internal class EventIds : EventIdsBase
    {
        public static EventId ReadingDataIsStarted => new(2000, "Reading data from service is started.");
        public static EventId ReadingDataIsEnded => new(2001, "Reading data from service is ended.");
        public static EventId ReadingDataHasError => new(2002, "Reading data from service has error.");
    }
}