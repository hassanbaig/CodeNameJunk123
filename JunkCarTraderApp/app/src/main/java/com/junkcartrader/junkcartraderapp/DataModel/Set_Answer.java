package com.junkcartrader.junkcartraderapp.DataModel;

/**
 * Created by hassanbaig on 2/7/2015.
 */
import java.util.Date;

public class Set_Answer
{
    private int Answer_Id;
    private String Answer;
    private short Sort_Order;
    private byte Is_Active;
    private Date Created_Date;
    private int Created_By;
    private Date Modified_Date;
    private int Modified_By;
    private long Audit_Id;
    private String User_IP;
    private int Site_Id;


    public Set_Answer()
    {

    }

    public int getAnswer_Id() {
        return Answer_Id;
    }

    public void setAnswer_Id(int answer_Id) {
        Answer_Id = answer_Id;
    }

    public String getAnswer() {
        return Answer;
    }

    public void setAnswer(String answer) {
        Answer = answer;
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
