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
        public List<JunkCar.DataModel.Models.Set_Model_Year> GetAllYears()
        {
            var data = _context.GetYears("YEAR", null, null).ToList();
            var finalData = (from d in data
                             select d).AsEnumerable().Select(x => new JunkCar.DataModel.Models.Set_Model_Year
                             {
                                 Model_Year_Id = x.Model_Year_Id,
                                 Registration_Year = x.Registration_Year,
                                 Make_Id = x.Make_Id,
                                 Model_Id = x.Model_Year_Id,
                                 Offer_Price = x.Offer_Price,
                                 Sort_Order = x.Sort_Order,
                                 Is_Active = x.Is_Active,
                                 Created_Date = x.Created_Date,
                                 Created_By = x.Created_By,
                                 Modified_Date = x.Modified_Date,
                                 Modified_By = x.Modified_By,
                                 Audit_Id = x.Audit_Id,
                                 User_IP = x.User_IP,
                                 Site_Id = x.Site_Id
                             }).ToList();
            return finalData;         
        }
        public List<JunkCar.DataModel.Models.Set_Make> GetMakesByYear(int selectedYear)
        {
            var data = _context.GetMakes("MAKE", selectedYear, null).ToList();
            var finalData = (from d in data
                             select d).AsEnumerable().Select(x => new JunkCar.DataModel.Models.Set_Make
                                 {
                                     Make_Id = x.Make_Id,
                                     Make_Name = x.Make_Name,
                                     Sort_Order = x.Sort_Order,
                                     Is_Active = x.Is_Active,
                                     Created_Date = x.Created_Date,
                                     Created_By = x.Created_By,
                                     Modified_Date = x.Modified_Date,
                                     Modified_By = x.Modified_By,
                                     Audit_Id = x.Audit_Id,
                                     User_IP = x.User_IP,
                                     Site_Id = x.Site_Id
                                 }).ToList();
            return finalData;           
        }
        public List<JunkCar.DataModel.Models.Set_Model> GetModelsByYearMake(int selectedYear, int selectedMakeId)
        {
            var data = _context.GetModels("MODEL", selectedYear, selectedMakeId).ToList();
            var finalData = (from d in data
                             select d).AsEnumerable().Select(x => new JunkCar.DataModel.Models.Set_Model
                             {
                                 Make_Id = x.Make_Id,
                                 Model_Name = x.Model_Name,
                                 Model_Id = x.Make_Id,
                                 Sort_Order = x.Sort_Order,
                                 Is_Active = x.Is_Active,
                                 Created_Date = x.Created_Date,
                                 Created_By = x.Created_By,
                                 Modified_Date = x.Modified_Date,
                                 Modified_By = x.Modified_By,
                                 Audit_Id = x.Audit_Id,
                                 User_IP = x.User_IP,
                                 Site_Id = x.Site_Id
                             }).ToList();
            return finalData;
        }      
    }
}
