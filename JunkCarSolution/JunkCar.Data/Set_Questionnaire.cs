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
    
    public partial class Set_Questionnaire
    {
        public Set_Questionnaire()
        {
            this.Sal_Customer_Offer = new HashSet<Sal_Customer_Offer>();
            this.Sal_Offer = new HashSet<Sal_Offer>();
        }
    
        public int Questionnaire_Id { get; set; }
        public string Questionnaire_Description { get; set; }
        public Nullable<int> Parent_Questionnaire_Id { get; set; }
        public short Sort_Order { get; set; }
        public byte Is_Active { get; set; }
        public System.DateTime Created_Date { get; set; }
        public int Created_By { get; set; }
        public Nullable<System.DateTime> Modified_Date { get; set; }
        public Nullable<int> Modified_By { get; set; }
        public Nullable<long> Audit_Id { get; set; }
        public string User_IP { get; set; }
        public int Site_Id { get; set; }
    
        public virtual ICollection<Sal_Customer_Offer> Sal_Customer_Offer { get; set; }
        public virtual ICollection<Sal_Offer> Sal_Offer { get; set; }
    }
}