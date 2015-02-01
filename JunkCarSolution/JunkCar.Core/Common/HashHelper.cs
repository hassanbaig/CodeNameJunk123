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
        public static Hashtable Authenticate(string userId,string password, int operationType)
        {
            Hashtable getMakes = new Hashtable();
            getMakes["Email"] = userId;
            getMakes["Password"] = password;
            getMakes["OperationType"] = operationType;
            return getMakes;
        }
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
        public static Hashtable GetAnOffer(string address, int cityId, short cylinders, string emailAddress, string make, string model, string name, string phone, int selectedMakeId, int selectedModelId, int selectedYear, int stateId, string zipCode, int operationType)
        {
            Hashtable getAnOffer = new Hashtable();
            getAnOffer["Name"] = name;
            getAnOffer["Address"] = address;
            getAnOffer["StateId"] = stateId;
            getAnOffer["cityId"] = cityId;
            getAnOffer["CylindersQuantity"] = cylinders;            
            getAnOffer["Phone"] = phone;
            getAnOffer["EmailAddress"] = emailAddress;
            getAnOffer["SelectedYear"] = selectedYear;
            getAnOffer["SelectedMakeId"] = selectedMakeId;
            getAnOffer["SelectedModelId"] = selectedModelId;
            getAnOffer["SelectedMake"] = make;
            getAnOffer["SelectedModel"] = model;
            getAnOffer["ZipCode"] = zipCode;
            getAnOffer["OperationType"] = operationType;            
            return getAnOffer;
        }         
        public static Hashtable GetABetterOffer(string address, int cityId, short cylinders, string emailAddress, string make, string model, string name, string phone, string questionnaire, int selectedMakeId, int selectedModelId, int selectedYear, int stateId, string zipCode, int operationType)
        {
            Hashtable getABetterOffer = new Hashtable();
            getABetterOffer["SelectedYear"] = selectedYear;
            getABetterOffer["SelectedMakeId"] = selectedMakeId;
            getABetterOffer["SelectedModelId"] = selectedModelId;
            getABetterOffer["SelectedMake"] = make;
            getABetterOffer["SelectedModel"] = model;
            getABetterOffer["CylindersQuantity"] = cylinders;            
            getABetterOffer["Name"] = name;
            getABetterOffer["Address"] = address;
            getABetterOffer["StateId"] = stateId;
            getABetterOffer["cityId"] = cityId;
            getABetterOffer["ZipCode"] = zipCode;
            getABetterOffer["Phone"] = phone;
            getABetterOffer["SelectedQuestionnaire"] = questionnaire;
            getABetterOffer["EmailAddress"] = emailAddress;            
            getABetterOffer["OperationType"] = operationType;
            return getABetterOffer;
        }
        public static Hashtable ConfirmOffer(string address, int cityId, string contactNo, string emailAddress, string make, string model, string name, string phone, string price, int selectedMakeId, int selectedModelId, int selectedYear, int stateId, string zipCode, int operationType)
        {
            Hashtable confirmOffer = new Hashtable();
            confirmOffer["Address"] = address;
            confirmOffer["CityId"] = cityId;
            confirmOffer["ContactNo"] = contactNo;            
            confirmOffer["EmailAddress"] = emailAddress;
            confirmOffer["SelectedMake"] = make;
            confirmOffer["SelectedModel"] = model;
            confirmOffer["Name"] = name;
            confirmOffer["Phone"] = phone;
            confirmOffer["OfferPrice"] = price;
            confirmOffer["SelectedMakeId"] = selectedMakeId;
            confirmOffer["SelectedModelId"] = selectedModelId;
            confirmOffer["SelectedYear"] = selectedYear;            
            confirmOffer["StateId"] = stateId;
            confirmOffer["ZipCode"] = zipCode;
            confirmOffer["OperationType"] = operationType;
            return confirmOffer;
        }
        public static Hashtable ConfirmOfferWithQuestionnaire(string address, int cityId, string contactNo, string emailAddress, string make, string model, string name, string phone, string price, string questionnaire, int selectedMakeId, int selectedModelId, int selectedYear, int stateId, string zipCode, int operationType)
        {
            Hashtable confirmOfferWithQuestionnaire = new Hashtable();
            confirmOfferWithQuestionnaire["Address"] = address;
            confirmOfferWithQuestionnaire["CityId"] = cityId;
            confirmOfferWithQuestionnaire["ContactNo"] = contactNo;
            confirmOfferWithQuestionnaire["EmailAddress"] = emailAddress;
            confirmOfferWithQuestionnaire["SelectedMake"] = make;
            confirmOfferWithQuestionnaire["SelectedModel"] = model;
            confirmOfferWithQuestionnaire["Name"] = name;
            confirmOfferWithQuestionnaire["Phone"] = phone;
            confirmOfferWithQuestionnaire["OfferPrice"] = price;
            confirmOfferWithQuestionnaire["SelectedQuestionnaire"] = questionnaire;
            confirmOfferWithQuestionnaire["SelectedMakeId"] = selectedMakeId;
            confirmOfferWithQuestionnaire["SelectedModelId"] = selectedModelId;
            confirmOfferWithQuestionnaire["SelectedYear"] = selectedYear;
            confirmOfferWithQuestionnaire["StateId"] = stateId;
            confirmOfferWithQuestionnaire["ZipCode"] = zipCode;
            confirmOfferWithQuestionnaire["OperationType"] = operationType;
            return confirmOfferWithQuestionnaire;
        }        
        public static Hashtable GetContactNo(string zipCode, int operationType)
        {
            Hashtable getContact = new Hashtable();
            getContact["ZipCode"] = zipCode;
            getContact["OperationType"] = operationType;
            return getContact;
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
