using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JunkCar.DataModel.Models
{
    public partial class usp_Sal_Customer_Vehicle_Result
    {
        public usp_Sal_Customer_Vehicle_Result()
       {

       }
        #region Properties       
        public Nullable<decimal> ActionType { get; set; }
        public int Customer_Vehicle_Id { get; set; }
        public int Customer_Offer_Id { get; set; }
        public string Registration_No { get; set; }
        public Nullable<int> Registration_Year { get; set; }
        public Nullable<int> Manufacturing_Year { get; set; }
        public string Insurance_No { get; set; }
        public string Inspection_No { get; set; }
        public string Image_Path { get; set; }
        public Nullable<int> Image_Count { get; set; }
        public string Remarks { get; set; }
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
