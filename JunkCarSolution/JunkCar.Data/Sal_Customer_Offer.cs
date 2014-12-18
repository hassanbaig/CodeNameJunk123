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
    
    public partial class Sal_Customer_Offer
    {
        public Sal_Customer_Offer()
        {
            this.Sal_Customer_Vehicle = new HashSet<Sal_Customer_Vehicle>();
        }
    
        public int Customer_Offer_Id { get; set; }
        public int Customer_Id { get; set; }
        public string Customer_Code { get; set; }
        public string Customer_Name { get; set; }
        public int Make_Id { get; set; }
        public int Model_Id { get; set; }
        public int Registeration_Year { get; set; }
        public int Questionnaire_Id { get; set; }
        public int Offer_Id { get; set; }
        public System.DateTime Offer_Date { get; set; }
        public int Offer_Status_Id { get; set; }
        public int Initial_Offer_Price { get; set; }
        public int Offer_Price { get; set; }
        public Nullable<int> User_Code { get; set; }
        public string Remarks { get; set; }
        public byte Is_Active { get; set; }
        public System.DateTime Created_Date { get; set; }
        public int Created_By { get; set; }
        public Nullable<System.DateTime> Modified_Date { get; set; }
        public Nullable<int> Modified_By { get; set; }
        public Nullable<long> Audit_Id { get; set; }
        public string User_IP { get; set; }
        public int Site_Id { get; set; }
    
        public virtual Sal_Customer Sal_Customer { get; set; }
        public virtual Set_Make Set_Make { get; set; }
        public virtual Set_Model Set_Model { get; set; }
        public virtual Sal_Offer Sal_Offer { get; set; }
        public virtual Sal_Offer_Status Sal_Offer_Status { get; set; }
        public virtual Set_Questionnaire Set_Questionnaire { get; set; }
        public virtual ICollection<Sal_Customer_Vehicle> Sal_Customer_Vehicle { get; set; }
    }
}