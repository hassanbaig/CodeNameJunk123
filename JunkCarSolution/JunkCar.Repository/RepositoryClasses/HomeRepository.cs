using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using JunkCar.Data;
using JunkCar.Factory.Factories;
using JunkCar.Repository.Base;
using System.Configuration;
using System.Data.Entity.Core.Objects;

namespace JunkCar.Repository.RepositoryClasses
{
    public class HomeRepository : BaseRepository, IRepository
    {
        public HomeRepository()
        {

        }
        private shiner49_JunkCarEntities _context;
        public shiner49_JunkCarEntities DataContext
        {
            set { _context = value; }
        }
        public HomeRepository(shiner49_JunkCarEntities context)
        {
            _context = context;
        }
        public List<int?> GetAllYears()
        {
            var data = _context.usp_Set_Offer_Parameter_Select("YEAR", null, null).ToList();
            return data;            
            //var data = (from rdy in _context.Set_Model_Year
            //            select rdy).AsEnumerable().Select(x => new JunkCar.DataModel.Models.Set_Model_Year
            //            {Registration_Year = x.Registration_Year }
            //            ).ToList();
            //return data;

        }      
    }
}
