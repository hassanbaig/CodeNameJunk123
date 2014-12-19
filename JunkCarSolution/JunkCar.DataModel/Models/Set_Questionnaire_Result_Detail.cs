using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JunkCar.DataModel.Models
{
    public partial class Set_Questionnaire_Result_Detail
    {
        public Set_Questionnaire_Result_Detail()
       {

       }
        #region Properties       
        public int Questionnaire_Result_Detail_Id { get; set; }
        public int Questionnaire_Result_Id { get; set; }
        public int Question_Id { get; set; }
        public int Answer_Id { get; set; }
        public short Sort_Order { get; set; }
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
