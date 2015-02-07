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
    public class ContactUs:AbstractDomainModel
    {
        public ContactUs()
        {

        }

        #region Propertiess            
        public string Name { get; set; }
        public string Email { get; set; }                
        public string Phone { get; set; }      
        public string Subject { get; set; }                
        public string Message { get; set; }        
        public string ResponseMessage { get; set; }        
        #endregion        
    
        public override void Fill(System.Collections.Hashtable dataTable)
        {           
            base.FillModel(this.GetType(), dataTable);        
        }
    }
}
