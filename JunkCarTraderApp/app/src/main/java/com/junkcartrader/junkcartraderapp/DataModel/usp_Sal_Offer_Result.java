package com.junkcartrader.junkcartraderapp.DataModel;

/**
 * Created by hassanbaig on 2/7/2015.
 */
import java.util.Date;

public class usp_Sal_Offer_Result
{
    private double ActionType;
    private int Offer_Id;
    private int Model_Year_Id;
    private int Zip_Id;
    private int Questionnaire_Id;
    private int Questionnaire_Result_Id ;
    private int Offer_Price;
    private boolean Is_Negotiable;
    private String Remarks ;
    private byte Is_Active ;
    private Date Created_Date ;
    private int Created_By ;
    private Date Modified_Date ;
    private int Modified_By;
    private long Audit_Id ;
    private String User_IP;
    private int Site_Id;


    public usp_Sal_Offer_Result()
    {

    }

    public double getActionType() {
        return ActionType;
    }

    public void setActionType(double actionType) {
        ActionType = actionType;
    }

    public int getOffer_Id() {
        return Offer_Id;
    }

    public void setOffer_Id(int offer_Id) {
        Offer_Id = offer_Id;
    }

    public int getModel_Year_Id() {
        return Model_Year_Id;
    }

    public void setModel_Year_Id(int model_Year_Id) {
        Model_Year_Id = model_Year_Id;
    }

    public int getZip_Id() {
        return Zip_Id;
    }

    public void setZip_Id(int zip_Id) {
        Zip_Id = zip_Id;
    }

    public int getQuestionnaire_Id() {
        return Questionnaire_Id;
    }

    public void setQuestionnaire_Id(int questionnaire_Id) {
        Questionnaire_Id = questionnaire_Id;
    }

    public int getQuestionnaire_Result_Id() {
        return Questionnaire_Result_Id;
    }

    public void setQuestionnaire_Result_Id(int questionnaire_Result_Id) {
        Questionnaire_Result_Id = questionnaire_Result_Id;
    }

    public int getOffer_Price() {
        return Offer_Price;
    }

    public void setOffer_Price(int offer_Price) {
        Offer_Price = offer_Price;
    }

    public boolean isIs_Negotiable() {
        return Is_Negotiable;
    }

    public void setIs_Negotiable(boolean is_Negotiable) {
        Is_Negotiable = is_Negotiable;
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
