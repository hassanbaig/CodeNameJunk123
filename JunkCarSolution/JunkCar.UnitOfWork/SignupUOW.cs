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
using JunkCar.Repository.RepositoryClasses;
using JunkCar.Core.Enumerations;

namespace JunkCar.UnitOfWork
{ 
    public class SignupUOW : BaseUnitOfWork, IUnitOfWork
    {        
        private UserRepository userRepository;
        private Signup signup;
        public SignupUOW()
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
        public SignupUOW(shiner49_JunkCarNewEntities context)
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


        public AbstractDomainModel Get(AbstractDomainModel domainModel)
        {
            throw new NotImplementedException();
        }

        public AbstractDomainModel GetAll(SearchCriteriaEnum searchCriteria)
        {
            throw new NotImplementedException();
        }
    }
}