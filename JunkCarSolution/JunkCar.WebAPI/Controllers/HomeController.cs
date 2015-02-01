﻿using JunkCar.Core.Common;
using JunkCar.DataModel.Models;
using JunkCar.DomainModel.Models;
using JunkCar.DomainService;
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
        public IQueryable GetRegistrationYears()
        {            
            FactoryFacade factory = new FactoryFacade();
            domainService = factory.DomainServiceFactory.CreateDomainService(typeof(HomeDomainService));
            return ((DomainModel.Models.Home)domainService.Query(JunkCar.Core.Enumerations.SearchCriteriaEnum.GET_REGISTRATION_YEARS)).Years.AsQueryable();            
        }
        public IQueryable GetCylinders()
        {
            FactoryFacade factory = new FactoryFacade();
            domainService = factory.DomainServiceFactory.CreateDomainService(typeof(HomeDomainService));
            return ((DomainModel.Models.Home)domainService.Query(JunkCar.Core.Enumerations.SearchCriteriaEnum.GET_CYLINDERS)).Cylinders.AsQueryable();
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
        public string GetAnOffer(string address, int cityId, short cylinders, string emailAddress, string make, string model, string name, string phone, int selectedMakeId, int selectedModelId, int selectedYear, int stateId, string zipCode)
        {         
            FactoryFacade factory = new FactoryFacade();
            domainModel = factory.DomainModelFactory.CreateDomainModel(typeof(Home));
            domainModel.Fill(HashHelper.GetAnOffer(address, cityId, cylinders, emailAddress, make, model, name, phone, selectedMakeId, selectedModelId, selectedYear, stateId, zipCode, 5));
            domainService = factory.DomainServiceFactory.CreateDomainService(typeof(HomeDomainService));
            return ((DomainModel.Models.Home)domainService.Query(domainModel, JunkCar.Factory.Enumerations.DomainModelEnum.GET_AN_OFFER)).OfferPrice;
        }       
        [HttpGet]
        public string GetABetterOffer(string address, int cityId, short cylinders, string emailAddress, string make, string model, string name, string phone, string questionnaire, int selectedMakeId, int selectedModelId, int selectedYear, int stateId, string zipCode)
        {
            FactoryFacade factory = new FactoryFacade();
            domainModel = factory.DomainModelFactory.CreateDomainModel(typeof(Home));
            domainModel.Fill(HashHelper.GetABetterOffer(address,cityId,cylinders,emailAddress,make,model,name,phone,questionnaire,selectedMakeId,selectedModelId,selectedYear,stateId,zipCode, 6));
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
        }          [HttpPost]
        public string Upload()
        {
            HttpFileCollection uploads = HttpContext.Current.Request.Files;
            for (int i = 0; i < uploads.Count; i++)
            {
                HttpPostedFile upload = uploads[i];
                string filename = Path.GetFileName(upload.FileName);
                //Directory.CreateDirectory("~/Uploads/");
                var path = Path.Combine(HttpContext.Current.Server.MapPath("/Uploads/"), filename);
                //var path = Path.Combine(HttpContext.Current.Server.MapPath("~/Uploads/Photos"), filename);                
                upload.SaveAs(path);
            }          
            return "Uploaded";
        }       
    }
}
