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
    public class ContactUsDomainService : AbstractDomainService
    {
        private IUnitOfWork unitOfWork;
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
            DomainModel.Models.ContactUs contactUs = (DomainModel.Models.ContactUs)domainModel;
            try
            {
                if (domainModel != null)
                {
                    switch (domainModelType)
                    {
                        case JunkCar.Factory.Enumerations.DomainModelEnum.CONTACT_EMAIL_MESSAGE:
                            if (contactUs.Email == null || contactUs.Email.Length <= 0)
                            { contactUs.ResponseMessage = "Email is required"; }
                            else if (contactUs.Name == null || contactUs.Name.Length <= 0)
                            { contactUs.ResponseMessage = "Name is required"; }
                            else
                            {
                                FactoryFacade factory = new FactoryFacade();
                                unitOfWork = factory.UnitOfWorkFactory.CreateUnitOfWork(typeof(JunkCar.UnitOfWork.UOWs.ContactUsUOW));
                                contactUs = (DomainModel.Models.ContactUs)unitOfWork.Get(contactUs, OperationType.CONTACT_EMAIL_MESSAGE);
                                contactUs.ResponseMessage = "Valid";
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
                        case JunkCar.Factory.Enumerations.DomainModelEnum.CONTACT_EMAIL_MESSAGE:
                            contactUs.ResponseMessage = "Invalid domain model";
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
                    case JunkCar.Factory.Enumerations.DomainModelEnum.CONTACT_EMAIL_MESSAGE:
                        contactUs.ResponseMessage = ex.Message;
                        break;
                    default:
                        break;
                }
            }
            switch (domainModelType)
            {
                case JunkCar.Factory.Enumerations.DomainModelEnum.CONTACT_EMAIL_MESSAGE:
                    return contactUs;
                default:
                    break;
            }
            return null;
        }

        public override AbstractDomainModel Query(AbstractDomainModel domainModel, Factory.Enumerations.DomainModelEnum domainModelType, SearchCriteriaEnum searchCriteria)
        {
            throw new NotImplementedException();
        }

        public override AbstractDomainModel Query(SearchCriteriaEnum searchCriteria)
        {
            throw new NotImplementedException();
        }
    }
}
