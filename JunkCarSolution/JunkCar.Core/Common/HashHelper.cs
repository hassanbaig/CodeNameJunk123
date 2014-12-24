using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Collections;

namespace JunkCar.Core.Common
{
    public static class HashHelper
    {
        public static Hashtable GetMakes(int selectedYear, int operationType)
        {
            Hashtable getMakes = new Hashtable();
            getMakes["SelectedYear"] = selectedYear;
            getMakes["OperationType"] = operationType;
            return getMakes;
        }        
    }
}
