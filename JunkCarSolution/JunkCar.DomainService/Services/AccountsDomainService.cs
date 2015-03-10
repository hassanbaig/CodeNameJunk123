using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using JunkCar.UnitOfWork.Base;
using JunkCar.Factory.Factories;
using JunkCar.UnitOfWork;
using JunkCar.Core.Enumerations;
namespace JunkCar.DomainService.Services
{
    public class AccountsDomainService : AbstractDomainService
    {
        private IUnitOfWork unitOfWork;
        private DomainModel.Models.Authenticate authenticate;
        private DomainModel.Models.ForgotPassword forgotPassword;
        private DomainModel.Models.ChangePassword changePassword;
        private JunkCar.DomainModel.Models.Signup signup;
        public override AbstractDomainModel Save(AbstractDomainModel domainModel, DomainModelEnum domainModelType)
        {
            signup = (JunkCar.DomainModel.Models.Signup)domainModel;
            try
            {
                if (domainModel != null)
                {
                    switch (domainModelType)
                    {
                        case DomainModelEnum.SIGNUP:
                            if (signup.Name == null || signup.Name.Length <= 0)
                            { signup.ResponseMessage = "Name is required."; }
                            else if (signup.Password == null || signup.Password.Length <= 0)
                            { signup.ResponseMessage = "Password is required."; }
                            else if (signup.ZipCode == null || signup.ZipCode.Length <= 0)
                            { signup.ResponseMessage = "Zip code is required."; }
                            else
                            {
                                FactoryFacade factory = new FactoryFacade();
                                unitOfWork = factory.UnitOfWorkFactory.CreateUnitOfWork(typeof(JunkCar.UnitOfWork.UOWs.AccountsUOW));
                                unitOfWork.Save(signup);
                                unitOfWork.Commit();
                                signup.ResponseMessage = "Your account has been created successfully and you will receive an email shortly with the details";

                                JunkCar.Core.ConfigurationEmails.ConfigurationEmail.SignupEmail(signup.Email,signup.Name, signup.Password, signup.Email);
                            }
                            break;
                        default:
                            break;
                    }
                }
                else
                {
                    switch (domainModelType)
                    {
                        case DomainModelEnum.SIGNUP:
                            signup.ResponseMessage = "Invalid domain model.";
                            break;
                        default:
                            break;
                    }
                }
            }
            catch (Exception ex)
            {
                switch (domainModelType)
                {
                    case DomainModelEnum.SIGNUP:
                        signup.ResponseMessage = ex.Message;
                        break;
                    default:
                        break;
                }

            }
            switch (domainModelType)
            {
                case DomainModelEnum.SIGNUP:
                    return signup;
                default:
                    break;
            }
            return null;
        }

        public override AbstractDomainModel Update(AbstractDomainModel domainModel, DomainModelEnum domainModelType)
        {
            
            try
            {
                if (domainModel != null)
                {
                    switch (domainModelType)
                    {
                        case DomainModelEnum.CHANGE_PASSWORD:
                            changePassword = (DomainModel.Models.ChangePassword)domainModel;
                            if (changePassword.UserId == null || changePassword.UserId.Length <= 0)
                            { changePassword.ResponseMessage = "Email is required"; }
                            else if (changePassword.OldPassword == null || changePassword.OldPassword.Length <= 0)
                            { changePassword.ResponseMessage = "Old Password is required"; }
                            else if (changePassword.NewPassword == null || changePassword.NewPassword.Length <= 0)
                            { changePassword.ResponseMessage = "New Password is required"; }
                            else
                            {
                                FactoryFacade factory = new FactoryFacade();
                                unitOfWork = factory.UnitOfWorkFactory.CreateUnitOfWork(typeof(JunkCar.UnitOfWork.UOWs.AccountsUOW));
                                changePassword = (DomainModel.Models.ChangePassword)unitOfWork.Get(changePassword, OperationTypeEnum.CHANGE_PASSWORD);
                                changePassword.ResponseMessage = "Valid";
                            }
                            break;
                        default:
                            break;
                    }
                }
                else
                {
                    switch (domainModelType)
                    {
                        case DomainModelEnum.CHANGE_PASSWORD:
                            changePassword.ResponseMessage = "Invalid domain model";
                            break;
                        default:
                            break;
                    }
                }
            }
            catch (Exception ex)
            {
                switch (domainModelType)
                {
                    case DomainModelEnum.CHANGE_PASSWORD:
                        changePassword.ResponseMessage = ex.Message;
                        break;
                    default:
                        break;
                }
            }
            switch (domainModelType)
            {
                case DomainModelEnum.CHANGE_PASSWORD:
                    return changePassword;
                default:
                    break;
            }
            return null;
            
        }

