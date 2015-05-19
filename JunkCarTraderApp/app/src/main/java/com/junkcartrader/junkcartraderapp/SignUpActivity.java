package com.junkcartrader.junkcartraderapp;

import android.app.Activity;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.Toast;

import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.params.BasicHttpParams;
import org.apache.http.params.HttpConnectionParams;
import org.apache.http.params.HttpParams;
import org.json.JSONArray;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;


public class SignUpActivity extends Activity {

    final Context context = this;
    public Integer operationType;
    private  final String BASE_URL = URLHelper.GetBaseUrl();
    private  String SERVICE_URL = BASE_URL;
    public ProgressDialog dialog;
    private Button btnSignUp;
    public EditText etEmailSignUp, etPasswordSignUp,etConfirmPasswordSignUp,etSecurityAnswerSignUp,
                    etNameSignUp,etAddressSignUp,etContactNumberSignUp,etZipCodeSignUp;
    public String email,password,confirmPassword,securityQuestion,securityAnswer,name,address,phoneNumber,zipCode;
    public Spinner spSecurityQuestionSignUp;
    JSONArray questionsJSON;
    List<String> questionsList;
    ArrayAdapter<String> questionsAdapter;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sign_up);
        Initialize();
        GetAllSecurityQuestion();
    }


    private void Initialize() {
        btnSignUp = (Button) findViewById(R.id.btnSignUp);
        spSecurityQuestionSignUp=(Spinner)findViewById(R.id.spSecurityQuestionSignUp);

        etEmailSignUp = (EditText) findViewById(R.id.etEmailSignUp);
        etPasswordSignUp = (EditText) findViewById(R.id.etPasswordSignUp);
        etConfirmPasswordSignUp = (EditText) findViewById(R.id.etConfirmPasswordSignUp);
        etSecurityAnswerSignUp = (EditText) findViewById(R.id.etSecurityAnswerSignUp);
        etNameSignUp = (EditText) findViewById(R.id.etNameSignUp);
        etAddressSignUp = (EditText) findViewById(R.id.etAddressSignUp);
        etContactNumberSignUp = (EditText) findViewById(R.id.etContactNumberSignUp);
        etZipCodeSignUp = (EditText) findViewById(R.id.etZipCodeSignUp);
        btnSignUp.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
        try {
            email = etEmailSignUp.getText().toString().replace(" ","%20");
            password = etPasswordSignUp.getText().toString().replace(" ", "%20");
            confirmPassword = etConfirmPasswordSignUp.getText().toString().replace(" ", "%20");
            securityQuestion = questionsJSON.getJSONObject(spSecurityQuestionSignUp.getSelectedItemPosition()).getString("Password_Question_Id");
            securityAnswer = etSecurityAnswerSignUp.getText().toString().replace(" ", "%20");
            name = etNameSignUp.getText().toString().replace(" ", "%20");
            address = etAddressSignUp.getText().toString().replace(" ", "%20");
            phoneNumber = etContactNumberSignUp.getText().toString().replace(" ", "%20");
            zipCode = etZipCodeSignUp.getText().toString().replace(" ", "%20");

            if(email.equals(""))
            {
                Toast.makeText(SignUpActivity.this,"Please enter a valid email address",Toast.LENGTH_SHORT).show();
            }
            else if(password.equals(""))
            {
                Toast.makeText(SignUpActivity.this,"Please enter a password",Toast.LENGTH_SHORT).show();
            }
            else if(confirmPassword.equals(""))
            {
                Toast.makeText(SignUpActivity.this,"Please confirm your entered password",Toast.LENGTH_SHORT).show();
            }
            else if(securityAnswer.equals(""))
            {
                Toast.makeText(SignUpActivity.this,"Please enter a security answer",Toast.LENGTH_SHORT).show();
            }
            else if(name.equals(""))
            {
                Toast.makeText(SignUpActivity.this,"Please enter your name",Toast.LENGTH_SHORT).show();
            }
            else if(address.equals(""))
            {
                Toast.makeText(SignUpActivity.this,"Please enter your address",Toast.LENGTH_SHORT).show();
            }
            else if(phoneNumber.equals(""))
            {
                Toast.makeText(SignUpActivity.this,"Please enter your phone number",Toast.LENGTH_SHORT).show();
            }
            else if(zipCode.equals(""))
            {
                Toast.makeText(SignUpActivity.this,"Please enter your Zip-Code",Toast.LENGTH_SHORT).show();
            }
            else if(!password.equals(confirmPassword))
            {
                Toast.makeText(SignUpActivity.this,"The passwords do not match!",Toast.LENGTH_SHORT).show();
            }
            else
            {
                Signup(address,email,name,password,phoneNumber,zipCode,securityQuestion,securityAnswer);
            }
        }catch (Exception e){}

            }
        });
    }


    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_sign_up, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }



    public void GetAllSecurityQuestion() {
        dialog = ProgressDialog.show(this,
                "Loading...", "Please wait...", false);
        dialog.show();
        operationType = 1;
        SERVICE_URL = BASE_URL + "Accounts/GetAllSecurityQuestion";
        WebServiceTask wst = new WebServiceTask(WebServiceTask.GET_TASK, this, "Getting data...");
        wst.execute(new String[]{SERVICE_URL});
    }

    public void Signup(String address, String email, String name, String password, String phone, String zipCode, String questionId, String answer) {
        dialog = ProgressDialog.show(this,
                "Loading...", "Please wait...", false);
        dialog.show();
        operationType = 2;
        SERVICE_URL = BASE_URL + "Accounts/Signup?address="+address
                                    + "&email=" + email
                                    + "&name=" + name
                                    + "&password=" + password
                                    + "&phone=" + phone
                                    + "&zipCode=" + zipCode
                                    + "&questionId=" + questionId
                                    + "&answer=" + answer;
        WebServiceTask wst = new WebServiceTask(WebServiceTask.GET_TASK, this, "Getting data...");
        wst.execute(new String[]{SERVICE_URL});
    }


    public void handleResponse(String response) {
        final Context context = this;
        try {

            dialog.dismiss();
            switch (operationType) {
                case 1:
                    JSONObject jso = new JSONObject(response);
                    questionsJSON=new JSONArray(jso.get("$values").toString());
                    questionsList=new ArrayList<String>();
                    questionsList.clear();
                    for(int i=0;i<questionsJSON.length();i++)
                    {
                        questionsList.add(questionsJSON.getJSONObject(i).getString("Question"));
                    }
                    questionsAdapter=new ArrayAdapter<String>
                            (this,android.R.layout.simple_spinner_item,questionsList);
                    questionsAdapter.setDropDownViewResource
                            (android.R.layout.simple_spinner_dropdown_item);
                    spSecurityQuestionSignUp.setAdapter(questionsAdapter);

                    //btnSignUp.setText(response);
                    break;
                case 2:
                        Toast.makeText(SignUpActivity.this, response.replace("\"",""), Toast.LENGTH_LONG).show();
                        finish();
                        Intent intent = new Intent(context, LoginActivity.class);
                        startActivity(intent);
                    break;
                default:
                    break;
            }
        } catch (Exception e) {
        }
    }


    private class WebServiceTask extends AsyncTask<String, Integer, String> {

        public static final int POST_TASK = 1;
        public static final int GET_TASK = 2;
        private static final String TAG = "WebServiceTask";
        // connection timeout, in milliseconds (waiting to connect)
        private static final int CONN_TIMEOUT = 3000 * 60 * 60 * 10;
        // socket timeout, in milliseconds (waiting for data)
        private static final int SOCKET_TIMEOUT = 5000 * 60 * 60 * 10;
        private int taskType = GET_TASK;
        private Context mContext = null;
        private String processMessage = "Processing...";

        private ArrayList<NameValuePair> params = new ArrayList<NameValuePair>();
        private ProgressDialog pDlg = null;

        public WebServiceTask(int taskType, Context mContext, String processMessage) {
            this.taskType = taskType;
            this.mContext = mContext;
            this.processMessage = processMessage;
        }

        public void addNameValuePair(String name, String value) {
            params.add(new BasicNameValuePair(name, value));
        }

        protected String doInBackground(String... urls) {
            String url = urls[0];
            String result = "";
            HttpResponse response = doResponse(url);
            if (response == null) {
                return result;
            } else {
                try {
                    result = inputStreamToString(response.getEntity().getContent());
                } catch (IllegalStateException e) {
                    Log.e(TAG, e.getLocalizedMessage(), e);
                } catch (IOException e) {
                    Log.e(TAG, e.getLocalizedMessage(), e);
                }
            }
            return result;
        }

        @Override
        protected void onPostExecute(String response) {
            handleResponse(response);
        }

        // Establish connection and socket (data retrieval) timeouts
        private HttpParams getHttpParams() {
            HttpParams htpp = new BasicHttpParams();
            HttpConnectionParams.setConnectionTimeout(htpp, CONN_TIMEOUT);
            HttpConnectionParams.setSoTimeout(htpp, SOCKET_TIMEOUT);
            return htpp;
        }

        private HttpResponse doResponse(String url) {
            // Use our connection and data timeouts as parameters for our
            // DefaultHttpClient
            HttpClient httpclient = new DefaultHttpClient(getHttpParams());
            HttpResponse response = null;
            try {
                switch (taskType) {
                    case POST_TASK:
                        HttpPost httppost = new HttpPost(url);
                        // Add parameters
                        httppost.setEntity(new UrlEncodedFormEntity(params));
                        response = httpclient.execute(httppost);
                        break;
                    case GET_TASK:
                        HttpGet httpget = new HttpGet(url);
                        response = httpclient.execute(httpget);
                        break;
                }
            } catch (Exception e) {
                Log.e(TAG, e.getLocalizedMessage(), e);
            }
            return response;
        }

        private String inputStreamToString(InputStream is) {
            String line = "";
            StringBuilder total = new StringBuilder();
            // Wrap a BufferedReader around the InputStream
            BufferedReader rd = new BufferedReader(new InputStreamReader(is));
            try {
                // Read response until the end
                while ((line = rd.readLine()) != null) {
                    total.append(line);
                }
            } catch (IOException e) {
                Log.e(TAG, e.getLocalizedMessage(), e);
            }
            // Return full string
            return total.toString();
        }
    }

}
