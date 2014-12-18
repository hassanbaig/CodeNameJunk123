using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JunkCar.Factory.Factories
{
   public class ConcreteRepository:AbstractFactory
    {
       public override IRepository CreateRepository(Type type)
       {
           IRepository obj = null;
           obj = (IRepository)CreateObject(type);
           return obj;
       }      
    }
}
