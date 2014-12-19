using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JunkCar.DataModel.Models
{
    public partial class Set_Zip_Code
    {
        public Set_Zip_Code()
       {

       }
        #region Properties       
        public int Zip_Id { get; set; }
        public string Zip_Code { get; set; }
        public string Zip_Type { get; set; }
        public Nullable<int> City_Id { get; set; }
        public Nullable<int> County_Id { get; set; }
        public Nullable<int> State_Id { get; set; }
        public Nullable<int> Country_Id { get; set; }
        public string Acceptable_Cities { get; set; }
        public string Unacceptable_Cities { get; set; }
        public string Time_Zone { get; set; }
        public string Area_Codes { get; set; }
        public Nullable<decimal> Latitude { get; set; }
        public Nullable<decimal> Longitude { get; set; }
        public string World_Region { get; set; }
        public Nullable<bool> Is_Decommissioned { get; set; }
        public Nullable<int> Estimated_Population { get; set; }
        public string Notes { get; set; }
        public bool Is_Active { get; set; }
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
