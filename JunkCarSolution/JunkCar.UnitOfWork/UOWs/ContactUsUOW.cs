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
    public class ContactUsUOW : BaseUnitOfWork, IUnitOfWork
    {
        //private UserRepository userRepository;        
        //private Authenticate authenticate;         
        private ContactUs contactUs;
        public ContactUsUOW()
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
        public ContactUsUOW(shiner49_JunkCarNewEntities context)
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
            //userRepository = (UserRepository)base.Factory.RepositoryFactory.CreateRepository(typeof(UserRepository));            
            //userRepository.DataContext = base.Context;            
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
            contactUs = (JunkCar.DomainModel.Models.ContactUs)domainModel;
            switch (operationType)
            {                
                case OperationType.CONTACT_EMAIL_MESSAGE:
                    JunkCar.Core.ConfigurationEmails.ConfigurationEmail.ContactUs(contactUs.Name,contactUs.Email,contactUs.Phone,contactUs.Subject,contactUs.Message,"junkcaruser@gmail.com,talha149@gmail.com,aim_saidi@hotmail.com,junkcartrader@gmail.com");
                    break;
                default:
                    break;
            }
            return contactUs;
        }
        public AbstractDomainModel GetAll(Core.Enumerations.SearchCriteriaEnum searchCriteria)
        {
            throw new NotImplementedException();
        }
    }
}