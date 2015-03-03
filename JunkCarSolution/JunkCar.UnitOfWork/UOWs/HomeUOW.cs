using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using JunkCar.Data;
using JunkCar.Factory.Factories;
using JunkCar.UnitOfWork.Base;
using JunkCar.DomainModel.Models;
using JunkCar.Repository.Repositories;
using JunkCar.Core.Common;
using JunkCar.Core.Enumerations;
namespace JunkCar.UnitOfWork.UOWs
{
    public class HomeUOW : BaseUnitOfWork, IUnitOfWork
    {       
        private HomeRepository homeRepository;
        private UserRepository userRepository;
        private DomainModel.Models.Home home;
        string adminEmailAddresses;
        public HomeUOW()
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
        public HomeUOW(shiner49_JunkCarNewEntities context)
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
            homeRepository = (HomeRepository)base.Factory.RepositoryFactory.CreateRepository(typeof(HomeRepository));
            userRepository = (UserRepository)base.Factory.RepositoryFactory.CreateRepository(typeof(UserRepository));
            homeRepository.DataContext = base.Context;
            userRepository.DataContext = base.Context;
        }
        void IUnitOfWork.Save(AbstractDomainModel domainModel)
        {
            throw new NotImplementedException();            
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
            home = (Home)domainModel;
            switch (operationType)
            {
                case OperationTypeEnum.GET_MAKES:
                    home.Makes = homeRepository.GetMakesByYear(home.SelectedYear);
                    if(home.Makes == null)
                    {
                        throw new Exception("No item(s) in a list");
                    }
                    break;
                case OperationTypeEnum.GET_MODLES:
                    home.Models = homeRepository.GetModelsByYearMake(home.SelectedYear, home.SelectedMakeId);
                    if (home.Models == null)
                    {
                        throw new Exception("No item(s) in a list");
                    }
                    break;
                case OperationTypeEnum.CHECK_ZIPCODE:
                    home.ZipCodeResult = homeRepository.CheckZipCode(home.ZipCode);
                    if (home.ZipCodeResult.Is_Valid_Zip_Code == false)
                    {
                        throw new Exception("Please enter a valid zipcode");
                    }                   
                    break;
                case OperationTypeEnum.GET_CITIES:
                    home.Cities = homeRepository.GetCitiesByState(home.StateId);
                    if (home.Cities == null)
                    {
                        throw new Exception("No item(s) in a list");
                    }
                    break;
                case OperationTypeEnum.GET_AN_OFFER:                   
                    home.City = homeRepository.GetCity(home.ZipCode);
                    home.State = homeRepository.GetState(home.ZipCode);
                    home.OfferPrice = homeRepository.GetAnOffer(home.SelectedYear,home.SelectedMakeId,home.SelectedModelId,home.ZipCode,
                        "<Customer_Info><Customer_Name>" + home.Name + "</Customer_Name>" +
                        "<Customer_Address>" + home.Address + "</Customer_Address>" +
                        "<Customer_Phone>" + home.Phone + "</Customer_Phone>" +
                        "<Customer_Email>" + home.EmailAddress + "</Customer_Email></Customer_Info>",home.CylindersQuantity,
                        home.EmailAddress,home.Name,home.Address,home.Phone,"password123");
                    if (home.OfferPrice.Length <= 0)
                    {
                        throw new Exception("No offer");
                    }
                    else 
                    {
                        adminEmailAddresses = userRepository.GetAdminEmailAddresses();
                        JunkCar.Core.ConfigurationEmails.ConfigurationEmail.OfferEmailForAdmin("Pending", home.SelectedYear, home.SelectedMake, home.SelectedModel, home.OfferPrice, home.Name, home.Address, home.State, home.City, home.ZipCode, home.Phone, home.EmailAddress, "talha149@gmail.com,aim_saidi@hotmail.com," + adminEmailAddresses);
                    }
                    break;
                case OperationTypeEnum.GET_A_BETTER_OFFER:
                    string [] selectedQuestionnaire = home.SelectedQuestionnaire.Split(',');
                    int[] questionnaireIds = selectedQuestionnaire.Select(int.Parse).ToArray();
                    string questionnaireResult = string.Empty;
                    home.QuestionnaireDescription = homeRepository.GetQuestionnaireDescription(questionnaireIds);
                    home.City = homeRepository.GetCity(home.ZipCode);
                    home.State = homeRepository.GetState(home.ZipCode);
                    for (int i = 0; i < selectedQuestionnaire.Length; i++)
                    {
                        if(i%2==0)
                        {questionnaireResult += "<Questionnaire_Result><Question_Id>"+selectedQuestionnaire[i]+"</Question_Id>";}
                        else
                        { questionnaireResult += "<Answer_Id>"+selectedQuestionnaire[i]+"</Answer_Id></Questionnaire_Result>"; }                         
                    }
                    
                    home.OfferPrice = homeRepository.GetABetterOffer(home.SelectedYear, home.SelectedMakeId, home.SelectedModelId,home.ZipCode,
                        questionnaireResult,
                        "<Customer_Info><Customer_Name>"+home.Name+"</Customer_Name>"+
                        "<Customer_Address>"+home.Address+"</Customer_Address>"+
                        "<Customer_Phone>"+home.Phone+"</Customer_Phone>"+
                        "<Customer_Email>"+home.EmailAddress+"</Customer_Email></Customer_Info>",home.CylindersQuantity,
                        home.EmailAddress, home.Name, home.Address, home.Phone, "password123");        
           
                    if (home.OfferPrice.Length <= 0)
                    {
                        throw new Exception("No offer");
                    }
                    else
                    {
                        adminEmailAddresses = userRepository.GetAdminEmailAddresses();
                        JunkCar.Core.ConfigurationEmails.ConfigurationEmail.OfferEmailForAdmin("Pending", home.CustomerId, home.QuestionnaireDescription, home.SelectedYear, home.SelectedMake, home.SelectedMakeId, home.SelectedModel, home.SelectedModelId, home.CylindersQuantity, home.OfferPrice, home.Name, home.Address, home.State, home.City, home.ZipCode, home.Phone, home.EmailAddress, "talha149@gmail.com,aim_saidi@hotmail.com," + adminEmailAddresses);
                    }                   
                    break;                              
                case OperationTypeEnum.CONFIRM_OFFER:
                    home.City = homeRepository.GetCity(home.ZipCode);
                    home.State = homeRepository.GetState(home.ZipCode);
                    adminEmailAddresses = userRepository.GetAdminEmailAddresses();
                    JunkCar.Core.ConfigurationEmails.ConfigurationEmail.OfferEmailForAdmin("Confirmed", home.SelectedYear, home.SelectedMake, home.SelectedModel, home.OfferPrice, home.Name, home.Address, home.State, home.City, home.ZipCode, home.Phone, home.EmailAddress, "talha149@gmail.com,aim_saidi@hotmail.com," + adminEmailAddresses);
                    JunkCar.Core.ConfigurationEmails.ConfigurationEmail.OfferEmailForCustomer(home.SelectedYear, home.SelectedMake, home.SelectedModel, home.OfferPrice, home.Name, home.Address, home.Phone,home.ContactNo, home.EmailAddress);
                    break;
                case OperationTypeEnum.CONFIRM_OFFER_WITH_QUESTIONNAIRE:
                    string [] selectedQuestionnaire2 = home.SelectedQuestionnaire.Split(',');
                    int[] questionnaireIds2 = selectedQuestionnaire2.Select(int.Parse).ToArray();

                    home.QuestionnaireDescription = homeRepository.GetQuestionnaireDescription(questionnaireIds2);
                    home.City = homeRepository.GetCity(home.ZipCode);
                    home.State = homeRepository.GetState(home.ZipCode);
                    adminEmailAddresses = userRepository.GetAdminEmailAddresses();
                    JunkCar.Core.ConfigurationEmails.ConfigurationEmail.OfferEmailForAdmin("Confirmed", home.CustomerId, home.QuestionnaireDescription, home.SelectedYear, home.SelectedMake, home.SelectedMakeId, home.SelectedModel, home.SelectedModelId, home.CylindersQuantity, home.OfferPrice, home.Name, home.Address, home.State, home.City, home.ZipCode, home.Phone, home.EmailAddress, "talha149@gmail.com,aim_saidi@hotmail.com," + adminEmailAddresses);                    
                    JunkCar.Core.ConfigurationEmails.ConfigurationEmail.OfferEmailForCustomer(home.SelectedYear, home.SelectedMake, home.SelectedModel, home.OfferPrice, home.Name, home.Address, home.Phone, home.ContactNo, home.EmailAddress);
                    break;
                case OperationTypeEnum.GET_CUSTOMER_ID:
                    home.CustomerId = homeRepository.GetCustomerId(home.Address, home.CityId, home.EmailAddress, home.Name, home.Phone, home.StateId,home.ZipCode,"password123");
                    if(home.CustomerId <= 0)
                    {
                        throw new Exception("Customer do not exist");
                    }
                    break;   
                default:
                    break;
            }
            return home;              
        }
        public AbstractDomainModel GetAll(Core.Enumerations.SearchCriteriaEnum searchCriteria)
        {
            home = new DomainModel.Models.Home();
            switch (searchCriteria)
            {
                case Core.Enumerations.SearchCriteriaEnum.GET_REGISTRATION_YEARS:
                    home.Years = homeRepository.GetAllYears();
                    break;
                case Core.Enumerations.SearchCriteriaEnum.GET_CYLINDERS:
                    home.Cylinders = homeRepository.GetCylinders();
                    break;
                case Core.Enumerations.SearchCriteriaEnum.GET_STATES:
                    home.States = homeRepository.GetAllStates();
                    break;
                case Core.Enumerations.SearchCriteriaEnum.GET_QUESTIONNAIRE:
                    home.Questionnaire = homeRepository.GetQuestionnaire();                
                    break;
                default:
                    break;
            }
            return home;
        }
    }
}