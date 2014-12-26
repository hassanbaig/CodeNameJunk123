using System;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.Core.Objects;
using System.Linq;

namespace JunkCar.Data
{
    public partial class shiner49_JunkCarEntities : DbContext
    {
        //public virtual ObjectResult<Set_Make> GetMakes(string parameter_Type, Nullable<int> registration_Year, Nullable<int> make_Id)
        //{
        //    var parameter_TypeParameter = parameter_Type != null ?
        //        new ObjectParameter("Parameter_Type", parameter_Type) :
        //        new ObjectParameter("Parameter_Type", typeof(string));

        //    var registration_YearParameter = registration_Year.HasValue ?
        //        new ObjectParameter("Registration_Year", registration_Year) :
        //        new ObjectParameter("Registration_Year", typeof(int));

        //    var make_IdParameter = make_Id.HasValue ?
        //        new ObjectParameter("Make_Id", make_Id) :
        //        new ObjectParameter("Make_Id", typeof(int));

        //    return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Set_Make>("GetMakes", parameter_TypeParameter, registration_YearParameter, make_IdParameter);
        //}

        //public virtual ObjectResult<Set_Make> GetMakes(string parameter_Type, Nullable<int> registration_Year, Nullable<int> make_Id, MergeOption mergeOption)
        //{
        //    var parameter_TypeParameter = parameter_Type != null ?
        //        new ObjectParameter("Parameter_Type", parameter_Type) :
        //        new ObjectParameter("Parameter_Type", typeof(string));

        //    var registration_YearParameter = registration_Year.HasValue ?
        //        new ObjectParameter("Registration_Year", registration_Year) :
        //        new ObjectParameter("Registration_Year", typeof(int));

        //    var make_IdParameter = make_Id.HasValue ?
        //        new ObjectParameter("Make_Id", make_Id) :
        //        new ObjectParameter("Make_Id", typeof(int));

        //    return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Set_Make>("GetMakes", mergeOption, parameter_TypeParameter, registration_YearParameter, make_IdParameter);
        //}

        //public virtual ObjectResult<Set_Model> GetModels(string parameter_Type, Nullable<int> registration_Year, Nullable<int> make_Id)
        //{
        //    var parameter_TypeParameter = parameter_Type != null ?
        //        new ObjectParameter("Parameter_Type", parameter_Type) :
        //        new ObjectParameter("Parameter_Type", typeof(string));

        //    var registration_YearParameter = registration_Year.HasValue ?
        //        new ObjectParameter("Registration_Year", registration_Year) :
        //        new ObjectParameter("Registration_Year", typeof(int));

        //    var make_IdParameter = make_Id.HasValue ?
        //        new ObjectParameter("Make_Id", make_Id) :
        //        new ObjectParameter("Make_Id", typeof(int));

        //    return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Set_Model>("GetModels", parameter_TypeParameter, registration_YearParameter, make_IdParameter);
        //}

        //public virtual ObjectResult<Set_Model> GetModels(string parameter_Type, Nullable<int> registration_Year, Nullable<int> make_Id, MergeOption mergeOption)
        //{
        //    var parameter_TypeParameter = parameter_Type != null ?
        //        new ObjectParameter("Parameter_Type", parameter_Type) :
        //        new ObjectParameter("Parameter_Type", typeof(string));

        //    var registration_YearParameter = registration_Year.HasValue ?
        //        new ObjectParameter("Registration_Year", registration_Year) :
        //        new ObjectParameter("Registration_Year", typeof(int));

        //    var make_IdParameter = make_Id.HasValue ?
        //        new ObjectParameter("Make_Id", make_Id) :
        //        new ObjectParameter("Make_Id", typeof(int));

        //    return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Set_Model>("GetModels", mergeOption, parameter_TypeParameter, registration_YearParameter, make_IdParameter);
        //}
    }
}
