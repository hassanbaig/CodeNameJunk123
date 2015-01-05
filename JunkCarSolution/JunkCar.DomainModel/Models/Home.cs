using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using JunkCar.Factory.Factories;
using System.Reflection;
using JunkCar.DataModel.Models;
namespace JunkCar.DomainModel.Models
    
{    
    public class Home:AbstractDomainModel
    {
        public Home()
        {
             
        }
        
        #region Properties  
        public int OperationType { get; set; }        
        public string UserId { get; set; }
        public int SelectedYear { get; set; }
        public int SelectedMakeId { get; set; }
        public int SelectedModelId { get; set; }
        public string ZipCode { get; set; }
        public int StateId { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public int cityId { get; set; }
        public string Phone { get; set; }
        public string EmailAddress { get; set; }
        public List<int?> Years { get; set; }
        public List<JunkCar.DataModel.Models.Set_Make> Makes { get; set; }
        public List<JunkCar.DataModel.Models.Set_Model> Models { get; set; }
        public string ResponseMessage { get; set; }
        public JunkCar.DataModel.Models.CheckZipCode_Result ZipCodeResult { get; set; }
        public List<Set_State> States { get; set; }
        public List<Set_City> Cities { get; set; }
        public List<Set_Questionnaire_Detail> Questionnaire { get; set; }
        public string[] SelectedQuestionnaire { get; set; }
        public string[] CustomerInfo { get; set; }
        public int OfferPrice { get; set; }
        #endregion        
    
        public override void Fill(System.Collections.Hashtable dataTable)
        {           
            base.FillModel(this.GetType(), dataTable);        
        }
    }
}
