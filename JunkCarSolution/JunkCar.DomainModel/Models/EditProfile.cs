using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using JunkCar.Factory.Factories;
using System.Reflection;
using JunkCar.DataModel.Models;
namespace JunkCar.DomainModel.Models
{
    public class EditProfile:AbstractDomainModel
    {
        public EditProfile()
        {

        }

        #region Properties
        public string UserId { get; set; }
        public long ProviderId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int Gender { get; set; }
        public string Email { get; set; }
        public string DOB { get; set; }
        public string BloodGroup { get; set; }
        public string TimeZone { get; set; }
        public string MobileNumber { get; set; }
        public string ExtraPhoneNumber { get; set; }
        public string StreetAddress { get; set; }
        public int CountryId { get; set; }
        public string CountryName { get; set; }
        public int StateId { get; set; }
        public long CityId { get; set; }
        public string CityName { get; set; }
        public long LocalityId { get; set; }
        public int? ZipCode { get; set; }
        public string ResponseMessage { get; set; }
        public EditProfile ProfileDetails { get; set; }
       
        #endregion        
    
        public override void Fill(System.Collections.Hashtable dataTable)
        {           
            base.FillModel(this.GetType(), dataTable);        
        }
    }
}
