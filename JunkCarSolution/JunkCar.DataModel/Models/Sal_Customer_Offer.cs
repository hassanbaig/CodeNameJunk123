using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JunkCar.DataModel.Models
{
    public partial class Sal_Customer_Offer
    {
       public Sal_Customer_Offer()
       {

       }
        #region Properties       
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
        #endregion

       
    }
}
