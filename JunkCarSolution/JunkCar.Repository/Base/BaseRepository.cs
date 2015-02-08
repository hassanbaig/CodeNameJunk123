using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Configuration;
using System.Threading.Tasks;
using JunkCar.Data;
using JunkCar.Factory.Factories;

namespace JunkCar.Repository.Base
{
    public class BaseRepository : IDisposable
    {

       private shiner49_JunkCarNewEntities _context;      
       private bool _disposed;
       protected shiner49_JunkCarNewEntities GetConnection()
       {
           string connectionString = System.Configuration.ConfigurationManager.AppSettings["customeConnectionString"].ToString();
           _context = new shiner49_JunkCarNewEntities();
           if (_context.Database.Connection.State == System.Data.ConnectionState.Closed)
           {
               _context.Database.Connection.ConnectionString = connectionString;
               _context.Database.Connection.Open();
           }
           return _context;
       }
       public BaseRepository()
       {          
           
       }   
       public void Dispose()
       {         
           DisposeObject(true);
           GC.SuppressFinalize(this);
       }
       private void DisposeObject(bool disposing)
       {
           if (_disposed) return;
           _disposed = true;
       }   
    }
}
