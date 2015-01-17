using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JunkCar.DataModel.Models
{
    public partial class RegisterUser_Result
    {
        public RegisterUser_Result()
       {

       }
        #region Properties       
        public Nullable<int> Customer_Id { get; set; }
        public string Login_Password { get; set; }
        #endregion       
    }
}
