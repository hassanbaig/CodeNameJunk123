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
            contactUs = (ContactUs)domainService.Query(domainModel, JunkCar.Factory.Enumerations.DomainModelEnum.CONTACT_EMAIL_MESSAGE);
            return contactUs.ResponseMessage;
        }       
    }
}
