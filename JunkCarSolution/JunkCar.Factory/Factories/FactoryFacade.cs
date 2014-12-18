using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JunkCar.Factory.Factories
{
    public class FactoryFacade
    {
        
        public FactoryFacade()
        {

        }

        private AbstractFactory _factoryDomainModel;
        public AbstractFactory DomainModelFactory { get { return _factoryDomainModel ?? (_factoryDomainModel = new ConcreteDomainModel()); } }

        private AbstractFactory _factoryDomainService;
        public AbstractFactory DomainServiceFactory { get { return _factoryDomainService ?? (_factoryDomainService = new ConcreteDomainService()); } }
        
        private AbstractFactory _factoryUnitOfWork;
        public AbstractFactory UnitOfWorkFactory { get { return _factoryUnitOfWork ?? (_factoryUnitOfWork = new ConcreteUnitOfWork()); } }
        
        private AbstractFactory _factoryRepository;
        public AbstractFactory RepositoryFactory { get { return _factoryRepository ?? (_factoryRepository = new ConcreteRepository()); } }

    }
}
