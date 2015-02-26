using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.UI;

namespace JunkCar.Core.ConfigurationEmails
{
    public static class ConfigurationEmail
    {
        public static void SignupEmail(string email, string name, string password, string sendToEmail)
        {
            try
            {
                System.Net.Mail.MailMessage msg = new System.Net.Mail.MailMessage();

                System.IO.StringWriter swEmail = new System.IO.StringWriter();


                System.Web.HttpContext.Current.Server.Execute("~/EmailTemlates/SignupEmail.html", swEmail);

                msg.From = new System.Net.Mail.MailAddress(System.Configuration.ConfigurationManager.AppSettings["FromEmail"].ToString(), "JunkCar Team");

                msg.To.Add(sendToEmail);

                msg.Subject = "Welcome to JunkCar";
                msg.Body = swEmail.GetStringBuilder().ToString().Replace("[Customer]", name).Replace("[UserName]", email).Replace("[Password]", password).Replace("ï»¿", "");
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

        public static void ChangePasswordEmail(string userID, string Pass, string sendToEmail)
        {
            try
            {
                System.Net.Mail.MailMessage msg = new System.Net.Mail.MailMessage();

                System.IO.StringWriter swEmail = new System.IO.StringWriter();


                System.Web.HttpContext.Current.Server.Execute("~/EmailTemlates/ChangePasswordEmail.html", swEmail);

                msg.From = new System.Net.Mail.MailAddress(System.Configuration.ConfigurationManager.AppSettings["FromEmail"].ToString(), "JunkCar Team");

                msg.To.Add(sendToEmail);

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

        public static void ContactUs(string name, string email, string phone, string subject, string message, string sendToEmail)
        {
            try
            {
                System.Net.Mail.MailMessage msg = new System.Net.Mail.MailMessage();
                System.IO.StringWriter swEmail = new System.IO.StringWriter();
                System.Web.HttpContext.Current.Server.Execute("~/EmailTemlates/ContactUsEmail.html", swEmail);
                msg.From = new System.Net.Mail.MailAddress(System.Configuration.ConfigurationManager.AppSettings["FromEmail"].ToString(), "JunkCar Team");
                msg.To.Add(sendToEmail);
                msg.Subject = subject;
                msg.Body = swEmail.GetStringBuilder().ToString().Replace("[UserName]", name).Replace("[Email]", email).Replace("[Phone]", phone).Replace("[Message]", message).Replace("ï»¿", "");
                msg.IsBodyHtml = true;
                JunkCar.Core.Common.EmailHelper.SendMail(msg, Convert.ToInt32(System.Configuration.ConfigurationManager.AppSettings["EmailPort"].ToString()));
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static void ForgotPasswordAccountVerificationCode(string name, int verificationCode,string sendToEmail, string subject)
        {
            try
            {
                System.Net.Mail.MailMessage msg = new System.Net.Mail.MailMessage();
                System.IO.StringWriter swEmail = new System.IO.StringWriter();
                System.Web.HttpContext.Current.Server.Execute("~/EmailTemlates/ForgotPasswordVerificationCode.html", swEmail);
                msg.From = new System.Net.Mail.MailAddress(System.Configuration.ConfigurationManager.AppSettings["FromEmail"].ToString(), "JunkCar Team");
                msg.To.Add(sendToEmail);
                msg.Subject = subject;
                msg.Body = swEmail.GetStringBuilder().ToString().Replace("[UserName]", name).Replace("[VerificationCode]", verificationCode.ToString()).Replace("ï»¿", "");
                msg.IsBodyHtml = true;
                JunkCar.Core.Common.EmailHelper.SendMail(msg, Convert.ToInt32(System.Configuration.ConfigurationManager.AppSettings["EmailPort"].ToString()));
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static void ResetPassword(string name, string userId, string newPassword, string sendToEmail, string subject)
        {
            try
            {
                System.Net.Mail.MailMessage msg = new System.Net.Mail.MailMessage();
                System.IO.StringWriter swEmail = new System.IO.StringWriter();
                System.Web.HttpContext.Current.Server.Execute("~/EmailTemlates/ResetPassword.html", swEmail);
                msg.From = new System.Net.Mail.MailAddress(System.Configuration.ConfigurationManager.AppSettings["FromEmail"].ToString(), "JunkCar Team");
                msg.To.Add(sendToEmail);
                msg.Subject = subject;
                msg.Body = swEmail.GetStringBuilder().ToString().Replace("[UserName]", name).Replace("[UserId]", userId.ToString()).Replace("[Password]",newPassword).Replace("ï»¿", "");
                msg.IsBodyHtml = true;
                JunkCar.Core.Common.EmailHelper.SendMail(msg, Convert.ToInt32(System.Configuration.ConfigurationManager.AppSettings["EmailPort"].ToString()));
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static void OfferEmailForCustomer(int year, string make, string model, string price, string name, string address, string phone, string contactUsNo, string toEmailAddress)
        {
            try
            {
                System.Net.Mail.MailMessage msg = new System.Net.Mail.MailMessage();
                System.IO.StringWriter swEmail = new System.IO.StringWriter();
                System.Web.HttpContext.Current.Server.Execute("~/EmailTemlates/JunkcarOfferEmailForCustomer.html", swEmail);
                msg.From = new System.Net.Mail.MailAddress(System.Configuration.ConfigurationManager.AppSettings["FromEmail"].ToString(), "JunkCar Team");
                msg.To.Add(toEmailAddress);
                msg.Subject = "We`ll pay $" + price +" for your " + year.ToString() + " " + make + " " + model;
                msg.Body = swEmail.GetStringBuilder().ToString().Replace("[Name]", name).Replace("[Address]", address).Replace("[Phone]", phone).Replace("[ContactNo]",contactUsNo).Replace("[Year]", year.ToString()).Replace("[Make]", make).Replace("[Model]", model).Replace("[Price]", "$" + price).Replace("[DateMonth]", CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(DateTime.Now.Month)).Replace("[DateDay]", DateTime.Now.Day.ToString()).Replace("[DateYear]", DateTime.Now.Year.ToString()).Replace("ï»¿", "");
                msg.IsBodyHtml = true;
                JunkCar.Core.Common.EmailHelper.SendMail(msg, Convert.ToInt32(System.Configuration.ConfigurationManager.AppSettings["EmailPort"].ToString()));
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public static void OfferEmailForAdmin(string status, int year, string make, string model, string price, string name, string address, string state, string city, string zipCode, string phone, string userEmailAddress, string toEmailAddress)
        {
            try
            {
                System.Net.Mail.MailMessage msg = new System.Net.Mail.MailMessage();
                System.IO.StringWriter swEmail = new System.IO.StringWriter();
                System.Web.HttpContext.Current.Server.Execute("~/EmailTemlates/JunkcarOfferEmailForAdmin.html", swEmail);
                msg.From = new System.Net.Mail.MailAddress(System.Configuration.ConfigurationManager.AppSettings["FromEmail"].ToString(), "JunkCar Team");
                msg.To.Add(toEmailAddress);
                msg.Subject = "[" + status+ "]" + " We`ll pay $" + price + " for your " + year.ToString() + " " + make + " " + model;
                msg.Body = swEmail.GetStringBuilder().ToString().Replace("{Status}", status).Replace("[QuestionnaireDescription]", "").Replace("[Name]", name).Replace("[Address]", address).Replace("[State]", state).Replace("[City]", city).Replace("[ZipCode]", zipCode).Replace("[EmailAddress]", userEmailAddress).Replace("[Phone]", phone).Replace("[Year]", year.ToString()).Replace("[Make]", make).Replace("[Model]", model).Replace("[Price]", "$" + price).Replace("[DateMonth]", CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(DateTime.Now.Month)).Replace("[DateDay]", DateTime.Now.Day.ToString()).Replace("[DateYear]", DateTime.Now.Year.ToString()).Replace("ï»¿", "");
                msg.IsBodyHtml = true;
                JunkCar.Core.Common.EmailHelper.SendMail(msg, Convert.ToInt32(System.Configuration.ConfigurationManager.AppSettings["EmailPort"].ToString()));
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public static void OfferEmailForAdmin(string status,int customerId, List<string> questionnaireDescription, int year, string make,int makeId, string model,int modelId,int cylinders, string price, string name, string address, string state, string city, string zipCode, string phone, string userEmailAddress, string toEmailAddress)
        {
            try
            {
                System.Net.Mail.MailMessage msg = new System.Net.Mail.MailMessage();
                System.IO.StringWriter swEmail = new System.IO.StringWriter();
                System.Web.HttpContext.Current.Server.Execute("~/EmailTemlates/JunkcarOfferEmailForAdmin.html", swEmail);
                msg.From = new System.Net.Mail.MailAddress(System.Configuration.ConfigurationManager.AppSettings["FromEmail"].ToString(), "JunkCar Team");
                msg.To.Add(toEmailAddress);
                msg.Subject = "[" + status + "]" + " We`ll pay $" + price + " for your " + year.ToString() + " " + make + " " + model;
                msg.Body = swEmail.GetStringBuilder().ToString().Replace("{Status}", status).Replace("[QuestionnaireDescription]", string.Join("<br/><br/>", questionnaireDescription.ToArray())).Replace("[Name]", name).Replace("[Address]", address).Replace("[State]", state).Replace("[City]", city).Replace("[ZipCode]", zipCode).Replace("[EmailAddress]", userEmailAddress).Replace("[Phone]", phone).Replace("[Year]", year.ToString()).Replace("[Make]", make).Replace("[Model]", model).Replace("[Price]", "$" + price).Replace("[DateMonth]", CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(DateTime.Now.Month)).Replace("[DateDay]", DateTime.Now.Day.ToString()).Replace("[DateYear]", DateTime.Now.Year.ToString()).Replace("ï»¿", "");
                List<System.Net.Mail.Attachment> attachments = JunkCar.Core.Utilities.Utility.GetAttachments(customerId, cylinders, makeId, modelId, year);
                foreach (System.Net.Mail.Attachment item in attachments)
                {
                    msg.Attachments.Add(item);
                }               
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
