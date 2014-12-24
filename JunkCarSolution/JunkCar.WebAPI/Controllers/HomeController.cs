using JunkCar.Core.Common;
using JunkCar.DomainModel.Models;
using JunkCar.DomainService;
using JunkCar.Factory.Factories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace JunkCar.WebAPI.Controllers
{
    public class HomeController : ApiController
    {
        private AbstractDomainModel domainModel;
        private AbstractDomainService domainService;      

        [AllowAnonymous]
        [HttpGet]
        public IQueryable GetRegistrationYears()
        {
            FactoryFacade factory = new FactoryFacade();
            domainService = factory.DomainServiceFactory.CreateDomainService(typeof(HomeDomainService));
            return ((DomainModel.Models.Home)domainService.Query(JunkCar.Core.Enumerations.SearchCriteriaEnum.GET_REGISTRATION_YEARS)).Years.AsQueryable();            
        }
        public IQueryable GetRegistrationModels(int year)
        {
            FactoryFacade factory = new FactoryFacade();
            domainModel = factory.DomainModelFactory.CreateDomainModel(typeof(Home));
            domainModel.Fill(HashHelper.GetMakes(year,1));
            domainService = factory.DomainServiceFactory.CreateDomainService(typeof(HomeDomainService));
            return ((DomainModel.Models.Home)domainService.Query(domainModel, JunkCar.Factory.Enumerations.DomainModelEnum.GET_MAKES)).Makes.AsQueryable();            
        }      
    }
}

