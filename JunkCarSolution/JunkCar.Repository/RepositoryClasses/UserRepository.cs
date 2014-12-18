using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using JunkCar.Data;
using JunkCar.Factory.Factories;

namespace JunkCar.Repository.RepositoryClasses
{
    public class UserRepository : IRepository
    {
       
        public UserRepository()
        {
        }        
        private shiner49_JunkCarEntities _context;
        public shiner49_JunkCarEntities DataContext
        {
            set { _context = value; }
        }
        public UserRepository(shiner49_JunkCarEntities context)
        {
            _context = context;
        }
        //public User GetByName(string Name)
        //{
        //    return _context.Users.SingleOrDefault(x => x.UserId == Name);
        //}
        //public void Save(User entity)
        //{
        //    _context.Users.Add(entity);
        //}
        //public void Update(string userId, string currentPass, string newPass)
        //{
        //    var user = (from use in _context.Users
        //                where use.UserId == userId && use.Password == currentPass && use.Enable == true
        //                select use).FirstOrDefault();
        //    if (user != null)
        //    {
        //        user.Password = newPass;
        //        user.LastPasswordChangeDate = DateTime.Now;
        //    }
        //    else
        //    { throw new Exception("User not found, please enter corrrect user Id or current password"); }
        //}
        //public void Update(string userId, string newPass)
        //{
        //    var user = (from use in _context.Users
        //                where use.UserId == userId && use.Enable == true
        //                select use).FirstOrDefault();
        //    if (user != null)
        //    {
        //        user.Password = newPass;
        //        user.LastPasswordChangeDate = DateTime.Now;
        //    }
        //    else
        //    { throw new Exception("User not found"); }
        //}
        //public User GetUser(string userId, string password)
        //{
        //    User data = (from use in _context.Users
        //                 where use.UserId == userId && use.Password == password && use.Enable == true
        //                 select use).FirstOrDefault();
        //    return data;
        //}
    }
}
