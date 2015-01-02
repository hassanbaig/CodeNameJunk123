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
            Hashtable getModels = new Hashtable();
            getModels["ZipCode"] = zipCode;            
            getModels["OperationType"] = operationType;
            return getModels;
        }
        public static Hashtable GetCities(int stateId, int operationType)
        {
            Hashtable getModels = new Hashtable();
            getModels["StateId"] = stateId;
            getModels["OperationType"] = operationType;
            return getModels;
        }
        public static Hashtable GetAnOffer(int? year, int? makeId, int? modelId, int operationType, string zipCode = "")
        {
            Hashtable getModels = new Hashtable();
            getModels["SelectedYear"] = year;
            getModels["SelectedMakeId"] = makeId;
            getModels["SelectedModelId"] = modelId;
            //getModels["SelectedQuestionnaire"] = questionnaire;
            getModels["ZipCode"] = zipCode;
            //getModels["CustomerInfo"] = customerInfo;
            getModels["OperationType"] = operationType;
            return getModels;
        }     

    }
}
