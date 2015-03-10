package com.junkcartrader.junkcartraderapp.DataModel;

/**
 * Created by hassanbaig on 2/7/2015.
 */
public class RegisterUser_Result {

    private int Customer_Id;
    private String Login_Password;

    public RegisterUser_Result() {
    }

    public String getLogin_Password() {
        return Login_Password;
    }

    public void setLogin_Password(String login_Password) {
        Login_Password = login_Password;
    }

    public int getCustomer_Id() {
        return Customer_Id;
    }

    public void setCustomer_Id(int customer_Id) {
        Customer_Id = customer_Id;
    }
}
