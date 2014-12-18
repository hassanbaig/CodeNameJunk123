using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Collections;

namespace JunkCar.Core.Common
{
    public static class HashHelper
    {
        public static Hashtable ProviderRegistration(string name, int gender, string phone, string email, string password, string clinicName, long majorSpecialty,int country, long city, long area, string clinicAddress)
        {
            Hashtable provider = new Hashtable();
            provider["Name"] = name;
            provider["Gender"] = gender;
            provider["MobileNumber"] = phone;
            provider["Email"] = email;
            provider["Password"] = password;
            provider["ClinicName"] = clinicName;
            provider["SpecialtyId"] = majorSpecialty;
            provider["CountryId"] = country;
            provider["CityId"] = city;
            provider["LocalityId"] = area;
            provider["ClinicAddress"] = clinicAddress;

            return provider;
        }
        public static Hashtable Authenticate(string userId, string password)
        {
            Hashtable authenticate = new Hashtable();
            authenticate["UserId"] = userId;
            authenticate["Password"] = password;

            return authenticate;
        }

        public static Hashtable ChangePassword(string currentPass, string newPass, string userId)
        {
            Hashtable changePassword = new Hashtable();
            changePassword["CurrentPassword"] = currentPass;
            changePassword["NewPassword"] = newPass;
            changePassword["UserId"] = userId;
            return changePassword;
        }
        public static Hashtable ForgotPassword( string newPass, string userId)
        {
            Hashtable forgotPassword = new Hashtable();

            forgotPassword["NewPassword"] = newPass;
            forgotPassword["UserId"] = userId;
            return forgotPassword;
        }
        public static Hashtable EditProfile(string userId, long providerId, string firstName,string lastName, int gender, string dob, string bloodGroup, string timeZone, string mobileNumber, string extraPhoneNumber,
                                                 string streetAddress, int countryId, int stateId, long cityId, long localityId, int zipCode)
        {
            Hashtable editProfile = new Hashtable();
            editProfile["UserId"] = userId;
            editProfile["ProviderId"] = providerId;
            editProfile["FirstName"] = firstName;
            editProfile["LastName"] = lastName;
            editProfile["Gender"] = gender;
            editProfile["DOB"] = dob;
            editProfile["BloodGroup"] = bloodGroup;
            editProfile["TimeZone"] = timeZone;
            editProfile["MobileNumber"] = mobileNumber;
            editProfile["ExtraPhoneNumber"] = extraPhoneNumber;
            editProfile["StreetAddress"] = streetAddress;
            editProfile["CountryId"] = countryId;
            editProfile["StateId"] = stateId;
            editProfile["CityId"] = cityId;
            editProfile["LocalityId"] = localityId;
            editProfile["ZipCode"] = zipCode;
            return editProfile;
        }

        public static Hashtable ProfileDetails(string userId, long providerId)
        {
            Hashtable profileDetails = new Hashtable();
            profileDetails["UserId"] = userId;
            profileDetails["ProviderId"] = providerId;
            return profileDetails;
        }

        public static Hashtable SearchDoctor(long city, string locality, string specialty, string doctor, string hospital, string lab, string pharmacist, string nurse, string treatment, int searchType)
        {
            Hashtable searchDoctor = new Hashtable();
            searchDoctor["City"] = city;            
            searchDoctor["Locality"] = locality;
            searchDoctor["Specialty"] = specialty;
            searchDoctor["Doctor"] = doctor;
            searchDoctor["Hospital"] = hospital;
            searchDoctor["Lab"] = lab;
            searchDoctor["Pharmacist"] = pharmacist;
            searchDoctor["Nurse"] = nurse;
            searchDoctor["Treatment"] = treatment;
            searchDoctor["SearchType"] = searchType;            
            return searchDoctor;
        }

