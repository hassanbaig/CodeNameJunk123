using JunkCar.Core.Common;
using JunkCar.Core.Enumerations;
using JunkCar.DataModel.Models;
using JunkCar.DomainModel.Models;
using JunkCar.DomainService.Services;
using JunkCar.Factory.Factories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace JunkCar.WebAPI.Controllers
{
    public class ContactUsController : ApiController
    {
        private AbstractDomainModel domainModel;
        private AbstractDomainService domainService;
        [HttpGet]
        public string ContactEmailMessage(string email, string message, string name, string phone, string subject)
        {
            string response = string.Empty;
            FactoryFacade factory = new FactoryFacade();
            ContactUs contactUs = null;
            domainModel = factory.DomainModelFactory.CreateDomainModel(typeof(ContactUs));
            domainModel.Fill(HashHelper.ContactEmailMessage(name, email, phone, subject, message));
            domainService = factory.DomainServiceFactory.CreateDomainService(typeof(ContactUsDomainService));
            contactUs = (ContactUs)domainService.Query(domainModel, DomainModelEnum.CONTACT_EMAIL_MESSAGE);
            return contactUs.ResponseMessage;
        }
        [HttpGet]
        public CheckZipCode_Result CheckZipCode(string zipCode)
        {
            FactoryFacade factory = new FactoryFacade();
            domainModel = factory.DomainModelFactory.CreateDomainModel(typeof(ContactUs));
            domainModel.Fill(HashHelper.CheckZipCode(zipCode));
            domainService = factory.DomainServiceFactory.CreateDomainService(typeof(ContactUsDomainService));
            return ((DomainModel.Models.ContactUs)domainService.Query(domainModel, DomainModelEnum.CHECK_ZIPCODE)).ZipCodeResult;
        }
    }
}
