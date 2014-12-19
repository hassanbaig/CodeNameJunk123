using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JunkCar.DataModel.Models
{
    public partial class Set_Audit_Log
    {
        public Set_Audit_Log()
       {

       }
        #region Properties       
        public long Audit_Id { get; set; }
        public int Primary_Key { get; set; }
        public Nullable<long> Previous_Audit_Id { get; set; }
        public string Action_Type { get; set; }
        public System.DateTime Log_Date { get; set; }
        public string Action_Component { get; set; }
        public string Old_Record_XML { get; set; }
        public string New_Record_XML { get; set; }
        public int User_Code { get; set; }
        public string User_IP { get; set; }
        public byte Is_Active { get; set; }
        public int Site_Id { get; set; }
        #endregion

       
    }
}
