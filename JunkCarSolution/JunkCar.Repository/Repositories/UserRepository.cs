using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using JunkCar.Data;
using JunkCar.Factory.Factories;
using JunkCar.Repository.Base;

namespace JunkCar.Repository.Repositories
{
    public class UserRepository : BaseRepository, IRepository
    {
       
        public UserRepository()
        {
        }        
        private shiner49_JunkCarNewEntities _context;
        public shiner49_JunkCarNewEntities DataContext
        {
            set { _context = value; }
        }
        public UserRepository(shiner49_JunkCarNewEntities context)
        {
            _context = context;
        }
        public int Add(string email,string name,string address,string phone, string password, string zipCode)
        {
            var registerUser = _context.RegisterUser(null, password, name, address, phone, email, zipCode,1);

            var finalData = (from d in registerUser
                             select d.Customer_Id).FirstOrDefault();

            return (int)finalData;            
        }
        //public User GetByName(string Name)
        //{
        //   // return _context.Users.SingleOrDefault(x => x.UserId == Name);
        //    return null;
        //}
        //public void Save(User entity)
        //{
        //    //_context.Users.Add(entity);
        //}
        public void Update(string userId, string currentPass, string newPass)
        {
            //var user = (from use in _context.Users
            //            where use.UserId == userId && use.Password == currentPass && use.Enable == true
            //            select use).FirstOrDefault();
            //if (user != null)
            //{
            //    user.Password = newPass;
            //    user.LastPasswordChangeDate = DateTime.Now;
            //}
            //else
            //{ throw new Exception("User not found, please enter corrrect user Id or current password"); }
        }
        public void Update(string userId, string newPass)
        {
            //var user = (from use in _context.Users
            //            where use.UserId == userId && use.Enable == true
            //            select use).FirstOrDefault();
            //if (user != null)
            //{
            //    user.Password = newPass;
            //    user.LastPasswordChangeDate = DateTime.Now;
            //}
            //else
            //{ throw new Exception("User not found"); }
        }
        public string GetCustomerName(string userId, string password)
        {
            string customerName = string.Empty;
            var data = _context.Authenticate(null, password, null, null, null, userId, null,0);
            var finalData = (from d in data
                             select d.Customer_Id).FirstOrDefault();
            if (finalData == null)
            { return string.Empty; }
            else
            { 
                int customerId = (int)finalData;
                customerName = (from d in _context.Sal_Customer
                                where d.Customer_Id == customerId
                                select d.Customer_Name).FirstOrDefault();
                return customerName;
                            
            }                      
        }
        public JunkCar.DataModel.Models.Sec_Password_Question GetSecurityQuestion(string userId)
        {
            var data = (from salCus in _context.Sal_Customer
                        join secPasQue in _context.Sec_Password_Question on salCus.Password_Question_Id equals secPasQue.Password_Question_Id
                        where salCus.Login_Name.Equals(userId)
                        select secPasQue).AsEnumerable().Select( x=> new JunkCar.DataModel.Models.Sec_Password_Question 
                        {
                            Audit_Id = x.Audit_Id,
                            Created_By = x.Created_By,
                            Created_Date = x.Created_Date,
                            Is_Active = x.Is_Active,
                            Modified_By = x.Modified_By,
                            Modified_Date = x.Modified_Date,
                            Password_Question_Id = x.Password_Question_Id,
                            Question = x.Question,
                            Site_Id = x.Site_Id,
                            Sort_Order = x.Sort_Order,
                            User_IP = x.User_IP                           
                        }).FirstOrDefault();

            return data;                       
        }
        public string CheckSecurityQuestionAnswer(int questionId, string answer)
        {
            var data = (from salCus in _context.Sal_Customer                        
                        where salCus.Password_Question_Id == questionId && salCus.Password_Answer.Equals(answer)
                        select salCus.Password_Answer).FirstOrDefault();
            if (data == null)
            { return "Invalid"; }
            else
            { return "Valid"; }            
        }
        public string GetCustomerName(string userId)
        {
            var data = (from salCus in _context.Sal_Customer
                        where salCus.Login_Name.Equals(userId)
                        select salCus.Customer_Name).FirstOrDefault();
            return data;
        }
        
        public int SaveVerificationCode(string userId, int verificationCode)
        {
            var data = (from salCus in _context.Sal_Customer
                        where salCus.Login_Name.Equals(userId)
                        select salCus).FirstOrDefault();
            if (data != null)
            {
                data.Varification_Code = verificationCode;
                _context.SaveChanges();
            }
            return data.Customer_Id;
        }
        public int CheckVerificationCode(int verificationCode)
        {
            var data = (from salCus in _context.Sal_Customer
                        where salCus.Varification_Code == verificationCode
                        select salCus.Customer_Id).FirstOrDefault();
            return data;
        }
        public int ResetPassword(string userId, string newPassword)
        {
            var data = (from salCus in _context.Sal_Customer
                        where salCus.Login_Name.Equals(userId)
                        select salCus).FirstOrDefault();
            if (data != null)
            {
                data.Login_Password = newPassword;
                _context.SaveChanges();
            }
            return data.Customer_Id;
        }
        public int ChangePassword(string userId, string newPassword)
        {
            var data = (from salCus in _context.Sal_Customer
                        where salCus.Login_Name.Equals(userId)
                        select salCus).FirstOrDefault();
            if (data.Login_Password == newPassword)
            {
                data.Login_Password = newPassword;
                _context.SaveChanges();
            }
            else 
            { 
                throw new Exception("Please provide correct old password");
            }
            return data.Customer_Id;
        }
    }
}
