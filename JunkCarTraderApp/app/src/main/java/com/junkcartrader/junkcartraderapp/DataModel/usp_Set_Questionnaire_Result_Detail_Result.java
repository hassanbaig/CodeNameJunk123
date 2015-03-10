package com.junkcartrader.junkcartraderapp.DataModel;

/**
 * Created by hassanbaig on 2/7/2015.
 */
import java.util.Date;

public  class usp_Set_Questionnaire_Result_Detail_Result
{
    private double ActionType;
    private int Questionnaire_Result_Detail_Id;
    private int Questionnaire_Result_Id;
    private int Question_Id ;
    private int Answer_Id;
    private short Sort_Order;
    private byte Is_Active ;
    private Date Created_Date;
    private int Created_By ;
    private Date Modified_Date;
    private int Modified_By ;
    private long Audit_Id;
    private String User_IP ;
    private int Site_Id ;

    public usp_Set_Questionnaire_Result_Detail_Result()
    {

    }

    public double getActionType() {
        return ActionType;
    }

    public void setActionType(double actionType) {
        ActionType = actionType;
    }

    public int getQuestionnaire_Result_Detail_Id() {
        return Questionnaire_Result_Detail_Id;
    }

    public void setQuestionnaire_Result_Detail_Id(int questionnaire_Result_Detail_Id) {
        Questionnaire_Result_Detail_Id = questionnaire_Result_Detail_Id;
    }

    public int getQuestionnaire_Result_Id() {
        return Questionnaire_Result_Id;
    }

    public void setQuestionnaire_Result_Id(int questionnaire_Result_Id) {
        Questionnaire_Result_Id = questionnaire_Result_Id;
    }

    public int getQuestion_Id() {
        return Question_Id;
    }

    public void setQuestion_Id(int question_Id) {
        Question_Id = question_Id;
    }

    public int getAnswer_Id() {
        return Answer_Id;
    }

    public void setAnswer_Id(int answer_Id) {
        Answer_Id = answer_Id;
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
