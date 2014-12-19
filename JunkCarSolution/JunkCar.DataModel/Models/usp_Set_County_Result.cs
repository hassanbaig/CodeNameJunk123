using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JunkCar.DataModel.Models
{
    public partial class usp_Set_County_Result
    {
        public usp_Set_County_Result()
       {

       }
        #region Properties       
        public Nullable<decimal> ActionType { get; set; }
        public int County_Id { get; set; }
        public string County_Code { get; set; }
        public string County_Name { get; set; }
        public int State_Id { get; set; }
        public int Country_Id { get; set; }
        public byte Is_Active { get; set; }
        public System.DateTime Created_Date { get; set; }
        public int Created_By { get; set; }
        public Nullable<System.DateTime> Modified_Date { get; set; }
        public Nullable<int> Modified_By { get; set; }
        public Nullable<long> Audit_Id { get; set; }
        public string User_IP { get; set; }
        public int Site_Id { get; set; }
        #endregion       
    }
}
