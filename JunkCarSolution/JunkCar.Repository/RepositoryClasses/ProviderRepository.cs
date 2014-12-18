using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using JunkCar.Data;
using JunkCar.Factory.Factories;
using JunkCar.Repository.Base;
using System.Configuration;

namespace JunkCar.Repository.RepositoryClasses
{
    public class ProviderRepository : BaseRepository, IRepository
    {
        public ProviderRepository()
        {

        }
        private shiner49_JunkCarEntities _context;
        public shiner49_JunkCarEntities DataContext
        {
            set { _context = value; }
        }
        public ProviderRepository(shiner49_JunkCarEntities context)
        {
            _context = context;
        }      
        //public Provider GetByName(string Name)
        //{
        //    return _context.Providers.SingleOrDefault(x => x.FirstName == Name);
        //}
        //public void Save(Provider entity)
        //{
        //    _context.Providers.Add(entity);
        //}
        //public void Update(Provider entity)
        //{
        //    var provider = (from pro in _context.Providers
        //                    where pro.UserId == entity.UserId && pro.ProviderId == entity.ProviderId
        //                    select pro).FirstOrDefault();
        //    if (provider != null)
        //    {
        //        provider.FirstName = entity.FirstName;
        //        provider.GenderId = entity.GenderId;
        //        provider.TimeZone = entity.TimeZone;
        //        provider.MobileNumber = entity.MobileNumber;
        //        provider.ZipCode = entity.ZipCode;                
        //    }
        //    else
        //    { throw new Exception("Provider not found"); }
        //}         
        //public void UpdateDoctorDetails(Provider entity)
        //{
        //    var provider = (from pro in _context.Providers
        //                    where pro.UserId == entity.UserId && pro.ProviderId == entity.ProviderId
        //                    select pro).FirstOrDefault();
        //    if (provider != null)
        //    {
        //        provider.FirstName = entity.FirstName;
        //        provider.LastName = entity.LastName;
        //        provider.GenderId = entity.GenderId;
        //        provider.RegistrationDetails = entity.RegistrationDetails;
        //        provider.RegistrationYear = entity.RegistrationYear;
        //        provider.RegistrationCouncilId = entity.RegistrationCouncilId;
        //        provider.TagLine = entity.TagLine;
        //        provider.TotalExperienceYears = entity.TotalExperienceYears;
        //        provider.Description = entity.Description;
        //    }
        //    else
        //    { throw new Exception("Provider not found"); }
        //}
        //public JunkCar.DataModel.Models.Provider GetProviderByUserId(string userId)
        //{
        //    var data = (from pro in _context.Providers
        //                    where pro.UserId == userId
        //                    select new JunkCar.DataModel.Models.Provider
        //                    {
        //                        FirstName = pro.FirstName,
        //                        LastName = pro.LastName,
        //                        GenderId = pro.GenderId,
        //                        Email = pro.Email,
        //                        DOB = (pro.DOB != null) ? pro.DOB : DateTime.Now,
        //                        BloodGroup = (pro.BloodGroup != null) ? pro.BloodGroup : string.Empty,
        //                        TimeZone = (pro.TimeZone != null) ? pro.TimeZone : string.Empty,
        //                        MobileNumber = (pro.MobileNumber != null) ? pro.MobileNumber : string.Empty,
        //                        ExtraMobileNumber = (pro.ExtraMobileNumber != null) ? pro.ExtraMobileNumber : string.Empty,
        //                        StreetAddress = (pro.StreetAddress != null) ? pro.StreetAddress : string.Empty,
        //                        ProviderId = pro.ProviderId,
        //                        ZipCode = (pro.ZipCode == null) ? 0 : pro.ZipCode
        //                    }).FirstOrDefault();

        //    return data;
        //}       
        //#region Utility methods
        //private string GetEducationTitles(long providerId)
        //{
        //    string titles = string.Empty;
            
        //    using( var context = base.GetConnection())
        //    {

        //        List<string> data = (from proEdu in context.ProviderEducations
        //                                  where proEdu.ProviderId == providerId
        //                                  select proEdu.DegreeTitle).ToList();
        //        titles = string.Join(" , ", data.ToArray());       
        //    }
                 
        //    return titles;
        //}
        //private string GetExperienceTotal(long providerId)
        //{
        //    string years = string.Empty;

        //    using (var context = base.GetConnection())
        //    {

        //        var data = (from proExp in context.ProviderExperiences
        //                          where proExp.ProviderId == providerId
        //                          select proExp.TotalYears).FirstOrDefault();
        //        years = data.ToString() + " year(s) experience";
        //    }

        //    return years;
        //}
        //private string GetSpecialtyTitles(long providerId)
        //{
        //    string titles = string.Empty;

        //    using (var context = base.GetConnection())
        //    {
        //        List<string> data = (from proSpe in context.ProviderSpecialties
        //                                        join spe in context.Specialties on proSpe.SpecialtyId equals spe.SpecialtyId
        //                                        where proSpe.ProviderId == providerId
        //                                        select spe.Title).ToList();
        //        titles = string.Join(" , ", data.ToArray());
        //    }

        //    return titles;
        //}
        //private string GetPracticeTitles(long providerId)
        //{
        //    string titles = string.Empty;

        //    using (var context = base.GetConnection())
        //    {
        //        List<string> data = (from proPra in context.ProviderPractices
        //                                       join pra in context.Practices on proPra.PracticeId equals pra.PracticeId
        //                                       where proPra.ProviderId == providerId
        //                                        select pra.Name).ToList();
        //        titles = string.Join(" , ", data.ToArray());
        //    }

        //    return titles;
        //}
        //private string GetPracticeAddress(long providerId)
        //{
        //    string titles = string.Empty;

        //    using (var context = base.GetConnection())
        //    {
        //        var data = (from proPra in context.ProviderPractices
        //                       join pra in context.Practices on proPra.PracticeId equals pra.PracticeId
        //                       where proPra.ProviderId == providerId
        //                                        select pra.Address).FirstOrDefault();
        //        titles = data.ToString();
        //    }

        //    return titles;
        //}
        //private int GetFee(long providerId)
        //{
        //    int fees = 0;

        //    using (var context = base.GetConnection())
        //    {
        //        var data = (from proFee in context.ProviderFees
        //                   where proFee.ProviderId == providerId
        //                   select proFee).FirstOrDefault();
        //        fees = data.Fee;
        //    }

        //    return fees;
        //}
        //private string GetCurrency(long providerId)
        //{
        //    string currency = string.Empty;

        //    using (var context = base.GetConnection())
        //    {
        //        var data = (from proFee in context.ProviderFees
        //                   where proFee.ProviderId == providerId
        //                   select proFee).FirstOrDefault();
        //        currency = data.Currency;
        //    }

        //    return currency;
        //}
        //private string GetDays(long providerId)
        //{
        //    string days = string.Empty;

        //    using (var context = base.GetConnection())
        //    {
        //        List<string> data = (from proAva in context.ProviderAvailabilities
        //                            where proAva.ProviderId == providerId
        //                            select proAva.DayoftheWeek).ToList();
        //        days = string.Join(",", data.ToArray());
        //    }
        //   return days;
        //}
        //private string GetTimings(long providerId)
        //{
        //    string timings = string.Empty;

        //    List<string> time = new List<string>();            

