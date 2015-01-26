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
    public class Authenticate:AbstractDomainModel
    {
        public Authenticate()
        {

        }

        #region Propertiess    
        public int OperationType { get; set; }
        public bool IsAuthenticated { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }             
        public string ResponseMessage { get; set; }        
        #endregion        
    
        public override void Fill(System.Collections.Hashtable dataTable)
        {           
            base.FillModel(this.GetType(), dataTable);        
        }
    }
}
