using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NavaIT.Dictionary.Logging
{
    public static class LoggerExtention
    {
        public static void Trace(this ILogger logger, EventId eventId, object additionalData, Exception exception = null)
        {
            logger.LogTrace(eventId, exception, JsonConvert.SerializeObject(additionalData));
        }

        public static void Debug(this ILogger logger, EventId eventId, object additionalData, Exception exception = null)
        {
            logger.LogDebug(eventId, exception, JsonConvert.SerializeObject(additionalData));
        }

        public static void Info(this ILogger logger, EventId eventId, object additionalData, Exception exception = null)
        {
            logger.LogInformation(eventId, exception, JsonConvert.SerializeObject(additionalData));
        }

        public static void Warning(this ILogger logger, EventId eventId, object additionalData, Exception exception = null)
        {
            logger.LogWarning(eventId, exception, JsonConvert.SerializeObject(additionalData));
        }

        public static void Error(this ILogger logger, EventId eventId, object additionalData, Exception exception = null)
        {
            logger.LogError(eventId, exception, JsonConvert.SerializeObject(additionalData));
        }

        public static void Critical(this ILogger logger, EventId eventId, object additionalData, Exception exception = null)
        {
            logger.LogCritical(eventId, exception, JsonConvert.SerializeObject(additionalData));
        }
    }
}
