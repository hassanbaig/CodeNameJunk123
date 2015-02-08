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
    public class AccountsUOW : BaseUnitOfWork, IUnitOfWork
    {
        private UserRepository userRepository;        
        private Authenticate authenticate;         
        private Signup signup;
        public AccountsUOW()
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
        public AccountsUOW(shiner49_JunkCarNewEntities context)
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
            userRepository = (UserRepository)base.Factory.RepositoryFactory.CreateRepository(typeof(UserRepository));            
            userRepository.DataContext = base.Context;            
        }
        void IUnitOfWork.Save(AbstractDomainModel domainModel)
        {
            try
            {
                signup = (Signup)domainModel;

                int affectedRows = userRepository.Add(signup.Email, signup.Name, signup.Address, signup.Phone, JunkCar.Core.Common.Encryption.Encrypt("#", signup.Password), signup.ZipCode);
                if (affectedRows > 0)
                {

                }
                else
                {
                    //throw new Exception("User name already exist. Please login using the existing user name.");
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }       
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
            authenticate = (JunkCar.DomainModel.Models.Authenticate)domainModel;
            string encryptedPass = Encryption.Encrypt("#", authenticate.Password);
            int customerId = userRepository.GetUser(authenticate.Email, encryptedPass);
            if (customerId != 0)
            {
                authenticate.IsAuthenticated = true;
            }
            else
            {
                authenticate.IsAuthenticated = false;
                throw new Exception("Please check login credentials and then try again.");
            }

            return authenticate;
        }
        public AbstractDomainModel GetAll(Core.Enumerations.SearchCriteriaEnum searchCriteria)
        {
            throw new NotImplementedException();
        }
    }
}