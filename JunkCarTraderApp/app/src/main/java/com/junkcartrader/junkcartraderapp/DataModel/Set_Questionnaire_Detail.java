package com.junkcartrader.junkcartraderapp.DataModel;

/**
 * Created by hassanbaig on 2/7/2015.
 */
import java.util.Date;
import java.util.List;

public  class Set_Questionnaire_Detail
{
    private int Questionnaire_Detail_Id;
    private int Questionnaire_Id;
    private int Question_Id;
    private Set_Question Question;
    private int Answer_Id;
    private List<Set_Answer> Answers;
    private short Sort_Order;
    private byte Is_Active;
    private Date Created_Date;
    private int Created_By;
    private Date Modified_Date;
    private int Modified_By;
    private long Audit_Id;
    private String User_IP;
    private int Site_Id;
    private int Sub_Questionnaire_Id;


    public Set_Questionnaire_Detail()
    {

    }

    public int getQuestionnaire_Detail_Id() {
        return Questionnaire_Detail_Id;
    }

    public void setQuestionnaire_Detail_Id(int questionnaire_Detail_Id) {
        Questionnaire_Detail_Id = questionnaire_Detail_Id;
    }

    public int getQuestionnaire_Id() {
        return Questionnaire_Id;
    }

    public void setQuestionnaire_Id(int questionnaire_Id) {
        Questionnaire_Id = questionnaire_Id;
    }

    public int getQuestion_Id() {
        return Question_Id;
    }

    public void setQuestion_Id(int question_Id) {
        Question_Id = question_Id;
    }

    public Set_Question getQuestion() {
        return Question;
    }

    public void setQuestion(Set_Question question) {
        Question = question;
    }

    public int getAnswer_Id() {
        return Answer_Id;
    }

    public void setAnswer_Id(int answer_Id) {
        Answer_Id = answer_Id;
    }

    public List<Set_Answer> getAnswers() {
        return Answers;
    }

    public void setAnswers(List<Set_Answer> answers) {
        Answers = answers;
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

    public int getSub_Questionnaire_Id() {
        return Sub_Questionnaire_Id;
    }

    public void setSub_Questionnaire_Id(int sub_Questionnaire_Id) {
        Sub_Questionnaire_Id = sub_Questionnaire_Id;
    }


}
