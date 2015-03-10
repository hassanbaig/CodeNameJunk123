using System;
using System.Collections;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using JunkCar.Data;
using JunkCar.Factory.Factories;
using JunkCar.UnitOfWork.Base;
using JunkCar.DomainModel.Models;
using JunkCar.Repository.Repositories;
using JunkCar.Core;
using JunkCar.Core.Common;
using JunkCar.Core.Enumerations;
namespace JunkCar.UnitOfWork.UOWs
{
    public class AccountsUOW : BaseUnitOfWork, IUnitOfWork
    {
        private UserRepository userRepository;        
        private Authenticate authenticate;         
        private Signup signup;
        private ForgotPassword forgotPassword;
        private ChangePassword changePassword;
        public AccountsUOW()
            : base()
        {
            if (base.Context == null)
            {
                throw new ArgumentNullException("Context was not supplied");
            }
            else
            {
                ((IUnitOfWork)this).InitializeRepositories();
            }
        }
        public AccountsUOW(shiner49_JunkCarNewEntities context)
            : base(context)
        {
            if (context == null)
            {
                throw new ArgumentNullException("Context was not supplied");
            }
            else
            {
                ((IUnitOfWork)this).InitializeRepositories();
            }
        }
        void IUnitOfWork.InitializeRepositories()
        {            
            userRepository = (UserRepository)base.Factory.RepositoryFactory.CreateRepository(typeof(UserRepository));            
            userRepository.DataContext = base.Context;            
        }
        void IUnitOfWork.Save(AbstractDomainModel domainModel)
        {
            try
            {
                signup = (Signup)domainModel;

                int customerId = userRepository.Add(signup.Email, signup.Name, signup.Address, signup.Phone, JunkCar.Core.Common.Encryption.Encrypt("#", signup.Password), signup.ZipCode);
                if (customerId <= 0)
                { throw new Exception("User name already exist. Please login using the existing user name."); }               
            }
            catch (Exception ex)
            {
                throw ex;
            }       
        }
        void IUnitOfWork.SaveAll()
        {
            throw new NotImplementedException();
        }
        void IUnitOfWork.Delete(AbstractDomainModel domainModel)
        {
            throw new NotImplementedException();
        }
        void IUnitOfWork.Update(AbstractDomainModel domainModel)
        {
            throw new NotImplementedException();
        }
        void IUnitOfWork.Commit()
        {
            base.Commit();
        }
        void IUnitOfWork.Add(AbstractDomainModel domainModel)
        {
            base.Add(domainModel);
        }
        void IUnitOfWork.Remove(AbstractDomainModel domainModel)
        {
            base.Remove(domainModel);
        }
        public AbstractDomainModel Get(AbstractDomainModel domainModel, OperationTypeEnum operationType)
        {
            switch (operationType)
            {
                case OperationTypeEnum.AUTHENTICATE:
                    authenticate = (JunkCar.DomainModel.Models.Authenticate)domainModel;
                    string encryptedPass = Encryption.Encrypt("#", authenticate.Password);
                    string customerName = userRepository.GetCustomerName(authenticate.Email, encryptedPass);
                    if (customerName.Length > 0)
                    {
                        authenticate.IsAuthenticated = true;
                        authenticate.Name = customerName;
                    }
                    else
                    {
                        authenticate.IsAuthenticated = false;
                        throw new Exception("Please check login credentials and then try again.");
                    }
                    break;
                case OperationTypeEnum.GET_SECURITY_QUESTION:
                    forgotPassword = (JunkCar.DomainModel.Models.ForgotPassword)domainModel;
                    forgotPassword.SecurityQuestion = userRepository.GetSecurityQuestion(forgotPassword.UserId);                     
                    break;
                case OperationTypeEnum.CHECK_SECURITY_QUESTION_ANSWER:
                    forgotPassword = (JunkCar.DomainModel.Models.ForgotPassword)domainModel;
                    forgotPassword.ResponseMessage = userRepository.CheckSecurityQuestionAnswer(forgotPassword.SecurityQuestionId,forgotPassword.SecurityQuestionAnswer);
                    if (forgotPassword.ResponseMessage == "Valid")
                    {
                        string userName = userRepository.GetCustomerName(forgotPassword.UserId);
                        int customerId = userRepository.SaveVerificationCode(forgotPassword.UserId, 123);
                        if (customerId > 0)
                        {
                            JunkCar.Core.ConfigurationEmails.ConfigurationEmail.ForgotPasswordAccountVerificationCode(userName, 123, forgotPassword.UserId, "Account Verification");
                        }
                    }
                    break;
                case OperationTypeEnum.CHECK_VERIFICATION_CODE:
                    forgotPassword = (JunkCar.DomainModel.Models.ForgotPassword)domainModel;
                    int cId = userRepository.CheckVerificationCode(forgotPassword.VerificationCode);
                    if (cId > 0)
                    {
                        forgotPassword.ResponseMessage = "Valid";
                    }
                    else
                    { forgotPassword.ResponseMessage = "Invalid"; }
                    break;
                case OperationTypeEnum.RESET_PASSWORD:
                    forgotPassword = (JunkCar.DomainModel.Models.ForgotPassword)domainModel;
                    int cusId = userRepository.ResetPassword(forgotPassword.UserId, Encryption.Encrypt("#", forgotPassword.NewPassword));
                    if (cusId > 0)
                    {                        
                        string userName = userRepository.GetCustomerName(forgotPassword.UserId);
                        JunkCar.Core.ConfigurationEmails.ConfigurationEmail.ResetPassword(userName,forgotPassword.UserId,forgotPassword.NewPassword, forgotPassword.UserId, "Password Reset");
                        forgotPassword.ResponseMessage = "Successful";
                    }
                    else
                    { forgotPassword.ResponseMessage = "Failure"; }
                    break;
                case OperationTypeEnum.CHANGE_PASSWORD:
                    changePassword = (JunkCar.DomainModel.Models.ChangePassword)domainModel;
                    cusId = userRepository.ResetPassword(changePassword.UserId, Encryption.Encrypt("#", changePassword.NewPassword));
                    if (cusId > 0)
                    {
                        string userName = userRepository.GetCustomerName(changePassword.UserId);
                        JunkCar.Core.ConfigurationEmails.ConfigurationEmail.ChangePasswordEmail(changePassword.UserId, changePassword.NewPassword, changePassword.UserId);
                        changePassword.ResponseMessage = "Successful";
                    }
                    else
                    { changePassword.ResponseMessage = "Failure"; }
                    break;
                case OperationTypeEnum.CHECK_USER_ID:
                    authenticate = (JunkCar.DomainModel.Models.Authenticate)domainModel;
                    customerName = userRepository.GetCustomerName(authenticate.Email);
                    if (customerName.Length > 0)
                    {

                        authenticate.ResponseMessage = "Valid";
                    }
                    else
                    { authenticate.ResponseMessage = "Invalid"; }
                    break;
                default:
                    break;
            }

            switch (operationType)
            {
                case OperationTypeEnum.AUTHENTICATE:
                    return authenticate;
                case OperationTypeEnum.GET_SECURITY_QUESTION:
                    return forgotPassword;
                case OperationTypeEnum.CHECK_SECURITY_QUESTION_ANSWER:
                    return forgotPassword;
                case OperationTypeEnum.CHECK_VERIFICATION_CODE:
                    return forgotPassword;
                case OperationTypeEnum.RESET_PASSWORD:
                    return forgotPassword;
                case OperationTypeEnum.CHANGE_PASSWORD:
                    return changePassword;
                case OperationTypeEnum.CHECK_USER_ID:
                    return authenticate;

                default:
                    break;
            }
            return null;
        }
        public AbstractDomainModel GetAll(Core.Enumerations.SearchCriteriaEnum searchCriteria)
        {
            //throw new NotImplementedException();
            signup = new DomainModel.Models.Signup();
            switch (searchCriteria)
            {
                case Core.Enumerations.SearchCriteriaEnum.GET_ALL_SECURITY_QUESTIONS:
                    signup.SecurityQuestions = userRepository.GetAllSecurityQuestions();
                    break;
                default:
                    break;
            }
            return signup;
        }
    }
}