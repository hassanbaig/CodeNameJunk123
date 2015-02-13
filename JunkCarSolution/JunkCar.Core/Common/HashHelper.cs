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
        public static Hashtable Authenticate(string userId,string password)
        {
            Hashtable getMakes = new Hashtable();
            getMakes["Email"] = userId;
            getMakes["Password"] = password;            
            return getMakes;
        }
        public static Hashtable GetMakes(int selectedYear)
        {
            Hashtable getMakes = new Hashtable();
            getMakes["SelectedYear"] = selectedYear;            
            return getMakes;
        }
        public static Hashtable GetModels(int selectedYear,int selectedMakeId)
        {
            Hashtable getModels = new Hashtable();
            getModels["SelectedYear"] = selectedYear;
            getModels["SelectedMakeId"] = selectedMakeId;            
            return getModels;
        }
        public static Hashtable CheckZipCode(string zipCode)
        {
            Hashtable checkZipCOde = new Hashtable();
            checkZipCOde["ZipCode"] = zipCode;            
            return checkZipCOde;
        }
        public static Hashtable GetCities(int stateId)
        {
            Hashtable getCities = new Hashtable();
            getCities["StateId"] = stateId;            
            return getCities;
        }
        public static Hashtable GetAnOffer(string address, int cityId, short cylinders, string emailAddress, string make, string model, string name, string phone, int selectedMakeId, int selectedModelId, int selectedYear, int stateId, string zipCode)
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
            return getAnOffer;
        }         
        public static Hashtable GetABetterOffer(string address, int cityId,int customerId, short cylinders, string emailAddress, string make, string model, string name, string phone, string questionnaire, int selectedMakeId, int selectedModelId, int selectedYear, int stateId, string zipCode)
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
            getABetterOffer["CustomerId"] = customerId;             
            return getABetterOffer;
        }
        public static Hashtable ConfirmOffer(string address, int cityId, string contactNo, short cylinders, string emailAddress, string make, string model, string name, string phone, string price, int selectedMakeId, int selectedModelId, int selectedYear, int stateId, string zipCode)
        {
            Hashtable confirmOffer = new Hashtable();
            confirmOffer["Address"] = address;
            confirmOffer["CityId"] = cityId;
            confirmOffer["ContactNo"] = contactNo;            
            confirmOffer["EmailAddress"] = emailAddress;
            confirmOffer["SelectedMake"] = make;
            confirmOffer["SelectedModel"] = model;
            confirmOffer["CylindersQuantity"] = cylinders;
            confirmOffer["Name"] = name;
            confirmOffer["Phone"] = phone;
            confirmOffer["OfferPrice"] = price;
            confirmOffer["SelectedMakeId"] = selectedMakeId;
            confirmOffer["SelectedModelId"] = selectedModelId;
            confirmOffer["SelectedYear"] = selectedYear;            
            confirmOffer["StateId"] = stateId;
            confirmOffer["ZipCode"] = zipCode;
            return confirmOffer;
        }
        public static Hashtable ConfirmOfferWithQuestionnaire(string address, int cityId, string contactNo, int customerId, short cylinders, string emailAddress, string make, string model, string name, string phone, string price, string questionnaire, int selectedMakeId, int selectedModelId, int selectedYear, int stateId, string zipCode)
        {
            Hashtable confirmOfferWithQuestionnaire = new Hashtable();
            confirmOfferWithQuestionnaire["Address"] = address;
            confirmOfferWithQuestionnaire["CityId"] = cityId;
            confirmOfferWithQuestionnaire["ContactNo"] = contactNo;
            confirmOfferWithQuestionnaire["EmailAddress"] = emailAddress;
            confirmOfferWithQuestionnaire["SelectedMake"] = make;
            confirmOfferWithQuestionnaire["SelectedModel"] = model;
            confirmOfferWithQuestionnaire["CylindersQuantity"] = cylinders;
            confirmOfferWithQuestionnaire["Name"] = name;
            confirmOfferWithQuestionnaire["Phone"] = phone;
            confirmOfferWithQuestionnaire["OfferPrice"] = price;
            confirmOfferWithQuestionnaire["SelectedQuestionnaire"] = questionnaire;
            confirmOfferWithQuestionnaire["SelectedMakeId"] = selectedMakeId;
            confirmOfferWithQuestionnaire["SelectedModelId"] = selectedModelId;
            confirmOfferWithQuestionnaire["SelectedYear"] = selectedYear;
            confirmOfferWithQuestionnaire["StateId"] = stateId;
            confirmOfferWithQuestionnaire["ZipCode"] = zipCode;
            confirmOfferWithQuestionnaire["CustomerId"] = customerId;
            return confirmOfferWithQuestionnaire;
        }        
        public static Hashtable GetContactNo(string zipCode)
        {
            Hashtable getContact = new Hashtable();
            getContact["ZipCode"] = zipCode;
            return getContact;
        }
        public static Hashtable GetCustomerId(string address, int cityId, string emailAddress, string name, string phone, int stateId, string zipCode)
        {
            Hashtable getCustomerId = new Hashtable();
            getCustomerId["Name"] = name;
            getCustomerId["Address"] = address;
            getCustomerId["StateId"] = stateId;
            getCustomerId["cityId"] = cityId;
            getCustomerId["ZipCode"] = zipCode;
            getCustomerId["Phone"] = phone;
            getCustomerId["EmailAddress"] = emailAddress;            
            return getCustomerId;
        }        
        public static Hashtable Signup(string address, string email, string name, string password, string phone, string zipCode)
        {
            Hashtable signup = new Hashtable();
            signup["Address"] = address;
            signup["Email"] = email;
            signup["Name"] = name;
            signup["Password"] = password;
            signup["Phone"] = phone;
            signup["ZipCode"] = zipCode;
            return signup;
        }
        public static Hashtable ContactEmailMessage(string name, string email, string phone, string subject, string message)
        {
            Hashtable contactEmailMessage = new Hashtable();
            contactEmailMessage["Name"] = name;
            contactEmailMessage["Email"] = email;
            contactEmailMessage["Phone"] = phone;
            contactEmailMessage["Subject"] = subject;
            contactEmailMessage["Message"] = message;
            return contactEmailMessage;
        }     
       
    }
}