        public static Hashtable SearchPractice(long city, string locality, string hospital, string lab, int searchType)
        {
            Hashtable searchDoctor = new Hashtable();
            searchDoctor["City"] = city;            
            searchDoctor["Locality"] = locality;
            searchDoctor["Hospital"] = hospital;
            searchDoctor["Lab"] = lab;            
            searchDoctor["SearchType"] = searchType;
            return searchDoctor;
        }
        public static Hashtable GetCitiesByCountry(int country, int searchType)
        {
            Hashtable searchDoctor = new Hashtable();
            searchDoctor["Country"] = country;
            searchDoctor["SearchType"] = searchType;
            return searchDoctor;
        }
        public static Hashtable GetLocalitiesByCountryCity(int country, long city, int searchType)
        {
            Hashtable searchDoctor = new Hashtable();
            searchDoctor["City"] = city;
            searchDoctor["Country"] = country;
            searchDoctor["SearchType"] = searchType;
            return searchDoctor;
        }
        public static Hashtable PracticeEditDetailsAddPracticeDetails(int operationType ,long providerId, string uploadLogo, string name, string tagLine, string description, int billingCurrency, long type)
        {
            Hashtable practiceEditDetails = new Hashtable();
            practiceEditDetails["OperationType"] = operationType;
            practiceEditDetails["ProviderId"] = providerId;
            practiceEditDetails["PracticeDetailsLogoPath"] = uploadLogo;
            practiceEditDetails["PracticeDetailsPracticeName"] = name;
            practiceEditDetails["PracticeDetailsPracticeTagline"] = tagLine;
            practiceEditDetails["PracticeDetailsPracticeDescription"] = description;
            practiceEditDetails["PracticeDetailsBillingCurrency"] = billingCurrency;
            practiceEditDetails["PracticeDetailsPracticeType"] = type;
            return practiceEditDetails;
        }
        public static Hashtable DoctorEditDetailsGetDoctorInfo(string userId, long providerId, int operationType)
        {
            Hashtable doctorEditDetails = new Hashtable();
            doctorEditDetails["UserId"] = userId;
            doctorEditDetails["ProviderId"] = providerId;
            doctorEditDetails["OperationType"] = operationType;
            return doctorEditDetails;
        }
        public static Hashtable DoctorEditDetailsAddDoctorDetails(int operationType, string userId, long providerId, string doctorName, int? gender, string registrationDetails, int? year, long? registrationCouncil,
                                                    int? numberOfYears, string doctorTagLine, string doctorDescription)
        {
            Hashtable doctorEditDetails = new Hashtable();
            doctorEditDetails["OperationType"] = operationType;
            doctorEditDetails["UserId"] = userId;
            doctorEditDetails["ProviderId"] = providerId;
            doctorEditDetails["DoctorDetailsDoctorName"] = doctorName;
            doctorEditDetails["DoctorDetailsGender"] = gender;
            doctorEditDetails["DoctorDetailsRegistrationDetails"] = registrationDetails;
            doctorEditDetails["DoctorDetailsRegistrationYear"] = year;
            doctorEditDetails["DoctorDetailsRegistrationCouncil"] = registrationCouncil;
            doctorEditDetails["DoctorDetailsExperienceYears"] = numberOfYears;
            doctorEditDetails["DoctorDetailsTagline"] = doctorTagLine;
            doctorEditDetails["DoctorDetailsDoctorDescription"] = doctorDescription;
            return doctorEditDetails;
        }

        public static Hashtable DoctorEditDetailsAddDoctorContacts(int operationType, string userId, long providerId, string primaryPhone, string primaryEmail, string websiteAddress, string secondaryPhone, string secondaryEmail)
        {
            Hashtable doctorEditDetails = new Hashtable();
            doctorEditDetails["OperationType"] = operationType;
            doctorEditDetails["UserId"] = userId;
            doctorEditDetails["ProviderId"] = providerId;
            doctorEditDetails["DoctorContactsPrimaryPhone"] = primaryPhone;
            doctorEditDetails["DoctorContactsSecondaryPhone"] = secondaryPhone;
            doctorEditDetails["DoctorContactsPrimaryEmail"] = primaryEmail;
            doctorEditDetails["DoctorContactsSecondaryEmail"] = secondaryEmail;
            doctorEditDetails["DoctorContactsWebsiteAddress"] = websiteAddress;            
            return doctorEditDetails;
        }

