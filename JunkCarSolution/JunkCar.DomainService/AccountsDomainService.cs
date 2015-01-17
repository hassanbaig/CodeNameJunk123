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
    public class AccountsDomainService : AbstractDomainService
    {

        private IUnitOfWork unitOfWork;
        public override AbstractDomainModel Save(AbstractDomainModel domainModel, JunkCar.Factory.Enumerations.DomainModelEnum domainModelType)
        {
            JunkCar.DomainModel.Models.Signup signup = (JunkCar.DomainModel.Models.Signup)domainModel;
            try
            {
                if (domainModel != null)
                {
                    switch (domainModelType)
                    {
                        case JunkCar.Factory.Enumerations.DomainModelEnum.SIGNUP:
                            if (signup.Name == null || signup.Name.Length <= 0)
                            { signup.ResponseMessage = "Name is required."; }
                            else if (signup.Password == null || signup.Password.Length <= 0)
                            { signup.ResponseMessage = "Password is required."; }
                            else if (signup.ZipCode == null || signup.ZipCode.Length <= 0)
                            { signup.ResponseMessage = "Zip code is required."; }
                            else
                            {
                                FactoryFacade factory = new FactoryFacade();
                                unitOfWork = factory.UnitOfWorkFactory.CreateUnitOfWork(typeof(JunkCar.UnitOfWork.SignupUOW));
                                unitOfWork.Save(signup);
                                unitOfWork.Commit();
                                signup.ResponseMessage = "Registration is successful";

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
                        case JunkCar.Factory.Enumerations.DomainModelEnum.SIGNUP:
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
                    case JunkCar.Factory.Enumerations.DomainModelEnum.SIGNUP:
                        signup.ResponseMessage = ex.Message;
                        break;
                    default:
                        break;
                }

            }
            switch (domainModelType)
            {
                case JunkCar.Factory.Enumerations.DomainModelEnum.SIGNUP:
                    return signup;
                default:
                    break;
            }
            return null;
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
            throw new NotImplementedException();
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
