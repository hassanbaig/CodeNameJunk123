using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using JunkCar.Factory.Factories;
using JunkCar.Core.Enumerations;
namespace JunkCar.Factory.Factories
{
    public abstract class AbstractDomainService
    {
        public abstract AbstractDomainModel Save(AbstractDomainModel domainModel, Enumerations.DomainModelEnum domainModelType);
        public abstract AbstractDomainModel Update(AbstractDomainModel domainModel, Enumerations.DomainModelEnum domainModelType);
        public abstract AbstractDomainModel Delete(AbstractDomainModel domainModel, Enumerations.DomainModelEnum domainModelType);
        public abstract AbstractDomainModel Query(AbstractDomainModel domainModel, Enumerations.DomainModelEnum domainModelType);
        public abstract AbstractDomainModel Query(AbstractDomainModel domainModel, Enumerations.DomainModelEnum domainModelType, JunkCar.Core.Enumerations.SearchCriteriaEnum searchCriteria);
        //public abstract IQueryable<T> Query<T>(this IQueryable<T> domainModel,JunkCar.Core.Enumerations.SearchCriteriaEnum searchCriteria);        
        public abstract AbstractDomainModel Query(JunkCar.Core.Enumerations.SearchCriteriaEnum searchCriteria);        
    }
}