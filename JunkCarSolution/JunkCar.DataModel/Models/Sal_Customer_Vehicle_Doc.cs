﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JunkCar.DataModel.Models
{
    public partial class Sal_Customer_Vehicle_Doc
    {
        public Sal_Customer_Vehicle_Doc()
       {

       }
        #region Properties       
        public int Customer_Vehicle_Doc_Id { get; set; }
        public int Customer_Vehicle_Id { get; set; }
        public int Document_Id { get; set; }
        public string Document_No { get; set; }
        public string Document_Path { get; set; }
        public string Document_Details { get; set; }
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
