package com.junkcartrader.junkcartraderapp.DataModel;

/**
 * Created by hassanbaig on 2/7/2015.
 */
import java.util.Date;

public class Sec_User
{
    private int User_Code;
    private String User_Login_Id;
    private String Login_Password;
    private int Role_Id;
    private int Created_By;
    private Date Created_Date;
    private int Modified_By;
    private Date Modified_Date;
    private byte Is_Active;
    private String User_IP;
    private long Audit_Id;
    private int Site_Id;

    public Sec_User()
    {

    }

    public int getUser_Code() {
        return User_Code;
    }

    public void setUser_Code(int user_Code) {
        User_Code = user_Code;
    }

    public String getUser_Login_Id() {
        return User_Login_Id;
    }

    public void setUser_Login_Id(String user_Login_Id) {
        User_Login_Id = user_Login_Id;
    }

    public String getLogin_Password() {
        return Login_Password;
    }

    public void setLogin_Password(String login_Password) {
        Login_Password = login_Password;
    }

    public int getRole_Id() {
        return Role_Id;
    }

    public void setRole_Id(int role_Id) {
        Role_Id = role_Id;
    }

    public int getCreated_By() {
        return Created_By;
    }

    public void setCreated_By(int created_By) {
        Created_By = created_By;
    }

    public Date getCreated_Date() {
        return Created_Date;
    }

    public void setCreated_Date(Date created_Date) {
        Created_Date = created_Date;
    }

    public int getModified_By() {
        return Modified_By;
    }

    public void setModified_By(int modified_By) {
        Modified_By = modified_By;
    }

    public Date getModified_Date() {
        return Modified_Date;
    }

    public void setModified_Date(Date modified_Date) {
        Modified_Date = modified_Date;
    }

    public byte getIs_Active() {
        return Is_Active;
    }

    public void setIs_Active(byte is_Active) {
        Is_Active = is_Active;
    }

    public String getUser_IP() {
        return User_IP;
    }

    public void setUser_IP(String user_IP) {
        User_IP = user_IP;
    }

    public long getAudit_Id() {
        return Audit_Id;
    }

    public void setAudit_Id(long audit_Id) {
        Audit_Id = audit_Id;
    }

    public int getSite_Id() {
        return Site_Id;
    }

    public void setSite_Id(int site_Id) {
        Site_Id = site_Id;
    }

}
