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


        public AbstractDomainModel Get(AbstractDomainModel domainModel)
        {
            home = (Home)domainModel;
            switch (home.OperationType)
            {
                case 1:
                    home.Makes = homeRepository.GetMakesByYear(home.SelectedYear);
                    if(home.Makes == null)
                    {
                        throw new Exception("No item(s) in a list");
                    }
                    break;
                case 2:
                    home.Models = homeRepository.GetModelsByYearMake(home.SelectedYear, home.SelectedMakeId);
                    if (home.Models == null)
                    {
                        throw new Exception("No item(s) in a list");
                    }
                    break;
                case 3:
                    home.ZipCodeResult = homeRepository.CheckZipCode(home.ZipCode);
                    if (home.ZipCodeResult.Is_Valid_Zip_Code == false)
                    {
                        throw new Exception("Please enter a valid zipcode");
                    }                   
                    break;
                case 4:
                    home.Cities = homeRepository.GetCitiesByState(home.StateId);
                    if (home.Cities == null)
                    {
                        throw new Exception("No item(s) in a list");
                    }
                    break;
                case 5:                   
                    home.OfferPrice = homeRepository.GetAnOffer(home.SelectedYear,home.SelectedMakeId,home.SelectedModelId,home.ZipCode);
                    if (home.OfferPrice.Length <= 0)
                    {
                        throw new Exception("No offer");
                    }
                    break;
                case 6:
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

                    home.OfferPrice = homeRepository.GetAnOffer(home.SelectedYear, home.SelectedMakeId, home.SelectedModelId,
                        questionnaireResult,
                        home.ZipCode);
                    if (home.OfferPrice.Length <= 0)
                    {
                        throw new Exception("No offer");
                    }
                    else
                    {
                        JunkCar.Core.ConfigurationEmails.ConfigurationEmail.OfferEmailForAdmin("Pending", home.QuestionnaireDescription, home.SelectedYear, home.SelectedMake, home.SelectedModel, home.OfferPrice, home.Name, home.Address, home.State, home.City, home.ZipCode, home.Phone, home.EmailAddress, "junkcaruser@gmail.com,talha149@gmail.com,aim_saidi@hotmail.com,junkcartrader@gmail.com");
                    }
                    break;
                case 7:                  
                    home.OfferPrice = homeRepository.GetAnOffer(home.SelectedYear, home.SelectedMakeId, home.SelectedModelId,
                        "<Questionnaire_Result><Question_Id>1</Question_Id><Answer_Id>1</Answer_Id></Questionnaire_Result><Questionnaire_Result><Question_Id>2</Question_Id><Answer_Id>1</Answer_Id></Questionnaire_Result><Questionnaire_Result><Question_Id>3</Question_Id><Answer_Id>4</Answer_Id></Questionnaire_Result><Questionnaire_Result><Question_Id>4</Question_Id><Answer_Id>1</Answer_Id></Questionnaire_Result><Questionnaire_Result><Question_Id>5</Question_Id><Answer_Id>1</Answer_Id></Questionnaire_Result><Questionnaire_Result><Question_Id>6</Question_Id><Answer_Id>1</Answer_Id></Questionnaire_Result><Questionnaire_Result><Question_Id>7</Question_Id><Answer_Id>1</Answer_Id></Questionnaire_Result><Questionnaire_Result><Question_Id>8</Question_Id><Answer_Id>1</Answer_Id></Questionnaire_Result>",
                        home.ZipCode,"");
                    if (home.OfferPrice.Length <= 0)
                    {
                        throw new Exception("No offer");
                    }
                    break;
                case 8:                    
                    home.OfferPrice = homeRepository.GetABetterOffer(home.SelectedYear, home.SelectedMakeId, home.SelectedModelId,home.ZipCode,
                        "<Customer_Info><Customer_Name>"+home.Name+"</Customer_Name>"+
                        "<Customer_Address>"+home.Address+"</Customer_Address>"+
                        "<Customer_Phone>"+home.Phone+"</Customer_Phone>"+
                        "<Customer_Email>"+home.EmailAddress+"</Customer_Email></Customer_Info>");

                    home.City = homeRepository.GetCity(home.ZipCode);
                    home.State = homeRepository.GetState(home.ZipCode);

                    if (home.OfferPrice.Length <= 0)
                    {
                        throw new Exception("No offer");
                    }
                    else
                    {
                        JunkCar.Core.ConfigurationEmails.ConfigurationEmail.OfferEmailForAdmin("Pending", home.SelectedYear, home.SelectedMake, home.SelectedModel, home.OfferPrice, home.Name, home.Address, home.State, home.City, home.ZipCode, home.Phone, home.EmailAddress, "junkcaruser@gmail.com,talha149@gmail.com,aim_saidi@hotmail.com,junkcartrader@gmail.com");
                    }
                    break;
                case 9:
                    JunkCar.Core.ConfigurationEmails.ConfigurationEmail.OfferEmailForAdmin("Confirmed", home.SelectedYear, home.SelectedMake, home.SelectedModel, home.OfferPrice, home.Name, home.Address, home.State, home.City, home.ZipCode, home.Phone, home.EmailAddress, "junkcaruser@gmail.com,talha149@gmail.com,aim_saidi@hotmail.com,junkcartrader@gmail.com");
                    JunkCar.Core.ConfigurationEmails.ConfigurationEmail.OfferEmailForCustomer(home.SelectedYear, home.SelectedMake, home.SelectedModel, home.OfferPrice, home.Name, home.Address, home.Phone,home.ContactNo, home.EmailAddress);
                    break;
                case 10:
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