        public override AbstractDomainModel Delete(AbstractDomainModel domainModel, DomainModelEnum domainModelType)
        {
            throw new NotImplementedException();
        }

        public override AbstractDomainModel Query(AbstractDomainModel domainModel, DomainModelEnum domainModelType)
        {           
            try
            {
                if (domainModel != null)
                {
                    switch (domainModelType)
                    {
                        case DomainModelEnum.AUTHENTICATE:
                            authenticate = (DomainModel.Models.Authenticate)domainModel;
                            if (authenticate.Email == null || authenticate.Email.Length <= 0)
                            { authenticate.ResponseMessage = "Email is required"; }
                            else if (authenticate.Password == null || authenticate.Password.Length <= 0)
                            { authenticate.ResponseMessage = "Password is required"; }
                            else
                            {
                                FactoryFacade factory = new FactoryFacade();
                                unitOfWork = factory.UnitOfWorkFactory.CreateUnitOfWork(typeof(JunkCar.UnitOfWork.UOWs.AccountsUOW));
                                authenticate = (DomainModel.Models.Authenticate)unitOfWork.Get(authenticate,OperationTypeEnum.AUTHENTICATE);
                                authenticate.ResponseMessage = "Valid";
                            }
                            break;
                        case DomainModelEnum.GET_SECURITY_QUESTION:
                            forgotPassword = (DomainModel.Models.ForgotPassword)domainModel;
                            if (forgotPassword.UserId == null || forgotPassword.UserId.Length <= 0)
                            { forgotPassword.ResponseMessage = "User id is required"; }                         
                            else
                            {
                                FactoryFacade factory = new FactoryFacade();
                                unitOfWork = factory.UnitOfWorkFactory.CreateUnitOfWork(typeof(JunkCar.UnitOfWork.UOWs.AccountsUOW));
                                forgotPassword = (DomainModel.Models.ForgotPassword)unitOfWork.Get(forgotPassword, OperationTypeEnum.GET_SECURITY_QUESTION);
                                forgotPassword.ResponseMessage = "Valid";
                            }
                            break;
                        case DomainModelEnum.CHECK_SECURITY_QUESTION_ANSWER:
                            forgotPassword = (DomainModel.Models.ForgotPassword)domainModel;
                            if (forgotPassword.SecurityQuestionAnswer == null || forgotPassword.SecurityQuestionAnswer.Length <= 0)
                            { forgotPassword.ResponseMessage = "Please answer the given question"; }
                            else
                            {
                                FactoryFacade factory = new FactoryFacade();
                                unitOfWork = factory.UnitOfWorkFactory.CreateUnitOfWork(typeof(JunkCar.UnitOfWork.UOWs.AccountsUOW));
                                forgotPassword = (DomainModel.Models.ForgotPassword)unitOfWork.Get(forgotPassword, OperationTypeEnum.CHECK_SECURITY_QUESTION_ANSWER);
                            }
                            break;
                        case DomainModelEnum.CHECK_VERIFICATION_CODE:
                            forgotPassword = (DomainModel.Models.ForgotPassword)domainModel;
                            if (forgotPassword.VerificationCode == 0)
                            { forgotPassword.ResponseMessage = "Please enter the given verification code"; }
                            else
                            {
                                FactoryFacade factory = new FactoryFacade();
                                unitOfWork = factory.UnitOfWorkFactory.CreateUnitOfWork(typeof(JunkCar.UnitOfWork.UOWs.AccountsUOW));
                                forgotPassword = (DomainModel.Models.ForgotPassword)unitOfWork.Get(forgotPassword, OperationTypeEnum.CHECK_VERIFICATION_CODE);
                            }
                            break;
                        case DomainModelEnum.RESET_PASSWORD:
                            forgotPassword = (DomainModel.Models.ForgotPassword)domainModel;
                            if (forgotPassword.NewPassword == null || forgotPassword.NewPassword.Length <= 0)
                            { forgotPassword.ResponseMessage = "Please enter new password"; }
                            else
                            {
                                FactoryFacade factory = new FactoryFacade();
                                unitOfWork = factory.UnitOfWorkFactory.CreateUnitOfWork(typeof(JunkCar.UnitOfWork.UOWs.AccountsUOW));
                                forgotPassword = (DomainModel.Models.ForgotPassword)unitOfWork.Get(forgotPassword, OperationTypeEnum.RESET_PASSWORD);
                            }
                            break;
                        case DomainModelEnum.CHECK_USER_ID:
                            authenticate = (DomainModel.Models.Authenticate)domainModel;
                            if (authenticate.Email == null || authenticate.Email.Length <= 0)
                            { authenticate.ResponseMessage = "Please enter valid email"; }
                            else
                            {
                                FactoryFacade factory = new FactoryFacade();
                                unitOfWork = factory.UnitOfWorkFactory.CreateUnitOfWork(typeof(JunkCar.UnitOfWork.UOWs.AccountsUOW));
                                authenticate = (DomainModel.Models.Authenticate)unitOfWork.Get(authenticate, OperationTypeEnum.CHECK_USER_ID);
                            }
                            break;
                        default:
                            break;
                    }
                }
                else
                {
                    switch (domainModelType)
                    {
                        case DomainModelEnum.AUTHENTICATE:
                            authenticate.ResponseMessage = "Invalid domain model";
                            break;
                        case DomainModelEnum.GET_SECURITY_QUESTION:
                            forgotPassword.ResponseMessage = "Invalid domain model";
                            break;
                        case DomainModelEnum.CHECK_SECURITY_QUESTION_ANSWER:
                            forgotPassword.ResponseMessage = "Invalid domain model";
                            break;
                        case DomainModelEnum.CHECK_VERIFICATION_CODE:
                            forgotPassword.ResponseMessage = "Invalid domain model";
                            break;
                        case DomainModelEnum.RESET_PASSWORD:
                            forgotPassword.ResponseMessage = "Invalid domain model";
                            break;
                        case DomainModelEnum.CHECK_USER_ID:
                            authenticate.ResponseMessage = "Invalid domain model";
                            break;
                        default:
                            break;
                    }
                }
            }
            catch (Exception ex)
            {
                switch (domainModelType)
                {
                    case DomainModelEnum.AUTHENTICATE:
                        authenticate.ResponseMessage = ex.Message;
                        break;
                    case DomainModelEnum.GET_SECURITY_QUESTION:
                        forgotPassword.ResponseMessage = ex.Message;
                        break;
                    case DomainModelEnum.CHECK_SECURITY_QUESTION_ANSWER:
                        forgotPassword.ResponseMessage = ex.Message;
                        break;
                    case DomainModelEnum.CHECK_VERIFICATION_CODE:
                        forgotPassword.ResponseMessage = ex.Message;
                        break;
                    case DomainModelEnum.RESET_PASSWORD:
                        forgotPassword.ResponseMessage = ex.Message;
                        break;
                    case DomainModelEnum.CHECK_USER_ID:
                        authenticate.ResponseMessage = ex.Message;
                        break;
                    default:
                        break;
                }
            }
            switch (domainModelType)
            {
                case DomainModelEnum.AUTHENTICATE:
                    return authenticate;
                case DomainModelEnum.GET_SECURITY_QUESTION:
                    return forgotPassword;
                case DomainModelEnum.CHECK_SECURITY_QUESTION_ANSWER:
                    return forgotPassword;
                case DomainModelEnum.CHECK_VERIFICATION_CODE:
                    return forgotPassword;
                case DomainModelEnum.RESET_PASSWORD:
                    return forgotPassword;
                case DomainModelEnum.CHECK_USER_ID:
                    return authenticate;
                default:
                    break;
            }
            return null;
        }

