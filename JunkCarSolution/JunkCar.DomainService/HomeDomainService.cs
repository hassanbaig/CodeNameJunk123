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
                                home = (DomainModel.Models.Home)unitOfWork.Get(home);
                                home.ResponseMessage = "Valid";
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
                    default:
                        break;
                }
            }

            switch (domainModelType)
            {
                case JunkCar.Factory.Enumerations.DomainModelEnum.GET_MAKES:
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
                default:
                    break;
            }
            return null;
        }
    }
}