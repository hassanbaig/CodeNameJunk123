using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using JunkCar.UnitOfWork.Base;
using JunkCar.Factory.Factories;
using JunkCar.UnitOfWork;
using JunkCar.Core.Enumerations;
namespace JunkCar.DomainService
{
    public class HomeDomainService : AbstractDomainService
    {

        private IUnitOfWork unitOfWork;
        private DomainModel.Models.Home home;
        public override AbstractDomainModel Save(AbstractDomainModel domainModel, JunkCar.Factory.Enumerations.DomainModelEnum domainModelType)
        {
            throw new NotImplementedException();
        }

        public override AbstractDomainModel Update(AbstractDomainModel domainModel, JunkCar.Factory.Enumerations.DomainModelEnum domainModelType)
        {
            throw new NotImplementedException();
        }

        public override AbstractDomainModel Delete(AbstractDomainModel domainModel, JunkCar.Factory.Enumerations.DomainModelEnum domainModelType)
        {
            throw new NotImplementedException();
        }

        public override AbstractDomainModel Query(AbstractDomainModel domainModel, JunkCar.Factory.Enumerations.DomainModelEnum domainModelType)
        {
            try
            {
                if (domainModel != null)
                {
                    FactoryFacade factory = new FactoryFacade();
                    switch (domainModelType)
                    {
                        case JunkCar.Factory.Enumerations.DomainModelEnum.GET_MAKES:
                            home = (DomainModel.Models.Home)domainModel;
                            if (home.SelectedYear <= 0)
                            {
                                home.ResponseMessage = "Must select a year";
                            }                         
                            else
                            {
                                unitOfWork = factory.UnitOfWorkFactory.CreateUnitOfWork(typeof(JunkCar.UnitOfWork.HomeUOW));
                                home = (DomainModel.Models.Home)unitOfWork.Get(home,OperationType.Get_Makes);
                                home.ResponseMessage = "Valid";
                            }
                            break;
                        case JunkCar.Factory.Enumerations.DomainModelEnum.GET_MODELS:
                            home = (DomainModel.Models.Home)domainModel;
                            if (home.SelectedYear <= 0)
                            {
                                home.ResponseMessage = "Must select a year";
                            }
                            else if (home.SelectedMakeId <= 0)
                            {
                                home.ResponseMessage = "Must select a model";
                            }
                            else
                            {
                                unitOfWork = factory.UnitOfWorkFactory.CreateUnitOfWork(typeof(JunkCar.UnitOfWork.HomeUOW));
                                home = (DomainModel.Models.Home)unitOfWork.Get(home,OperationType.Get_Models);
                                home.ResponseMessage = "Valid";
                            }
                            break;
                        case JunkCar.Factory.Enumerations.DomainModelEnum.CHECK_ZIPCODE:
                            home = (DomainModel.Models.Home)domainModel;
                            if (home.ZipCode == null || home.ZipCode == "" || home.ZipCode == string.Empty )
                            {
                                home.ResponseMessage = "Must enter a zipcode";
                            }                          
                            else
                            {
                                unitOfWork = factory.UnitOfWorkFactory.CreateUnitOfWork(typeof(JunkCar.UnitOfWork.HomeUOW));
                                home = (DomainModel.Models.Home)unitOfWork.Get(home,OperationType.Check_ZipCode);
                                home.ResponseMessage = "Valid";
                            }
                            break;
                        case JunkCar.Factory.Enumerations.DomainModelEnum.GET_CITIES:
                            home = (DomainModel.Models.Home)domainModel;
                            if (home.StateId <= 0)
                            {
                                home.ResponseMessage = "Must select a state";
                            }
                            else
                            {
                                unitOfWork = factory.UnitOfWorkFactory.CreateUnitOfWork(typeof(JunkCar.UnitOfWork.HomeUOW));
                                home = (DomainModel.Models.Home)unitOfWork.Get(home,OperationType.Get_Cities);
                                home.ResponseMessage = "Valid";
                            }
                            break;
                        case JunkCar.Factory.Enumerations.DomainModelEnum.GET_AN_OFFER:
                            home = (DomainModel.Models.Home)domainModel;                           
                            //else
                            //{
                                unitOfWork = factory.UnitOfWorkFactory.CreateUnitOfWork(typeof(JunkCar.UnitOfWork.HomeUOW));
                                home = (DomainModel.Models.Home)unitOfWork.Get(home,OperationType.Get_An_Offer);
                                home.ResponseMessage = "Valid";
                            //}
                            break;
                        case JunkCar.Factory.Enumerations.DomainModelEnum.GET_A_BETTER_OFFER:
                            home = (DomainModel.Models.Home)domainModel;
                            if (home.SelectedYear <= 0)
                            {
                                home.ResponseMessage = "Must select a year";
                            }
                            else if (home.SelectedMakeId <= 0)
                            {
                                home.ResponseMessage = "Must select a make";
                            }
                            else if (home.SelectedModelId <= 0)
                            {
                                home.ResponseMessage = "Must select a model";
                            }
                            else
                            {                                
                                unitOfWork = factory.UnitOfWorkFactory.CreateUnitOfWork(typeof(JunkCar.UnitOfWork.HomeUOW));
                                home = (DomainModel.Models.Home)unitOfWork.Get(home,OperationType.Get_A_Better_Offer);
                                home.ResponseMessage = "Valid";
                            }
                            break;
                        case JunkCar.Factory.Enumerations.DomainModelEnum.CONFIRM_OFFER:
                            home = (DomainModel.Models.Home)domainModel;
                            if (home.Name.Length <= 0)
                            {
                                home.ResponseMessage = "Please enter name";
                            }
                            else if (home.Address.Length <= 0)
                            {
                                home.ResponseMessage = "Please enter address";
                            }
                            else if (home.Phone.Length <= 0)
                            {
                                home.ResponseMessage = "Please enter phone number";
                            }
                            else if (home.EmailAddress.Length <= 0)
                            {
                                home.ResponseMessage = "Please enter email address";
                            }
                            else
                            {
                                if (home.OfferPrice.Contains("$"))
                                {
                                   home.OfferPrice = home.OfferPrice.Replace("$","");
                                }
                                unitOfWork = factory.UnitOfWorkFactory.CreateUnitOfWork(typeof(JunkCar.UnitOfWork.HomeUOW));
                                home = (DomainModel.Models.Home)unitOfWork.Get(home,OperationType.Confirm_Offer);
                                home.ResponseMessage = "Confirmed";                                
                            }
                            break;
                        case JunkCar.Factory.Enumerations.DomainModelEnum.CONFIRM_OFFER_WITH_QUESTIONNAIRE:
                            home = (DomainModel.Models.Home)domainModel;
                            if (home.Name.Length <= 0)
                            {
                                home.ResponseMessage = "Please enter name";
                            }
                            else if (home.Address.Length <= 0)
                            {
                                home.ResponseMessage = "Please enter address";
                            }
                            else if (home.Phone.Length <= 0)
                            {
                                home.ResponseMessage = "Please enter phone number";
                            }
                            else if (home.EmailAddress.Length <= 0)
                            {
                                home.ResponseMessage = "Please enter email address";
                            }
                            else
                            {
                                if (home.OfferPrice.Contains("$"))
                                {
                                    home.OfferPrice = home.OfferPrice.Replace("$", "");
                                }
                                unitOfWork = factory.UnitOfWorkFactory.CreateUnitOfWork(typeof(JunkCar.UnitOfWork.HomeUOW));
                                home = (DomainModel.Models.Home)unitOfWork.Get(home,OperationType.Confirm_Offer_With_Questionnaire);
                                home.ResponseMessage = "Confirmed";
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
                        case JunkCar.Factory.Enumerations.DomainModelEnum.GET_MAKES:
                            home.ResponseMessage = "Invalid domain model";
                            break;
                        case JunkCar.Factory.Enumerations.DomainModelEnum.GET_MODELS:
                            home.ResponseMessage = "Invalid domain model";
                            break;
                        case JunkCar.Factory.Enumerations.DomainModelEnum.CHECK_ZIPCODE:
                            home.ResponseMessage = "Invalid domain model";
                            break;
                        case JunkCar.Factory.Enumerations.DomainModelEnum.GET_CITIES:
                            home.ResponseMessage = "Invalid domain model";
                            break;
                        case JunkCar.Factory.Enumerations.DomainModelEnum.GET_AN_OFFER:
                            home.ResponseMessage = "Invalid domain model";
                            break;
                        case JunkCar.Factory.Enumerations.DomainModelEnum.GET_A_BETTER_OFFER:
                            home.ResponseMessage = "Invalid domain model";
                            break;
                        case JunkCar.Factory.Enumerations.DomainModelEnum.CONFIRM_OFFER:
                            home.ResponseMessage = "Invalid domain model";
                            break;
                        case JunkCar.Factory.Enumerations.DomainModelEnum.CONFIRM_OFFER_WITH_QUESTIONNAIRE:
                            home.ResponseMessage = "Invalid domain model";
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
                    case JunkCar.Factory.Enumerations.DomainModelEnum.GET_MAKES:
                        home.ResponseMessage = ex.Message;
                        break;
                    case JunkCar.Factory.Enumerations.DomainModelEnum.GET_MODELS:
                        home.ResponseMessage = ex.Message;
                        break;
                    case JunkCar.Factory.Enumerations.DomainModelEnum.CHECK_ZIPCODE:
                        home.ResponseMessage = ex.Message;
                        break;
                    case JunkCar.Factory.Enumerations.DomainModelEnum.GET_CITIES:
                        home.ResponseMessage = ex.Message;
                        break;
                    case JunkCar.Factory.Enumerations.DomainModelEnum.GET_AN_OFFER:
                        home.ResponseMessage = ex.Message;
                        break;
                    case JunkCar.Factory.Enumerations.DomainModelEnum.GET_A_BETTER_OFFER:
                        home.ResponseMessage = ex.Message;
                        break;
                    case JunkCar.Factory.Enumerations.DomainModelEnum.CONFIRM_OFFER:
                        home.ResponseMessage = ex.Message;
                        break;
                    case JunkCar.Factory.Enumerations.DomainModelEnum.CONFIRM_OFFER_WITH_QUESTIONNAIRE:
                        home.ResponseMessage = ex.Message;
                        break;
                    default:
                        break;
                }
            }

            switch (domainModelType)
            {
                case JunkCar.Factory.Enumerations.DomainModelEnum.GET_MAKES:
                    return home;
                case JunkCar.Factory.Enumerations.DomainModelEnum.GET_MODELS:
                    return home;
                case JunkCar.Factory.Enumerations.DomainModelEnum.CHECK_ZIPCODE:
                    return home;
                case JunkCar.Factory.Enumerations.DomainModelEnum.GET_CITIES:
                    return home;
                case JunkCar.Factory.Enumerations.DomainModelEnum.GET_AN_OFFER:
                    return home;
                case JunkCar.Factory.Enumerations.DomainModelEnum.GET_A_BETTER_OFFER:
                    return home;
                case JunkCar.Factory.Enumerations.DomainModelEnum.CONFIRM_OFFER:
                    return home;
                case JunkCar.Factory.Enumerations.DomainModelEnum.CONFIRM_OFFER_WITH_QUESTIONNAIRE:
                    return home;
                default:
                    break;
            }
            return null;  // Just to fullfill the syntactical requirements, this return will never hit in any case.
        }

        public override AbstractDomainModel Query(AbstractDomainModel domainModel, Factory.Enumerations.DomainModelEnum domainModelType, SearchCriteriaEnum searchCriteria)
        {
            throw new NotImplementedException();
        }

        public override AbstractDomainModel Query(SearchCriteriaEnum searchCriteria)
        {
            home = new DomainModel.Models.Home();            
            FactoryFacade factory = new FactoryFacade();
            try
            {
                switch (searchCriteria)
                {                    
                    case SearchCriteriaEnum.GET_REGISTRATION_YEARS:                        
                        unitOfWork = factory.UnitOfWorkFactory.CreateUnitOfWork(typeof(JunkCar.UnitOfWork.HomeUOW));
                        home = (DomainModel.Models.Home)unitOfWork.GetAll(searchCriteria);
                        break;
                    case SearchCriteriaEnum.GET_CYLINDERS:
                        unitOfWork = factory.UnitOfWorkFactory.CreateUnitOfWork(typeof(JunkCar.UnitOfWork.HomeUOW));
                        home = (DomainModel.Models.Home)unitOfWork.GetAll(searchCriteria);
                        break;
                    case SearchCriteriaEnum.GET_STATES:
                        unitOfWork = factory.UnitOfWorkFactory.CreateUnitOfWork(typeof(JunkCar.UnitOfWork.HomeUOW));
                        home = (DomainModel.Models.Home)unitOfWork.GetAll(searchCriteria);
                        break;
                    case SearchCriteriaEnum.GET_QUESTIONNAIRE:
                        unitOfWork = factory.UnitOfWorkFactory.CreateUnitOfWork(typeof(JunkCar.UnitOfWork.HomeUOW));
                        home = (DomainModel.Models.Home)unitOfWork.GetAll(searchCriteria);
                        break;
                    default:
                        break;
                }
            }
            catch (Exception ex)
            {
                switch (searchCriteria)
                {
                    case SearchCriteriaEnum.GET_REGISTRATION_YEARS:
                        home.ResponseMessage = ex.Message;
                        break;
                    case SearchCriteriaEnum.GET_CYLINDERS:
                        home.ResponseMessage = ex.Message;
                        break;
                    case SearchCriteriaEnum.GET_STATES:
                        home.ResponseMessage = ex.Message;
                        break;
                    case SearchCriteriaEnum.GET_QUESTIONNAIRE:
                        home.ResponseMessage = ex.Message;
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
                case SearchCriteriaEnum.GET_REGISTRATION_YEARS:
                    return home;
                case SearchCriteriaEnum.GET_CYLINDERS:
                    return home;
                case SearchCriteriaEnum.GET_STATES:
                    return home;
                case SearchCriteriaEnum.GET_QUESTIONNAIRE:
                    return home; 
                default:
                    break;
            }
            return null;
        }
    }
}