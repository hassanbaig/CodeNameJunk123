﻿using JunkCar.Core.Common;
using JunkCar.Core.Enumerations;
using JunkCar.Core.Utilities;
using JunkCar.DataModel.Models;
using JunkCar.DomainModel.Models;
using JunkCar.DomainService.Services;
using JunkCar.Factory.Factories;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace JunkCar.WebAPI.Controllers
{    
    public class HomeController : ApiController
    {
        private AbstractDomainModel domainModel;
        private AbstractDomainService domainService;
        public List<int?> GetRegistrationYears()
        {           
            FactoryFacade factory = new FactoryFacade();
            domainService = factory.DomainServiceFactory.CreateDomainService(typeof(HomeDomainService));
            return ((DomainModel.Models.Home)domainService.Query(SearchCriteriaEnum.GET_REGISTRATION_YEARS)).Years;            
        }
        public List<int?> GetCylinders()
        {
            FactoryFacade factory = new FactoryFacade();
            domainService = factory.DomainServiceFactory.CreateDomainService(typeof(HomeDomainService));
            return ((DomainModel.Models.Home)domainService.Query(SearchCriteriaEnum.GET_CYLINDERS)).Cylinders;
        }
        public List<JunkCar.DataModel.Models.Set_Make> GetMakes(int year)
        {
            FactoryFacade factory = new FactoryFacade();
            domainModel = factory.DomainModelFactory.CreateDomainModel(typeof(Home));
            domainModel.Fill(HashHelper.GetMakes(year));
            domainService = factory.DomainServiceFactory.CreateDomainService(typeof(HomeDomainService));
            return ((DomainModel.Models.Home)domainService.Query(domainModel, DomainModelEnum.GET_MAKES)).Makes;
        }

        public List<JunkCar.DataModel.Models.Set_Model> GetModels(int year, int makeId)
        {
            
            FactoryFacade factory = new FactoryFacade();
            domainModel = factory.DomainModelFactory.CreateDomainModel(typeof(Home));
            domainModel.Fill(HashHelper.GetModels(year,makeId));
            domainService = factory.DomainServiceFactory.CreateDomainService(typeof(HomeDomainService));
            return ((DomainModel.Models.Home)domainService.Query(domainModel, DomainModelEnum.GET_MODELS)).Models;
        }
        [HttpGet]
        public CheckZipCode_Result CheckZipCode(string zipCode)
        {
            FactoryFacade factory = new FactoryFacade();
            domainModel = factory.DomainModelFactory.CreateDomainModel(typeof(Home));
            domainModel.Fill(HashHelper.CheckZipCode(zipCode));
            domainService = factory.DomainServiceFactory.CreateDomainService(typeof(HomeDomainService));
            return ((DomainModel.Models.Home)domainService.Query(domainModel, DomainModelEnum.CHECK_ZIPCODE)).ZipCodeResult;
        }
        public List<Set_State> GetStates()
        {
            FactoryFacade factory = new FactoryFacade();
            domainService = factory.DomainServiceFactory.CreateDomainService(typeof(HomeDomainService));
            return ((DomainModel.Models.Home)domainService.Query(SearchCriteriaEnum.GET_STATES)).States;
        }
        [HttpGet]
        public List<Set_City> GetCities(int stateId)
        {
            FactoryFacade factory = new FactoryFacade();
            domainModel = factory.DomainModelFactory.CreateDomainModel(typeof(Home));
            domainModel.Fill(HashHelper.GetCities(stateId));
            domainService = factory.DomainServiceFactory.CreateDomainService(typeof(HomeDomainService));
            return ((DomainModel.Models.Home)domainService.Query(domainModel, DomainModelEnum.GET_CITIES)).Cities;
        }
        [HttpGet]
        public List<Set_Questionnaire_Detail> GetQuestionnaire()
        {
            FactoryFacade factory = new FactoryFacade();
            domainService = factory.DomainServiceFactory.CreateDomainService(typeof(HomeDomainService));
            return ((DomainModel.Models.Home)domainService.Query(SearchCriteriaEnum.GET_QUESTIONNAIRE)).Questionnaire;
        }       
        [HttpGet]
        public string GetAnOffer(string address, int cityId, short cylinders, string emailAddress, string make, string model, string name, string phone, int selectedMakeId, int selectedModelId, int selectedYear, int stateId, string zipCode)
        {         
            FactoryFacade factory = new FactoryFacade();
            domainModel = factory.DomainModelFactory.CreateDomainModel(typeof(Home));
            domainModel.Fill(HashHelper.GetAnOffer(address, cityId, cylinders, emailAddress, make, model, name, phone, selectedMakeId, selectedModelId, selectedYear, stateId, zipCode));
            domainService = factory.DomainServiceFactory.CreateDomainService(typeof(HomeDomainService));
            return ((DomainModel.Models.Home)domainService.Query(domainModel, DomainModelEnum.GET_AN_OFFER)).OfferPrice;
        }       
        [HttpGet]
        public string GetABetterOffer(string address, int cityId,int customerId, short cylinders, string emailAddress, string make, string model, string name, string phone, string questionnaire, int selectedMakeId, int selectedModelId, int selectedYear, int stateId, string zipCode)
        {
            FactoryFacade factory = new FactoryFacade();
            domainModel = factory.DomainModelFactory.CreateDomainModel(typeof(Home));
            domainModel.Fill(HashHelper.GetABetterOffer(address, cityId, customerId, cylinders, emailAddress, make, model, name, phone, questionnaire, selectedMakeId, selectedModelId, selectedYear, stateId, zipCode));
            domainService = factory.DomainServiceFactory.CreateDomainService(typeof(HomeDomainService));
            return ((DomainModel.Models.Home)domainService.Query(domainModel, DomainModelEnum.GET_A_BETTER_OFFER)).OfferPrice;
        }
        [HttpGet]
        public string ConfirmOffer(string address, int cityId, string contactNo, short cylinders, string emailAddress, string make, string model, string name, string phone, string price, int selectedMakeId, int selectedModelId, int selectedYear, int stateId, string zipCode)
        {            
            FactoryFacade factory = new FactoryFacade();
            domainModel = factory.DomainModelFactory.CreateDomainModel(typeof(Home));
            domainModel.Fill(HashHelper.ConfirmOffer(address, cityId, contactNo,cylinders, emailAddress, make, model, name, phone, price, selectedMakeId, selectedModelId, selectedYear, stateId, zipCode));
            domainService = factory.DomainServiceFactory.CreateDomainService(typeof(HomeDomainService));
            return ((DomainModel.Models.Home)domainService.Query(domainModel, DomainModelEnum.CONFIRM_OFFER)).ResponseMessage;
        }
        [HttpGet]
        public string ConfirmOfferWithQuestionnaire(string address, int cityId, string contactNo, int customerId, short cylinders, string emailAddress, string make, string model, string name, string phone, string price, string questionnaire, int selectedMakeId, int selectedModelId, int selectedYear, int stateId, string zipCode)
        {
            FactoryFacade factory = new FactoryFacade();
            domainModel = factory.DomainModelFactory.CreateDomainModel(typeof(Home));
            domainModel.Fill(HashHelper.ConfirmOfferWithQuestionnaire(address, cityId, contactNo,customerId, cylinders, emailAddress, make, model, name, phone, price, questionnaire, selectedMakeId, selectedModelId, selectedYear, stateId, zipCode));
            domainService = factory.DomainServiceFactory.CreateDomainService(typeof(HomeDomainService));
            return ((DomainModel.Models.Home)domainService.Query(domainModel, DomainModelEnum.CONFIRM_OFFER_WITH_QUESTIONNAIRE)).ResponseMessage;
        }
        [HttpGet]
        public int GetCustomerId(string address, int cityId, string emailAddress, string name, string phone, int stateId, string zipCode)
        {
            FactoryFacade factory = new FactoryFacade();
            domainModel = factory.DomainModelFactory.CreateDomainModel(typeof(Home));
            domainModel.Fill(HashHelper.GetCustomerId(address, cityId, emailAddress, name, phone, stateId, zipCode));
            domainService = factory.DomainServiceFactory.CreateDomainService(typeof(HomeDomainService));
            return ((DomainModel.Models.Home)domainService.Query(domainModel, DomainModelEnum.GET_CUSTOMER_ID)).CustomerId;
        }
        [HttpPost]
        public string Upload(int customerId, int cylinders, int makeId, int modelId, int year)
        {
            HttpFileCollection uploads = HttpContext.Current.Request.Files;
            string response = Utility.SaveUploads(uploads, customerId, cylinders, makeId, modelId, year);
            return response;
        }        
    }
}