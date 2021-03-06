﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;

namespace JunkCar.WebAPI
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            var cors = new EnableCorsAttribute("http://www.junkcartrader.com/API/API/", "*", "*");
            config.EnableCors(cors);

            // Web API configuration and services

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                //routeTemplate: "junkcar/v" + JunkCar.WebAPI.Configurations.APIConfig.apiVersion + "{controller}/{action}/{id}",
                //routeTemplate: "junkcar.v" + JunkCar.WebAPI.Configurations.APIConfig.apiVersion.ToString() + "/{controller}/{action}/{id}",
                routeTemplate: "API/{controller}/{action}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            // Removed XML formatter and added JSON formatter for response data from controllers` action methods
            var json = config.Formatters.JsonFormatter;
            json.SerializerSettings.PreserveReferencesHandling = Newtonsoft.Json.PreserveReferencesHandling.All;
            config.Formatters.Remove(config.Formatters.XmlFormatter);
        }
    }
}
