package com.junkcartrader.junkcartraderapp.DataModel;

/**
 * Created by hassanbaig on 2/7/2015.
 */
import java.util.Date;

public  class usp_Set_City_Result
{
    private double ActionType;
    private int City_Id;
    private String City_Code;
    private String City_Name;
    private int County_Id;
    private int State_Id;
    private int Country_Id;
    private byte Is_Active;
    private Date Created_Date;
    private int Created_By;
    private Date Modified_Date;
    private int Modified_By;
    private long Audit_Id;
    private String User_IP ;
    private int Site_Id;


    public usp_Set_City_Result()
    {

    }

    public double getActionType() {
        return ActionType;
    }

    public void setActionType(double actionType) {
        ActionType = actionType;
    }

    public int getCity_Id() {
        return City_Id;
    }

    public void setCity_Id(int city_Id) {
        City_Id = city_Id;
    }

    public String getCity_Code() {
        return City_Code;
    }

    public void setCity_Code(String city_Code) {
        City_Code = city_Code;
    }

    public String getCity_Name() {
        return City_Name;
    }

    public void setCity_Name(String city_Name) {
        City_Name = city_Name;
    }

    public int getCounty_Id() {
        return County_Id;
    }

    public void setCounty_Id(int county_Id) {
        County_Id = county_Id;
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
