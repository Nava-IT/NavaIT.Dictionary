using System.Collections.Generic;

namespace NavaIT.Dictionary.Web.Utils
{
    public static class PersianTools
    {
        private static Dictionary<string, string> numberMapping = new Dictionary<string, string>()
        {
            {"0", "۰"},{"1", "۱"},{"2", "۲"},{"3", "۳"},{"4", "۴"},{"5", "۵"},{"6", "۶"},{"7", "۷"},{"8", "۸"},{"9", "۹"}
        };
        public static string ToPersianNumber(this int number)
        {
            string retvalue = number.ToString();
            foreach (var item in numberMapping)
            {
                retvalue = retvalue.Replace(item.Key, item.Value);
            }
            return retvalue;
        }
    }
}
