using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JunkCar.DataModel.Models
{
    public partial class usp_Sal_Offer_Result
    {
        public usp_Sal_Offer_Result()
       {

       }
        #region Properties       
        public Nullable<decimal> ActionType { get; set; }
        public int Offer_Id { get; set; }
        public int Model_Year_Id { get; set; }
        public int Zip_Id { get; set; }
        public int Questionnaire_Id { get; set; }
        public int Questionnaire_Result_Id { get; set; }
        public int Offer_Price { get; set; }
        public bool Is_Negotiable { get; set; }
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
