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
        public List<JunkCar.DataModel.Models.Set_Model_Year> Years { get; set; }
        public string ResponseMessage { get; set; }            
        #endregion        
    
        public override void Fill(System.Collections.Hashtable dataTable)
        {           
            base.FillModel(this.GetType(), dataTable);        
        }
    }
}
