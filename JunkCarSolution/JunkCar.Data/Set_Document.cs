//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace JunkCar.Data
{
    using System;
    using System.Collections.Generic;
    
    public partial class Set_Document
    {
        public Set_Document()
        {
            this.Sal_Customer_Vehicle_Doc = new HashSet<Sal_Customer_Vehicle_Doc>();
        }
    
        public int Document_Id { get; set; }
        public string Document_Code { get; set; }
        public string Document_Name { get; set; }
        public string Document_Description { get; set; }
        public short Sort_Order { get; set; }
        public Nullable<int> Created_By { get; set; }
        public Nullable<System.DateTime> Created_Date { get; set; }
        public Nullable<int> Modified_By { get; set; }
        public Nullable<System.DateTime> Modified_Date { get; set; }
        public byte Is_Active { get; set; }
        public string User_IP { get; set; }
        public Nullable<long> Audit_Id { get; set; }
        public int Site_Id { get; set; }
    
        public virtual ICollection<Sal_Customer_Vehicle_Doc> Sal_Customer_Vehicle_Doc { get; set; }
    }
}
