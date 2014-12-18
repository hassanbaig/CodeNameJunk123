using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using System.Threading.Tasks;
using System.Web.Script.Serialization;

namespace JunkCar.Core.Common
{
    public class UserData
    {
        public string UserId { get; set; }
            public string ProviderId { get; set; }
            public string PatientId { get; set; }
            public bool IsConsignmentCloud { get; set; }

            public UserData()
            {
            }

            public UserData(string userId, string providerId, string patientId)
            {
                UserId = userId;
                ProviderId = providerId;
                PatientId = patientId;
            }

            public string GetProviderUserData()
            {
                string data = UserId + "," + ProviderId + "," + PatientId;
            return data;
            }

            // Serialize    
            public override string ToString()
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                string result = serializer.Serialize(this);
                return result;
            }

            // Deserialize
            public static UserData FromString(string text)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                return serializer.Deserialize<UserData>(text);
            }
        
    }
}
