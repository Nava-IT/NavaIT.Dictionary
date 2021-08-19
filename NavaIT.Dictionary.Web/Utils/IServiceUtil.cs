namespace NavaIT.Dictionary.Web.Utils
{
    public interface IServiceUtil
    {
        T Get<T>(string url);
    }
}