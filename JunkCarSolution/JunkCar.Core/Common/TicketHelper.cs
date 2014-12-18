using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Security;

namespace JunkCar.Core.Common
{
    public static class TicketHelper
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="userName"></param>
        /// <param name="userData"></param>
        /// <param name="persistent"></param>
        /// <returns></returns>
        /// 

        public static void Logout()
        {
            FormsAuthentication.SignOut();
            HttpCookie authCookie = HttpContext.Current.Request.Cookies[FormsAuthentication.FormsCookieName];//.ASPXAUTH
            authCookie.Expires = DateTime.Now.AddDays(-10);
        }
        public static void CreateAuthCookie(string userName, string userData, bool persistent)
        {
            DateTime issued = DateTime.Now;

            HttpCookie AMRAuthCookieCookie = FormsAuthentication.GetAuthCookie(userName, true);
            int formsTimeout = Convert.ToInt32((AMRAuthCookieCookie.Expires - DateTime.Now).TotalMinutes);

            DateTime expiration = DateTime.Now.AddMinutes(formsTimeout);
            string cookiePath = FormsAuthentication.FormsCookiePath;

            var ticket = new FormsAuthenticationTicket(0, userName, issued, expiration, true, userData, cookiePath);
            HttpCookie cookie = CreateAuthCookie(ticket, expiration, persistent);
            if (HttpContext.Current != null)
            {
                HttpContext.Current.Response.Cookies.Add(cookie);
            }            
        }

        public static string GetDecryptedUserId()
        {            
            HttpCookie authCookie = HttpContext.Current.Request.Cookies[FormsAuthentication.FormsCookieName];
            FormsAuthenticationTicket ticket;
            if (authCookie == null)
            {
                return null;
            }
            else
            {
                 ticket = FormsAuthentication.Decrypt(authCookie.Value);
                //FormsAuthenticationTicket ticket = FormsAuthentication.Decrypt(authCookie.Value);
                //string cookiePath = ticket.CookiePath;
                //DateTime expiration = ticket.Expiration;
                //bool expired = ticket.Expired;
                //bool isPersistent = ticket.IsPersistent;
                //DateTime issueDate = ticket.IssueDate;
                //string name = ticket.Name;
                //string userData = ticket.UserData;
                //string version = ticket.Version;
            }
            string userData = ticket.UserData;
            return userData;
        }

        //public static GlobalVar SetInformationAndGet(string data)
        //{
        //    GlobalVar objGlobalVar = new GlobalVar();
        //    if (HttpContext.Current != null)
        //    {
        //        if (HttpContext.Current.Request.IsAuthenticated)
        //        {
        //            var cookie = HttpContext.Current.Request.Cookies[FormsAuthentication.FormsCookieName];
        //            if (cookie == null)
        //            {
        //                return null;
        //            }
        //            else
        //            {

        //                var decrypted = FormsAuthentication.Decrypt(cookie.Value);
        //                if (!string.IsNullOrEmpty(decrypted.UserData))
        //                {
        //                    objGlobalVar.SetData(decrypted.UserData);

        //                    // Store UserData inside the Forms Ticket with all the attributes
        //                    // in sync with the web.config
        //                    var newticket = new FormsAuthenticationTicket(decrypted.Version,
        //                                          decrypted.Name,
        //                                          decrypted.IssueDate,
        //                                          decrypted.Expiration,
        //                                          true, // always persistent
        //                                          objGlobalVar.GetData(),
        //                                          decrypted.CookiePath);

        //                    // Encrypt the ticket and store it in the cookie
        //                    cookie.Value = FormsAuthentication.Encrypt(newticket);
        //                    cookie.Expires = newticket.Expiration.AddHours(1);
        //                    HttpContext.Current.Request.Cookies.Set(cookie);
        //                    var decrypted1 = FormsAuthentication.Decrypt(cookie.Value);
        //                    if (!string.IsNullOrEmpty(decrypted1.UserData))
        //                    {
        //                        objGlobalVar.SetData(decrypted1.UserData);

        //                        return objGlobalVar;
        //                    }
        //                }
        //            }

        //        }
        //    }
        //    return null;
        //}
        //public static GlobalVar GetUserData()
        //{
        //    if (HttpContext.Current != null)
        //    {
        //        if (HttpContext.Current.Request.IsAuthenticated)
        //        {
        //            var cookie = HttpContext.Current.Request.Cookies[FormsAuthentication.FormsCookieName];
        //            if (cookie == null)
        //            {
        //                return null;
        //            }
        //            else
        //            {
        //                var decrypted = FormsAuthentication.Decrypt(cookie.Value);
        //                if (!string.IsNullOrEmpty(decrypted.UserData))
        //                {
        //                    return GlobalVar.FromString(decrypted.UserData);
        //                }
        //            }

        //        }
        //    }

        //    return null;
        //}

        public static HttpCookie CreateAuthCookie(FormsAuthenticationTicket ticket, DateTime expiration, bool persistent)
        {
            string Filling = FormsAuthentication.Encrypt(ticket);
            var cookie = new HttpCookie(FormsAuthentication.FormsCookieName, Filling)
                             {
                                 Domain = FormsAuthentication.CookieDomain,
                                 Path = FormsAuthentication.FormsCookiePath
                             };
            if (persistent)
            {
                cookie.Expires = expiration;
            }

            return cookie;
        }    
      
    }
}
