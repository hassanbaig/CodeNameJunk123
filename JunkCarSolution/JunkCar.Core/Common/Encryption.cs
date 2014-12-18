using System;
using System.IO;
using System.Security.Cryptography;

namespace JunkCar.Core.Common
{
    public class Encryption
    {        
        public static string Encrypt(string ClearData, string password)
        {            
            byte[] buffer = System.Text.Encoding.Unicode.GetBytes(ClearData);
                        
            PasswordDeriveBytes pdb = new PasswordDeriveBytes(password,
            new byte[] {0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 
            0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76});

            byte[] Key = pdb.GetBytes(32);
            byte[] IV = pdb.GetBytes(16);
                        
            MemoryStream ms = new MemoryStream();

            Rijndael alg = Rijndael.Create();

            alg.Key = Key;
            alg.IV = IV;

            CryptoStream cs = new CryptoStream(ms,
            alg.CreateEncryptor(), CryptoStreamMode.Write);
                        
            cs.Write(buffer, 0, buffer.Length);
                        
            cs.Close();

            byte[] encryptedData = ms.ToArray();

            return Convert.ToBase64String(encryptedData);
        }
                
        public static string Decrypt(string cipherData, string password)
        {
            
            byte[] buffer = Convert.FromBase64String(cipherData);
            
            PasswordDeriveBytes pdb = new PasswordDeriveBytes(password,
            new byte[] {0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 
            0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76});

            byte[] Key = pdb.GetBytes(32);
            byte[] IV = pdb.GetBytes(16);

            MemoryStream ms = new MemoryStream();
                        
            Rijndael alg = Rijndael.Create();
                        
            alg.Key = Key;
            alg.IV = IV;

            
            CryptoStream cs = new CryptoStream(ms,
                alg.CreateDecryptor(), CryptoStreamMode.Write);
                        
            cs.Write(buffer, 0, buffer.Length);          
            cs.Close();
                        
            byte[] decryptedData = ms.ToArray();

            return System.Text.Encoding.Unicode.GetString(decryptedData);
        }
    }
}
