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
            var data = _context.GetYears("YEAR", null, null).ToList();
            return data;         
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
        public JunkCar.DataModel.Models.CheckZipCode_Result CheckZipCode(string zipCode)
        {
            JunkCar.Data.CheckZipCode_Result data = _context.CheckZipCode(zipCode).FirstOrDefault();

            JunkCar.DataModel.Models.CheckZipCode_Result finalData = new DataModel.Models.CheckZipCode_Result();
            finalData.Contact_No = data.Contact_No;            
            finalData.User_Code = data.User_Code;
            finalData.Is_Valid_Zip_Code = data.Is_Valid_Zip_Code;
            finalData.Notes = data.Notes;
            return finalData;
        }
        public List<JunkCar.DataModel.Models.Set_State> GetAllStates()
        {
            var data = (from sta in _context.Set_State
                        select sta).AsEnumerable().Select(x => new JunkCar.DataModel.Models.Set_State {
                        State_Id = x.State_Id,
                        State_Code = x.State_Code,
                        State_Name = x.State_Name,
                        Country_Id = x.Country_Id,
                        Is_Active = x.Is_Active,
                        Created_Date = x.Created_Date,
                        Created_By = x.Created_By,
                        Modified_Date = x.Modified_Date,
                        Modified_By = x.Modified_By,
                        Audit_Id = x.Audit_Id,
                        User_IP = x.User_IP,
                        Site_Id = x.Site_Id
                        }).ToList();
            return data;
        }
        public List<JunkCar.DataModel.Models.Set_City> GetCitiesByState(int stateId)
        {
            var data = (from cit in _context.Set_City
                        where cit.State_Id == stateId
                        select cit).AsEnumerable().Select(x => new JunkCar.DataModel.Models.Set_City
                        {
                            City_Id = x.City_Id,
                            City_Code= x.City_Code,
                            City_Name = x.City_Name,
                            County_Id = x.Country_Id,
                            State_Id = x.State_Id,                            
                            Country_Id = x.Country_Id,
                            Is_Active = x.Is_Active,
                            Created_Date = x.Created_Date,
                            Created_By = x.Created_By,
                            Modified_Date = x.Modified_Date,
                            Modified_By = x.Modified_By,
                            Audit_Id = x.Audit_Id,
                            User_IP = x.User_IP,
                            Site_Id = x.Site_Id
                        }).ToList();
            return data;
        }
        public List<JunkCar.DataModel.Models.Set_Questionnaire_Detail> GetQuestionnaire()
        {
            var data = _context.GetQuestionnaire("QUESTIONNAIRE", null, null).ToList();
            var finalData = (from d in data
                             select d).AsEnumerable().Select(x => new JunkCar.DataModel.Models.Set_Questionnaire_Detail
                                 {
                                     Questionnaire_Detail_Id = x.Questionnaire_Detail_Id,
                                     Questionnaire_Id = x.Questionnaire_Id,
                                     Question_Id = x.Question_Id,
                                     Answer_Id = x.Answer_Id,
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
