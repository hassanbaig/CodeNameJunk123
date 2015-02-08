using JunkCar.Core.Common;
using JunkCar.DomainModel.Models;
using JunkCar.DomainService.Services;
using JunkCar.Factory.Factories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace JunkCar.WebAPI.Controllers
{
    public class AccountsController : ApiController
    {
        private AbstractDomainModel domainModel;
        private AbstractDomainService domainService;
        [HttpGet]
        public string Signup(string address, string email, string name, string password, string phone, string zipCode)
        {
            string response = string.Empty;
            FactoryFacade factory = new FactoryFacade();
            Signup signup = null;
            domainModel = factory.DomainModelFactory.CreateDomainModel(typeof(Signup));
            domainModel.Fill(HashHelper.Signup(address,email,name, password,phone, zipCode));
            domainService = factory.DomainServiceFactory.CreateDomainService(typeof(AccountsDomainService));
            signup = (Signup)domainService.Save(domainModel, JunkCar.Factory.Enumerations.DomainModelEnum.SIGNUP);
            return signup.ResponseMessage;
        }

        [HttpGet]
        public IHttpActionResult Authenticate(string password, string userId)
        {
            if (userId == null || password == null)
            {
                return Ok("Please check login credentials and then try again.");
            }
            FactoryFacade factory = new FactoryFacade();
            domainModel = factory.DomainModelFactory.CreateDomainModel(typeof(Authenticate));
            domainModel.Fill(HashHelper.Authenticate(userId, password));
            domainService = factory.DomainServiceFactory.CreateDomainService(typeof(AccountsDomainService));
            domainModel = domainService.Query(domainModel, JunkCar.Factory.Enumerations.DomainModelEnum.AUTHENTICATE);
            DomainModel.Models.Authenticate authenticate = (DomainModel.Models.Authenticate)domainModel;
            //if (authenticate.ResponseMessage != "User id is required" && authenticate.ResponseMessage != "Password is required" && authenticate.ResponseMessage != "Invalid domain model" && authenticate.ResponseMessage != "Please check login credentials and then try again.")
            //{
            //    UserData userData = new UserData(userId, authenticate.ProviderId.ToString(), "");
            //    TicketHelper.CreateAuthCookie(userData.UserId, userData.GetProviderUserData(), false);
            //}
            return Ok(authenticate.IsAuthenticated);
        }

        //[HttpGet]
        //public IHttpActionResult ChangePassword(string currentPassword, string newPassword)
        //{
        //    ChangePassword changePassword = null;
        //    string data = TicketHelper.GetDecryptedUserId();
        //    string[] dataList = data.Split(',');
        //    FactoryFacade factory = new FactoryFacade();

        //    domainModel = factory.DomainModelFactory.CreateDomainModel(typeof(ChangePassword));
        //    domainModel.Fill(HashHelper.ChangePassword(currentPassword, newPassword, dataList[0]));
        //    domainService = factory.DomainServiceFactory.CreateDomainService(typeof(AccountsDomainService));
        //    changePassword = (ChangePassword)domainService.Update(domainModel, JunkCar.Factory.Enumerations.DomainModelEnum.CHANGE_PASSWORD);
        //    return Ok(changePassword.ResponseMessage);
        //}
        //[HttpGet]
        //public IHttpActionResult ForgotPassword(string newPassword, string userId)
        //{
        //    ForgotPassword forgotPassword = null;
        //    FactoryFacade factory = new FactoryFacade();

        //    domainModel = factory.DomainModelFactory.CreateDomainModel(typeof(ForgotPassword));
        //    domainModel.Fill(HashHelper.ForgotPassword(newPassword, userId));
        //    domainService = factory.DomainServiceFactory.CreateDomainService(typeof(AccountsDomainService));
        //    return Ok(((ForgotPassword)domainService.Update(domainModel, JunkCar.Factory.Enumerations.DomainModelEnum.FORGOT_PASSWORD)).ResponseMessage);
        //}
        //[HttpGet]
        //public IHttpActionResult Logout()
        //{
        //    try
        //    {
        //        TicketHelper.Logout();
        //        return Ok("Logout successfully");
        //    }
        //    catch (Exception ex)
        //    {

        //        return Ok(ex.Message);
        //    }
        //}
    }
}
