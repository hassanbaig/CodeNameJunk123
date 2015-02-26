using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JunkCar.DataModel.Models
{
   public partial class Sal_Customer
    {
       public Sal_Customer()
       {

       }
        #region Properties       
       public int Customer_Id { get; set; }
       public string Customer_Code { get; set; }
       public string Customer_Name { get; set; }
       public Nullable<int> Assigned_User_Code { get; set; }
       public Nullable<int> Currency_Id { get; set; }
       public byte Is_Active { get; set; }
       public System.DateTime Created_Date { get; set; }
       public int Created_By { get; set; }
       public Nullable<System.DateTime> Modified_Date { get; set; }
       public Nullable<int> Modified_By { get; set; }
       public Nullable<long> Audit_Id { get; set; }
       public string User_IP { get; set; }
       public int Site_Id { get; set; }
       public string Login_Name { get; set; }
       public string Login_Password { get; set; }
       public Nullable<System.DateTime> Signup_Date { get; set; }
       public Nullable<int> Password_Question_Id { get; set; }
       public string Password_Answer { get; set; }
       public Nullable<int> Varification_Code { get; set; }
       public Nullable<System.DateTime> Change_Password_Date { get; set; }
       public string Login_Password_Old { get; set; }
       public Nullable<System.DateTime> Activation_Date { get; set; }
        #endregion

       
    }
}
