using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JunkCar.DataModel.Models
{
    public partial class Questionnaire
    {
        public Questionnaire()
       {

       }
        #region Properties       
        public List<string> Questions { get; set; }
        public List<string> Answers { get; set; }
        #endregion

       
    }
}
