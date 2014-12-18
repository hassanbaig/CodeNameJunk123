using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JunkCar.DataModel.Models
{
   public partial class User
    {
       public User()
       {

       }
        #region Properties       
       public string UserId { get; set; }
       public string Password { get; set; }
       public int UserRoleId { get; set; }
       public DateTime? LastLoginDate { get; set; }
       public DateTime? LastPasswordChangeDate { get; set; }
       public int? FailedLoginCount { get; set; }
       public bool? Enable { get; set; }
       public bool? Locked { get; set; }
       public int? SecurityQuestionId { get; set; }
       public string SecurityAnswer { get; set; }
        #endregion

       
    }
}