        public override AbstractDomainModel Query(AbstractDomainModel domainModel, DomainModelEnum domainModelType, SearchCriteriaEnum searchCriteria)
        {
            throw new NotImplementedException();
        }

        public override AbstractDomainModel Query(SearchCriteriaEnum searchCriteria)
        {
            signup = new DomainModel.Models.Signup();
            FactoryFacade factory = new FactoryFacade();
            try
            {
                switch (searchCriteria)
                {
                    case SearchCriteriaEnum.GET_ALL_SECURITY_QUESTIONS:
                        unitOfWork = factory.UnitOfWorkFactory.CreateUnitOfWork(typeof(JunkCar.UnitOfWork.UOWs.AccountsUOW));
                        signup = (DomainModel.Models.Signup)unitOfWork.GetAll(searchCriteria);
                        break;
                    default:
                        break;
                }
            }
            catch (Exception ex)
            {
                switch (searchCriteria)
                {
                    case SearchCriteriaEnum.GET_ALL_SECURITY_QUESTIONS:
                        signup.ResponseMessage = ex.Message;
                        break;               
                    default:
                        break;
                }
            }
            finally
            {
                factory = null;
            }
            switch (searchCriteria)
            {
                case SearchCriteriaEnum.GET_ALL_SECURITY_QUESTIONS:
                    return signup;               
                default:
                    break;
            }
            return null;
        }
    }
}
