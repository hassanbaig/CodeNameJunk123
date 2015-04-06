package com.junkcartrader.junkcartraderapp;

import android.app.Activity;
import android.app.ProgressDialog;
import android.content.Context;
import android.net.Uri;
import android.os.AsyncTask;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentTransaction;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
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


/**
 * A simple {@link Fragment} subclass.
 * Activities that contain this fragment must implement the
 * {@link OfferFragment.OnFragmentInteractionListener} interface
 * to handle interaction events.
 * Use the {@link OfferFragment#newInstance} factory method to
 * create an instance of this fragment.
 */
public class OfferFragment extends Fragment{
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
    private Button btnNextCustomerInfo;
    private EditText etName,etAddress,etZipCode,etPhoneNumber,etEmail;
    private Spinner spStates,spCities;
    private Integer operationType;
    String isValidZipCode,OfferType,offerPrice,year,make,makeId,model,modelId,cylinders,zipCode;
    FragmentManager fm;
    FragmentTransaction fragmentTransaction;
    ArrayAdapter<String> statesAdapter,citiesAdapter;
    JSONArray statesJSON,citiesJSON;
    List<String> statesList,citiesList;
    Fragment offerFragment;
    Bundle args;
    View rootView;

    private OnFragmentInteractionListener mListener;

    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment OfferFragment.
     */
    // TODO: Rename and change types and number of parameters
    public static OfferFragment newInstance(String param1, String param2) {
        OfferFragment fragment = new OfferFragment();
        Bundle args = new Bundle();
        args.putString(ARG_PARAM1, param1);
        args.putString(ARG_PARAM2, param2);
        fragment.setArguments(args);
        return fragment;
    }

    public OfferFragment() {
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
        return inflater.inflate(R.layout.fragment_offer, container, false);
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


    public void GetAnOffer(String address, String cityId, String cylinders, String emailAddress, String make, String model, String name, String phone, String selectedMakeId,String selectedModelId, String selectedYear,String stateId, String zipCode) {
        operationType = 4;
        dialog = ProgressDialog.show(getActivity(),
                "Loading...", "Please wait...", false);
        dialog.show();
        SERVICE_URL = BASE_URL + "Home/GetAnOffer?" +
                "address=" + address +
                "&cityId=" + cityId +
                "&cylinders=" + cylinders +
                "&emailAddress=" + emailAddress +
                "&make=" + make +
                "&model=" + model +
                "&name=" + name +
                "&phone=" + phone +
                "&selectedMakeId=" + selectedMakeId +
                "&selectedModelId=" + selectedModelId +
                "&selectedYear=" + selectedYear +
                "&stateId=" + stateId +
                "&zipCode=" + zipCode;
        //btnNextCustomerInfo.setText(SERVICE_URL);
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
            JSONObject jso = new JSONObject(response);
            dialog.dismiss();
            switch(operationType)
            {
                case 1:
                    isValidZipCode = jso.get("Is_Valid_Zip_Code").toString();
                    if(isValidZipCode=="true") {
                        try {
                            offerFragment = new OfferFragment();
                            fragmentTransaction = getFragmentManager().beginTransaction();
                            args = new Bundle();
                            args.putString("GetAnOffer", "GetAnOffer");
                            args.putString("Name", etName.getText().toString());
                            args.putString("Address", etAddress.getText().toString());
                            args.putString("StateId", statesJSON.getJSONObject(spStates.getSelectedItemPosition()).getString("State_Id"));
                            args.putString("CityId", citiesJSON.getJSONObject(spCities.getSelectedItemPosition()).getString("City_Id"));
                            args.putString("PhoneNumber", etPhoneNumber.getText().toString());
                            args.putString("EmailAddress", etEmail.getText().toString());
                            args.putString("Year", year);
                            args.putString("Make", make);
                            args.putString("MakeId", makeId);
                            args.putString("Model", model);
                            args.putString("ModelId", modelId);
                            args.putString("Cylinders", cylinders);
                            args.putString("ZipCode", etZipCode.getText().toString());
                            offerFragment.setArguments(args);
                            fragmentTransaction.replace(R.id.container, offerFragment);
                            fragmentTransaction.commit();

                            // GetAnOffer(address, cityId, cylinders, emailAddress, make, model, name, phone, makeId, modelId, year, stateId, zipCode);
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                    }
                    break;
                case 2:
                    statesJSON = new JSONArray(jso.get("$values").toString());
                    statesList = new ArrayList<String>();
                    statesList.clear();
                    for(int i = 0; i < statesJSON.length(); i++){
                        statesList.add(statesJSON.getJSONObject(i).getString("State_Name"));
                    }

                    statesAdapter = new ArrayAdapter<String>
                            (getActivity(), android.R.layout.simple_spinner_item, statesList);
                    statesAdapter.setDropDownViewResource
                            (android.R.layout.simple_spinner_dropdown_item);
                    spStates.setAdapter(statesAdapter);
                    break;
                case 3:
                    citiesJSON = new JSONArray(jso.get("$values").toString());
                    citiesList = new ArrayList<String>();
                    citiesList.clear();
                    for(int i = 0; i < citiesJSON.length(); i++){
                        citiesList.add(citiesJSON.getJSONObject(i).getString("City_Name"));
                    }
                    citiesAdapter = new ArrayAdapter<String>
                            (getActivity(), android.R.layout.simple_spinner_item, citiesList);
                    citiesAdapter.setDropDownViewResource
                            (android.R.layout.simple_spinner_dropdown_item);
                    spCities.setAdapter(citiesAdapter);
                    break;
                case 4:
                    dialog.dismiss();
                    offerPrice = jso.get("data").toString();
                    btnNextCustomerInfo.setText(response);
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
