using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace JunkCar.Factory.Factories
{
    public class ConcreteDomainService:AbstractFactory
    { 
        public override AbstractDomainService CreateDomainService(Type type)
        {
            AbstractDomainService obj = null;
            obj = (AbstractDomainService)CreateObject(type);
            return obj;
        }     
    }
}
