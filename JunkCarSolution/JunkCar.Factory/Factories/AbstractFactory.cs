using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JunkCar.Factory.Factories
{
   public abstract class AbstractFactory
    {
       public virtual AbstractDomainModel CreateDomainModel(Type type) { return null; }
       public virtual IRepository CreateRepository(Type type) { return null; }
       public virtual AbstractDomainService CreateDomainService(Type type) { return null; }
       public virtual IUnitOfWork CreateUnitOfWork(Type type) { return null; }
       public object CreateObject(Type type)
       {
           object obj = null;
           try
           {
               if (type.IsClass && !type.IsInterface)
               {
                   obj = Activator.CreateInstance(type);
               }
           }
           catch (Exception ex)
           {
               throw ex;
           }
           return obj;
       }
    }
}
