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
    
    public partial class Set_Questionnaire_Result
    {
        public Set_Questionnaire_Result()
        {
            this.Sal_Offer = new HashSet<Sal_Offer>();
            this.Set_Questionnaire_Result_Detail = new HashSet<Set_Questionnaire_Result_Detail>();
        }
    
        public int Questionnaire_Result_Id { get; set; }
        public int Questionnaire_Id { get; set; }
        public int Sort_Order { get; set; }
        public System.DateTime Created_Date { get; set; }
        public int Created_By { get; set; }
        public Nullable<System.DateTime> Modified_Date { get; set; }
        public Nullable<int> Modified_By { get; set; }
        public Nullable<long> Audit_Id { get; set; }
        public string User_IP { get; set; }
        public int Site_Id { get; set; }
    
        public virtual ICollection<Sal_Offer> Sal_Offer { get; set; }
        public virtual Set_Questionnaire Set_Questionnaire { get; set; }
        public virtual ICollection<Set_Questionnaire_Result_Detail> Set_Questionnaire_Result_Detail { get; set; }
    }
}
