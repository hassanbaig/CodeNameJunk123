using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace JunkCar.Factory.Factories
{ 
   public abstract class AbstractDomainModel
    {
      public abstract void Fill(Hashtable dataTable);
      public void FillModel(Type type, Hashtable dataTable)
      {
          Type MyType = type;
          PropertyInfo[] a_Properties = MyType.GetProperties();
          try
          {
              foreach (string s_Key in dataTable.Keys)
              {
                  PropertyInfo pi = a_Properties.SingleOrDefault(item => item.Name.ToLower() == s_Key.ToLower());

                  Type t = pi.PropertyType;

                  if (pi.PropertyType == typeof(System.Int16))
                  {
                      pi.SetValue(this, Int16.Parse(dataTable[s_Key].ToString()), null);
                  }
                  else if (pi.PropertyType == typeof(System.Int32))
                  {
                      pi.SetValue(this, int.Parse(dataTable[s_Key].ToString()), null);
                  }
                  else if (pi.PropertyType == typeof(System.Int64))
                  {
                      pi.SetValue(this, Int64.Parse(dataTable[s_Key].ToString()), null);
                  }
                  else if (pi.PropertyType == typeof(System.Boolean))
                  {
                      pi.SetValue(this, bool.Parse(dataTable[s_Key].ToString()), null);
                  }
                  else if (pi.PropertyType == typeof(System.DateTime))
                  {
                      pi.SetValue(this, DateTime.Parse(dataTable[s_Key].ToString()), null);
                  }
                  else
                  {
                      pi.SetValue(this, dataTable[s_Key], null);
                  }
              }
          }
          catch (Exception ex)
          {
              throw ex;

          }
      }
    }
}
