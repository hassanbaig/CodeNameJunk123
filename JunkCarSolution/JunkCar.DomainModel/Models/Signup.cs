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
    public class Signup:AbstractDomainModel
    {
        public Signup()
        {

        }

        #region Propertiess            
        public string Email { get; set; }
        public string Password { get; set; }
        public string ZipCode { get; set; }
        public string Name { get; set; }        
        public string Phone { get; set; }      
        public string Address { get; set; }        
        public int CountryId { get; set; }
        public int CityId { get; set; }
        public int StateId { get; set; }
        public List<JunkCar.DataModel.Models.Sec_Password_Question> SecurityQuestions { get; set; }
        public int QuestionId { get; set; }
        public string Answer { get; set; }
        public string ResponseMessage { get; set; }        
        #endregion        
    
        public override void Fill(System.Collections.Hashtable dataTable)
        {           
            base.FillModel(this.GetType(), dataTable);        
        }
    }
}
