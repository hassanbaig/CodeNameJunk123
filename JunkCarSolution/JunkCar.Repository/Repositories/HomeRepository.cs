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

namespace JunkCar.Repository.Repositories
{
    public class HomeRepository : BaseRepository, IRepository
    {
        public HomeRepository()
        {

        }        
        private shiner49_JunkCarNewEntities _context;
        public shiner49_JunkCarNewEntities DataContext
        {
            set { _context = value; }
        }
        public HomeRepository(shiner49_JunkCarNewEntities context)
        {
            _context = context;
        }
        public List<int?> GetAllYears()
        {            
            var data = _context.GetYears("YEAR", null, null).ToList();           
            return data;         
        }
        public List<int?> GetCylinders()
        {           
            var data = _context.GetCylinders("CYLINDER", null, null).ToList();
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
                                     Sub_Questionnaire_Id = x.Sub_Questionnaire_Id,
                                     Question_Id = x.Question_Id,                                     
                                     Question = GetQuestion(x.Question_Id),
                                     Answer_Id = x.Answer_Id,
                                     Answers = GetAnswers(x.Question_Id),
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

            List<JunkCar.DataModel.Models.Set_Questionnaire_Detail> distinctList = new List<DataModel.Models.Set_Questionnaire_Detail>();
            distinctList = finalData.GroupBy(x => x.Question.Question).Select(y => y.First()).ToList();
            return distinctList;
          
        }
        private JunkCar.DataModel.Models.Set_Question GetQuestion(int questionId)
        {           
            using (var context = base.GetConnection())
            {
                var data = (from que in context.Set_Question
                            where que.Question_Id == questionId
                            select que).AsEnumerable().Select(x => new JunkCar.DataModel.Models.Set_Question 
                            {
                            Question_Id = x.Question_Id,
                            Question = x.Question,
                            Sort_Order = x.Sort_Order,
                            Is_Active = x.Is_Active,
                            Created_Date = x.Created_Date,
                            Created_By = x.Created_By,
                            Modified_Date = x.Modified_Date,
                            Modified_By = x.Modified_By,
                            Audit_Id = x.Audit_Id,
                            User_IP = x.User_IP,
                            Site_Id = x.Site_Id
                            }).FirstOrDefault();
              return data;
            }           
        }
        private List<JunkCar.DataModel.Models.Set_Answer> GetAnswers(int questionId)
        {
            using (var context = base.GetConnection())
            {
                var data = (from ans in context.Set_Answer
                            join queDet in context.Set_Questionnaire_Detail on ans.Answer_Id equals queDet.Answer_Id
                            where queDet.Question_Id == questionId
                            select ans).AsEnumerable().Select(x => new JunkCar.DataModel.Models.Set_Answer
                            {
                                Answer_Id = x.Answer_Id,
                                Answer = x.Answer,
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
                return data;
            }
        }
        public List<JunkCar.DataModel.Models.Set_Questionnaire> GetAllQuestionnaires()
        {
            using (var context = base.GetConnection())
            {
                var data = (from que in context.Set_Questionnaire
                            join queDet in context.Set_Questionnaire_Detail on que.Questionnaire_Id equals queDet.Questionnaire_Id                            
                            select que).AsEnumerable().Select(x => new JunkCar.DataModel.Models.Set_Questionnaire
                            {
                                Questionnaire_Id = x.Questionnaire_Id,
                                Questionnaire_Description = x.Questionnaire_Description,
                                Parent_Questionnaire_Id = x.Parent_Questionnaire_Id,
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
                return data;
            }
        }

        public string GetCity(string zipCode)
        {
            var city = (from cit in _context.Set_City
                        join zip in _context.Set_Zip_Code on cit.City_Id equals zip.City_Id
                        where zip.Zip_Code == zipCode
                        select cit.City_Name).FirstOrDefault();
            return city;
        }

        public string GetState(string zipCode)
        {
            var state = (from sta in _context.Set_State
                         join zip in _context.Set_Zip_Code on sta.State_Id equals zip.State_Id
                         where zip.Zip_Code == zipCode
                        select sta.State_Name).FirstOrDefault();
            return state;
        }
        public int GetCustomerId(string emailAddress, string phone)
        {
            var customerId = (from salCus in _context.Sal_Customer
                              join salCusCon in _context.Sal_Customer_Contact on salCus.Customer_Id equals salCusCon.Customer_Id
                              where salCus.Login_Name.Equals(emailAddress) || salCusCon.Customer_Contact.Equals(emailAddress) || salCusCon.Customer_Contact.Equals(phone)
                              select salCus.Customer_Id).FirstOrDefault();
            return customerId;
        }
        public List<string> GetQuestionnaireDescription(int[] selectedQuestionnaire)
        {
            List<string> questionnaireDescription = new List<string>();

             for (int i = 0; i < selectedQuestionnaire.Length; i++)
                    {
                        if(i%2==0)
                        {
                            int id = selectedQuestionnaire[i];
                            var question = (from que in _context.Set_Question
                                            where que.Question_Id == id
                                              select que.Question).FirstOrDefault();
                            questionnaireDescription.Add(question);
                        }
                        else
                        {
                            int id = selectedQuestionnaire[i];
                            var answer = (from que in _context.Set_Answer
                                          where que.Answer_Id == id
                                              select que.Answer).FirstOrDefault();
                            questionnaireDescription.Add(answer);
                        }                         
                    }

             return questionnaireDescription;
        }              
        public string GetAnOffer(int? year, int? makeId, int? modelId, string zipCode, string customerInfo, short cylinders)
        {
            var offerPrice = _context.GetAnOffer(year, makeId, modelId, null, zipCode, customerInfo, cylinders).FirstOrDefault();
            return offerPrice.Offer_Price.ToString();            
        }
        public string GetABetterOffer(int? year, int? makeId, int? modelId, string zipCode, string questionnaire, string customerInfo, short cylinders)
        {
            var offerPrice = _context.GetAnOffer(year, makeId, modelId, questionnaire, zipCode, customerInfo, cylinders).FirstOrDefault();
            return offerPrice.Offer_Price.ToString();         
        }
    }
}
