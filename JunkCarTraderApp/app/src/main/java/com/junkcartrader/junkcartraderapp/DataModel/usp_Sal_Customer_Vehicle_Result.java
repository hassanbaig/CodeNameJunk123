package com.junkcartrader.junkcartraderapp.DataModel;

/**
 * Created by hassanbaig on 2/7/2015.
 */
import java.util.Date;

public class usp_Sal_Customer_Vehicle_Result
{
    private double ActionType;
    private int Customer_Vehicle_Id;
    private int Customer_Offer_Id;
    private String Registration_No;
    private int Registration_Year;
    private int Manufacturing_Year;
    private String Insurance_No;
    private String Inspection_No;
    private String Image_Path;
    private int Image_Count;
    private String Remarks;
    private byte Is_Active;
    private Date Created_Date;
    private int Created_By;
    private Date Modified_Date;
    private int Modified_By;
    private long Audit_Id;
    private String User_IP;
    private int Site_Id ;



    public usp_Sal_Customer_Vehicle_Result()
    {

    }

    public double getActionType() {
        return ActionType;
    }

    public void setActionType(double actionType) {
        ActionType = actionType;
    }

    public int getCustomer_Vehicle_Id() {
        return Customer_Vehicle_Id;
    }

    public void setCustomer_Vehicle_Id(int customer_Vehicle_Id) {
        Customer_Vehicle_Id = customer_Vehicle_Id;
    }

    public int getCustomer_Offer_Id() {
        return Customer_Offer_Id;
    }

    public void setCustomer_Offer_Id(int customer_Offer_Id) {
        Customer_Offer_Id = customer_Offer_Id;
    }

    public String getRegistration_No() {
        return Registration_No;
    }

    public void setRegistration_No(String registration_No) {
        Registration_No = registration_No;
    }

    public int getRegistration_Year() {
        return Registration_Year;
    }

    public void setRegistration_Year(int registration_Year) {
        Registration_Year = registration_Year;
    }

    public int getManufacturing_Year() {
        return Manufacturing_Year;
    }

    public void setManufacturing_Year(int manufacturing_Year) {
        Manufacturing_Year = manufacturing_Year;
    }

    public String getInsurance_No() {
        return Insurance_No;
    }

    public void setInsurance_No(String insurance_No) {
        Insurance_No = insurance_No;
    }

    public String getInspection_No() {
        return Inspection_No;
    }

    public void setInspection_No(String inspection_No) {
        Inspection_No = inspection_No;
    }

    public String getImage_Path() {
        return Image_Path;
    }

    public void setImage_Path(String image_Path) {
        Image_Path = image_Path;
    }

    public int getImage_Count() {
        return Image_Count;
    }

    public void setImage_Count(int image_Count) {
        Image_Count = image_Count;
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
