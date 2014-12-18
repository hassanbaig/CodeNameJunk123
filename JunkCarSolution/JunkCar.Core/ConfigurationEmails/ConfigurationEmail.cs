using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.UI;

namespace JunkCar.Core.ConfigurationEmails
{
    public static class ConfigurationEmail
    {
        public static void SignupEmail(string userID, string Pass, string toEmail)
        {
            try
            {
                System.Net.Mail.MailMessage msg = new System.Net.Mail.MailMessage();

                System.IO.StringWriter swEmail = new System.IO.StringWriter();


                System.Web.HttpContext.Current.Server.Execute("~/EmailTemlates/SignupEmail.html", swEmail);

                msg.From = new System.Net.Mail.MailAddress(System.Configuration.ConfigurationManager.AppSettings["FromEmail"].ToString(), "JunkCar Team");
                
                msg.To.Add(toEmail);

                msg.Subject = "Welcome to JunkCar";
                msg.Body = swEmail.GetStringBuilder().ToString().Replace("[Customer]",userID).Replace("[Password]",Pass);
                msg.IsBodyHtml = true;

                JunkCar.Core.Common.EmailHelper.SendMail(msg, Convert.ToInt32(System.Configuration.ConfigurationManager.AppSettings["EmailPort"].ToString()));
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static void ForgotPasswordEmail(string userID, string Pass, string toEmail)
        {
            try
            {
                System.Net.Mail.MailMessage msg = new System.Net.Mail.MailMessage();

                System.IO.StringWriter swEmail = new System.IO.StringWriter();


                System.Web.HttpContext.Current.Server.Execute("~/EmailTemlates/ForgotPasswordEmail.html", swEmail);

                msg.From = new System.Net.Mail.MailAddress(System.Configuration.ConfigurationManager.AppSettings["FromEmail"].ToString(), "JunkCar Team");

                msg.To.Add(toEmail);

                msg.Subject = "Your new password for JunkCar";
                msg.Body = swEmail.GetStringBuilder().ToString().Replace("[Customer]", userID).Replace("[Password]", Pass);
                msg.IsBodyHtml = true;

                JunkCar.Core.Common.EmailHelper.SendMail(msg, Convert.ToInt32(System.Configuration.ConfigurationManager.AppSettings["EmailPort"].ToString()));
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static void ChangePasswordEmail(string userID, string Pass, string toEmail)
        {
            try
            {
                System.Net.Mail.MailMessage msg = new System.Net.Mail.MailMessage();

                System.IO.StringWriter swEmail = new System.IO.StringWriter();


                System.Web.HttpContext.Current.Server.Execute("~/EmailTemlates/ChangePasswordEmail.html", swEmail);

                msg.From = new System.Net.Mail.MailAddress(System.Configuration.ConfigurationManager.AppSettings["FromEmail"].ToString(), "JunkCar Team");

                msg.To.Add(toEmail);

                msg.Subject = "Your new password for JunkCar";
                msg.Body = swEmail.GetStringBuilder().ToString().Replace("[Customer]", userID).Replace("[Password]", Pass);
                msg.IsBodyHtml = true;

                JunkCar.Core.Common.EmailHelper.SendMail(msg, Convert.ToInt32(System.Configuration.ConfigurationManager.AppSettings["EmailPort"].ToString()));
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
