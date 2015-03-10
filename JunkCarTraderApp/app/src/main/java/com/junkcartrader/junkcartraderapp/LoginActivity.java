package com.junkcartrader.junkcartraderapp;

import android.app.Activity;
import android.app.ProgressDialog;
import android.content.Context;
import android.os.AsyncTask;
import android.support.v7.app.ActionBarActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ProgressBar;
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
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;

import static com.junkcartrader.junkcartraderapp.R.style.ProgressBar;


public class LoginActivity extends Activity {
    final Context context = this;
    private  final String BASE_URL = URLHelper.GetBaseUrl();
    private  String SERVICE_URL = BASE_URL + "Accounts/Authenticate";
    public ProgressDialog dialog;
private Button btnLogin;
    public EditText etUserId, etPassword;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        // Full screen
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,
                WindowManager.LayoutParams.FLAG_FULLSCREEN);
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        Initialize();
    }

    private void Initialize() {
        btnLogin = (Button) findViewById(R.id.btnLoginLogin);
        etUserId = (EditText) findViewById(R.id.etUserIdLogin);
        etPassword = (EditText) findViewById(R.id.etPasswordLogin);
        btnLogin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                dialog = ProgressDialog.show(context,
                        "Loading...", "Please wait...", false);
                //dialog.setProgressStyle(R.style.ProgressBar);
                dialog.show();
                retrieveSampleData();
            }
        });
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_login, menu);
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
    public void retrieveSampleData(View vw) {
        WebServiceTask wst = new WebServiceTask(WebServiceTask.GET_TASK, this, "Getting data...");
        wst.execute(new String[]{SERVICE_URL});
    }
    public void retrieveSampleData() {
        String userId = etUserId.getText().toString();
        String password = etPassword.getText().toString();
        SERVICE_URL +="?" + "password="+ password + "&"
                          + "userId=" + userId;
        WebServiceTask wst = new WebServiceTask(WebServiceTask.GET_TASK, this, "Getting data...");
        wst.execute(new String[]{SERVICE_URL});
    }
    public void postData() {
        WebServiceTask wst = new WebServiceTask(WebServiceTask.POST_TASK, this, "Posting data...");
        // the passed String is the URL we will POST to
        wst.execute(new String[]{SERVICE_URL});
    }

    public void clearControls() {
        etUserId.setText("");
        etPassword.setText("");
        SERVICE_URL = BASE_URL + "Accounts/Authenticate";
    }

    public void handleResponse(String response) {
        final Context context = this;
        try {
            JSONObject jso = new JSONObject(response);
            dialog.dismiss();
            final String isAuthenticated = jso.getString("IsAuthenticated");
            //Toast.makeText(context, jso.toString(), Toast.LENGTH_LONG);
            clearControls();
            etUserId.setText(isAuthenticated);
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
