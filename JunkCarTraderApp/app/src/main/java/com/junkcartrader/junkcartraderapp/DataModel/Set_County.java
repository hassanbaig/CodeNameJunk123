package com.junkcartrader.junkcartraderapp.DataModel;

/**
 * Created by hassanbaig on 2/7/2015.
 */
import java.util.Date;

public class Set_County
{
    private int County_Id;
    private String County_Code;
    private String County_Name;
    private int State_Id;
    private int Country_Id;
    private byte Is_Active;
    private Date Created_Date;
    private int Created_By;
    private Date Modified_Date;
    private int Modified_By;
    private long Audit_Id;
    private String User_IP;
    private int Site_Id;


    public Set_County()
    {

    }

    public int getCounty_Id() {
        return County_Id;
    }

    public void setCounty_Id(int county_Id) {
        County_Id = county_Id;
    }

    public String getCounty_Code() {
        return County_Code;
    }

    public void setCounty_Code(String county_Code) {
        County_Code = county_Code;
    }

    public String getCounty_Name() {
        return County_Name;
    }

    public void setCounty_Name(String county_Name) {
        County_Name = county_Name;
    }

    public int getState_Id() {
        return State_Id;
    }

    public void setState_Id(int state_Id) {
        State_Id = state_Id;
    }

    public int getCountry_Id() {
        return Country_Id;
    }

    public void setCountry_Id(int country_Id) {
        Country_Id = country_Id;
    }

    public byte getIs_Active() {
        return Is_Active;
    }

    public void setIs_Active(byte is_Active) {
        Is_Active = is_Active;
    }

    public Date getCreated_Date() {
        return Created_Date;
    }

    public void setCreated_Date(Date created_Date) {
        Created_Date = created_Date;
    }

    public int getCreated_By() {
        return Created_By;
    }

    public void setCreated_By(int created_By) {
        Created_By = created_By;
    }

    public Date getModified_Date() {
        return Modified_Date;
    }

    public void setModified_Date(Date modified_Date) {
        Modified_Date = modified_Date;
    }

    public int getModified_By() {
        return Modified_By;
    }

    public void setModified_By(int modified_By) {
        Modified_By = modified_By;
    }

    public long getAudit_Id() {
        return Audit_Id;
    }

    public void setAudit_Id(long audit_Id) {
        Audit_Id = audit_Id;
    }

    public String getUser_IP() {
        return User_IP;
    }

    public void setUser_IP(String user_IP) {
        User_IP = user_IP;
    }

    public int getSite_Id() {
        return Site_Id;
    }

    public void setSite_Id(int site_Id) {
        Site_Id = site_Id;
    }



}
