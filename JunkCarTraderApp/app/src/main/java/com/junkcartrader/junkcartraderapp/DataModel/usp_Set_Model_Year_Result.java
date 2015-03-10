package com.junkcartrader.junkcartraderapp.DataModel;

/**
 * Created by hassanbaig on 2/7/2015.
 */
import java.util.Date;

public  class usp_Set_Model_Year_Result
{
    private double ActionType;
    private int Model_Year_Id;
    private int Registration_Year;
    private int Make_Id ;
    private int Model_Id;
    private int Offer_Price ;
    private short Sort_Order;
    private byte Is_Active;
    private Date Created_Date ;
    private int Created_By;
    private Date Modified_Date ;
    private int Modified_By;
    private long Audit_Id;
    private String User_IP ;
    private int Site_Id;

    public usp_Set_Model_Year_Result()
    {

    }

    public double getActionType() {
        return ActionType;
    }

    public void setActionType(double actionType) {
        ActionType = actionType;
    }

    public int getModel_Year_Id() {
        return Model_Year_Id;
    }

    public void setModel_Year_Id(int model_Year_Id) {
        Model_Year_Id = model_Year_Id;
    }

    public int getRegistration_Year() {
        return Registration_Year;
    }

    public void setRegistration_Year(int registration_Year) {
        Registration_Year = registration_Year;
    }

    public int getMake_Id() {
        return Make_Id;
    }

    public void setMake_Id(int make_Id) {
        Make_Id = make_Id;
    }

    public int getModel_Id() {
        return Model_Id;
    }

    public void setModel_Id(int model_Id) {
        Model_Id = model_Id;
    }

    public int getOffer_Price() {
        return Offer_Price;
    }

    public void setOffer_Price(int offer_Price) {
        Offer_Price = offer_Price;
    }

    public short getSort_Order() {
        return Sort_Order;
    }

    public void setSort_Order(short sort_Order) {
        Sort_Order = sort_Order;
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
