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
using JunkCar.Repository.RepositoryClasses;
using JunkCar.Core.Common;
using JunkCar.Core.Enumerations;
namespace JunkCar.UnitOfWork
{
    public class HomeUOW : BaseUnitOfWork, IUnitOfWork
    {       
        private HomeRepository homeRepository;
        private DomainModel.Models.Home home;
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
            homeRepository.DataContext = base.Context;
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
        public AbstractDomainModel Get(AbstractDomainModel domainModel, OperationType operationType)
        {
            home = (Home)domainModel;
            switch (operationType)
            {
                case OperationType.Get_Makes:
                    home.Makes = homeRepository.GetMakesByYear(home.SelectedYear);
                    if(home.Makes == null)
                    {
                        throw new Exception("No item(s) in a list");
                    }
                    break;
                case OperationType.Get_Models:
                    home.Models = homeRepository.GetModelsByYearMake(home.SelectedYear, home.SelectedMakeId);
                    if (home.Models == null)
                    {
                        throw new Exception("No item(s) in a list");
                    }
                    break;
                case OperationType.Check_ZipCode:
                    home.ZipCodeResult = homeRepository.CheckZipCode(home.ZipCode);
                    if (home.ZipCodeResult.Is_Valid_Zip_Code == false)
                    {
                        throw new Exception("Please enter a valid zipcode");
                    }                   
                    break;
                case OperationType.Get_Cities:
                    home.Cities = homeRepository.GetCitiesByState(home.StateId);
                    if (home.Cities == null)
                    {
                        throw new Exception("No item(s) in a list");
                    }
                    break;
                case OperationType.Get_An_Offer:                   
                    home.OfferPrice = homeRepository.GetAnOffer(home.SelectedYear,home.SelectedMakeId,home.SelectedModelId,home.ZipCode,
                        "<Customer_Info><Customer_Name>" + home.Name + "</Customer_Name>" +
                        "<Customer_Address>" + home.Address + "</Customer_Address>" +
                        "<Customer_Phone>" + home.Phone + "</Customer_Phone>" +
                        "<Customer_Email>" + home.EmailAddress + "</Customer_Email></Customer_Info>",home.CylindersQuantity);
                    if (home.OfferPrice.Length <= 0)
                    {
                        throw new Exception("No offer");
                    }
                    else 
                    {
                        JunkCar.Core.ConfigurationEmails.ConfigurationEmail.OfferEmailForAdmin("Pending", home.SelectedYear, home.SelectedMake, home.SelectedModel, home.OfferPrice, home.Name, home.Address, home.State, home.City, home.ZipCode, home.Phone, home.EmailAddress, "junkcaruser@gmail.com,talha149@gmail.com,aim_saidi@hotmail.com,junkcartrader@gmail.com");
                    }
                    break;
                case OperationType.Get_A_Better_Offer:
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
                        "<Customer_Email>"+home.EmailAddress+"</Customer_Email></Customer_Info>",home.CylindersQuantity);        
           
                    if (home.OfferPrice.Length <= 0)
                    {
                        throw new Exception("No offer");
                    }
                    else
                    {
                        JunkCar.Core.ConfigurationEmails.ConfigurationEmail.OfferEmailForAdmin("Pending", home.QuestionnaireDescription, home.SelectedYear, home.SelectedMake, home.SelectedModel, home.OfferPrice, home.Name, home.Address, home.State, home.City, home.ZipCode, home.Phone, home.EmailAddress, "junkcaruser@gmail.com,talha149@gmail.com,aim_saidi@hotmail.com,junkcartrader@gmail.com");                        
                    }                   
                    break;                              
                case OperationType.Confirm_Offer:
                    JunkCar.Core.ConfigurationEmails.ConfigurationEmail.OfferEmailForAdmin("Confirmed", home.SelectedYear, home.SelectedMake, home.SelectedModel, home.OfferPrice, home.Name, home.Address, home.State, home.City, home.ZipCode, home.Phone, home.EmailAddress, "junkcaruser@gmail.com,talha149@gmail.com,aim_saidi@hotmail.com,junkcartrader@gmail.com");
                    JunkCar.Core.ConfigurationEmails.ConfigurationEmail.OfferEmailForCustomer(home.SelectedYear, home.SelectedMake, home.SelectedModel, home.OfferPrice, home.Name, home.Address, home.Phone,home.ContactNo, home.EmailAddress);
                    break;
                case OperationType.Confirm_Offer_With_Questionnaire:
                    string [] selectedQuestionnaire2 = home.SelectedQuestionnaire.Split(',');
                    int[] questionnaireIds2 = selectedQuestionnaire2.Select(int.Parse).ToArray();

                    home.QuestionnaireDescription = homeRepository.GetQuestionnaireDescription(questionnaireIds2);
                    home.City = homeRepository.GetCity(home.ZipCode);
                    home.State = homeRepository.GetState(home.ZipCode);
                    JunkCar.Core.ConfigurationEmails.ConfigurationEmail.OfferEmailForAdmin("Confirmed", home.QuestionnaireDescription, home.SelectedYear, home.SelectedMake, home.SelectedModel, home.OfferPrice, home.Name, home.Address, home.State, home.City, home.ZipCode, home.Phone, home.EmailAddress, "junkcaruser@gmail.com,talha149@gmail.com,aim_saidi@hotmail.com,junkcartrader@gmail.com");                    
                    JunkCar.Core.ConfigurationEmails.ConfigurationEmail.OfferEmailForCustomer(home.SelectedYear, home.SelectedMake, home.SelectedModel, home.OfferPrice, home.Name, home.Address, home.Phone, home.ContactNo, home.EmailAddress);
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