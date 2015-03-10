package com.junkcartrader.junkcartraderapp.DataModel;

/**
 * Created by hassanbaig on 2/7/2015.
 */
import java.util.Date;

public class usp_Set_Site_Contact_Result
{
    private double ActionType;
    private int Site_Contact_Id ;
    private int Site_Id ;
    private int Contact_Type_Id ;
    private boolean Is_Default;
    private String User_Contact ;
    private int City_Id ;
    private int State_Id ;
    private int Country_Id ;
    private String Zip_Code ;
    private short Sort_Order ;
    private int Created_By ;
    private Date Created_Date ;
    private int Modified_By ;
    private Date Modified_Date ;
    private byte Is_Active ;
    private String User_IP ;
    private long Audit_Id ;

    public usp_Set_Site_Contact_Result()
    {

    }

    public double getActionType() {
        return ActionType;
    }

    public void setActionType(double actionType) {
        ActionType = actionType;
    }

    public int getSite_Contact_Id() {
        return Site_Contact_Id;
    }

    public void setSite_Contact_Id(int site_Contact_Id) {
        Site_Contact_Id = site_Contact_Id;
    }

    public int getSite_Id() {
        return Site_Id;
    }

    public void setSite_Id(int site_Id) {
        Site_Id = site_Id;
    }

    public int getContact_Type_Id() {
        return Contact_Type_Id;
    }

    public void setContact_Type_Id(int contact_Type_Id) {
        Contact_Type_Id = contact_Type_Id;
    }

    public boolean isIs_Default() {
        return Is_Default;
    }

    public void setIs_Default(boolean is_Default) {
        Is_Default = is_Default;
    }

    public String getUser_Contact() {
        return User_Contact;
    }

    public void setUser_Contact(String user_Contact) {
        User_Contact = user_Contact;
    }

    public int getCity_Id() {
        return City_Id;
    }

    public void setCity_Id(int city_Id) {
        City_Id = city_Id;
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

    public String getZip_Code() {
        return Zip_Code;
    }

    public void setZip_Code(String zip_Code) {
        Zip_Code = zip_Code;
    }

    public short getSort_Order() {
        return Sort_Order;
    }

    public void setSort_Order(short sort_Order) {
        Sort_Order = sort_Order;
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


}
