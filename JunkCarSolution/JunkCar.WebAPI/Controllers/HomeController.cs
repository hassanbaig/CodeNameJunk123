using JunkCar.Core.Common;
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
        //public async Task<HttpResponseMessage> Upload()
        //{
        //    if (!Request.Content.IsMimeMultipartContent())
        //    {
        //        this.Request.CreateResponse(HttpStatusCode.UnsupportedMediaType);
        //    }           
               
        //    var provider = GetMultipartProvider();
        //    var result = await Request.Content.ReadAsMultipartAsync(provider);            

        //    // On upload, files are given a generic name like "BodyPart_26d6abe1-3ae1-416a-9429-b35f15e6e5d5"
        //    // so this is how you can get the original file name
            
        //    var originalFileName = GetDeserializedFileName(result.FileData.First());
            
        //    // uploadedFileInfo object will give you some additional stuff like file length,
        //    // creation time, directory name, a few filesystem methods etc..
        //    var uploadedFileInfo = new FileInfo(result.FileData.First().LocalFileName);
            
        //    // Remove this line as well as GetFormData method if you're not 
        //    // sending any form data with your upload request

        //    //var fileUploadObj = GetFormData<UploadDataModel>(result);

        //    // Through the request response you can return an object to the Angular controller
        //    // You will be able to access this in the .success callback through its data attribute
        //    // If you want to send something to the .error callback, use the HttpStatusCode.BadRequest instead
        //    var returnData = "ReturnTest";
        //    return this.Request.CreateResponse(HttpStatusCode.OK, new { returnData });
        //}

        //private MultipartFormDataStreamProvider GetMultipartProvider()
        //{
        //    //var uploadFolder = "www.junkcartrader.com/Uploads"; // you could put this to web.config
        //    var uploadFolder = "~/App_Data/Photos"; // you could put this to web.config
        //    //var uploadFolder = "~/App_Data/Tmp/FileUploads"; // you could put this to web.config
        //    var root = HttpContext.Current.Server.MapPath(uploadFolder);
        //    Directory.CreateDirectory(root);            
        //    return new MultipartFormDataStreamProvider(root);
        //}

        //// Extracts Request FormatData as a strongly typed model
        ////private object GetFormData<T>(MultipartFormDataStreamProvider result)
        ////{
        ////    if (result.FormData.HasKeys())
        ////    {
        ////        var unescapedFormData = Uri.UnescapeDataString(result.FormData.GetValues(0).FirstOrDefault() ?? String.Empty);
        ////        if (!String.IsNullOrEmpty(unescapedFormData))
        ////            return JsonConvert.DeserializeObject<T>(unescapedFormData);
        ////    }

        ////    return null;
        ////}

        //private string GetDeserializedFileName(MultipartFileData fileData)
        //{
        //    var fileName = GetFileName(fileData);           
        //    return JsonConvert.DeserializeObject(fileName).ToString();
        //}

        //public string GetFileName(MultipartFileData fileData)
        //{
        //    return fileData.Headers.ContentDisposition.FileName;
        //}

        [HttpPost]
        public string Upload()
        {
            HttpFileCollection uploads = HttpContext.Current.Request.Files;
            for (int i = 0; i < uploads.Count; i++)
            {
                HttpPostedFile upload = uploads[i];
                string filename = Path.GetFileName(upload.FileName);

                var path = Path.Combine(HttpContext.Current.Server.MapPath("~/Uploads/Photos"), filename);
                
                upload.SaveAs(path);
            }          
            return null;
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

