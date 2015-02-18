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
        public string GetUserName(string userId, string password)
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
    }
}
