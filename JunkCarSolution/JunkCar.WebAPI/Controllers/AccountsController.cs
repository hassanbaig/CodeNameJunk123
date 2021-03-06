﻿using JunkCar.Core.Common;
using JunkCar.Core.Enumerations;
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
        public string Signup(string address, string email, string name, string password, string phone, string zipCode,int questionId,string answer)
        {
            string response = string.Empty;
            FactoryFacade factory = new FactoryFacade();
            Signup signup = null;
            domainModel = factory.DomainModelFactory.CreateDomainModel(typeof(Signup));
            domainModel.Fill(HashHelper.Signup(address,email,name, password,phone, zipCode,questionId,answer));
            domainService = factory.DomainServiceFactory.CreateDomainService(typeof(AccountsDomainService));
            signup = (Signup)domainService.Save(domainModel, DomainModelEnum.SIGNUP);
            return signup.ResponseMessage;
        }
        [HttpGet]
        public Authenticate Authenticate(string password, string userId)
        {
            FactoryFacade factory = new FactoryFacade();
            domainModel = factory.DomainModelFactory.CreateDomainModel(typeof(Authenticate));
            domainModel.Fill(HashHelper.Authenticate(userId, password));
            domainService = factory.DomainServiceFactory.CreateDomainService(typeof(AccountsDomainService));
            domainModel = domainService.Query(domainModel, DomainModelEnum.AUTHENTICATE);
            DomainModel.Models.Authenticate authenticate = (DomainModel.Models.Authenticate)domainModel;
            if (authenticate.ResponseMessage != "User id is required" && authenticate.ResponseMessage != "Password is required" && authenticate.ResponseMessage != "Invalid domain model" && authenticate.ResponseMessage != "Please check login credentials and then try again.")
            {
                UserData userData = new UserData(userId, authenticate.Name);
                TicketHelper.CreateAuthCookie(authenticate.Name, userData.GetUserData(), false);
            }
            return authenticate;
        }    
        [HttpGet]
        public JunkCar.DataModel.Models.Sec_Password_Question GetSecurityQuestion(string userId)
        {           
            FactoryFacade factory = new FactoryFacade();
            ForgotPassword forgotPassword = null;
            domainModel = factory.DomainModelFactory.CreateDomainModel(typeof(ForgotPassword));
            domainModel.Fill(HashHelper.GetSecurityQuestion(userId));
            domainService = factory.DomainServiceFactory.CreateDomainService(typeof(AccountsDomainService));
            forgotPassword = (ForgotPassword)domainService.Query(domainModel, DomainModelEnum.GET_SECURITY_QUESTION);
            return forgotPassword.SecurityQuestion;
        }
        [HttpGet]
        public UserProfile GetUserInfo()
        {
            UserProfile userProfile = null;
            string data = TicketHelper.GetDecryptedUserId();
            string[] datalist = data.Split(',');
            FactoryFacade factory = new FactoryFacade();

            domainModel = factory.DomainModelFactory.CreateDomainModel(typeof(UserProfile));
            domainModel.Fill(HashHelper.GetUserInfo(datalist[0]));
            domainService = factory.DomainServiceFactory.CreateDomainService(typeof(AccountsDomainService));
            userProfile = (UserProfile)domainService.Query(domainModel, DomainModelEnum.GET_USER_INFO);
            return userProfile;
        }
        [HttpGet]
        public UserProfile GetUserInfoApp(string email)
        {
            UserProfile userProfile = null;
            FactoryFacade factory = new FactoryFacade();

            domainModel = factory.DomainModelFactory.CreateDomainModel(typeof(UserProfile));
            domainModel.Fill(HashHelper.GetUserInfo(email));
            domainService = factory.DomainServiceFactory.CreateDomainService(typeof(AccountsDomainService));
            userProfile = (UserProfile)domainService.Query(domainModel, DomainModelEnum.GET_USER_INFO);
            return userProfile;
        }
        [HttpGet]
        public IHttpActionResult EditProfile(string name,string address,string phone,string zipCode,int? questionId,string answer)
        {
            EditProfile editProfile = null;
            string data = TicketHelper.GetDecryptedUserId();
            string[] dataList = data.Split(',');
            FactoryFacade factory = new FactoryFacade();

            domainModel = factory.DomainModelFactory.CreateDomainModel(typeof(EditProfile));
            domainModel.Fill(HashHelper.EditProfile(dataList[0], name, address,phone,zipCode,questionId,answer));
            domainService = factory.DomainServiceFactory.CreateDomainService(typeof(AccountsDomainService));
            editProfile = (EditProfile)domainService.Update(domainModel, JunkCar.Core.Enumerations.DomainModelEnum.EDIT_PROFILE);
            return Ok(editProfile.ResponseMessage);
        }
        [HttpGet]
        public IHttpActionResult EditProfileApp(string email,string name, string address, string phone, string zipCode, int? questionId, string answer)
        {
            EditProfile editProfile = null;
            FactoryFacade factory = new FactoryFacade();

            domainModel = factory.DomainModelFactory.CreateDomainModel(typeof(EditProfile));
            domainModel.Fill(HashHelper.EditProfile(email, name, address, phone, zipCode, questionId, answer));
            domainService = factory.DomainServiceFactory.CreateDomainService(typeof(AccountsDomainService));
            editProfile = (EditProfile)domainService.Update(domainModel, JunkCar.Core.Enumerations.DomainModelEnum.EDIT_PROFILE);
            return Ok(editProfile.ResponseMessage);
        }
        [HttpGet]
        public List<JunkCar.DataModel.Models.Sec_Password_Question> GetAllSecurityQuestion()
        {
            FactoryFacade factory = new FactoryFacade();
            domainService = factory.DomainServiceFactory.CreateDomainService(typeof(AccountsDomainService));
            return ((DomainModel.Models.Signup)domainService.Query(SearchCriteriaEnum.GET_ALL_SECURITY_QUESTIONS)).SecurityQuestions;
        }
        [HttpGet]
        public string CheckSecurityQuestionAnswer(string answer, int questionId, string userId)
        {
            FactoryFacade factory = new FactoryFacade();
            ForgotPassword forgotPassword = null;
            domainModel = factory.DomainModelFactory.CreateDomainModel(typeof(ForgotPassword));
            domainModel.Fill(HashHelper.CheckSecurityQuestion(questionId, answer.ToLower(), userId));
            domainService = factory.DomainServiceFactory.CreateDomainService(typeof(AccountsDomainService));
            forgotPassword = (ForgotPassword)domainService.Query(domainModel, DomainModelEnum.CHECK_SECURITY_QUESTION_ANSWER);
            return forgotPassword.ResponseMessage;
        }
        [HttpGet]
        public string CheckVerificationCode(int verificationCode)
        {
            FactoryFacade factory = new FactoryFacade();
            ForgotPassword forgotPassword = null;
            domainModel = factory.DomainModelFactory.CreateDomainModel(typeof(ForgotPassword));
            domainModel.Fill(HashHelper.CheckVerificationCode(verificationCode));
            domainService = factory.DomainServiceFactory.CreateDomainService(typeof(AccountsDomainService));
            forgotPassword = (ForgotPassword)domainService.Query(domainModel, DomainModelEnum.CHECK_VERIFICATION_CODE);
            return forgotPassword.ResponseMessage;
        }
        [HttpGet]
        public IHttpActionResult ChangePassword(string currentPassword, string newPassword)
        {
            ChangePassword changePassword = null;
            string data = TicketHelper.GetDecryptedUserId();
            string[] dataList = data.Split(',');
            FactoryFacade factory = new FactoryFacade();

            domainModel = factory.DomainModelFactory.CreateDomainModel(typeof(ChangePassword));
            domainModel.Fill(HashHelper.ChangePassword(currentPassword, newPassword, dataList[0]));
            domainService = factory.DomainServiceFactory.CreateDomainService(typeof(AccountsDomainService));
            changePassword = (ChangePassword)domainService.Update(domainModel, JunkCar.Core.Enumerations.DomainModelEnum.CHANGE_PASSWORD);
            return Ok(changePassword.ResponseMessage);
        }
        [HttpGet]
        public IHttpActionResult ChangePasswordApp(string email,string currentPassword, string newPassword)
        {
            ChangePassword changePassword = null;
            FactoryFacade factory = new FactoryFacade();
            domainModel = factory.DomainModelFactory.CreateDomainModel(typeof(ChangePassword));
            domainModel.Fill(HashHelper.ChangePassword(currentPassword, newPassword, email));
            domainService = factory.DomainServiceFactory.CreateDomainService(typeof(AccountsDomainService));
            changePassword = (ChangePassword)domainService.Update(domainModel, JunkCar.Core.Enumerations.DomainModelEnum.CHANGE_PASSWORD);
            return Ok(changePassword.ResponseMessage);
        }
        [HttpGet]
        public string ResetPassword(string newPassword, string userId)
        {
            FactoryFacade factory = new FactoryFacade();
            ForgotPassword forgotPassword = null;
            domainModel = factory.DomainModelFactory.CreateDomainModel(typeof(ForgotPassword));
            domainModel.Fill(HashHelper.ResetPassword(userId,newPassword));
            domainService = factory.DomainServiceFactory.CreateDomainService(typeof(AccountsDomainService));
            forgotPassword = (ForgotPassword)domainService.Query(domainModel, DomainModelEnum.RESET_PASSWORD);
            return forgotPassword.ResponseMessage;
        }
        [HttpGet]
        public string CheckUserId(string userId)
        {
            FactoryFacade factory = new FactoryFacade();
            Authenticate authenticate = null;
            domainModel = factory.DomainModelFactory.CreateDomainModel(typeof(Authenticate));
            domainModel.Fill(HashHelper.CheckUserId(userId));
            domainService = factory.DomainServiceFactory.CreateDomainService(typeof(AccountsDomainService));
            authenticate = (Authenticate)domainService.Query(domainModel, DomainModelEnum.CHECK_USER_ID);
            return authenticate.ResponseMessage;
        }      
        [HttpGet]
        public IHttpActionResult Logout()
        {
            try
            {
                TicketHelper.Logout();
                return Ok("Logout successfully");
            }
            catch (Exception ex)
            {

                return Ok(ex.Message);
            }
        }
    }
}
