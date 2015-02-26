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
    public class ChangePassword:AbstractDomainModel
    {
        public ChangePassword()
        {

        }

        #region Propertiess            
        public string UserId { get; set; }
        public string OldPassword { get; set; }
        public string NewPassword { get; set; }        
        public string ResponseMessage { get; set; }        
        #endregion        
    
        public override void Fill(System.Collections.Hashtable dataTable)
        {           
            base.FillModel(this.GetType(), dataTable);        
        }
    }
}
