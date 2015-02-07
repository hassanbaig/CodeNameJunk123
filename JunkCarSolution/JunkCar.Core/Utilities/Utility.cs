using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace JunkCar.Core.Utilities
{
    public static class Utility
    {
        public static string SaveUploads(HttpFileCollection uploads, int customerId, int cylinders, int makeId, int modelId, int year)
        {
            for (int i = 0; i < uploads.Count; i++)
            {
                HttpPostedFile upload = uploads[i];
                string currentFileOrigionalName = Path.GetFileName(upload.FileName);
                //Directory.CreateDirectory("~/Uploads/");
                //var path = Path.Combine(HttpContext.Current.Server.MapPath("/Uploads/"), filename);
                var path = GeneratePath(customerId, cylinders, makeId, modelId, year, currentFileOrigionalName);
                upload.SaveAs(path);
            }
            return "Uploaded";
        }
        public static List<System.Net.Mail.Attachment> GetAttachments(int customerId, int cylinders, int makeId, int modelId, int year)
        {
            List<System.Net.Mail.Attachment> images = new List<System.Net.Mail.Attachment>();
            string imagesHTML = string.Empty;
            // Local path
            string directoryPath = "~/Uploads/Photos";
            // Live path
            //string directoryPath = "/Uploads/";
            for (int i = 1; i <= 5; i++)
            {
                string fileName = customerId + "_File" + i + "_" + year + "_" + makeId + "_" + modelId + "_" + cylinders + ".jpg";
                string path = Path.Combine(HttpContext.Current.Server.MapPath(directoryPath), fileName);
                bool isExist = File.Exists(path);
                if(isExist)
                {
                    System.Net.Mail.Attachment attachment = new System.Net.Mail.Attachment(path);
                    images.Add(attachment);
                }
            }
            return images;
        }
        public static string GeneratePath(int customerId, int cylinders, int makeId, int modelId, int year, string oldName)
        {
            // Local path
            string directoryPath = "~/Uploads/Photos";
            // Live path
            //string directoryPath = "/Uploads/";
            string extension = Path.GetExtension(oldName);
            uint photoNumber = 1;
            string fileName = customerId + "_File" + photoNumber + "_" + year + "_" + makeId + "_" + modelId + "_" + cylinders + extension;
            var path = Path.Combine(HttpContext.Current.Server.MapPath(directoryPath), fileName);
            bool isExist = CheckPath(path);
            if (!isExist)
            { return path; }
            else
            {
                while (isExist)
                {
                    photoNumber++;
                    fileName = customerId + "_File" + photoNumber + "_" + year + "_" + makeId + "_" + modelId + "_" + cylinders + extension;
                    path = Path.Combine(HttpContext.Current.Server.MapPath(directoryPath), fileName);
                    isExist = CheckPath(path);
                }
            }
            return path;
        }
        private static bool CheckPath(string path)
        {
            return File.Exists(path);
        }
    }
}
