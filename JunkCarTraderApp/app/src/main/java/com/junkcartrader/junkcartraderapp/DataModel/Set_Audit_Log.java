package com.junkcartrader.junkcartraderapp.DataModel;

/**
 * Created by hassanbaig on 2/7/2015.
 */
import java.util.Date;

public class Set_Audit_Log
{
    private long Audit_Id;
    private int Primary_Key;
    private long Previous_Audit_Id;
    private String Action_Type;
    private Date Log_Date;
    private String Action_Component;
    private String Old_Record_XML;
    private String New_Record_XML;
    private int User_Code;
    private String User_IP;
    private byte Is_Active;
    private int Site_Id;

    public Set_Audit_Log()
    {

    }

    public long getAudit_Id() {
        return Audit_Id;
    }

    public void setAudit_Id(long audit_Id) {
        Audit_Id = audit_Id;
    }

    public int getPrimary_Key() {
        return Primary_Key;
    }

    public void setPrimary_Key(int primary_Key) {
        Primary_Key = primary_Key;
    }

    public long getPrevious_Audit_Id() {
        return Previous_Audit_Id;
    }

    public void setPrevious_Audit_Id(long previous_Audit_Id) {
        Previous_Audit_Id = previous_Audit_Id;
    }

    public String getAction_Type() {
        return Action_Type;
    }

    public void setAction_Type(String action_Type) {
        Action_Type = action_Type;
    }

    public Date getLog_Date() {
        return Log_Date;
    }

    public void setLog_Date(Date log_Date) {
        Log_Date = log_Date;
    }

    public String getAction_Component() {
        return Action_Component;
    }

    public void setAction_Component(String action_Component) {
        Action_Component = action_Component;
    }

    public String getOld_Record_XML() {
        return Old_Record_XML;
    }

    public void setOld_Record_XML(String old_Record_XML) {
        Old_Record_XML = old_Record_XML;
    }

    public String getNew_Record_XML() {
        return New_Record_XML;
    }

    public void setNew_Record_XML(String new_Record_XML) {
        New_Record_XML = new_Record_XML;
    }

    public int getUser_Code() {
        return User_Code;
    }

    public void setUser_Code(int user_Code) {
        User_Code = user_Code;
    }

    public String getUser_IP() {
        return User_IP;
    }

    public void setUser_IP(String user_IP) {
        User_IP = user_IP;
    }

    public byte getIs_Active() {
        return Is_Active;
    }

    public void setIs_Active(byte is_Active) {
        Is_Active = is_Active;
    }

    public int getSite_Id() {
        return Site_Id;
    }

    public void setSite_Id(int site_Id) {
        Site_Id = site_Id;
    }


}