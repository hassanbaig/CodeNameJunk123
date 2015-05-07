package com.junkcartrader.junkcartraderapp;

import android.app.Activity;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.AsyncTask;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
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


/**
 * A simple {@link Fragment} subclass.
 * Activities that contain this fragment must implement the
 * {@link EditProfileFragment.OnFragmentInteractionListener} interface
 * to handle interaction events.
 * Use the {@link EditProfileFragment#newInstance} factory method to
 * create an instance of this fragment.
 */
public class EditProfileFragment extends Fragment {
    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;

    private  final String BASE_URL = URLHelper.GetBaseUrl();
    private  String SERVICE_URL = BASE_URL;
    private ProgressDialog dialog;
    private Integer operationType;
    private OnFragmentInteractionListener mListener;
    private EditText etNameEditProfile,etAddressEditProfile,etContactNumberEditProfile,etZipCodeEditProfile,etSecurityAnswerEditProfile;
    private Spinner spSecurityQuestionEditProfile;
    private Button btnUpdateProfile;
    ArrayAdapter<String> questionsAdapter;
    JSONArray questionsJSON,profileJSON;
    List<String> questionsList;
    String email,password,name,address,phoneNumber,zipCode,securityQuestion,securityAnswer;
    Bundle args;
    View rootView;

    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment EditProfileFragment.
     */
    // TODO: Rename and change types and number of parameters
    public static EditProfileFragment newInstance(String param1, String param2) {
        EditProfileFragment fragment = new EditProfileFragment();
        Bundle args = new Bundle();
        args.putString(ARG_PARAM1, param1);
        args.putString(ARG_PARAM2, param2);
        fragment.setArguments(args);
        return fragment;
    }

    public EditProfileFragment() {
        // Required empty public constructor
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (getArguments() != null) {
            mParam1 = getArguments().getString(ARG_PARAM1);
            mParam2 = getArguments().getString(ARG_PARAM2);
        }
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        rootView= inflater.inflate(R.layout.fragment_edit_profile, container, false);
        email=getArguments().getString("email");
        password=getArguments().getString("password");
        Initialize();
        GetAllSecurityQuestion();
        return rootView;
    }

