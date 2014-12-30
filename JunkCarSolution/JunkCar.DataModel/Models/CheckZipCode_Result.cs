using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JunkCar.DataModel.Models
{
    public partial class CheckZipCode_Result
    {
        public CheckZipCode_Result()
       {

       }
        #region Properties       
        public string Contact_No { get; set; }
        public Nullable<int> User_Code { get; set; }
        public Nullable<bool> Is_Valid_Zip_Code { get; set; }
        public string Notes { get; set; }
        #endregion       
    }
}
