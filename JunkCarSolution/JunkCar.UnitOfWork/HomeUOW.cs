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
        public HomeUOW(shiner49_JunkCarEntities context)
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
                    //home.SelectedQuestionnaire
                    //home.CustomerInfo
                    home.OfferPrice = homeRepository.GetAnOffer(home.SelectedYear,home.SelectedMakeId,home.SelectedModelId,
                        "<Questionnaire_Result><Question_Id>1</Question_Id><Answer_Id>1</Answer_Id></Questionnaire_Result><Questionnaire_Result><Question_Id>2</Question_Id><Answer_Id>1</Answer_Id></Questionnaire_Result><Questionnaire_Result><Question_Id>3</Question_Id><Answer_Id>4</Answer_Id></Questionnaire_Result><Questionnaire_Result><Question_Id>4</Question_Id><Answer_Id>1</Answer_Id></Questionnaire_Result><Questionnaire_Result><Question_Id>5</Question_Id><Answer_Id>1</Answer_Id></Questionnaire_Result><Questionnaire_Result><Question_Id>6</Question_Id><Answer_Id>1</Answer_Id></Questionnaire_Result><Questionnaire_Result><Question_Id>7</Question_Id><Answer_Id>1</Answer_Id></Questionnaire_Result><Questionnaire_Result><Question_Id>8</Question_Id><Answer_Id>1</Answer_Id></Questionnaire_Result>",
                        home.ZipCode, "");
                    if (home.OfferPrice <= 0)
                    {
                        throw new Exception("No offer");
                    }
                    break;
                case 6:
                    //home.SelectedQuestionnaire
                    //home.CustomerInfo
                    home.OfferPrice = homeRepository.GetAnOffer(home.SelectedYear, home.SelectedMakeId, home.SelectedModelId,
                        "<Questionnaire_Result><Question_Id>1</Question_Id><Answer_Id>1</Answer_Id></Questionnaire_Result><Questionnaire_Result><Question_Id>2</Question_Id><Answer_Id>1</Answer_Id></Questionnaire_Result><Questionnaire_Result><Question_Id>3</Question_Id><Answer_Id>4</Answer_Id></Questionnaire_Result><Questionnaire_Result><Question_Id>4</Question_Id><Answer_Id>1</Answer_Id></Questionnaire_Result><Questionnaire_Result><Question_Id>5</Question_Id><Answer_Id>1</Answer_Id></Questionnaire_Result><Questionnaire_Result><Question_Id>6</Question_Id><Answer_Id>1</Answer_Id></Questionnaire_Result><Questionnaire_Result><Question_Id>7</Question_Id><Answer_Id>1</Answer_Id></Questionnaire_Result><Questionnaire_Result><Question_Id>8</Question_Id><Answer_Id>1</Answer_Id></Questionnaire_Result>",
                        home.ZipCode, "");
                    if (home.OfferPrice <= 0)
                    {
                        throw new Exception("No offer");
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