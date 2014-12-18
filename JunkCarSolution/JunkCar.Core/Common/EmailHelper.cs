using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace JunkCar.Core.Common
{
    public static class EmailHelper
    {
        public static void SendMail(string toAddr, MailAddress fromAddr, string subject, string body, bool htmlBody)
        {
            dynamic msg = new System.Net.Mail.MailMessage();

            msg.To.Add(toAddr.Replace(";", ","));
            msg.From = fromAddr;
            msg.Subject = subject;
            msg.Body = body;
            msg.IsBodyHtml = htmlBody;

            SendMail(msg, 25);
        }

        public static void SendMail(System.Net.Mail.MailMessage message, int port)
        {
            SmtpClient smtp = new SmtpClient();
            smtp.Host = System.Configuration.ConfigurationManager.AppSettings["MailServer"].ToString() ;
            System.Net.NetworkCredential basicAuthenticationInfo = new System.Net.NetworkCredential(System.Configuration.ConfigurationManager.AppSettings["FromEmail"].ToString(), System.Configuration.ConfigurationManager.AppSettings["EmailPassword"].ToString());
            smtp.UseDefaultCredentials = false;
            smtp.Credentials = basicAuthenticationInfo;
            smtp.Port = port;
            smtp.EnableSsl = true;

            smtp.Send(message);
        }
    }
}