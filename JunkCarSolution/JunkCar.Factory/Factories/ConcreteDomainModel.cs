using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JunkCar.Factory.Factories
{
    public class ConcreteDomainModel:AbstractFactory
    {
        public override AbstractDomainModel CreateDomainModel(Type type)
        {
           AbstractDomainModel obj = null;
            obj = (AbstractDomainModel)CreateObject(type);
            return obj;
        }      
    }
}