        public static Hashtable DoctorEditDetailsAddDoctorConsultation(int operationType, string userId, long providerId, int consultationFee, int consultationDuration, bool monday, string monOpenHour1, string monOpenMinute1, string monCloseHours1, string monCloseMinutes1,
                                                        string monOpenHour2, string monOpenMinute2, string monCloseHours2, string monCloseMinutes2,
                                                            bool tuesday, string tueOpenHour1, string tueOpenMinute1, string tueCloseHours1, string tueCloseMinutes1,
                                                                string tueOpenHour2, string tueOpenMinute2, string tueCloseHours2, string tueCloseMinutes2,
                                                                    bool wednesday, string wedOpenHour1, string wedOpenMinute1, string wedCloseHours1, string wedCloseMinutes1,
                                                                        string wedOpenHour2, string wedOpenMinute2, string wedCloseHours2, string wedCloseMinutes2,
                                                                            bool thursday, string thuOpenHour1, string thuOpenMinute1, string thuCloseHours1, string thuCloseMinutes1,
                                                                                string thuOpenHour2, string thuOpenMinute2, string thuCloseHours2, string thuCloseMinutes2,
                                                                                    bool friday, string friOpenHour1, string friOpenMinute1, string friCloseHours1, string friCloseMinutes1,
                                                                                        string friOpenHour2, string friOpenMinute2, string friCloseHours2, string friCloseMinutes2,
                                                                                            bool saturday, string satOpenHour1, string satOpenMinute1, string satCloseHours1, string satCloseMinutes1,
                                                                                                string satOpenHour2, string satOpenMinute2, string satCloseHours2, string satCloseMinutes2,
                                                                                                    bool sunday, string sunOpenHour1, string sunOpenMinute1, string sunCloseHours1, string sunCloseMinutes1,
                                                                                                        string sunOpenHour2, string sunOpenMinute2, string sunCloseHours2, string sunCloseMinutes2)
        {
            Hashtable doctorEditDetails = new Hashtable();
            doctorEditDetails["OperationType"] = operationType;
            doctorEditDetails["UserId"] = userId;
            doctorEditDetails["ProviderId"] = providerId;
            doctorEditDetails["DoctorConsultationFee"] = consultationFee;
            doctorEditDetails["DoctorConsultationDuration"] = consultationDuration;
            doctorEditDetails["Monday"] = monday;
            doctorEditDetails["MonOpenHour1"] = monOpenHour1;
            doctorEditDetails["MonOpenMinute1"] = monOpenMinute1;
            doctorEditDetails["MonCloseHour1"] = monCloseHours1;
            doctorEditDetails["MonCloseMinute1"] = monCloseMinutes1;
            doctorEditDetails["MonOpenHour2"] = monOpenHour2;
            doctorEditDetails["MonOpenMinute2"] = monOpenMinute2;
            doctorEditDetails["MonCloseHour2"] = monCloseHours2;
            doctorEditDetails["MonCloseMinute2"] = monCloseMinutes2;
            doctorEditDetails["Tuesday"] = tuesday;
            doctorEditDetails["TueOpenHour1"] = tueOpenHour1;
            doctorEditDetails["TueOpenMinute1"] = tueOpenMinute1;
            doctorEditDetails["TueCloseHour1"] = tueCloseHours1;
            doctorEditDetails["TueCloseMinute1"] = tueCloseMinutes1;
            doctorEditDetails["TueOpenHour2"] = tueOpenHour2;
            doctorEditDetails["TueOpenMinute2"] = tueOpenMinute2;
            doctorEditDetails["TueCloseHour2"] = tueCloseHours2;
            doctorEditDetails["TueCloseMinute2"] = tueCloseMinutes2;
            doctorEditDetails["Wednesday"] = wednesday;
            doctorEditDetails["WedOpenHour1"] = wedOpenHour1;
            doctorEditDetails["WedOpenMinute1"] = wedOpenMinute1;
            doctorEditDetails["WedCloseHour1"] = wedCloseHours1;
            doctorEditDetails["WedCloseMinute1"] = wedCloseMinutes1;
            doctorEditDetails["WedOpenHour2"] = wedOpenHour2;
            doctorEditDetails["WedOpenMinute2"] = wedOpenMinute2;
            doctorEditDetails["WedCloseHour2"] = wedCloseHours2;
            doctorEditDetails["WedCloseMinute2"] = wedCloseMinutes2;
            doctorEditDetails["Thursday"] = thursday;
            doctorEditDetails["ThuOpenHour1"] = thuOpenHour1;
            doctorEditDetails["ThuOpenMinute1"] = thuOpenMinute1;
            doctorEditDetails["ThuCloseHour1"] = thuCloseHours1;
            doctorEditDetails["ThuCloseMinute1"] = thuCloseMinutes1;
            doctorEditDetails["ThuOpenHour2"] = thuOpenHour2;
            doctorEditDetails["ThuOpenMinute2"] = thuOpenMinute2;
            doctorEditDetails["ThuCloseHour2"] = thuCloseHours2;
            doctorEditDetails["ThuCloseMinute2"] = thuCloseMinutes2;
            doctorEditDetails["Friday"] = friday;
            doctorEditDetails["FriOpenHour1"] = friOpenHour1;
            doctorEditDetails["FriOpenMinute1"] = friOpenMinute1;
            doctorEditDetails["FriCloseHour1"] = friCloseHours1;
            doctorEditDetails["FriCloseMinute1"] = friCloseMinutes1;
            doctorEditDetails["FriOpenHour2"] = friOpenHour2;
            doctorEditDetails["FriOpenMinute2"] = friOpenMinute2;
            doctorEditDetails["FriCloseHour2"] = friCloseHours2;
            doctorEditDetails["FriCloseMinute2"] = friCloseMinutes2;
            doctorEditDetails["Saturday"] = saturday;
            doctorEditDetails["SatOpenHour1"] = satOpenHour1;
            doctorEditDetails["SatOpenMinute1"] = satOpenMinute1;
            doctorEditDetails["SatCloseHour1"] = satCloseHours1;
            doctorEditDetails["SatCloseMinute1"] = satCloseMinutes1;
            doctorEditDetails["SatOpenHour2"] = satOpenHour2;
            doctorEditDetails["SatOpenMinute2"] = satOpenMinute2;
            doctorEditDetails["SatCloseHour2"] = satCloseHours2;
            doctorEditDetails["SatCloseMinute2"] = satCloseMinutes2;
            doctorEditDetails["Sunday"] = sunday;
            doctorEditDetails["SunOpenHour1"] = sunOpenHour1;
            doctorEditDetails["SunOpenMinute1"] = sunOpenMinute1;
            doctorEditDetails["SunCloseHour1"] = sunCloseHours1;
            doctorEditDetails["SunCloseMinute1"] = sunCloseMinutes1;
            doctorEditDetails["SunOpenHour2"] = sunOpenHour2;
            doctorEditDetails["SunOpenMinute2"] = sunOpenMinute2;
            doctorEditDetails["SunCloseHour2"] = sunCloseHours2;
            doctorEditDetails["SunCloseMinute2"] = sunCloseMinutes2;

            return doctorEditDetails;
        }
        public static Hashtable DoctorEditDetailsAddSpecializations(int operationType, string userId, long providerId, string specializationName)
        {
            Hashtable doctorEditDetails = new Hashtable();
            doctorEditDetails["OperationType"] = operationType;
            doctorEditDetails["UserId"] = userId;
            doctorEditDetails["ProviderId"] = providerId;
            doctorEditDetails["DoctorSpecializationsSpecializationName"] = specializationName;            
            return doctorEditDetails;
        }
        public static Hashtable DoctorEditDetailsAddToSpecializations(int operationType, string userId, long providerId, long specializationId)
        {
            Hashtable doctorEditDetails = new Hashtable();
            doctorEditDetails["OperationType"] = operationType;
            doctorEditDetails["UserId"] = userId;
            doctorEditDetails["ProviderId"] = providerId;
            doctorEditDetails["DoctorSpecializationsSpecializationId"] = specializationId;
            return doctorEditDetails;
        }
        public static Hashtable DoctorEditDetailsRemoveFromSpecializations(int operationType, string userId, long providerId, long specializationId)
        {
            Hashtable doctorEditDetails = new Hashtable();
            doctorEditDetails["OperationType"] = operationType;
            doctorEditDetails["UserId"] = userId;
            doctorEditDetails["ProviderId"] = providerId;
            doctorEditDetails["DoctorSpecializationsSpecializationId"] = specializationId;
            return doctorEditDetails;
        }
        public static Hashtable DoctorEditDetailsAddDoctorTreatments(int operationType, string userId, long providerId, string treatmentName, int? treatmentCost, int? tax, long? subcatecogyOf, string notes="")
        {
            Hashtable doctorEditDetails = new Hashtable();
            doctorEditDetails["OperationType"] = operationType;
            doctorEditDetails["UserId"] = userId;
            doctorEditDetails["ProviderId"] = providerId;
            doctorEditDetails["DoctorTreatmentsTreatmentName"] = treatmentName;
            doctorEditDetails["DoctorTreatmentsTreatmentCost"] = treatmentCost;
            doctorEditDetails["DoctorTreatmentsTreatmentTax"] = tax;
            doctorEditDetails["DoctorTreatmentsIsSubcategory"] = subcatecogyOf;
            doctorEditDetails["DoctorTreatmentsNotes"] = notes;
            return doctorEditDetails;
        }
        public static Hashtable DoctorEditDetailsEditDoctorTreatments(int operationType, string userId, long providerId, long treatmentId, string treatmentName, int treatmentCost, int tax, long subcatecogyOf, string notes)
        {
            Hashtable doctorEditDetails = new Hashtable();
            doctorEditDetails["OperationType"] = operationType;
            doctorEditDetails["UserId"] = userId;
            doctorEditDetails["ProviderId"] = providerId;
            doctorEditDetails["DoctorTreatmentsTreatmentId"] = treatmentId;
            doctorEditDetails["DoctorTreatmentsTreatmentName"] = treatmentName;
            doctorEditDetails["DoctorTreatmentsTreatmentCost"] = treatmentCost;
            doctorEditDetails["DoctorTreatmentsTreatmentTax"] = tax;
            doctorEditDetails["DoctorTreatmentsIsSubcategory"] = subcatecogyOf;
            doctorEditDetails["DoctorTreatmentsNotes"] = notes;
            return doctorEditDetails;
        }
        public static Hashtable DoctorEditDetailsAddToDoctorTreatments(int operationType, string userId, long providerId, long treatmentId)
        {
            Hashtable doctorEditDetails = new Hashtable();
            doctorEditDetails["OperationType"] = operationType;
            doctorEditDetails["UserId"] = userId;
            doctorEditDetails["ProviderId"] = providerId;
            doctorEditDetails["DoctorTreatmentsTreatmentId"] = treatmentId;
            
            return doctorEditDetails;
        }
        public static Hashtable DoctorEditDetailsGetAddedInfo(string userId, long providerId, int operationType)
        {
            Hashtable doctorEditDetails = new Hashtable();
            doctorEditDetails["UserId"] = userId;
            doctorEditDetails["ProviderId"] = providerId;
            doctorEditDetails["OperationType"] = operationType;
            return doctorEditDetails;
        }        
        public static Hashtable DoctorEditDetailsAddLanguages(int operationType, string userId, long providerId, string languageName)
        {
            Hashtable doctorEditDetails = new Hashtable();
            doctorEditDetails["OperationType"] = operationType;
            doctorEditDetails["UserId"] = userId;
            doctorEditDetails["ProviderId"] = providerId;
            doctorEditDetails["DoctorLanguagesLanguageName"] = languageName;
            return doctorEditDetails;
        }
        public static Hashtable DoctorEditDetailsAddToLanguages(int operationType, string userId, long providerId, long languageId)
        {
            Hashtable doctorEditDetails = new Hashtable();
            doctorEditDetails["OperationType"] = operationType;
            doctorEditDetails["UserId"] = userId;
            doctorEditDetails["ProviderId"] = providerId;
            doctorEditDetails["DoctorSpecializationsLanguageId"] = languageId;
            return doctorEditDetails;
        }
        public static Hashtable DoctorEditDetailsRemoveFromLanguages(int operationType, string userId, long providerId, long languageId)
        {
            Hashtable doctorEditDetails = new Hashtable();
            doctorEditDetails["OperationType"] = operationType;
            doctorEditDetails["UserId"] = userId;
            doctorEditDetails["ProviderId"] = providerId;
            doctorEditDetails["DoctorSpecializationsLanguageId"] = languageId;
            return doctorEditDetails;
        }
        public static Hashtable DoctorEditDetailsAddDoctorEducation(int operationType, string userId, long providerId, string degreeTitle, int? degreeYear, string schoolTitle = "")
        {
            Hashtable doctorEditDetails = new Hashtable();
            doctorEditDetails["OperationType"] = operationType;
            doctorEditDetails["UserId"] = userId;
            doctorEditDetails["ProviderId"] = providerId;
            doctorEditDetails["DoctorProfessionalDetailsEducationDegree"] = degreeTitle;
            doctorEditDetails["DoctorProfessionalDetailsEducationCollege"] = schoolTitle;
            doctorEditDetails["DoctorProfessionalDetailsEducationYear"] = degreeYear;            
            return doctorEditDetails;
        }
        public static Hashtable DoctorEditDetailsAddDoctorExperience(int operationType, string userId, long providerId, long? cityId, int? startYear, int? endYear, string designation="", string organization="")
        {
            Hashtable doctorEditDetails = new Hashtable();
            doctorEditDetails["OperationType"] = operationType;
            doctorEditDetails["UserId"] = userId;
            doctorEditDetails["ProviderId"] = providerId;
            doctorEditDetails["DoctorProfessionalDetailsExperienceDesignation"] = designation;
            doctorEditDetails["DoctorProfessionalDetailsExperienceOrganization"] = organization;
            doctorEditDetails["DoctorProfessionalDetailsExperienceCity"] = cityId;
            doctorEditDetails["DoctorProfessionalDetailsExperienceStartYear"] = startYear;
            doctorEditDetails["DoctorProfessionalDetailsExperienceEndYear"] = endYear;
            return doctorEditDetails;
        }
        public static Hashtable DoctorEditDetailsAddDoctorAffiliation(int operationType, string userId, long providerId, long affiliationId, int? year)
        {
            Hashtable doctorEditDetails = new Hashtable();
            doctorEditDetails["OperationType"] = operationType;
            doctorEditDetails["UserId"] = userId;
            doctorEditDetails["ProviderId"] = providerId;
            doctorEditDetails["DoctorProfessionalDetailsAffiliationId"] = affiliationId;
            doctorEditDetails["DoctorProfessionalDetailsAffiliationYear"] = year;            
            return doctorEditDetails;
        }
        public static Hashtable DoctorEditDetailsAddDoctorAward(int operationType, string userId, long providerId, long awardId, int? year)
        {
            Hashtable doctorEditDetails = new Hashtable();
            doctorEditDetails["OperationType"] = operationType;
            doctorEditDetails["UserId"] = userId;
            doctorEditDetails["ProviderId"] = providerId;
            doctorEditDetails["DoctorProfessionalDetailsAwardId"] = awardId;
            doctorEditDetails["DoctorProfessionalDetailsAwardYear"] = year;
            return doctorEditDetails;
        }               
        public static Hashtable DoctorEditDetailsRemoveFromTreatments(int operationType, string userId, long providerId, long treatmentId)
        {
            Hashtable doctorEditDetails = new Hashtable();
            doctorEditDetails["OperationType"] = operationType;
            doctorEditDetails["UserId"] = userId;
            doctorEditDetails["ProviderId"] = providerId;
            doctorEditDetails["DoctorTreatmentsTreatmentId"] = treatmentId;
            return doctorEditDetails;
        }
        public static Hashtable DoctorEditDetailsRemoveFromEducation(int operationType, string userId, long providerId, string degreeTitle, string schoolTitle)
        {
            Hashtable doctorEditDetails = new Hashtable();
            doctorEditDetails["OperationType"] = operationType;
            doctorEditDetails["UserId"] = userId;
            doctorEditDetails["ProviderId"] = providerId;
            doctorEditDetails["DoctorProfessionalDetailsEducationDegree"] = degreeTitle;
            doctorEditDetails["DoctorProfessionalDetailsEducationCollege"] = schoolTitle;                
            return doctorEditDetails;
        }
        public static Hashtable DoctorEditDetailsRemoveFromExperience(int operationType, string userId, long providerId, string designation, string organization, long cityId)
        {
            Hashtable doctorEditDetails = new Hashtable();
            doctorEditDetails["OperationType"] = operationType;
            doctorEditDetails["UserId"] = userId;
            doctorEditDetails["ProviderId"] = providerId;
            doctorEditDetails["DoctorProfessionalDetailsExperienceDesignation"] = designation;
            doctorEditDetails["DoctorProfessionalDetailsExperienceOrganization"] = organization;
            doctorEditDetails["DoctorProfessionalDetailsExperienceCity"] = cityId;
            return doctorEditDetails;
        }
        public static Hashtable DoctorEditDetailsRemoveFromAffiliation(int operationType, string userId, long providerId, long affiliationId)
        {
            Hashtable doctorEditDetails = new Hashtable();
            doctorEditDetails["OperationType"] = operationType;
            doctorEditDetails["UserId"] = userId;
            doctorEditDetails["ProviderId"] = providerId;
            doctorEditDetails["DoctorProfessionalDetailsAffiliationId"] = affiliationId;
            return doctorEditDetails;
        }
        public static Hashtable DoctorEditDetailsRemoveFromAward(int operationType, string userId, long providerId, long awardId)
        {
            Hashtable doctorEditDetails = new Hashtable();
            doctorEditDetails["OperationType"] = operationType;
            doctorEditDetails["UserId"] = userId;
            doctorEditDetails["ProviderId"] = providerId;
            doctorEditDetails["DoctorProfessionalDetailsAwardId"] = awardId;
            return doctorEditDetails;
        }
        public static Hashtable GetAllDoctorsByProviderPractice(string userId, long providerId, int operationType)
        {
            Hashtable doctorEditDetails = new Hashtable();
            doctorEditDetails["UserId"] = userId;
            doctorEditDetails["ProviderId"] = providerId;
            doctorEditDetails["OperationType"] = operationType;
            return doctorEditDetails;
        }
        public static Hashtable StaffRemoveFromProviders(int operationType, string userId, long providerId, long removeProviderId)
        {
            Hashtable doctorEditDetails = new Hashtable();
            doctorEditDetails["OperationType"] = operationType;
            doctorEditDetails["UserId"] = userId;
            doctorEditDetails["ProviderId"] = providerId;
            doctorEditDetails["RemoveProviderId"] = removeProviderId;
            return doctorEditDetails;
        }
        public static Hashtable PracticeEditDetailsGetAddedInfo(string userId, long providerId, int operationType)
        {
            Hashtable practiceEditDetails = new Hashtable();
            practiceEditDetails["UserId"] = userId;
            practiceEditDetails["ProviderId"] = providerId;
            practiceEditDetails["OperationType"] = operationType;
            return practiceEditDetails;
        }
        public static Hashtable PracticeEditDetailsAddLanguages(int operationType, string userId, long providerId, string languageName)
        {
            Hashtable practiceEditDetails = new Hashtable();
            practiceEditDetails["OperationType"] = operationType;
            practiceEditDetails["UserId"] = userId;
            practiceEditDetails["ProviderId"] = providerId;
            practiceEditDetails["PracticeLanguagesLanguageName"] = languageName;
            return practiceEditDetails;
        }
        public static Hashtable PracticeEditDetailsAddToLanguages(int operationType, string userId, long providerId, long languageId)
        {
            Hashtable practiceEditDetails = new Hashtable();
            practiceEditDetails["OperationType"] = operationType;
            practiceEditDetails["UserId"] = userId;
            practiceEditDetails["ProviderId"] = providerId;
            practiceEditDetails["PracticeLanguagesLanguageId"] = languageId;
            return practiceEditDetails;
        }
        public static Hashtable PracticeEditDetailsRemoveFromLanguages(int operationType, string userId, long providerId, long languageId)
        {
            Hashtable practiceEditDetails = new Hashtable();
            practiceEditDetails["OperationType"] = operationType;
            practiceEditDetails["UserId"] = userId;
            practiceEditDetails["ProviderId"] = providerId;
            practiceEditDetails["PracticeLanguagesLanguageId"] = languageId;
            return practiceEditDetails;
        }
        public static Hashtable PracticeEditDetailsAddPremises(int operationType, string userId, long providerId, string premisesName)
        {
            Hashtable practiceEditDetails = new Hashtable();
            practiceEditDetails["OperationType"] = operationType;
            practiceEditDetails["UserId"] = userId;
            practiceEditDetails["ProviderId"] = providerId;
            practiceEditDetails["PracticePremisesPremisName"] = premisesName;
            return practiceEditDetails;
        }
        public static Hashtable PracticeEditDetailsAddToPremises(int operationType, string userId, long providerId, long premisesId)
        {
            Hashtable practiceEditDetails = new Hashtable();
            practiceEditDetails["OperationType"] = operationType;
            practiceEditDetails["UserId"] = userId;
            practiceEditDetails["ProviderId"] = providerId;
            practiceEditDetails["PracticePremisesPremisId"] = premisesId;
            return practiceEditDetails;
        }
        public static Hashtable PracticeEditDetailsRemoveFromPremises(int operationType, string userId, long providerId, long premisesId)
        {
            Hashtable practiceEditDetails = new Hashtable();
            practiceEditDetails["OperationType"] = operationType;
            practiceEditDetails["UserId"] = userId;
            practiceEditDetails["ProviderId"] = providerId;
            practiceEditDetails["PracticePremisesPremisId"] = premisesId;
            return practiceEditDetails;
        }
        public static Hashtable PracticeEditDetailsAddAccreditations(int operationType, string userId, long providerId, string accreditationName)
        {
            Hashtable practiceEditDetails = new Hashtable();
            practiceEditDetails["OperationType"] = operationType;
            practiceEditDetails["UserId"] = userId;
            practiceEditDetails["ProviderId"] = providerId;
            practiceEditDetails["PracticeAccreditationsAccreditationName"] = accreditationName;
            return practiceEditDetails;
        }
        public static Hashtable PracticeEditDetailsAddToAccreditations(int operationType, string userId, long providerId, long accreditationId)
        {
            Hashtable practiceEditDetails = new Hashtable();
            practiceEditDetails["OperationType"] = operationType;
            practiceEditDetails["UserId"] = userId;
            practiceEditDetails["ProviderId"] = providerId;
            practiceEditDetails["PracticeAccreditationsAccreditationId"] = accreditationId;
            return practiceEditDetails;
        }
        public static Hashtable PracticeEditDetailsRemoveFromAccreditations(int operationType, string userId, long providerId, long accreditationId)
        {
            Hashtable practiceEditDetails = new Hashtable();
            practiceEditDetails["OperationType"] = operationType;
            practiceEditDetails["UserId"] = userId;
            practiceEditDetails["ProviderId"] = providerId;
            practiceEditDetails["PracticeAccreditationsAccreditationId"] = accreditationId;
            return practiceEditDetails;
        }
        public static Hashtable PracticeEditDetailsAddInsurances(int operationType, string userId, long providerId, string insuranceName)
        {
            Hashtable practiceEditDetails = new Hashtable();
            practiceEditDetails["OperationType"] = operationType;
            practiceEditDetails["UserId"] = userId;
            practiceEditDetails["ProviderId"] = providerId;
            practiceEditDetails["PracticeInsurancesInsuranceName"] = insuranceName;
            return practiceEditDetails;
        }
        public static Hashtable PracticeEditDetailsAddToInsurances(int operationType, string userId, long providerId, long insuranceId)
        {
            Hashtable practiceEditDetails = new Hashtable();
            practiceEditDetails["OperationType"] = operationType;
            practiceEditDetails["UserId"] = userId;
            practiceEditDetails["ProviderId"] = providerId;
            practiceEditDetails["PracticeInsurancesInsuranceId"] = insuranceId;
            return practiceEditDetails;
        }
        public static Hashtable PracticeEditDetailsRemoveFromInsurances(int operationType, string userId, long providerId, long insuranceId)
        {
            Hashtable practiceEditDetails = new Hashtable();
            practiceEditDetails["OperationType"] = operationType;
            practiceEditDetails["UserId"] = userId;
            practiceEditDetails["ProviderId"] = providerId;
            practiceEditDetails["PracticeInsurancesInsuranceId"] = insuranceId;
            return practiceEditDetails;
        }
        public static Hashtable PracticeEditDetailsAddServices(int operationType, string userId, long providerId, string serviceName, long serviceType)
        {
            Hashtable practiceEditDetails = new Hashtable();
            practiceEditDetails["OperationType"] = operationType;
            practiceEditDetails["UserId"] = userId;
            practiceEditDetails["ProviderId"] = providerId;
            practiceEditDetails["PracticeServicesServiceName"] = serviceName;
            practiceEditDetails["PracticeServicesServiceTypeId"] = serviceType;            
            return practiceEditDetails;
        }
        public static Hashtable PracticeEditDetailsAddToServices(int operationType, string userId, long providerId, long serviceId)
        {
            Hashtable practiceEditDetails = new Hashtable();
            practiceEditDetails["OperationType"] = operationType;
            practiceEditDetails["UserId"] = userId;
            practiceEditDetails["ProviderId"] = providerId;
            practiceEditDetails["PracticeServicesServiceId"] = serviceId;
            return practiceEditDetails;
        }
        public static Hashtable PracticeEditDetailsRemoveFromServices(int operationType, string userId, long providerId, long serviceId)
        {
            Hashtable practiceEditDetails = new Hashtable();
            practiceEditDetails["OperationType"] = operationType;
            practiceEditDetails["UserId"] = userId;
            practiceEditDetails["ProviderId"] = providerId;
            practiceEditDetails["PracticeServicesServiceId"] = serviceId;
            return practiceEditDetails;
        }
        public static Hashtable PracticeEditDetailsAddTravelServices(int operationType, string userId, long providerId, string serviceName, long serviceType)
        {
            Hashtable practiceEditDetails = new Hashtable();
            practiceEditDetails["OperationType"] = operationType;
            practiceEditDetails["UserId"] = userId;
            practiceEditDetails["ProviderId"] = providerId;
            practiceEditDetails["PracticeServicesTravelServiceName"] = serviceName;
            practiceEditDetails["PracticeServicesServiceTypeId"] = serviceType;
            return practiceEditDetails;
        }
        public static Hashtable PracticeEditDetailsAddToTravelServices(int operationType, string userId, long providerId, long travelserviceId)
        {
            Hashtable practiceEditDetails = new Hashtable();
            practiceEditDetails["OperationType"] = operationType;
            practiceEditDetails["UserId"] = userId;
            practiceEditDetails["ProviderId"] = providerId;
            practiceEditDetails["PracticeServicesTravelServiceId"] = travelserviceId;
            return practiceEditDetails;
        }
        public static Hashtable PracticeEditDetailsRemoveFromTravelServices(int operationType, string userId, long providerId, long travelserviceId)
        {
            Hashtable practiceEditDetails = new Hashtable();
            practiceEditDetails["OperationType"] = operationType;
            practiceEditDetails["UserId"] = userId;
            practiceEditDetails["ProviderId"] = providerId;
            practiceEditDetails["PracticeServicesTravelServiceId"] = travelserviceId;
            return practiceEditDetails;
        }
    }
}
