package com.junkcartrader.junkcartraderapp.DataModel;

/**
 * Created by hassanbaig on 2/7/2015.
 */
import java.util.Date;

public class Set_Contact_Type
{
    private int Contact_Type_Id;
    private String Contact_Type;
    private String Contact_Type_Description;
    private boolean Is_Location;
    private short Sort_Order;
    private int Created_By;
    private Date Created_Date;
    private int Modified_By;
    private Date Modified_Date;
    private byte Is_Active;
    private String User_IP;
    private long Audit_Id;
    private int Site_Id;

    public Set_Contact_Type()
    {

    }

    public int getContact_Type_Id() {
        return Contact_Type_Id;
    }

    public void setContact_Type_Id(int contact_Type_Id) {
        Contact_Type_Id = contact_Type_Id;
    }

    public String getContact_Type() {
        return Contact_Type;
    }

    public void setContact_Type(String contact_Type) {
        Contact_Type = contact_Type;
    }

    public String getContact_Type_Description() {
        return Contact_Type_Description;
    }

    public void setContact_Type_Description(String contact_Type_Description) {
        Contact_Type_Description = contact_Type_Description;
    }

    public boolean isIs_Location() {
        return Is_Location;
    }

    public void setIs_Location(boolean is_Location) {
        Is_Location = is_Location;
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

    public int getSite_Id() {
        return Site_Id;
    }

    public void setSite_Id(int site_Id) {
        Site_Id = site_Id;
    }


}
