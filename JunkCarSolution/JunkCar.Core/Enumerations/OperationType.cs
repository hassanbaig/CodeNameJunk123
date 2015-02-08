﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JunkCar.Core.Enumerations
{
    public enum OperationType
    {
        AUTHENTICATE,
        GET_MAKES,
        GET_MODLES,
        CHECK_ZIPCODE,
        GET_CITIES,
        GET_AN_OFFER,
        GET_A_BETTER_OFFER,
        CONFIRM_OFFER,
        CONFIRM_OFFER_WITH_QUESTIONNAIRE,
        GET_CUSTOMER_ID,
        CONTACT_EMAIL_MESSAGE
    }
}