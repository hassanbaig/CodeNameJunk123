﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JunkCar.DataModel.Models
{
    public partial class usp_Set_Site_Contact_Result
    {
        public usp_Set_Site_Contact_Result()
       {

       }
        #region Properties       
        public Nullable<decimal> ActionType { get; set; }
        public int Site_Contact_Id { get; set; }
        public int Site_Id { get; set; }
        public int Contact_Type_Id { get; set; }
        public Nullable<bool> Is_Default { get; set; }
        public string User_Contact { get; set; }
        public Nullable<int> City_Id { get; set; }
        public Nullable<int> State_Id { get; set; }
        public Nullable<int> Country_Id { get; set; }
        public string Zip_Code { get; set; }
        public short Sort_Order { get; set; }
        public Nullable<int> Created_By { get; set; }
        public Nullable<System.DateTime> Created_Date { get; set; }
        public Nullable<int> Modified_By { get; set; }
        public Nullable<System.DateTime> Modified_Date { get; set; }
        public byte Is_Active { get; set; }
        public string User_IP { get; set; }
        public Nullable<long> Audit_Id { get; set; }
        #endregion       
    }
}
