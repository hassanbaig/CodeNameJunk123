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
    public class ForgotPassword:AbstractDomainModel
    {
        public ForgotPassword()
        {

        }

        #region Propertiess            
        public string UserId { get; set; }
        public string NewPassword { get; set; }
        public JunkCar.DataModel.Models.Sec_Password_Question SecurityQuestion { get; set; }
        public int SecurityQuestionId { get; set; }
        public string SecurityQuestionAnswer { get; set; }
        public int VerificationCode { get; set; }
        public string ResponseMessage { get; set; }        
        #endregion        
    
        public override void Fill(System.Collections.Hashtable dataTable)
        {           
            base.FillModel(this.GetType(), dataTable);        
        }
    }
}
