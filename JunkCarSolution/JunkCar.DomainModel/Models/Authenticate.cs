using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using JunkCar.Factory.Factories;
using System.Reflection;
namespace JunkCar.DomainModel.Models
{
    public class Authenticate:AbstractDomainModel
    {
        public Authenticate()
        {

        }

        #region Properties
        public string UserId { get; set; }
        public string Password { get; set; }
        public long ProviderId { get; set; }
        public string ResponseMessage { get; set; }
        #endregion        
    
        public override void Fill(System.Collections.Hashtable dataTable)
        {           
            base.FillModel(this.GetType(), dataTable);        
        }
    }
}
