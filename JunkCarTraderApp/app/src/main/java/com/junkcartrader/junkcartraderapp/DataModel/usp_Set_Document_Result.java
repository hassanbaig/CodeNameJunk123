package com.junkcartrader.junkcartraderapp.DataModel;

/**
 * Created by hassanbaig on 2/7/2015.
 */
import java.util.Date;

public  class usp_Set_Document_Result
{
    private double ActionType;
    private int Document_Id;
    private String Document_Code ;
    private String Document_Name ;
    private String Document_Description ;
    private short Sort_Order ;
    private int Created_By ;
    private Date Created_Date ;
    private int Modified_By ;
    private Date Modified_Date ;
    private byte Is_Active ;
    private String User_IP ;
    private long Audit_Id ;
    private int Site_Id ;

    public usp_Set_Document_Result()
    {

    }

    public double getActionType() {
        return ActionType;
    }

    public void setActionType(double actionType) {
        ActionType = actionType;
    }

    public int getDocument_Id() {
        return Document_Id;
    }

    public void setDocument_Id(int document_Id) {
        Document_Id = document_Id;
    }

    public String getDocument_Code() {
        return Document_Code;
    }

    public void setDocument_Code(String document_Code) {
        Document_Code = document_Code;
    }

    public String getDocument_Name() {
        return Document_Name;
    }

    public void setDocument_Name(String document_Name) {
        Document_Name = document_Name;
    }

    public String getDocument_Description() {
        return Document_Description;
    }

    public void setDocument_Description(String document_Description) {
        Document_Description = document_Description;
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
