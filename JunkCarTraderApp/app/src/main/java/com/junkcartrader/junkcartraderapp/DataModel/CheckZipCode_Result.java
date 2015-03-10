package com.junkcartrader.junkcartraderapp.DataModel;

/**
 * Created by hassanbaig on 2/7/2015.
 */
public class CheckZipCode_Result {

    private String Contact_No;
    private int User_Code;
    private boolean Is_Valid_Zip_Code;
    private String Notes;

    public CheckZipCode_Result() {
    }

    public String getContact_No() {
        return Contact_No;
    }
    public void setContact_No(String contact_No) {
        Contact_No = contact_No;
    }
    public int getUser_Code() {
        return User_Code;
    }

    public void setUser_Code(int user_Code) {
        User_Code = user_Code;
    }

    public boolean isIs_Valid_Zip_Code() {
        return Is_Valid_Zip_Code;
    }

    public void setIs_Valid_Zip_Code(boolean is_Valid_Zip_Code) {
        Is_Valid_Zip_Code = is_Valid_Zip_Code;
    }

    public String getNotes() {
        return Notes;
    }

    public void setNotes(String notes) {
        Notes = notes;
    }
}
