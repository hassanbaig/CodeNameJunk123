package com.junkcartrader.junkcartraderapp;

import android.app.Activity;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.SharedPreferences;
import android.net.Uri;
import android.os.AsyncTask;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentTransaction;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.ActionBar;
import android.support.v7.app.ActionBarActivity;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.Spinner;

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
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;


public class MainActivity extends ActionBarActivity
        implements NavigationDrawerFragment.NavigationDrawerCallbacks,LocationFragment.OnFragmentInteractionListener,OfferFragment.OnFragmentInteractionListener,PhotoFragment.OnFragmentInteractionListener,SettingsFragment.OnFragmentInteractionListener,ChangePasswordFragment.OnFragmentInteractionListener,EditProfileFragment.OnFragmentInteractionListener{

    private NavigationDrawerFragment mNavigationDrawerFragment;
    private final String BASE_URL = URLHelper.GetBaseUrl();
    private String SERVICE_URL = BASE_URL;
    private ProgressDialog dialog;
    private Button btnNextMain;
    private Spinner spRegistrationYears, spMakes, spModels, spCylinders;
    private Integer operationType;
    private CharSequence mTitle;
    android.app.Fragment settingsFragment;
    android.app.FragmentTransaction fragmentTransaction;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mNavigationDrawerFragment = (NavigationDrawerFragment)
                getSupportFragmentManager().findFragmentById(R.id.navigation_drawer);
        mTitle = getTitle();

        mNavigationDrawerFragment.setUp(
                R.id.navigation_drawer,
                (DrawerLayout) findViewById(R.id.drawer_layout));
    }

    @Override
    public void onNavigationDrawerItemSelected(int position) {
        FragmentManager fragmentManager = getSupportFragmentManager();
        fragmentManager.beginTransaction()
                .replace(R.id.container, PlaceholderFragment.newInstance(position + 1))
                .commit();
    }

    public void onSectionAttached(int number) {
        switch (number) {
            case 1:
                mTitle = getString(R.string.section_Home);
                //Intent intent;
                break;
            case 2:
                mTitle = getString(R.string.section_Settings);
                /*finish();
                intent=new Intent(this,SettingsActivity.class);
                startActivity(intent);*/
                break;
            case 3:
                mTitle = getString(R.string.section_Logout);
                /*SharedPreferences sharedPreferences=getSharedPreferences("AppData",Context.MODE_PRIVATE);
                SharedPreferences.Editor editor=sharedPreferences.edit();
                editor.remove("email");
                editor.remove("password");
                editor.commit();
                finish();
                intent=new Intent(this,LoginActivity.class);
                startActivity(intent);*/
                break;
        }
    }

    public String GetEmail()
    {
        SharedPreferences sharedPreferences=getSharedPreferences("AppData",MODE_PRIVATE);
        String email=sharedPreferences.getString("email","");
        return email;

    }

    public String GetPassword()
    {
        SharedPreferences sharedPreferences=getSharedPreferences("AppData",MODE_PRIVATE);
        String password=sharedPreferences.getString("password","");
        return password;

    }

    public void restoreActionBar() {
        ActionBar actionBar = getSupportActionBar();
        actionBar.setNavigationMode(ActionBar.NAVIGATION_MODE_STANDARD);
        actionBar.setDisplayShowTitleEnabled(true);
        actionBar.setTitle(mTitle);

    }


    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        if (!mNavigationDrawerFragment.isDrawerOpen()) {
            // Only show items in the action bar relevant to this screen
            // if the drawer is not showing. Otherwise, let the drawer
            // decide what to show in the action bar.
            getMenuInflater().inflate(R.menu.main, menu);
            restoreActionBar();
            return true;
        }
        return super.onCreateOptionsMenu(menu);
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

    @Override
    public void onAttach(MainActivity activity) {

    }

    @Override
    public void onFragmentInteraction(Uri uri) {

    }


    public static class PlaceholderFragment extends Fragment {
        private final String BASE_URL = URLHelper.GetBaseUrl();
        private String SERVICE_URL = BASE_URL;
        private ProgressDialog dialog;
        private Button btnNextMain;
        private Spinner spRegistrationYears, spMakes, spModels, spCylinders;
        private Integer operationType;

        ArrayAdapter<String> yearsAdapter,makesAdapter, modelsAdapter, cylindersAdapter;
        JSONArray makesJSON,modelsJSON;
        List<String> makesList,modelsList;
        String[] years,cylinders;
        String yearsResponse,cylindersResponse,email;
        FragmentTransaction fragmentTransaction;
        Fragment locationFragment;
        Bundle args;

        View rootView;

        private static final String ARG_SECTION_NUMBER = "section_number";

        public static PlaceholderFragment newInstance(int sectionNumber) {
            PlaceholderFragment fragment = new PlaceholderFragment();
            Bundle args = new Bundle();
            args.putInt(ARG_SECTION_NUMBER, sectionNumber);
            fragment.setArguments(args);
            return fragment;
        }

        public PlaceholderFragment() {
        }

        @Override
        public View onCreateView(LayoutInflater inflater, ViewGroup container,
                                 Bundle savedInstanceState) {
            rootView = inflater.inflate(R.layout.fragment_main, container, false);
            Initialize();
            MainActivity mainActivity=(MainActivity)getActivity();
            //email=mainActivity.GetEmail();
            return rootView;
        }

        private void Initialize() {
            spRegistrationYears = (Spinner) rootView.findViewById(R.id.spRegistrationYearsMain);
            spMakes = (Spinner) rootView.findViewById(R.id.spMakesMain);
            spModels = (Spinner) rootView.findViewById(R.id.spModelsMain);
            spCylinders = (Spinner) rootView.findViewById(R.id.spCylindersMain);
            spRegistrationYears.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
                @Override
                public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                    GetMakes(spRegistrationYears.getSelectedItem().toString());
                }

                @Override
                public void onNothingSelected(AdapterView<?> parent) {

                }
            });
            spMakes.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
                @Override
                public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                    try {
                        GetModels(spRegistrationYears.getSelectedItem().toString(),makesJSON.getJSONObject(position).getString("Make_Id"));
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                }

                @Override
                public void onNothingSelected(AdapterView<?> parent) {

                }
            });

            btnNextMain = (Button) rootView.findViewById(R.id.btnNextMain);
            btnNextMain.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    try {

                        locationFragment = new LocationFragment();
                        fragmentTransaction = getFragmentManager().beginTransaction();
                        args = new Bundle();
                        args.putString("Year", spRegistrationYears.getSelectedItem().toString());
                        args.putString("Make", spMakes.getSelectedItem().toString());
                        args.putString("MakeId", makesJSON.getJSONObject(spMakes.getSelectedItemPosition()).getString("Make_Id"));
                        args.putString("Model", spModels.getSelectedItem().toString());
                        args.putString("ModelId", modelsJSON.getJSONObject(spModels.getSelectedItemPosition()).getString("Model_Id"));
                        args.putString("Cylinders", spCylinders.getSelectedItem().toString());
                        //args.putString("email",email);
                        locationFragment.setArguments(args);
                        fragmentTransaction.replace(R.id.container, locationFragment);
                        fragmentTransaction.commit();
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                }
            });
            operationType = 0;
            yearsResponse = "";
            GetCylinders();
        }

        @Override
        public void onAttach(Activity activity) {
            super.onAttach(activity);
            ((MainActivity) activity).onSectionAttached(
                    getArguments().getInt(ARG_SECTION_NUMBER));
        }

        public void GetRegistrationYears() {
            dialog = ProgressDialog.show(getActivity(),
                    "Loading...", "Please wait...", false);
            dialog.show();
            operationType = 1;
            SERVICE_URL = BASE_URL + "Home/GetRegistrationYears";
            WebServiceTask wst = new WebServiceTask(WebServiceTask.GET_TASK, getActivity(), "Getting data...");
            wst.execute(new String[]{SERVICE_URL});
        }

        public void GetMakes(String year) {
            dialog = ProgressDialog.show(getActivity(),
                    "Loading...", "Please wait...", false);
            dialog.show();
            operationType = 2;
            SERVICE_URL = BASE_URL + "Home/GetMakes?year=" + year;
            WebServiceTask wst = new WebServiceTask(WebServiceTask.GET_TASK, getActivity(), "Getting data...");
            wst.execute(new String[]{SERVICE_URL});
        }

        public void GetModels(String year, String makeId) {
            dialog = ProgressDialog.show(getActivity(),
                    "Loading...", "Please wait...", false);
            dialog.show();
            operationType = 3;
            SERVICE_URL = BASE_URL + "Home/GetModels?year=" + year + "&makeId=" + makeId;
            WebServiceTask wst = new WebServiceTask(WebServiceTask.GET_TASK, getActivity(), "Getting data...");
            wst.execute(new String[]{SERVICE_URL});
        }

        public void GetCylinders() {
            dialog = ProgressDialog.show(getActivity(),
                    "Loading...", "Please wait...", false);
            dialog.show();
            operationType = 4;
            SERVICE_URL = BASE_URL + "Home/GetCylinders";
            WebServiceTask wst = new WebServiceTask(WebServiceTask.GET_TASK, getActivity(), "Getting data...");
            wst.execute(new String[]{SERVICE_URL});
        }

        public void Logout() {
            dialog = ProgressDialog.show(getActivity(),
                    "Loading...", "Please wait...", false);
            dialog.show();
            operationType = 1;
            SERVICE_URL = BASE_URL + "Home/GetRegistrationYears";
            WebServiceTask wst = new WebServiceTask(WebServiceTask.GET_TASK, getActivity(), "Getting data...");
            wst.execute(new String[]{SERVICE_URL});
        }

        public void clearControls() {
            SERVICE_URL = BASE_URL;
        }

        public void handleResponse(String response) {
            try {
                JSONObject jso = new JSONObject(response);
                dialog.dismiss();
                switch (operationType) {
                    case 1:
                        yearsResponse = jso.get("$values").toString().replace("[", "").replace("]", "");
                        years = yearsResponse.split(",");
                        yearsAdapter = new ArrayAdapter<String>
                                (getActivity(), android.R.layout.simple_spinner_item, years);
                        yearsAdapter.setDropDownViewResource
                                (android.R.layout.simple_spinner_dropdown_item);
                        spRegistrationYears.setAdapter(yearsAdapter);
                        break;
                    case 2:
                        makesJSON = new JSONArray(jso.get("$values").toString());
                        makesList = new ArrayList<String>();
                        makesList.clear();
                        for(int i = 0; i < makesJSON.length(); i++){
                            makesList.add(makesJSON.getJSONObject(i).getString("Make_Name"));
                        }

                        makesAdapter = new ArrayAdapter<String>
                                (getActivity(), android.R.layout.simple_spinner_item, makesList);
                        makesAdapter.setDropDownViewResource
                                (android.R.layout.simple_spinner_dropdown_item);
                        spMakes.setAdapter(makesAdapter);
                        break;
                    case 3:
                        modelsJSON = new JSONArray(jso.get("$values").toString());
                        modelsList = new ArrayList<String>();
                        modelsList.clear();
                        for(int i = 0; i < modelsJSON.length(); i++){
                            modelsList.add(modelsJSON.getJSONObject(i).getString("Model_Name"));
                        }

                        modelsAdapter = new ArrayAdapter<String>
                                (getActivity(), android.R.layout.simple_spinner_item, modelsList);
                        modelsAdapter.setDropDownViewResource
                                (android.R.layout.simple_spinner_dropdown_item);
                        spModels.setAdapter(modelsAdapter);
                        break;
                    case 4:
                        cylindersResponse = jso.get("$values").toString().replace("[", "").replace("]", "");
                        cylinders = cylindersResponse.split(",");
                        cylindersAdapter = new ArrayAdapter<String>
                                (getActivity(), android.R.layout.simple_spinner_item, cylinders);
                        cylindersAdapter.setDropDownViewResource
                                (android.R.layout.simple_spinner_dropdown_item);
                        spCylinders.setAdapter(cylindersAdapter);
                        if (spCylinders.getCount() > 0) {
                            GetRegistrationYears();
                        }
                        break;
                    default:
                        break;
                }
                clearControls();

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
}
