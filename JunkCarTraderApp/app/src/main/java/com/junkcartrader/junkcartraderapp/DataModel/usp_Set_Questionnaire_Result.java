package com.junkcartrader.junkcartraderapp.DataModel;

/**
 * Created by hassanbaig on 2/7/2015.
 */
import java.util.Date;

public  class usp_Set_Questionnaire_Result
{
    private double ActionType;
    private int Questionnaire_Id ;
    private String Questionnaire_Description ;
    private int Parent_Questionnaire_Id ;
    private short Sort_Order ;
    private byte Is_Active ;
    private Date Created_Date;
    private int Created_By ;
    private Date Modified_Date;
    private int Modified_By ;
    private long Audit_Id ;
    private String User_IP ;
    private int Site_Id ;

    public usp_Set_Questionnaire_Result()
    {

    }

    public double getActionType() {
        return ActionType;
    }

    public void setActionType(double actionType) {
        ActionType = actionType;
    }

    public int getQuestionnaire_Id() {
        return Questionnaire_Id;
    }

    public void setQuestionnaire_Id(int questionnaire_Id) {
        Questionnaire_Id = questionnaire_Id;
    }

    public String getQuestionnaire_Description() {
        return Questionnaire_Description;
    }

    public void setQuestionnaire_Description(String questionnaire_Description) {
        Questionnaire_Description = questionnaire_Description;
    }

    public int getParent_Questionnaire_Id() {
        return Parent_Questionnaire_Id;
    }

    public void setParent_Questionnaire_Id(int parent_Questionnaire_Id) {
        Parent_Questionnaire_Id = parent_Questionnaire_Id;
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
