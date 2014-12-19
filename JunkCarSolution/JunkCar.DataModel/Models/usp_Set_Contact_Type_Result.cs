using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JunkCar.DataModel.Models
{
    public partial class usp_Set_Contact_Type_Result
    {
        public usp_Set_Contact_Type_Result()
       {

       }
        #region Properties       
        public Nullable<decimal> ActionType { get; set; }
        public int Contact_Type_Id { get; set; }
        public string Contact_Type { get; set; }
        public string Contact_Type_Description { get; set; }
        public Nullable<bool> Is_Location { get; set; }
        public short Sort_Order { get; set; }
        public Nullable<int> Created_By { get; set; }
        public Nullable<System.DateTime> Created_Date { get; set; }
        public Nullable<int> Modified_By { get; set; }
        public Nullable<System.DateTime> Modified_Date { get; set; }
        public byte Is_Active { get; set; }
        public string User_IP { get; set; }
        public Nullable<long> Audit_Id { get; set; }
        public int Site_Id { get; set; }
        #endregion

       
    }
}
