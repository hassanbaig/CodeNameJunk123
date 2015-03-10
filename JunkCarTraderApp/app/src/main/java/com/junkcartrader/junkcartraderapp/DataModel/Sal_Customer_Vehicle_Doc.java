package com.junkcartrader.junkcartraderapp.DataModel;

import java.util.Date;

/**
 * Created by hassanbaig on 2/7/2015.
 */
public class Sal_Customer_Vehicle_Doc
{
    private int Customer_Vehicle_Doc_Id;
    private int Customer_Vehicle_Id;
    private int Document_Id;
    private String Document_No;
    private String Document_Path;
    private String Document_Details;
    private String Remarks;
    private byte Is_Active;
    private Date Created_Date;
    private int Created_By;
    private Date Modified_Date;
    private int Modified_By;
    private long Audit_Id;
    private String User_IP;
    private int Site_Id;

    public Sal_Customer_Vehicle_Doc()
    {

    }

    public int getCustomer_Vehicle_Doc_Id() {
        return Customer_Vehicle_Doc_Id;
    }

    public void setCustomer_Vehicle_Doc_Id(int customer_Vehicle_Doc_Id) {
        Customer_Vehicle_Doc_Id = customer_Vehicle_Doc_Id;
    }

    public int getCustomer_Vehicle_Id() {
        return Customer_Vehicle_Id;
    }

    public void setCustomer_Vehicle_Id(int customer_Vehicle_Id) {
        Customer_Vehicle_Id = customer_Vehicle_Id;
    }

    public int getDocument_Id() {
        return Document_Id;
    }

    public void setDocument_Id(int document_Id) {
        Document_Id = document_Id;
    }

    public String getDocument_No() {
        return Document_No;
    }

    public void setDocument_No(String document_No) {
        Document_No = document_No;
    }

    public String getDocument_Path() {
        return Document_Path;
    }

    public void setDocument_Path(String document_Path) {
        Document_Path = document_Path;
    }

    public String getDocument_Details() {
        return Document_Details;
    }

    public void setDocument_Details(String document_Details) {
        Document_Details = document_Details;
    }

    public String getRemarks() {
        return Remarks;
    }

    public void setRemarks(String remarks) {
        Remarks = remarks;
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