    public void Initialize()
    {
        etNameEditProfile=(EditText)rootView.findViewById(R.id.etNameEditProfile);
        etAddressEditProfile=(EditText)rootView.findViewById(R.id.etAddressEditProfile);
        etContactNumberEditProfile=(EditText)rootView.findViewById(R.id.etContactNumberEditProfile);
        etContactNumberEditProfile=(EditText)rootView.findViewById(R.id.etContactNumberEditProfile);
        etZipCodeEditProfile=(EditText)rootView.findViewById(R.id.etZipCodeEditProfile);
        etSecurityAnswerEditProfile=(EditText)rootView.findViewById(R.id.etSecurityAnswerEditProfile);
        spSecurityQuestionEditProfile=(Spinner)rootView.findViewById(R.id.spSecurityQuestionEditProfile);
        btnUpdateProfile=(Button)rootView.findViewById(R.id.btnUpdateProfile);

        btnUpdateProfile.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                try
                {
                name=etNameEditProfile.getText().toString().replace(" ","%20");
                address=etAddressEditProfile.getText().toString().replace(" ", "%20");
                phoneNumber=etContactNumberEditProfile.getText().toString().replace(" ", "%20");
                zipCode=etZipCodeEditProfile.getText().toString().replace(" ", "%20");
                securityQuestion= questionsJSON.getJSONObject(spSecurityQuestionEditProfile.getSelectedItemPosition()).getString("Password_Question_Id");
                securityAnswer=etSecurityAnswerEditProfile.getText().toString().replace(" ", "%20");


                 if(name.equals(""))
                 {
                     Toast.makeText(getActivity(),"Please enter your name",Toast.LENGTH_LONG).show();
                 }
                 else if(address.equals(""))
                 {
                     Toast.makeText(getActivity(),"Please enter your address",Toast.LENGTH_LONG).show();
                 }
                 else if(phoneNumber.equals(""))
                 {
                     Toast.makeText(getActivity(),"Please enter your contact number",Toast.LENGTH_LONG).show();
                 }
                 else if(zipCode.equals(""))
                 {
                     Toast.makeText(getActivity(),"Please enter your zip code",Toast.LENGTH_LONG).show();
                 }
                 else if(securityAnswer.equals(""))
                 {
                     Toast.makeText(getActivity(),"Please enter security answer",Toast.LENGTH_LONG).show();
                 }
                 else
                 {
                     EditProfile(email, name, address, phoneNumber, zipCode, securityQuestion, securityAnswer);
                 }
                }
                catch (Exception e)
                {

                }

            }
        });
    }


    // TODO: Rename method, update argument and hook method into UI event
    public void onButtonPressed(Uri uri) {
        if (mListener != null) {
            mListener.onFragmentInteraction(uri);
        }
    }

    @Override
    public void onAttach(Activity activity) {
        super.onAttach(activity);
        try {
            mListener = (OnFragmentInteractionListener) activity;
        } catch (ClassCastException e) {
            throw new ClassCastException(activity.toString()
                    + " must implement OnFragmentInteractionListener");
        }
    }

    @Override
    public void onDetach() {
        super.onDetach();
        mListener = null;
    }

    /**
     * This interface must be implemented by activities that contain this
     * fragment to allow an interaction in this fragment to be communicated
     * to the activity and potentially other fragments contained in that
     * activity.
     * <p/>
     * See the Android Training lesson <a href=
     * "http://developer.android.com/training/basics/fragments/communicating.html"
     * >Communicating with Other Fragments</a> for more information.
     */
    public interface OnFragmentInteractionListener {
        // TODO: Update argument type and name
        public void onFragmentInteraction(Uri uri);
    }

    public void GetAllSecurityQuestion() {
        dialog = ProgressDialog.show(getActivity(),
                "Loading...", "Please wait...", false);
        dialog.show();
        operationType = 1;
        SERVICE_URL = BASE_URL + "Accounts/GetAllSecurityQuestion";
        WebServiceTask wst = new WebServiceTask(WebServiceTask.GET_TASK, getActivity(), "Getting data...");
        wst.execute(new String[]{SERVICE_URL});
    }


    public void GetUserInfo(String email) {
        dialog = ProgressDialog.show(getActivity(),
                "Loading...", "Please wait...", false);
        dialog.show();
        operationType = 2;
        SERVICE_URL = BASE_URL + "Accounts/GetUserInfoApp?email="+email;
        WebServiceTask wst = new WebServiceTask(WebServiceTask.GET_TASK, getActivity(), "Getting data...");
        wst.execute(new String[]{SERVICE_URL});
    }

    public void EditProfile(String email,String name, String address, String phone, String zipCode, String questionId, String answer) {
        dialog = ProgressDialog.show(getActivity(),
                "Loading...", "Please wait...", false);
        dialog.show();
        operationType = 3;
        SERVICE_URL = BASE_URL + "Accounts/EditProfileApp?" +
                "email=" + email +
                "&name=" + name +
                "&address=" + address +
                "&phone=" + phone +
                "&zipCode=" + zipCode +
                "&questionId=" + questionId +
                "&answer=" + answer;

        WebServiceTask wst = new WebServiceTask(WebServiceTask.GET_TASK, getActivity(), "Getting data...");
        wst.execute(new String[]{SERVICE_URL});
    }


    public void postData() {
        WebServiceTask wst = new WebServiceTask(WebServiceTask.POST_TASK, getActivity(), "Posting data...");
        // the passed String is the URL we will POST to
        wst.execute(new String[]{SERVICE_URL});
    }

    public void clearControls() {
        SERVICE_URL = BASE_URL;
    }

    public void handleResponse(String response) {
        try {

            dialog.dismiss();
            switch(operationType)
            {
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
                            (getActivity(),android.R.layout.simple_spinner_item,questionsList);
                    questionsAdapter.setDropDownViewResource
                            (android.R.layout.simple_spinner_dropdown_item);
                    spSecurityQuestionEditProfile.setAdapter(questionsAdapter);
                    GetUserInfo(email);
                    //btnUpdateProfile.setText(response);
                    break;
                case 2:
                    jso = new JSONObject(response);
                    JSONObject info=(JSONObject)jso.get("userProfile");
                    Integer Id=(Integer)info.get("QuestionId");
                    etNameEditProfile.setText(info.getString("Name"));
                    etAddressEditProfile.setText(info.getString("Address"));
                    etContactNumberEditProfile.setText(info.getString("Phone"));
                    etZipCodeEditProfile.setText(info.getString("ZipCode"));
                    etSecurityAnswerEditProfile.setText(info.getString("Answer"));
                    spSecurityQuestionEditProfile.setSelection(Id - 2);
                    //btnUpdateProfile.setText(info.toString());
                    break;
                case 3:
                    Toast.makeText(getActivity(),"Your profile has been updated",Toast.LENGTH_LONG).show();
                    getActivity().finish();
                    Intent change=new Intent(this.getActivity(),MainActivity.class);
                    startActivity(change);
                    break;
                default:
                    break;
            }
            clearControls();
        } catch (Exception e) {
            btnUpdateProfile.setText(e.getMessage());
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