        //    using (var context = base.GetConnection())
        //    {
        //        List<ProviderAvailability> data = (from proAva in context.ProviderAvailabilities
        //                                             where proAva.ProviderId == providerId
        //                                             select proAva).ToList();

        //        foreach (ProviderAvailability item in data)
        //        {
        //            time.Add(item.StartTime1.Value.ToString("hh:mm:ss: tt") + "-" + item.StartTime2.Value.ToString("hh:mm:ss: tt") + " ,  " + item.EndTime2.Value.ToString("hh:mm:ss: tt") + "-" + item.EndTime1.Value.ToString("hh:mm:ss: tt"));                    
        //        }

        //        timings = string.Join("$", time.ToArray());
        //    }
        //    return timings;
        //}
        //#endregion
        //public List<JunkCar.DataModel.Models.Provider> GetProviderBySpecialty(long city, string specialty)
        //{
        //    var data = (from pro in _context.Providers
        //                    join proPra in _context.ProviderPractices on pro.ProviderId equals proPra.ProviderId
        //                    join pra in _context.Practices on proPra.PracticeId equals pra.PracticeId
        //                    join proSpe in _context.ProviderSpecialties on pro.ProviderId equals proSpe.ProviderId
        //                    join spe in _context.Specialties on proSpe.SpecialtyId equals spe.SpecialtyId
        //                    where spe.Title.Contains(specialty) && pra.CityId == city
        //                    select pro).AsEnumerable().Select(x => new JunkCar.DataModel.Models.Provider
        //                    {
        //                        FirstName = x.FirstName,
        //                        LastName = x.LastName,
        //                        GenderId = x.GenderId,
        //                        BloodGroup = (x.BloodGroup != null) ? x.BloodGroup : string.Empty,
        //                        TimeZone = (x.TimeZone != null) ? x.TimeZone : string.Empty,
        //                        MobileNumber = (x.MobileNumber != null) ? x.MobileNumber : string.Empty,
        //                        ExtraMobileNumber = (x.ExtraMobileNumber != null) ? x.ExtraMobileNumber : string.Empty,
        //                        StreetAddress = (x.StreetAddress != null) ? x.StreetAddress : string.Empty,
        //                        ProviderId = x.ProviderId,
        //                        ZipCode = x.ZipCode,
        //                        Education = GetEducationTitles(x.ProviderId),
        //                        Experience = GetExperienceTotal(x.ProviderId),
        //                        Specialties = GetSpecialtyTitles(x.ProviderId),
        //                        Practice = GetPracticeTitles(x.ProviderId),
        //                        Address = GetPracticeAddress(x.ProviderId),
        //                        Fee = GetFee(x.ProviderId),
        //                        Currency = GetCurrency(x.ProviderId),
        //                        Days = GetDays(x.ProviderId),
        //                        Timings = GetTimings(x.ProviderId)
        //                    }).ToList();
        //    return data;
        //}
        //public List<JunkCar.DataModel.Models.Provider> GetProviderBySpecialtyLocality(long city, string specialty, string locality)
        //{
        //    var data = (from pro in _context.Providers
        //                    join proPra in _context.ProviderPractices on pro.ProviderId equals proPra.ProviderId
        //                    join pra in _context.Practices on proPra.PracticeId equals pra.PracticeId
        //                    join loc in _context.Localities on pra.LocalityId equals loc.LocalityId
        //                    join proSpe in _context.ProviderSpecialties on pro.ProviderId equals proSpe.ProviderId
        //                    join spe in _context.Specialties on proSpe.SpecialtyId equals spe.SpecialtyId
        //                    where spe.Title.Contains(specialty) && pra.CityId == city && loc.Name==locality
        //                    select pro).AsEnumerable().Select(x => new JunkCar.DataModel.Models.Provider
        //                    {
        //                        FirstName = x.FirstName,
        //                        LastName = x.LastName,
        //                        GenderId = x.GenderId,
        //                        BloodGroup = (x.BloodGroup != null) ? x.BloodGroup : string.Empty,
        //                        TimeZone = (x.TimeZone != null) ? x.TimeZone : string.Empty,
        //                        MobileNumber = (x.MobileNumber != null) ? x.MobileNumber : string.Empty,
        //                        ExtraMobileNumber = (x.ExtraMobileNumber != null) ? x.ExtraMobileNumber : string.Empty,
        //                        StreetAddress = (x.StreetAddress != null) ? x.StreetAddress : string.Empty,
        //                        ProviderId = x.ProviderId,
        //                        ZipCode = x.ZipCode,
        //                        Education = GetEducationTitles(x.ProviderId),
        //                        Experience = GetExperienceTotal(x.ProviderId),
        //                        Specialties = GetSpecialtyTitles(x.ProviderId),
        //                        Practice = GetPracticeTitles(x.ProviderId),
        //                        Address = GetPracticeAddress(x.ProviderId),
        //                        Fee = GetFee(x.ProviderId),
        //                        Currency = GetCurrency(x.ProviderId),
        //                        Days = GetDays(x.ProviderId),
        //                        Timings = GetTimings(x.ProviderId)
        //                    }).ToList();
        //    return data;
        //}
        //public List<JunkCar.DataModel.Models.Provider> GetProviderByDoctor(long city, string doctor)
        //{
        //    string [] name = doctor.Split(' ');
        //    string fName = name[0];
        //    string lName = name[name.Length - 1];
        //    var data = (from pro in _context.Providers
        //                    join proPra in _context.ProviderPractices on pro.ProviderId equals proPra.ProviderId
        //                    join pra in _context.Practices on proPra.PracticeId equals pra.PracticeId
        //                    where (pro.FirstName.Contains(fName) || pro.LastName.Contains(lName)) && pra.CityId == city && pro.ProviderTypeId == 1
        //                    select pro).AsEnumerable().Select(x => new JunkCar.DataModel.Models.Provider
        //                    {
        //                        FirstName = x.FirstName,
        //                        LastName = x.LastName,
        //                        GenderId = x.GenderId,
        //                        BloodGroup = (x.BloodGroup != null) ? x.BloodGroup : string.Empty,
        //                        TimeZone = (x.TimeZone != null) ? x.TimeZone : string.Empty,
        //                        MobileNumber = (x.MobileNumber != null) ? x.MobileNumber : string.Empty,
        //                        ExtraMobileNumber = (x.ExtraMobileNumber != null) ? x.ExtraMobileNumber : string.Empty,
        //                        StreetAddress = (x.StreetAddress != null) ? x.StreetAddress : string.Empty,
        //                        ProviderId = x.ProviderId,
        //                        ZipCode = x.ZipCode,
        //                        Education = GetEducationTitles(x.ProviderId),
        //                        Experience = GetExperienceTotal(x.ProviderId),
        //                        Specialties = GetSpecialtyTitles(x.ProviderId),
        //                        Practice = GetPracticeTitles(x.ProviderId),
        //                        Address = GetPracticeAddress(x.ProviderId),
        //                        Fee = GetFee(x.ProviderId),
        //                        Currency = GetCurrency(x.ProviderId),
        //                        Days = GetDays(x.ProviderId),
        //                        Timings = GetTimings(x.ProviderId)
        //                    }).ToList();
        //    return data;
        //}
        //public List<JunkCar.DataModel.Models.Provider> GetProviderByDoctorLocality(long city, string doctor, string locality)
        //{
        //    string[] name = doctor.Split(' ');
        //    string fName = name[0];
        //    string lName = name[name.Length - 1];
        //    var data = (from pro in _context.Providers
        //                    join proPra in _context.ProviderPractices on pro.ProviderId equals proPra.ProviderId
        //                    join pra in _context.Practices on proPra.PracticeId equals pra.PracticeId
        //                    join loc in _context.Localities on pra.LocalityId equals loc.LocalityId
        //                    where (pro.FirstName.Contains(fName) || pro.LastName.Contains(lName)) && pra.CityId == city && pro.ProviderTypeId == 1 && loc.Name == locality
        //                    select pro).AsEnumerable().Select(x => new JunkCar.DataModel.Models.Provider
        //                    {
        //                        FirstName = x.FirstName,
        //                        LastName = x.LastName,
        //                        GenderId = x.GenderId,
        //                        BloodGroup = (x.BloodGroup != null) ? x.BloodGroup : string.Empty,
        //                        TimeZone = (x.TimeZone != null) ? x.TimeZone : string.Empty,
        //                        MobileNumber = (x.MobileNumber != null) ? x.MobileNumber : string.Empty,
        //                        ExtraMobileNumber = (x.ExtraMobileNumber != null) ? x.ExtraMobileNumber : string.Empty,
        //                        StreetAddress = (x.StreetAddress != null) ? x.StreetAddress : string.Empty,
        //                        ProviderId = x.ProviderId,
        //                        ZipCode = x.ZipCode,
        //                        Education = GetEducationTitles(x.ProviderId),
        //                        Experience = GetExperienceTotal(x.ProviderId),
        //                        Specialties = GetSpecialtyTitles(x.ProviderId),
        //                        Practice = GetPracticeTitles(x.ProviderId),
        //                        Address = GetPracticeAddress(x.ProviderId),
        //                        Fee = GetFee(x.ProviderId),
        //                        Currency = GetCurrency(x.ProviderId),
        //                        Days = GetDays(x.ProviderId),
        //                        Timings = GetTimings(x.ProviderId)
        //                    }).ToList();
        //    return data;
        //}
        //public List<JunkCar.DataModel.Models.Provider> GetProviderByHospital(long city, string hospital)
        //{
        //    var data = (from pro in _context.Providers
        //                     join proPra in _context.ProviderPractices on pro.ProviderId equals proPra.ProviderId
        //                     join pra in _context.Practices on proPra.PracticeId equals pra.PracticeId
        //                     where pra.Name.Contains(hospital) && pra.CityId == city && pra.PracticeTypeId == 2
        //                     select pro).AsEnumerable().Select(x => new JunkCar.DataModel.Models.Provider
        //                     {
        //                         FirstName = x.FirstName,
        //                         LastName = x.LastName,
        //                         GenderId = x.GenderId,
        //                         BloodGroup = (x.BloodGroup != null) ? x.BloodGroup : string.Empty,
        //                         TimeZone = (x.TimeZone != null) ? x.TimeZone : string.Empty,
        //                         MobileNumber = (x.MobileNumber != null) ? x.MobileNumber : string.Empty,
        //                         ExtraMobileNumber = (x.ExtraMobileNumber != null) ? x.ExtraMobileNumber : string.Empty,
        //                         StreetAddress = (x.StreetAddress != null) ? x.StreetAddress : string.Empty,
        //                         ProviderId = x.ProviderId,
        //                         ZipCode = x.ZipCode,
        //                         Education = GetEducationTitles(x.ProviderId),
        //                         Experience = GetExperienceTotal(x.ProviderId),
        //                         Specialties = GetSpecialtyTitles(x.ProviderId),
        //                         Practice = GetPracticeTitles(x.ProviderId),
        //                         Address = GetPracticeAddress(x.ProviderId),
        //                         Fee = GetFee(x.ProviderId),
        //                         Currency = GetCurrency(x.ProviderId),
        //                         Days = GetDays(x.ProviderId),
        //                         Timings = GetTimings(x.ProviderId)
        //                     }).ToList();
        //    return data;
        //}
        //public List<JunkCar.DataModel.Models.Provider> GetProviderByHospitalLocality(long city, string hospital, string locality)
        //{
        //    var data = (from pro in _context.Providers
        //                     join proPra in _context.ProviderPractices on pro.ProviderId equals proPra.ProviderId
        //                     join pra in _context.Practices on proPra.PracticeId equals pra.PracticeId
        //                     join loc in _context.Localities on pra.LocalityId equals loc.LocalityId
        //                     where pra.Name.Contains(hospital) && pra.CityId == city && pra.PracticeTypeId == 2 && loc.Name==locality
        //                     select pro).AsEnumerable().Select(x => new JunkCar.DataModel.Models.Provider
        //                     {
        //                         FirstName = x.FirstName,
        //                         LastName = x.LastName,
        //                         GenderId = x.GenderId,
        //                         BloodGroup = (x.BloodGroup != null) ? x.BloodGroup : string.Empty,
        //                         TimeZone = (x.TimeZone != null) ? x.TimeZone : string.Empty,
        //                         MobileNumber = (x.MobileNumber != null) ? x.MobileNumber : string.Empty,
        //                         ExtraMobileNumber = (x.ExtraMobileNumber != null) ? x.ExtraMobileNumber : string.Empty,
        //                         StreetAddress = (x.StreetAddress != null) ? x.StreetAddress : string.Empty,
        //                         ProviderId = x.ProviderId,
        //                         ZipCode = x.ZipCode,
        //                         Education = GetEducationTitles(x.ProviderId),
        //                         Experience = GetExperienceTotal(x.ProviderId),
        //                         Specialties = GetSpecialtyTitles(x.ProviderId),
        //                         Practice = GetPracticeTitles(x.ProviderId),
        //                         Address = GetPracticeAddress(x.ProviderId),
        //                         Fee = GetFee(x.ProviderId),
        //                         Currency = GetCurrency(x.ProviderId),
        //                         Days = GetDays(x.ProviderId),
        //                         Timings = GetTimings(x.ProviderId)
        //                     }).ToList();
        //    return data;
        //}
        //public List<JunkCar.DataModel.Models.Provider> GetProviderByLab(long city, string lab)
        //{
        //    var data = (from pro in _context.Providers
        //                     join proPra in _context.ProviderPractices on pro.ProviderId equals proPra.ProviderId
        //                     join pra in _context.Practices on proPra.PracticeId equals pra.PracticeId
        //                     where pra.Name.Contains(lab) && pra.CityId == city && pra.PracticeTypeId == 3
        //                     select pro).AsEnumerable().Select(x => new JunkCar.DataModel.Models.Provider
        //                     {
        //                         FirstName = x.FirstName,
        //                         LastName = x.LastName,
        //                         GenderId = x.GenderId,
        //                         BloodGroup = (x.BloodGroup != null) ? x.BloodGroup : string.Empty,
        //                         TimeZone = (x.TimeZone != null) ? x.TimeZone : string.Empty,
        //                         MobileNumber = (x.MobileNumber != null) ? x.MobileNumber : string.Empty,
        //                         ExtraMobileNumber = (x.ExtraMobileNumber != null) ? x.ExtraMobileNumber : string.Empty,
        //                         StreetAddress = (x.StreetAddress != null) ? x.StreetAddress : string.Empty,
        //                         ProviderId = x.ProviderId,
        //                         ZipCode = x.ZipCode,
        //                         Education = GetEducationTitles(x.ProviderId),
        //                         Experience = GetExperienceTotal(x.ProviderId),
        //                         Specialties = GetSpecialtyTitles(x.ProviderId),
        //                         Practice = GetPracticeTitles(x.ProviderId),
        //                         Address = GetPracticeAddress(x.ProviderId),
        //                         Fee = GetFee(x.ProviderId),
        //                         Currency = GetCurrency(x.ProviderId),
        //                         Days = GetDays(x.ProviderId),
        //                         Timings = GetTimings(x.ProviderId)
        //                     }).ToList();
        //    return data;
        //}
        //public List<JunkCar.DataModel.Models.Provider> GetProviderByLabLocality(long city, string lab, string locality)
        //{
        //    var data = (from pro in _context.Providers
        //                     join proPra in _context.ProviderPractices on pro.ProviderId equals proPra.ProviderId
        //                     join pra in _context.Practices on proPra.PracticeId equals pra.PracticeId
        //                     join loc in _context.Localities on pra.LocalityId equals loc.LocalityId
        //                     where pra.Name.Contains(lab) && pra.CityId == city && pra.PracticeTypeId == 3 && loc.Name == locality
        //                     select pro).AsEnumerable().Select(x => new JunkCar.DataModel.Models.Provider
        //                     {
        //                         FirstName = x.FirstName,
        //                         LastName = x.LastName,
        //                         GenderId = x.GenderId,
        //                         BloodGroup = (x.BloodGroup != null) ? x.BloodGroup : string.Empty,
        //                         TimeZone = (x.TimeZone != null) ? x.TimeZone : string.Empty,
        //                         MobileNumber = (x.MobileNumber != null) ? x.MobileNumber : string.Empty,
        //                         ExtraMobileNumber = (x.ExtraMobileNumber != null) ? x.ExtraMobileNumber : string.Empty,
        //                         StreetAddress = (x.StreetAddress != null) ? x.StreetAddress : string.Empty,
        //                         ProviderId = x.ProviderId,
        //                         ZipCode = x.ZipCode,
        //                         Education = GetEducationTitles(x.ProviderId),
        //                         Experience = GetExperienceTotal(x.ProviderId),
        //                         Specialties = GetSpecialtyTitles(x.ProviderId),
        //                         Practice = GetPracticeTitles(x.ProviderId),
        //                         Address = GetPracticeAddress(x.ProviderId),
        //                         Fee = GetFee(x.ProviderId),
        //                         Currency = GetCurrency(x.ProviderId),
        //                         Days = GetDays(x.ProviderId),
        //                         Timings = GetTimings(x.ProviderId)
        //                     }).ToList();
        //    return data;
        //}
        //public List<JunkCar.DataModel.Models.Provider> GetProviderByPharmacist(long city, string pharmacist)
        //{
        //    string[] name = pharmacist.Split(' ');
        //    string fName = name[0];
        //    string lName = name[name.Length - 1];
        //    var data = (from pro in _context.Providers
        //                    join proPra in _context.ProviderPractices on pro.ProviderId equals proPra.ProviderId
        //                    join pra in _context.Practices on proPra.PracticeId equals pra.PracticeId
        //                    where (pro.FirstName.Contains(fName) || pro.LastName.Contains(lName)) && pra.CityId == city && pro.ProviderTypeId == 3 
        //                    select pro).AsEnumerable().Select(x => new JunkCar.DataModel.Models.Provider
        //                    {
        //                        FirstName = x.FirstName,
        //                        LastName = x.LastName,
        //                        GenderId = x.GenderId,
        //                        BloodGroup = (x.BloodGroup != null) ? x.BloodGroup : string.Empty,
        //                        TimeZone = (x.TimeZone != null) ? x.TimeZone : string.Empty,
        //                        MobileNumber = (x.MobileNumber != null) ? x.MobileNumber : string.Empty,
        //                        ExtraMobileNumber = (x.ExtraMobileNumber != null) ? x.ExtraMobileNumber : string.Empty,
        //                        StreetAddress = (x.StreetAddress != null) ? x.StreetAddress : string.Empty,
        //                        ProviderId = x.ProviderId,
        //                        ZipCode = x.ZipCode,
        //                        Education = GetEducationTitles(x.ProviderId),
        //                        Experience = GetExperienceTotal(x.ProviderId),
        //                        Specialties = GetSpecialtyTitles(x.ProviderId),
        //                        Practice = GetPracticeTitles(x.ProviderId),
        //                        Address = GetPracticeAddress(x.ProviderId),
        //                        Fee = GetFee(x.ProviderId),
        //                        Currency = GetCurrency(x.ProviderId),
        //                        Days = GetDays(x.ProviderId),
        //                        Timings = GetTimings(x.ProviderId)
        //                    }).ToList();
        //    return data;
        //}
        //public List<JunkCar.DataModel.Models.Provider> GetProviderByPharmacistLocality(long city, string pharmacist, string locality)
        //{
        //    string[] name = pharmacist.Split(' ');
        //    string fName = name[0];
        //    string lName = name[name.Length - 1];
        //    var data = (from pro in _context.Providers
        //                    join proPra in _context.ProviderPractices on pro.ProviderId equals proPra.ProviderId
        //                    join pra in _context.Practices on proPra.PracticeId equals pra.PracticeId
        //                    join loc in _context.Localities on pra.LocalityId equals loc.LocalityId
        //                    where (pro.FirstName.Contains(fName) || pro.LastName.Contains(lName)) && pra.CityId == city && pro.ProviderTypeId == 3 && loc.Name == locality
        //                    select pro).AsEnumerable().Select(x => new JunkCar.DataModel.Models.Provider
        //                    {
        //                        FirstName = x.FirstName,
        //                        LastName = x.LastName,
        //                        GenderId = x.GenderId,
        //                        BloodGroup = (x.BloodGroup != null) ? x.BloodGroup : string.Empty,
        //                        TimeZone = (x.TimeZone != null) ? x.TimeZone : string.Empty,
        //                        MobileNumber = (x.MobileNumber != null) ? x.MobileNumber : string.Empty,
        //                        ExtraMobileNumber = (x.ExtraMobileNumber != null) ? x.ExtraMobileNumber : string.Empty,
        //                        StreetAddress = (x.StreetAddress != null) ? x.StreetAddress : string.Empty,
        //                        ProviderId = x.ProviderId,
        //                        ZipCode = x.ZipCode,
        //                        Education = GetEducationTitles(x.ProviderId),
        //                        Experience = GetExperienceTotal(x.ProviderId),
        //                        Specialties = GetSpecialtyTitles(x.ProviderId),
        //                        Practice = GetPracticeTitles(x.ProviderId),
        //                        Address = GetPracticeAddress(x.ProviderId),
        //                        Fee = GetFee(x.ProviderId),
        //                        Currency = GetCurrency(x.ProviderId),
        //                        Days = GetDays(x.ProviderId),
        //                        Timings = GetTimings(x.ProviderId)
        //                    }).ToList();
        //    return data;
        //}
        //public List<JunkCar.DataModel.Models.Provider> GetProviderByNurse(long city, string nurse)
        //{
        //    string[] name = nurse.Split(' ');
        //    string fName = name[0];
        //    string lName = name[name.Length - 1];
        //    var data = (from pro in _context.Providers
        //                    join proPra in _context.ProviderPractices on pro.ProviderId equals proPra.ProviderId
        //                    join pra in _context.Practices on proPra.PracticeId equals pra.PracticeId
        //                    where (pro.FirstName.Contains(fName) || pro.LastName.Contains(lName)) && pra.CityId == city && pro.ProviderTypeId == 2
        //                    select pro).AsEnumerable().Select(x => new JunkCar.DataModel.Models.Provider
        //                    {
        //                        FirstName = x.FirstName,
        //                        LastName = x.LastName,
        //                        GenderId = x.GenderId,
        //                        BloodGroup = (x.BloodGroup != null) ? x.BloodGroup : string.Empty,
        //                        TimeZone = (x.TimeZone != null) ? x.TimeZone : string.Empty,
        //                        MobileNumber = (x.MobileNumber != null) ? x.MobileNumber : string.Empty,
        //                        ExtraMobileNumber = (x.ExtraMobileNumber != null) ? x.ExtraMobileNumber : string.Empty,
        //                        StreetAddress = (x.StreetAddress != null) ? x.StreetAddress : string.Empty,
        //                        ProviderId = x.ProviderId,
        //                        ZipCode = x.ZipCode,
        //                        Education = GetEducationTitles(x.ProviderId),
        //                        Experience = GetExperienceTotal(x.ProviderId),
        //                        Specialties = GetSpecialtyTitles(x.ProviderId),
        //                        Practice = GetPracticeTitles(x.ProviderId),
        //                        Address = GetPracticeAddress(x.ProviderId),
        //                        Fee = GetFee(x.ProviderId),
        //                        Currency = GetCurrency(x.ProviderId),
        //                        Days = GetDays(x.ProviderId),
        //                        Timings = GetTimings(x.ProviderId)
        //                    }).ToList();
        //    return data;
        //}
        //public List<JunkCar.DataModel.Models.Provider> GetProviderByNurseLocality(long city, string nurse, string locality)
        //{
        //    string[] name = nurse.Split(' ');
        //    string fName = name[0];
        //    string lName = name[name.Length - 1];
        //    var data = (from pro in _context.Providers
        //                    join proPra in _context.ProviderPractices on pro.ProviderId equals proPra.ProviderId
        //                    join pra in _context.Practices on proPra.PracticeId equals pra.PracticeId
        //                    join loc in _context.Localities on pra.LocalityId equals loc.LocalityId
        //                    where (pro.FirstName.Contains(fName) || pro.LastName.Contains(lName)) && pra.CityId == city && pro.ProviderTypeId == 2 && loc.Name == locality
        //                    select pro).AsEnumerable().Select(x => new JunkCar.DataModel.Models.Provider
        //                    {
        //                        FirstName = x.FirstName,
        //                        LastName = x.LastName,
        //                        GenderId = x.GenderId,
        //                        BloodGroup = (x.BloodGroup != null) ? x.BloodGroup : string.Empty,
        //                        TimeZone = (x.TimeZone != null) ? x.TimeZone : string.Empty,
        //                        MobileNumber = (x.MobileNumber != null) ? x.MobileNumber : string.Empty,
        //                        ExtraMobileNumber = (x.ExtraMobileNumber != null) ? x.ExtraMobileNumber : string.Empty,
        //                        StreetAddress = (x.StreetAddress != null) ? x.StreetAddress : string.Empty,
        //                        ProviderId = x.ProviderId,
        //                        ZipCode = x.ZipCode,
        //                        Education = GetEducationTitles(x.ProviderId),
        //                        Experience = GetExperienceTotal(x.ProviderId),
        //                        Specialties = GetSpecialtyTitles(x.ProviderId),
        //                        Practice = GetPracticeTitles(x.ProviderId),
        //                        Address = GetPracticeAddress(x.ProviderId),
        //                        Fee = GetFee(x.ProviderId),
        //                        Currency = GetCurrency(x.ProviderId),
        //                        Days = GetDays(x.ProviderId),
        //                        Timings = GetTimings(x.ProviderId)
        //                    }).ToList();
        //    return data;
        //}
        //public List<JunkCar.DataModel.Models.Provider> GetProviderByTreatment(long city, string treatment)
        //{
        //    var data = (from pro in _context.Providers
        //                    join proTre in _context.ProviderTreatments on pro.ProviderId equals proTre.ProviderId
        //                    join tre in _context.Treatments on proTre.TreatmentId equals tre.TreatmentId
        //                    where tre.Name.Contains(treatment)
        //                    select pro).AsEnumerable().Select(x => new JunkCar.DataModel.Models.Provider
        //                    {
        //                        FirstName = x.FirstName,
        //                        LastName = x.LastName,
        //                        GenderId = x.GenderId,
        //                        BloodGroup = (x.BloodGroup != null) ? x.BloodGroup : string.Empty,
        //                        TimeZone = (x.TimeZone != null) ? x.TimeZone : string.Empty,
        //                        MobileNumber = (x.MobileNumber != null) ? x.MobileNumber : string.Empty,
        //                        ExtraMobileNumber = (x.ExtraMobileNumber != null) ? x.ExtraMobileNumber : string.Empty,
        //                        StreetAddress = (x.StreetAddress != null) ? x.StreetAddress : string.Empty,
        //                        ProviderId = x.ProviderId,
        //                        ZipCode = x.ZipCode,
        //                        Education = GetEducationTitles(x.ProviderId),
        //                        Experience = GetExperienceTotal(x.ProviderId),
        //                        Specialties = GetSpecialtyTitles(x.ProviderId),
        //                        Practice = GetPracticeTitles(x.ProviderId),
        //                        Address = GetPracticeAddress(x.ProviderId),
        //                        Fee = GetFee(x.ProviderId),
        //                        Currency = GetCurrency(x.ProviderId),
        //                        Days = GetDays(x.ProviderId),
        //                        Timings = GetTimings(x.ProviderId)
        //                    }).ToList();
        //    return data;            
        //}
        //public List<JunkCar.DataModel.Models.Provider> GetProviderByTreatmentLocality(long city, string treatment, string locality)
        //{
        //    var data = (from pro in _context.Providers
        //                    join proTre in _context.ProviderTreatments on pro.ProviderId equals proTre.ProviderId
        //                    join tre in _context.Treatments on proTre.TreatmentId equals tre.TreatmentId
        //                    join proPra in _context.ProviderPractices on pro.ProviderId equals proPra.ProviderId
        //                    join pra in _context.Practices on proPra.PracticeId equals pra.PracticeId
        //                    join loc in _context.Localities on pra.LocalityId equals loc.LocalityId
        //                    where tre.Name.Contains(treatment) && loc.Name == locality
        //                    select pro).AsEnumerable().Select(x => new JunkCar.DataModel.Models.Provider
        //                    {
        //                        FirstName = x.FirstName,
        //                        LastName = x.LastName,
        //                        GenderId = x.GenderId,
        //                        BloodGroup = (x.BloodGroup != null) ? x.BloodGroup : string.Empty,
        //                        TimeZone = (x.TimeZone != null) ? x.TimeZone : string.Empty,
        //                        MobileNumber = (x.MobileNumber != null) ? x.MobileNumber : string.Empty,
        //                        ExtraMobileNumber = (x.ExtraMobileNumber != null) ? x.ExtraMobileNumber : string.Empty,
        //                        StreetAddress = (x.StreetAddress != null) ? x.StreetAddress : string.Empty,
        //                        ProviderId = x.ProviderId,
        //                        ZipCode = x.ZipCode,
        //                        Education = GetEducationTitles(x.ProviderId),
        //                        Experience = GetExperienceTotal(x.ProviderId),
        //                        Specialties = GetSpecialtyTitles(x.ProviderId),
        //                        Practice = GetPracticeTitles(x.ProviderId),
        //                        Address = GetPracticeAddress(x.ProviderId),
        //                        Fee = GetFee(x.ProviderId),
        //                        Currency = GetCurrency(x.ProviderId),
        //                        Days = GetDays(x.ProviderId),
        //                        Timings = GetTimings(x.ProviderId)
        //                    }).ToList();
        //    return data;            
        //}
        //public List<JunkCar.DataModel.Models.Provider> GetAllDoctors()
        //{
        //    var data = (from pro in _context.Providers                            
        //                    where pro.ProviderTypeId == 1
        //                    select new JunkCar.DataModel.Models.Provider 
        //                    {
        //                        FirstName = pro.FirstName,
        //                        LastName = pro.LastName,                                
        //                        MobileNumber = pro.MobileNumber,                                
        //                        StreetAddress = pro.StreetAddress,
        //                        ProviderId = pro.ProviderId,
                                                          
