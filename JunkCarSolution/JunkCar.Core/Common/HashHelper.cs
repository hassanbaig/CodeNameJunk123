using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Collections;

namespace JunkCar.Core.Common
{
    public static class HashHelper
    {
        public static Hashtable GetMakes(int selectedYear, int operationType)
        {
            Hashtable getMakes = new Hashtable();
            getMakes["SelectedYear"] = selectedYear;
            getMakes["OperationType"] = operationType;
            return getMakes;
        }
        public static Hashtable GetModels(int selectedYear,int selectedMakeId, int operationType)
        {
            Hashtable getModels = new Hashtable();
            getModels["SelectedYear"] = selectedYear;
            getModels["SelectedMakeId"] = selectedMakeId;
            getModels["OperationType"] = operationType;
            return getModels;
        }
        public static Hashtable CheckZipCode(string zipCode, int operationType)
        {
            Hashtable checkZipCOde = new Hashtable();
            checkZipCOde["ZipCode"] = zipCode;
            checkZipCOde["OperationType"] = operationType;
            return checkZipCOde;
        }
        public static Hashtable GetCities(int stateId, int operationType)
        {
            Hashtable getCities = new Hashtable();
            getCities["StateId"] = stateId;
            getCities["OperationType"] = operationType;
            return getCities;
        }
        public static Hashtable GetAnOffer(int? year, int? makeId, int? modelId, int operationType)
        {
            Hashtable getAnOffer = new Hashtable();
            getAnOffer["SelectedYear"] = year;
            getAnOffer["SelectedMakeId"] = makeId;
            getAnOffer["SelectedModelId"] = modelId;
            getAnOffer["OperationType"] = operationType;
            return getAnOffer;
        }
        public static Hashtable GetAnOffer(int? year, int? makeId, int? modelId, int operationType, string zipCode = "")
        {
            Hashtable getAnOffer = new Hashtable();
            getAnOffer["SelectedYear"] = year;
            getAnOffer["SelectedMakeId"] = makeId;
            getAnOffer["SelectedModelId"] = modelId;
            getAnOffer["ZipCode"] = zipCode;
            getAnOffer["OperationType"] = operationType;
            return getAnOffer;
        }
        public static Hashtable GetAnOffer(int? year, int? makeId, int? modelId, string questionnaire, int operationType, string zipCode = "")
        {
            Hashtable getAnOffer = new Hashtable();
            getAnOffer["SelectedYear"] = year;
            getAnOffer["SelectedMakeId"] = makeId;
            getAnOffer["SelectedModelId"] = modelId;
            getAnOffer["SelectedQuestionnaire"] = questionnaire;
            getAnOffer["ZipCode"] = zipCode;          
            getAnOffer["OperationType"] = operationType;
            return getAnOffer;
        }
        public static Hashtable GetAnOffer(int? year, int? makeId, int? modelId, string[] questionnaire, string[] customerInfo, int operationType, string zipCode = "")
        {
            Hashtable getAnOffer = new Hashtable();
            getAnOffer["SelectedYear"] = year;
            getAnOffer["SelectedMakeId"] = makeId;
            getAnOffer["SelectedModelId"] = modelId;
            getAnOffer["SelectedQuestionnaire"] = questionnaire;
            getAnOffer["ZipCode"] = zipCode;
            getAnOffer["CustomerInfo"] = customerInfo;
            getAnOffer["OperationType"] = operationType;
            return getAnOffer;
        }
        public static Hashtable GetABetterOffer(int? year, int? makeId, int? modelId, string name, string address, int stateId, int cityId, string zipCode, string phone, string emailAddress, int operationType)
        {
            Hashtable getABetterOffer = new Hashtable();
            getABetterOffer["SelectedYear"] = year;
            getABetterOffer["SelectedMakeId"] = makeId;
            getABetterOffer["SelectedModelId"] = modelId;
            getABetterOffer["Name"] = name;
            getABetterOffer["Address"] = address;
            getABetterOffer["StateId"] = stateId;
            getABetterOffer["cityId"] = cityId;
            getABetterOffer["ZipCode"] = zipCode;
            getABetterOffer["Phone"] = phone;
            getABetterOffer["EmailAddress"] = emailAddress;
            getABetterOffer["OperationType"] = operationType;
            return getABetterOffer;
        }
        public static Hashtable ConfirmOffer(string address, int cityId, string emailAddress, string make, string model, string name, string phone, string price, int selectedMakeId, int selectedModelId, int selectedYear, int stateId, string zipCode, int operationType)
        {
            Hashtable confirmOffer = new Hashtable();
            confirmOffer["SelectedYear"] = selectedYear;
            confirmOffer["SelectedMakeId"] = selectedMakeId;
            confirmOffer["SelectedMake"] = make;
            confirmOffer["SelectedModelId"] = selectedModelId;
            confirmOffer["SelectedModel"] = model;
            confirmOffer["OfferPrice"] = price;
            confirmOffer["Name"] = name;
            confirmOffer["Address"] = address;
            confirmOffer["StateId"] = stateId;
            confirmOffer["CityId"] = cityId;
            confirmOffer["ZipCode"] = zipCode;
            confirmOffer["Phone"] = phone;
            confirmOffer["EmailAddress"] = emailAddress;
            confirmOffer["OperationType"] = operationType;
            return confirmOffer;
        }
        public static Hashtable Signup(string address, string email, string name, string password, string phone, string zipCode, int operationType)
        {
            Hashtable signup = new Hashtable();
            signup["Address"] = address;
            signup["Email"] = email;
            signup["Name"] = name;
            signup["Password"] = password;
            signup["Phone"] = phone;
            signup["ZipCode"] = zipCode;
            signup["OperationType"] = operationType;
            return signup;
        }     
        
       
    }
}
