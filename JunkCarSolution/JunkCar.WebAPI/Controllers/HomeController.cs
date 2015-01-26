using JunkCar.Core.Common;
using JunkCar.DataModel.Models;
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
        public IQueryable GetRegistrationYears()
        {            
            FactoryFacade factory = new FactoryFacade();
            domainService = factory.DomainServiceFactory.CreateDomainService(typeof(HomeDomainService));
            return ((DomainModel.Models.Home)domainService.Query(JunkCar.Core.Enumerations.SearchCriteriaEnum.GET_REGISTRATION_YEARS)).Years.AsQueryable();            
        }
        public IQueryable GetMakes(int year)
        {
            FactoryFacade factory = new FactoryFacade();
            domainModel = factory.DomainModelFactory.CreateDomainModel(typeof(Home));
            domainModel.Fill(HashHelper.GetMakes(year,1));
            domainService = factory.DomainServiceFactory.CreateDomainService(typeof(HomeDomainService));
            return ((DomainModel.Models.Home)domainService.Query(domainModel, JunkCar.Factory.Enumerations.DomainModelEnum.GET_MAKES)).Makes.AsQueryable();            
        }
        public IQueryable GetModels(int year, int makeId)
        {
            FactoryFacade factory = new FactoryFacade();
            domainModel = factory.DomainModelFactory.CreateDomainModel(typeof(Home));
            domainModel.Fill(HashHelper.GetModels(year,makeId, 2));
            domainService = factory.DomainServiceFactory.CreateDomainService(typeof(HomeDomainService));
            return ((DomainModel.Models.Home)domainService.Query(domainModel, JunkCar.Factory.Enumerations.DomainModelEnum.GET_MODELS)).Models.AsQueryable();
        }
        [HttpGet]
        public CheckZipCode_Result CheckZipCode(string zipCode)
        {
            FactoryFacade factory = new FactoryFacade();
            domainModel = factory.DomainModelFactory.CreateDomainModel(typeof(Home));
            domainModel.Fill(HashHelper.CheckZipCode(zipCode, 3));
            domainService = factory.DomainServiceFactory.CreateDomainService(typeof(HomeDomainService));
            return ((DomainModel.Models.Home)domainService.Query(domainModel, JunkCar.Factory.Enumerations.DomainModelEnum.CHECK_ZIPCODE)).ZipCodeResult;
        }
        public IQueryable GetStates()
        {
            FactoryFacade factory = new FactoryFacade();
            domainService = factory.DomainServiceFactory.CreateDomainService(typeof(HomeDomainService));
            return ((DomainModel.Models.Home)domainService.Query(JunkCar.Core.Enumerations.SearchCriteriaEnum.GET_STATES)).States.AsQueryable();
        }
        [HttpGet]
        public IQueryable GetCities(int stateId)
        {
            FactoryFacade factory = new FactoryFacade();
            domainModel = factory.DomainModelFactory.CreateDomainModel(typeof(Home));
            domainModel.Fill(HashHelper.GetCities(stateId, 4));
            domainService = factory.DomainServiceFactory.CreateDomainService(typeof(HomeDomainService));
            return ((DomainModel.Models.Home)domainService.Query(domainModel, JunkCar.Factory.Enumerations.DomainModelEnum.GET_CITIES)).Cities.AsQueryable();
        }
        [HttpGet]
        public IQueryable GetQuestionnaire()
        {
            FactoryFacade factory = new FactoryFacade();
            domainService = factory.DomainServiceFactory.CreateDomainService(typeof(HomeDomainService));
            return ((DomainModel.Models.Home)domainService.Query(JunkCar.Core.Enumerations.SearchCriteriaEnum.GET_QUESTIONNAIRE)).Questionnaire.AsQueryable();
        }       
        [HttpGet]
        public string GetAnOffer(int? makeId, int? modelId, int? year, string zipCode = "")
        {         
            FactoryFacade factory = new FactoryFacade();
            domainModel = factory.DomainModelFactory.CreateDomainModel(typeof(Home));
            domainModel.Fill(HashHelper.GetAnOffer(year, makeId, modelId, 5, zipCode));
            domainService = factory.DomainServiceFactory.CreateDomainService(typeof(HomeDomainService));
            return ((DomainModel.Models.Home)domainService.Query(domainModel, JunkCar.Factory.Enumerations.DomainModelEnum.GET_AN_OFFER)).OfferPrice;
        }

        [HttpGet]
        public string GetAnOfferWithQuestionnaire(string address, int cityId, string emailAddress, string make, string model, string name, string phone, string questionnaire, int selectedMakeId, int selectedModelId, int selectedYear, int stateId, string zipCode)
        {
            FactoryFacade factory = new FactoryFacade();
            domainModel = factory.DomainModelFactory.CreateDomainModel(typeof(Home));
            domainModel.Fill(HashHelper.GetAnOffer(address,cityId,emailAddress,make,model,name,phone,questionnaire,selectedMakeId,selectedModelId,selectedYear,stateId,zipCode,6));
            domainService = factory.DomainServiceFactory.CreateDomainService(typeof(HomeDomainService));
            return ((DomainModel.Models.Home)domainService.Query(domainModel, JunkCar.Factory.Enumerations.DomainModelEnum.GET_AN_OFFER)).OfferPrice;
        }
        [HttpGet]
        public string GetABetterOffer(string address, int cityId, string emailAddress, string make, string model, string name, string phone, int selectedMakeId, int selectedModelId, int selectedYear, int stateId, string zipCode)
        {
            FactoryFacade factory = new FactoryFacade();
            domainModel = factory.DomainModelFactory.CreateDomainModel(typeof(Home));
            domainModel.Fill(HashHelper.GetABetterOffer(selectedYear, selectedMakeId, selectedModelId,make,model, name, address, stateId, cityId, zipCode, phone, emailAddress, 8));
            domainService = factory.DomainServiceFactory.CreateDomainService(typeof(HomeDomainService));
            return ((DomainModel.Models.Home)domainService.Query(domainModel, JunkCar.Factory.Enumerations.DomainModelEnum.GET_A_BETTER_OFFER)).OfferPrice;
        }
        [HttpGet]
        public string ConfirmOffer(string address, int cityId, string contactNo, string emailAddress,string make,string model, string name, string phone,string price, int selectedMakeId, int selectedModelId, int selectedYear, int stateId, string zipCode)
        {            
            FactoryFacade factory = new FactoryFacade();
            domainModel = factory.DomainModelFactory.CreateDomainModel(typeof(Home));
            domainModel.Fill(HashHelper.ConfirmOffer(address, cityId, contactNo, emailAddress, make, model, name, phone, price, selectedMakeId, selectedModelId, selectedYear, stateId, zipCode, 9));
            domainService = factory.DomainServiceFactory.CreateDomainService(typeof(HomeDomainService));
            return ((DomainModel.Models.Home)domainService.Query(domainModel, JunkCar.Factory.Enumerations.DomainModelEnum.CONFIRM_OFFER)).ResponseMessage;
        }

        [HttpGet]
        public string ConfirmOfferWithQuestionnaire(string address, int cityId, string contactNo, string emailAddress, string make, string model, string name, string phone, string price, string questionnaire, int selectedMakeId, int selectedModelId, int selectedYear, int stateId, string zipCode)
        {
            FactoryFacade factory = new FactoryFacade();
            domainModel = factory.DomainModelFactory.CreateDomainModel(typeof(Home));
            domainModel.Fill(HashHelper.ConfirmOfferWithQuestionnaire(address, cityId, contactNo, emailAddress, make, model, name, phone, price, questionnaire, selectedMakeId, selectedModelId, selectedYear, stateId, zipCode, 10));
            domainService = factory.DomainServiceFactory.CreateDomainService(typeof(HomeDomainService));
            return ((DomainModel.Models.Home)domainService.Query(domainModel, JunkCar.Factory.Enumerations.DomainModelEnum.CONFIRM_OFFER_WITH_QUESTIONNAIRE)).ResponseMessage;
        }

        //[HttpPost]
        //public string ReceiveQuestionnaire(string questionnaire)
        //{
        //    return null;
        //    //FactoryFacade factory = new FactoryFacade();
        //    //domainModel = factory.DomainModelFactory.CreateDomainModel(typeof(Home));
        //    //domainModel.Fill(HashHelper.ConfirmOffer(address, cityId, contactNo, emailAddress, make, model, name, phone, price, selectedMakeId, selectedModelId, selectedYear, stateId, zipCode, 9));
        //    //domainService = factory.DomainServiceFactory.CreateDomainService(typeof(HomeDomainService));
        //    //return ((DomainModel.Models.Home)domainService.Query(domainModel, JunkCar.Factory.Enumerations.DomainModelEnum.CONFIRM_OFFER)).ResponseMessage;
        //}
    }
}