        //                    }).ToList();
        //    return data;
        //}
        //public List<JunkCar.DataModel.Models.Provider> GetAllPharmacists()
        //{
        //    var data = (from pro in _context.Providers
        //                    where pro.ProviderTypeId == 3
        //                    select new JunkCar.DataModel.Models.Provider
        //                    {
        //                        FirstName = pro.FirstName,
        //                        LastName = pro.LastName,
        //                        MobileNumber = pro.MobileNumber,
        //                        StreetAddress = pro.StreetAddress,
        //                        ProviderId = pro.ProviderId,

        //                    }).ToList();
        //    return data;
        //}
        //public List<JunkCar.DataModel.Models.Provider> GetAllNurses()
        //{
        //    var data = (from pro in _context.Providers
        //                    where pro.ProviderTypeId == 2
        //                    select new JunkCar.DataModel.Models.Provider
        //                    {
        //                        FirstName = pro.FirstName,
        //                        LastName = pro.LastName,
        //                        MobileNumber = pro.MobileNumber,
        //                        StreetAddress = pro.StreetAddress,
        //                        ProviderId = pro.ProviderId,

        //                    }).ToList();
        //    return data;
        //}
        //public JunkCar.DataModel.Models.Provider GetDoctorDetailsById(string userId, long providerId)
        //{
        //    var data = (from pro in _context.Providers                            
        //                    where pro.ProviderId == providerId
        //                    select pro).AsEnumerable().Select(x => new JunkCar.DataModel.Models.Provider
        //                    {
        //                        FirstName = (x.FirstName != null) ? x.FirstName : string.Empty,
        //                        LastName = (x.LastName != null) ? x.LastName : string.Empty,
        //                        GenderId = (x.GenderId != 0) ? x.GenderId : 0,
        //                        RegistrationDetails = (x.RegistrationDetails != null) ? x.RegistrationDetails : string.Empty,
        //                        RegistrationYear = (x.RegistrationYear != 0) ? x.RegistrationYear : 0,
        //                        RegistrationCouncilId = (x.RegistrationCouncilId != 0) ? x.RegistrationCouncilId : 0,
        //                        TotalExperienceYears = (x.TotalExperienceYears != 0) ? x.TotalExperienceYears : 0,
        //                        TagLine = (x.TagLine != null) ? x.TagLine : string.Empty,
        //                        Description = (x.Description != null) ? x.Description : string.Empty
        //                    }).FirstOrDefault();
        //    if (data == null)
        //    { throw new Exception("Provider not found"); }
        //    return data;           
        //}
        //public JunkCar.DataModel.Models.ProviderContact GetDoctorContactsById(long providerId)
        //{
        //    var data = (from proCon in _context.ProviderContacts
        //                    where proCon.ProviderId == providerId
        //                            select proCon).AsEnumerable().Select(x => new JunkCar.DataModel.Models.ProviderContact
        //                    {
        //                        PrimaryPhone = (x.PrimaryPhone != null) ? x.PrimaryPhone : string.Empty,
        //                        SecondaryPhone = (x.SecondaryPhone != null) ? x.SecondaryPhone : string.Empty,
        //                        PrimaryEmail = (x.PrimaryEmail != null) ? x.PrimaryEmail : string.Empty,
        //                        SecondaryEmail = (x.SecondaryEmail != null) ? x.SecondaryEmail : string.Empty,
        //                        WebsiteAddress = (x.WebsiteAddress != null) ? x.WebsiteAddress : string.Empty,                               
        //                    }).FirstOrDefault();
        //    if (data == null)
        //    { throw new Exception("Provider not found"); }
        //    return data;           
        //}
        //public List<JunkCar.DataModel.Models.ProviderAvailability> GetDoctorTimingsById(long providerId)
        //{
        //    var data = (from proAva in _context.ProviderAvailabilities
        //                                where proAva.ProviderId == providerId
        //                                select proAva).AsEnumerable().Select(x => new JunkCar.DataModel.Models.ProviderAvailability
        //                    {
        //                        ProviderAvailabilityId = x.ProviderAvalibilityId,
        //                        ProviderId = x.ProviderId,
        //                        DayoftheWeek = (x.DayoftheWeek != null) ? x.DayoftheWeek : string.Empty,
        //                        StartTime1 = (x.StartTime1 != null) ? x.StartTime1 : DateTime.Now,
        //                        EndTime1 = (x.EndTime1 != null) ? x.EndTime1 : DateTime.Now,
        //                        StartTime2 = (x.StartTime2 != null) ? x.StartTime2 : DateTime.Now,
        //                        EndTime2 = (x.EndTime2 != null) ? x.EndTime2 : DateTime.Now                               
        //                    }).ToList();
        //    if (data == null || data.Count() <= 0)
        //    { throw new Exception("Provider not found"); }
        //    return data;           
        //}
        //public JunkCar.DataModel.Models.ProviderFee GetDoctorFeeById(long providerId)
        //{
        //    var data = (from proFee in _context.ProviderFees
        //                        where proFee.ProviderId == providerId
        //                        select proFee).AsEnumerable().Select(x => new JunkCar.DataModel.Models.ProviderFee
        //                    {
        //                        Duration = (x.Duration != 0) ? x.Duration : 0,
        //                        Fee = (x.Fee != 0) ? x.Fee : 0,                                                    
        //                    }).FirstOrDefault();
        //    if (data == null)
        //    { throw new Exception("Provider not found"); }
        //    return data;           
        //}
        //public List<JunkCar.DataModel.Models.Specialty> GetAddedSpecializations(string userId, long providerId)
        //{
        //    var data = (from spe in _context.Specialties
        //                       join proSpe in _context.ProviderSpecialties on spe.SpecialtyId equals proSpe.SpecialtyId
        //                       where proSpe.ProviderId == providerId
        //                    select new JunkCar.DataModel.Models.Specialty
        //                    {
        //                        SpecialtyId = spe.SpecialtyId,
        //                        Title = spe.Title,
        //                        Description = spe.Description
        //                    }).ToList();
        //    return data;
        //}
        //public List<JunkCar.DataModel.Models.Language> GetAddedLanguages(string userId, long providerId)
        //{
        //    var data = (from lan in _context.Languages
        //                     join proLan in _context.ProviderLanguages on lan.LanguageId equals proLan.LanguageId
        //                     where proLan.ProviderId == providerId
        //                       select new JunkCar.DataModel.Models.Language
        //                       {
        //                           LanguageId = lan.LanguageId,
        //                           Name = lan.Name,
        //                           Description = lan.Description
        //                       }).ToList();
        //    return data;
        //}
        //public List<JunkCar.DataModel.Models.Premises> GetAddedPremises(string userId, long providerId)
        //{
        //    var data = (from pre in _context.Premises
        //                join proPre in _context.ProviderPremises on pre.PremisesId equals proPre.PremisesId
        //                where proPre.ProviderId == providerId
        //                     select new JunkCar.DataModel.Models.Premises
        //                     {
        //                         PremisesId = pre.PremisesId,
        //                         Name = pre.Name,
        //                         Description = pre.Description
        //                     }).ToList();
        //    return data;
        //}
        //public List<JunkCar.DataModel.Models.Accreditation> GetAddedAccreditations(string userId, long providerId)
        //{
        //    var data = (from acc in _context.Accreditations
        //                         join proAcc in _context.ProviderAccreditations on acc.AccreditationId equals proAcc.AccreditationId
        //                         where proAcc.ProviderId == providerId
        //                     select new JunkCar.DataModel.Models.Accreditation
        //                     {
        //                        AccreditationId = acc.AccreditationId,
        //                        Title = acc.Title,
        //                        Description = acc.Description
        //                     }).ToList();
        //    return data;
        //}
        //public List<JunkCar.DataModel.Models.Insurance> GetAddedInsurances(string userId, long providerId)
        //{
        //    var data = (from ins in _context.Insurances
        //                     join proIns in _context.ProviderInsurances on ins.InsuranceId equals proIns.InsuranceId
        //                     where proIns.ProviderId == providerId
        //                         select new JunkCar.DataModel.Models.Insurance
        //                         {
        //                             InsuranceId = ins.InsuranceId,
        //                             Title = ins.Title,
        //                             Description = ins.Description
        //                         }).ToList();
        //    return data;
        //}
        //public List<JunkCar.DataModel.Models.Service> GetAddedServices(string userId, long providerId)
        //{
        //    var data = (from ser in _context.Services
        //                      join proSer in _context.ProviderServices on ser.ServiceId equals proSer.ServiceId
        //                      where proSer.ProviderId == providerId
        //                     select new JunkCar.DataModel.Models.Service
        //                     {
        //                         ServiceId = ser.ServiceId,
        //                         Title = ser.Title,
        //                         Description = ser.Description
        //                     }).ToList();
        //    return data;
        //}
        //public List<JunkCar.DataModel.Models.Service> GetAddedTravelServices(string userId, long providerId)
        //{
        //    var serviceadd = (from ser in _context.Services
        //                      join proser in _context.ProviderServices on ser.ServiceId equals proser.ServiceId
        //                      where proser.ProviderId == providerId && ser.ServiceTypeId == 2
        //                      select new JunkCar.DataModel.Models.Service
        //                      {
        //                          ServiceId = ser.ServiceId,
        //                          Title = ser.Title,
        //                          Description = ser.Description
        //                      }).ToList();
        //    return serviceadd;
        //}
        //public List<JunkCar.DataModel.Models.Treatment> GetAddedTreatments(string userId, long providerId)
        //{
        //    var data = (from tre in _context.Treatments
        //                      join proTre in _context.ProviderTreatments on tre.TreatmentId equals proTre.TreatmentId
        //                      where proTre.ProviderId == providerId
        //                     select new JunkCar.DataModel.Models.Treatment
        //                     {                                 
        //                         TreatmentId = tre.TreatmentId,
        //                         Name = (tre.Name != null)? tre.Name : string.Empty,
        //                         Notes = (tre.Notes != null)? tre.Notes : string.Empty,
        //                         Cost = (tre.Cost != 0 || tre.Cost != null)? tre.Cost : 0,
        //                         Tax = (tre.Tax != 0 || tre.Tax != null)? tre.Tax : 0,
        //                         ParentId = (tre.ParentId != 0 || tre.ParentId != null)? tre.ParentId : 0, 
        //                         ShowOnClinicPage = tre.ShowOnClinicPage
        //                     }).ToList();
        //    return data;
        //}
        //public List<JunkCar.DataModel.Models.Provider> GetAllDoctorsByProviderPractice()
        //{
        //    var data = (from pro in _context.Providers
        //                    join proTyp in _context.ProviderTypes on pro.ProviderTypeId equals proTyp.ProviderTypeId
        //                    join usr in _context.Users on pro.UserId equals usr.UserId
        //                    where pro.ProviderTypeId == 1
        //                    select new JunkCar.DataModel.Models.Provider
        //                    {
        //                        ProviderId = pro.ProviderId,
        //                        FirstName = pro.FirstName,
        //                        LastName = pro.LastName,
        //                        RoleName = proTyp.Name,
        //                        IsActive = usr.Enable,
        //                        Email = pro.Email,
        //                        MobileNumber = pro.MobileNumber,
        //                        LastLoginDate = usr.LastLoginDate                              
        //                    }).ToList();
        //    return data;
        //}
        //public List<JunkCar.DataModel.Models.Provider> GetAllStaffByProviderPractice()
        //{
        //    var data = (from pro in _context.Providers
        //                    join proTyp in _context.ProviderTypes on pro.ProviderTypeId equals proTyp.ProviderTypeId
        //                    join usr in _context.Users on pro.UserId equals usr.UserId
        //                    where pro.ProviderTypeId != 1
        //                    select new JunkCar.DataModel.Models.Provider
        //                    {
        //                        ProviderId = pro.ProviderId,
        //                        FirstName = pro.FirstName,
        //                        LastName = pro.LastName,
        //                        RoleName = proTyp.Name,
        //                        IsActive = usr.Enable,
        //                        Email = pro.Email,
        //                        MobileNumber = pro.MobileNumber,
        //                        LastLoginDate = usr.LastLoginDate
        //                    }).ToList();
        //    return data;
        //}
        //public void Delete(long providerId)
        //{
        //    var data = (from pro in _context.Providers
        //                where pro.ProviderId == providerId
        //                select pro).FirstOrDefault();
        //    if (data != null)
        //    {
        //        DeleteProviderFromAccreditation(providerId);
        //        DeleteProviderFromAffiliation(providerId);
        //        DeleteProviderFromAvailability(providerId);
        //        DeleteProviderFromAward(providerId);
        //        DeleteProviderFromContact(providerId);
        //        DeleteProviderFromEducation(providerId);
        //        DeleteProviderFromExperience(providerId);
        //        DeleteProviderFromFee(providerId);
        //        DeleteProviderFromInsurance(providerId);
        //        DeleteProviderFromLanguage(providerId);
        //        DeleteProviderFromPhoto(providerId);
        //        DeleteProviderFromPractice(providerId);
        //        DeleteProviderFromPremises(providerId);
        //        DeleteProviderFromReview(providerId);
        //        DeleteProviderFromService(providerId);
        //        DeleteProviderFromSpecialty(providerId);
        //        DeleteProviderFromTreatment(providerId);
        //        DeleteProviderFromVideo(providerId);

