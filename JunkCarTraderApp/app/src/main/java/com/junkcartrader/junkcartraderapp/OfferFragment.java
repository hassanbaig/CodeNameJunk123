package com.junkcartrader.junkcartraderapp;

import android.app.Activity;
import android.app.ProgressDialog;
import android.content.ActivityNotFoundException;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.AsyncTask;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.telephony.TelephonyManager;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;
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
    private Button btnContactNumber,btnconfirmOffer;
    private TextView tvprice;
    private Integer operationType;
    private Toast toast;
    Intent intentRestartActivity;
    String OfferType,year,make,makeId,model,modelId,
           cylinders,zipCode,name,email,address,stateId,cityId,phoneNumber,questionnaire,customerId;
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

        //Receiving data from previous fragment
        rootView= inflater.inflate(R.layout.fragment_offer, container, false);
        OfferType=getArguments().getString("OfferType");
        year = getArguments().getString("Year");
        make = getArguments().getString("Make");
        makeId = getArguments().getString("MakeId");
        model = getArguments().getString("Model");
        modelId = getArguments().getString("ModelId");
        cylinders = getArguments().getString("Cylinders");
        zipCode = getArguments().getString("ZipCode");
        name=getArguments().getString("Name");
        address=getArguments().getString("Address");
        stateId=getArguments().getString("StateId");
        cityId=getArguments().getString("CityId");
        phoneNumber=getArguments().getString("PhoneNumber");
        email=getArguments().getString("EmailAddress");
        questionnaire=getArguments().getString("Questionnaire");
        customerId=getArguments().getString("CustomerId");

        Initialize();

        if(OfferType.equals("GetAnOffer"))
        {
            //Toast.makeText(this.getActivity(),OfferType,Toast.LENGTH_SHORT).show();
            GetAnOffer(address, cityId, cylinders, email, make, model, name, phoneNumber, makeId, modelId, year, stateId, zipCode);
        }
        else
        {
            //Toast.makeText(this.getActivity(),OfferType,Toast.LENGTH_SHORT).show();
            GetABetterOffer(address, cityId, customerId, cylinders, email, make, model, name, phoneNumber, questionnaire.replace(" ", "%20"), makeId, modelId, year, stateId, zipCode);
        }
        return  rootView;
    }

    public void Initialize(){
        tvprice=(TextView)rootView.findViewById(R.id.tvPriceOffer);
        btnContactNumber=(Button)rootView.findViewById(R.id.btnContactNumberOffer);
        btnconfirmOffer=(Button)rootView.findViewById(R.id.btnConfirmOffer);

        btnContactNumber.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent callIntent = new Intent(Intent.ACTION_CALL);
                callIntent.setData(Uri.parse("tel:" + btnContactNumber.getText().toString()));

                TelephonyManager telephonyManager = (TelephonyManager) getActivity().getSystemService(getActivity().TELEPHONY_SERVICE);
                if (telephonyManager.getPhoneType() == TelephonyManager.PHONE_TYPE_NONE) {
                    Toast toast=Toast.makeText(getActivity().getApplicationContext(),
                                               "Your device does not support call feature",
                                               Toast.LENGTH_SHORT);
                    toast.show();
                }
                else {
                    try {
                        startActivity(callIntent);
                    } catch (ActivityNotFoundException e) {
                        btnContactNumber.setText(e.getMessage());
                    }
                }
            }
        });

        btnconfirmOffer.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (OfferType.equals("GetAnOffer"))
                {
                    dialog = ProgressDialog.show(getActivity(),
                            "Loading...", "Please wait...", false);
                    dialog.show();

                    String contactNo = btnContactNumber.getText().toString().replace(" ", "%20");
                    String price = tvprice.getText().toString();

                    ConfirmOffer(address, cityId, contactNo, cylinders, email, make, model, name,
                                 phoneNumber, price, makeId, modelId, year, stateId, zipCode);
                }
                else
                {
                    dialog = ProgressDialog.show(getActivity(),
                            "Loading...", "Please wait...", false);
                    dialog.show();

                    String contactNo = btnContactNumber.getText().toString().replace(" ", "%20");
                    String price = tvprice.getText().toString();

                    ConfirmOfferWithQuestionnaire(address, cityId, contactNo, customerId, cylinders,
                                                  email, make, model, name, phoneNumber, price,
                                                  questionnaire.replace(" ", "%20"), makeId, modelId, year, stateId, zipCode);
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

        void onAttach(MainActivity activity);

        // TODO: Update argument type and name
        public void onFragmentInteraction(Uri uri);
    }

    public void GetAnOffer(String address, String cityId, String cylinders, String emailAddress,
                           String make, String model, String name, String phone, String selectedMakeId,
                           String selectedModelId, String selectedYear,String stateId, String zipCode) {

        operationType = 1;
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
        WebServiceTask wst = new WebServiceTask(WebServiceTask.GET_TASK, getActivity(), "Getting data...");
        wst.execute(new String[]{SERVICE_URL});
    }

    public void GetABetterOffer(String address, String cityId,String customerId,
                                String cylinders, String emailAddress, String make,
                                String model, String name, String phone, String questionnaire,
                                String selectedMakeId,String selectedModelId, String selectedYear,
                                String stateId, String zipCode) {

        operationType = 1;
        dialog = ProgressDialog.show(getActivity(),
                "Loading...", "Please wait...", false);
        dialog.show();
        SERVICE_URL = BASE_URL + "Home/GetABetterOffer?" +
                "address=" + address +
                "&cityId=" + cityId +
                "&customerId=" + customerId +
                "&cylinders=" + cylinders +
                "&emailAddress=" + emailAddress +
                "&make=" + make +
                "&model=" + model +
                "&name=" + name +
                "&phone=" + phone +
                "&questionnaire=" + questionnaire +
                "&selectedMakeId=" + selectedMakeId +
                "&selectedModelId=" + selectedModelId +
                "&selectedYear=" + selectedYear +
                "&stateId=" + stateId +
                "&zipCode=" + zipCode;
        WebServiceTask wst = new WebServiceTask(WebServiceTask.GET_TASK, getActivity(), "Getting data...");
        wst.execute(new String[]{SERVICE_URL});
    }

    public void CheckZipCode(String zipCode) {
        operationType = 2;
        dialog = ProgressDialog.show(getActivity(),
                "Loading...", "Please wait...", false);
        dialog.show();
        SERVICE_URL = BASE_URL + "Home/CheckZipCode?zipCode=" + zipCode;
        WebServiceTask wst = new WebServiceTask(WebServiceTask.GET_TASK, getActivity(), "Getting data...");
        wst.execute(new String[]{SERVICE_URL});
    }

    public void ConfirmOffer(String address, String cityId,String contactNo,
                             String cylinders, String emailAddress, String make,
                             String model, String name, String phone,String price,
                             String selectedMakeId,String selectedModelId, String selectedYear,
                             String stateId, String zipCode) {

        operationType = 3;
        SERVICE_URL = BASE_URL + "Home/ConfirmOffer?" +
                "address=" + address +
                "&cityId=" + cityId +
                "&contactNo=" + contactNo +
                "&cylinders=" + cylinders +
                "&emailAddress=" + emailAddress +
                "&make=" + make +
                "&model=" + model +
                "&name=" + name +
                "&phone=" + phone +
                "&price=" + price +
                "&selectedMakeId=" + selectedMakeId +
                "&selectedModelId=" + selectedModelId +
                "&selectedYear=" + selectedYear +
                "&stateId=" + stateId +
                "&zipCode=" + zipCode;
        WebServiceTask wst = new WebServiceTask(WebServiceTask.GET_TASK, getActivity(), "Getting data...");
        wst.execute(new String[]{SERVICE_URL});
    }

    public void ConfirmOfferWithQuestionnaire(String address, String cityId, String contactNo,
                                              String customerId, String cylinders, String emailAddress,
                                              String make, String model, String name, String phone, String price,
                                              String questionnaire, String selectedMakeId,String selectedModelId,
                                              String selectedYear,String stateId, String zipCode) {

        operationType = 4;
        SERVICE_URL = BASE_URL + "Home/ConfirmOfferWithQuestionnaire?" +
                "address=" + address +
                "&cityId=" + cityId +
                "&contactNo=" + contactNo +
                "&customerId=" + customerId +
                "&cylinders=" + cylinders +
                "&emailAddress=" + emailAddress +
                "&make=" + make +
                "&model=" + model +
                "&name=" + name +
                "&phone=" + phone +
                "&price=" + price +
                "&questionnaire=" + questionnaire +
                "&selectedMakeId=" + selectedMakeId +
                "&selectedModelId=" + selectedModelId +
                "&selectedYear=" + selectedYear +
                "&stateId=" + stateId +
                "&zipCode=" + zipCode;
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
                    tvprice.setText("$"+response.replace("\"",""));
                    CheckZipCode(zipCode);
                    break;
                case 2:
                    JSONObject jso=new JSONObject(response);
                    btnContactNumber.setText(jso.getString("Contact_No"));
                    break;
                case 3:
                    String message=response.replace("\"","");
                    if(message.equals("Confirmed")){
                        toast=Toast.makeText(getActivity(),"Thank you for your business! someone will contact you shortly to arrange a suitable appointment that fits your schedule",Toast.LENGTH_LONG);
                        toast.show();
                        getActivity().finish();
                        intentRestartActivity=new Intent(this.getActivity(),MainActivity.class);
                        startActivity(intentRestartActivity);
                    }
                    btnconfirmOffer.setText(response);
                case 4:
                    message=response.replace("\"","");
                    if(message.equals("Confirmed")){
                        toast=Toast.makeText(getActivity(),"Thank you for your business! someone will contact you shortly to arrange a suitable appointment that fits your schedule",Toast.LENGTH_LONG);
                        toast.show();
                        getActivity().finish();
                        intentRestartActivity=new Intent(this.getActivity(),MainActivity.class);
                        startActivity(intentRestartActivity);
                    }
                    else
                    {
                        toast=Toast.makeText(getActivity(),"There seems to be some problem. Please try again later.",Toast.LENGTH_SHORT);
                        toast.show();
                    }
                    break;
                default:
                    break;
            }

            clearControls();
        } catch (Exception e) {
            btnContactNumber.setText(e.getMessage());
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
