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
    public class EditProfile:AbstractDomainModel
    {
        public EditProfile()
        {

        }

        #region Propertiess            
        public string UserId { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string ZipCode { get; set; }
        public int? QuestionId { get; set; }
        public string Answer { get; set; }
       // public JunkCar.DataModel.Models.UserProfile userProfile { get; set; }
        public string ResponseMessage { get; set; }        
        #endregion        
    
        public override void Fill(System.Collections.Hashtable dataTable)
        {           
            base.FillModel(this.GetType(), dataTable);        
        }
    }
}