        //        _context.Providers.Remove(data);
        //    }
        //}
        //private void DeleteProviderFromAccreditation(long providerId)
        //{
        //    var data = (from proAcc in _context.ProviderAccreditations
        //                where proAcc.ProviderId == providerId
        //                select proAcc).ToList();
        //    if (data != null)
        //    {
        //        foreach (ProviderAccreditation item in data)
        //        {
        //            _context.ProviderAccreditations.Remove(item);
        //        }
        //    }
        //}
        //private void DeleteProviderFromAffiliation(long providerId)
        //{
        //    var data = (from proAff in _context.ProviderAffiliations
        //                where proAff.ProviderId == providerId
        //                select proAff).ToList();
        //    if (data != null)
        //    {
        //        foreach (ProviderAffiliation item in data)
        //        {
        //            _context.ProviderAffiliations.Remove(item);
        //        }
        //    }
        //}
        //private void DeleteProviderFromAvailability(long providerId)
        //{
        //    var data = (from proAva in _context.ProviderAvailabilities
        //                where proAva.ProviderId == providerId
        //                select proAva).ToList();
        //    if (data != null)
        //    {
        //        foreach(ProviderAvailability item in data)
        //        {
        //            _context.ProviderAvailabilities.Remove(item);
        //        }
        //    }
        //}
        //private void DeleteProviderFromAward(long providerId)
        //{
        //    var data = (from proAwa in _context.ProviderAwards
        //                where proAwa.ProviderId == providerId
        //                select proAwa).ToList();
        //    if (data != null)
        //    {
        //        foreach(ProviderAward item in data)
        //        {
        //            _context.ProviderAwards.Remove(item);
        //        }
        //    }
        //}
        //private void DeleteProviderFromContact(long providerId)
        //{
        //    var data = (from proCon in _context.ProviderContacts
        //                where proCon.ProviderId == providerId
        //                select proCon).FirstOrDefault();
        //    if (data != null)
        //    { _context.ProviderContacts.Remove(data); }
        //}
        //private void DeleteProviderFromEducation(long providerId)
        //{
        //    var data = (from proEdu in _context.ProviderEducations
        //                where proEdu.ProviderId == providerId
        //                select proEdu).ToList();
        //    if (data != null)
        //    {
        //        foreach (ProviderEducation item in data)
        //        {
        //            _context.ProviderEducations.Remove(item);
        //        }
        //    }
        //}
        //private void DeleteProviderFromExperience(long providerId)
        //{
        //    var data = (from proExp in _context.ProviderExperiences
        //                where proExp.ProviderId == providerId
        //                select proExp).ToList();
        //    if (data != null)
        //    {
        //        foreach (ProviderExperience item in data)
        //        {
        //            _context.ProviderExperiences.Remove(item);
        //        }
        //    }
        //}
        //private void DeleteProviderFromFee(long providerId)
        //{
        //    var data = (from proFee in _context.ProviderFees
        //                where proFee.ProviderId == providerId
        //                select proFee).FirstOrDefault();
        //    if (data != null)
        //    { _context.ProviderFees.Remove(data); }
        //}
        //private void DeleteProviderFromInsurance(long providerId)
        //{
        //    var data = (from proIns in _context.ProviderInsurances
        //                where proIns.ProviderId == providerId
        //                select proIns).ToList();
        //    if (data != null)
        //    {
        //        foreach (ProviderInsurance item in data)
        //        {
        //            _context.ProviderInsurances.Remove(item);
        //        }
        //    }
        //}        
        //private void DeleteProviderFromLanguage(long providerId)
        //{
        //    var data = (from proLan in _context.ProviderLanguages
        //                where proLan.ProviderId == providerId
        //                select proLan).ToList();
        //    if (data != null)
        //    {
        //        foreach (ProviderLanguage item in data)
        //        {
        //            _context.ProviderLanguages.Remove(item);
        //        }
        //    }
        //}
        //private void DeleteProviderFromPhoto(long providerId)
        //{
        //    var data = (from proPho in _context.ProviderPhotoes
        //                where proPho.ProviderId == providerId
        //                select proPho).ToList();
        //    if (data != null)
        //    {
        //        foreach (ProviderPhoto item in data)
        //        {
        //            _context.ProviderPhotoes.Remove(item);
        //        }
        //    }
        //}
        //private void DeleteProviderFromPractice(long providerId)
        //{
        //    var data = (from proPra in _context.ProviderPractices
        //                where proPra.ProviderId == providerId
        //                select proPra).ToList();
        //    if (data != null)
        //    {
        //        foreach (ProviderPractice item in data)
        //        {
        //            _context.ProviderPractices.Remove(item);
        //        }
        //    }
        //}
        //private void DeleteProviderFromPremises(long providerId)
        //{
        //    var data = (from proPre in _context.ProviderPremises
        //                where proPre.ProviderId == providerId
        //                select proPre).ToList();
        //    if (data != null)
        //    {
        //        foreach (ProviderPremis item in data)
        //        {
        //            _context.ProviderPremises.Remove(item);
        //        }
        //    }
        //}
        //private void DeleteProviderFromReview(long providerId)
        //{
        //    var data = (from proRev in _context.ProviderReviews
        //                where proRev.ProviderId == providerId
        //                select proRev).FirstOrDefault();
        //    if (data != null)
        //    {
        //        _context.ProviderReviews.Remove(data);
        //    }
        //}        
        //private void DeleteProviderFromService(long providerId)
        //{
        //    var data = (from proSer in _context.ProviderServices
        //                where proSer.ProviderId == providerId
        //                select proSer).ToList();
        //    if (data != null)
        //    {
        //        foreach (ProviderService item in data)
        //        {
        //            _context.ProviderServices.Remove(item);
        //        }
        //    }
        //}            
        //private void DeleteProviderFromSpecialty(long providerId)
        //{
        //    var data = (from proSpe in _context.ProviderSpecialties
        //                where proSpe.ProviderId == providerId
        //                select proSpe).ToList();
        //    if (data != null)
        //    {
        //        foreach (ProviderSpecialty item in data)
        //        {
        //            _context.ProviderSpecialties.Remove(item);
        //        }
        //    }
        //}        
        //private void DeleteProviderFromTreatment(long providerId)
        //{
        //    var data = (from proTre in _context.ProviderTreatments
        //                where proTre.ProviderId == providerId
        //                select proTre).ToList();
        //    if (data != null)
        //    {
        //        foreach (ProviderTreatment item in data)
        //        {
        //            _context.ProviderTreatments.Remove(item);
        //        }
        //    }
        //}
        //private void DeleteProviderFromVideo(long providerId)
        //{
        //    var data = (from proVid in _context.ProviderVideos
        //                where proVid.ProviderId == providerId
        //                select proVid).ToList();
        //    if (data != null)
        //    {
        //        foreach (ProviderVideo item in data)
        //        {
        //            _context.ProviderVideos.Remove(item);
        //        }
        //    }
        //}      
    }
}
