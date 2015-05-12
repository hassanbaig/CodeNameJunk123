package com.junkcartrader.junkcartraderapp;

import android.app.ProgressDialog;
import android.content.Context;
import android.content.res.Resources;
import android.graphics.Color;
import android.net.Uri;
import android.os.AsyncTask;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentTransaction;
import android.util.Log;
import android.util.TypedValue;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.Spinner;
import android.widget.TableLayout;
import android.widget.TableRow;
import android.widget.TextView;

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
 * {@link QuestionnaireFragment.OnFragmentInteractionListener} interface
 * to handle interaction events.
 * Use the {@link QuestionnaireFragment#newInstance} factory method to
 * create an instance of this fragment.
 */
public class QuestionnaireFragment extends Fragment implements PhotoFragment.OnFragmentInteractionListener {
    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";

    // TODO: Rename and change types of parameters
    public  final String BASE_URL=URLHelper.GetBaseUrl();
    private  String SERVICE_URL=BASE_URL;
    private String mParam1;
    private String mParam2;
    private String year,make,makeId,model,modelId,cylinders,zipCode;
    private Button btnPhotoGetABetterOffer;
    private ProgressDialog dialog;
    private Integer operationType;


    ArrayAdapter<String> answersAdapter,questionAdapter, modelsAdapter, cylindersAdapter;
    JSONArray questionnaireJSON,answerJSON,jArray;
    List<String> answersList,modelsList;
    String[] questions;
    String questionResponse,cylindersResponse,isValidZipCode,OfferType,strId,email;
    FragmentTransaction fragmentTransaction;
    Fragment photoFragment;
    Bundle args;
    Spinner question,answer;
    View rootView;
    TextView questionnaire;


    private OnFragmentInteractionListener mListener;

    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment QuestionnaireFragment.
     */
    // TODO: Rename and change types and number of parameters
    public static QuestionnaireFragment newInstance(String param1, String param2) {
        QuestionnaireFragment fragment = new QuestionnaireFragment();
        Bundle args = new Bundle();
        args.putString(ARG_PARAM1, param1);
        args.putString(ARG_PARAM2, param2);
        fragment.setArguments(args);
        return fragment;
    }

    public QuestionnaireFragment() {
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
        rootView= inflater.inflate(R.layout.fragment_questionnaire, container, false);
        String offerType2 = getArguments().getString("GetABetterOffer");
        year=getArguments().getString("Year");
        make=getArguments().getString("Make");
        makeId=getArguments().getString("MakeId");
        model=getArguments().getString("Model");
        modelId=getArguments().getString("ModelId");
        cylinders=getArguments().getString("Cylinders");
        zipCode=getArguments().getString("ZipCode");
        //email=getArguments().getString("email");
        Initialize();
        GetQuestionnaire();
        return rootView;
    }
    public void Initialize()
    {
        btnPhotoGetABetterOffer=(Button)rootView.findViewById(R.id.btnPhotoGetABetterOffer);
        //question=(Spinner)rootView.findViewById(R.id.question);
        btnPhotoGetABetterOffer.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                CheckZipCode(zipCode);
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
    public void onAttach(MainActivity activity) {
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

    @Override
    public void onFragmentInteraction(Uri uri) {

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
    public void GetQuestionnaire()
    {
        operationType=1;
        dialog=ProgressDialog.show(getActivity(),
        "Loading","Please Wait...",false);
        SERVICE_URL=BASE_URL+"Home/GetQuestionnaire";
        WebServiceTask wst = new WebServiceTask(WebServiceTask.GET_TASK, getActivity(), "Getting data...");
        wst.execute(new String[]{SERVICE_URL});
    }
    public void CheckZipCode(String zipCode)
    {
        operationType=2;
        dialog = ProgressDialog.show(getActivity(),
                "Loading...", "Please wait...", false);
        dialog.show();
        SERVICE_URL = BASE_URL + "Home/CheckZipCode?zipCode=" + zipCode;
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
            //
            dialog.dismiss();
            switch(operationType)
            {
                case 1:
                    TableLayout tableLayout=(TableLayout)rootView.findViewById(R.id.questionnaireLayout);
                    final ArrayList<String> IdArray=new ArrayList<String>();
                    //ArrayList<String> answerIdArray=new ArrayList<String>();
                    final ArrayList<String> mergeId=new ArrayList<String>();
                    questionnaireJSON=new JSONArray(jso.get("$values").toString());

                    Resources r=getResources();
                    int width=(int) TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP,220,r.getDisplayMetrics());
                    int questionnaireheight=(int) TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP,120,r.getDisplayMetrics());
                    int answerheight=(int) TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP,50,r.getDisplayMetrics());
                    int buttonWidth=(int) TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP,50,r.getDisplayMetrics());
                    for(int i=0;i<questionnaireJSON.length();i++)
                    {

                        //To print the questions dynamically
                        TableRow tableRow=new TableRow(this.getActivity());
                        questionnaire=new TextView(this.getActivity());
                        answer=new Spinner(this.getActivity());
                        //tableRow.setLayoutParams(new TableLayout.LayoutParams(TableLayout.LayoutParams.MATCH_PARENT,100));
                        JSONObject entQuestion=(JSONObject)questionnaireJSON.getJSONObject(i).get("Question");
                        questionnaire.setGravity(Gravity.LEFT);
                        questionnaire.setText(entQuestion.getString("Question"));
                        IdArray.add(entQuestion.getString("Question_Id"));//Add the questionId to an ArrayList
                        questionnaire.setTextColor(Color.parseColor("#000000"));
                        questionnaire.setTextSize(22);
                        questionnaire.setPadding(20, 0, 20, 0);
                        questionnaire.setWidth(width);
                        questionnaire.setHeight(questionnaireheight);
                        //questionnaire.setLayoutParams(new TableRow.LayoutParams(900,125));

                        //To print the answers dynamically
                        ArrayList<String> answersArray = new ArrayList<String>();
                        answersArray.clear();
                        JSONObject entAnswer=questionnaireJSON.getJSONObject(i);
                        JSONObject ans=(JSONObject)entAnswer.get("Answers");
                        jArray=ans.getJSONArray("$values");
                        for(int j=0;j<jArray.length();j++) {
                            answersArray.add(jArray.getJSONObject(j).getString("Answer"));
                            answersAdapter = new ArrayAdapter<String>(getActivity(), android.R.layout.simple_spinner_item, answersArray);
                            answersAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
                            answer.setAdapter(answersAdapter);
                            answer.setGravity(Gravity.RIGHT);
                            answer.setBackgroundColor(Color.parseColor("#ffffff"));
                            answer.setPadding(4, 4, 4, 4);
                            answer.setBackgroundResource(R.drawable.rounded_edittext);
                            answer.setDropDownWidth(width);
                            answer.setMinimumHeight(answerheight);
                            answer.setGravity(Gravity.CENTER_HORIZONTAL);
                            //answer.setLayoutParams(new TableRow.LayoutParams(250,100));
                        }

                        tableRow.addView(questionnaire);
                        tableRow.addView(answer);
                        tableRow.setGravity(Gravity.CENTER_HORIZONTAL);
                        tableLayout.addView(tableRow);
                        IdArray.add(jArray.getJSONObject(answer.getSelectedItemPosition()).getString("Answer_Id"));//Add the answerId to an ArrayList
                    }
                    mergeId.add(IdArray.toString());
                    strId=mergeId.toString().replace("[","").replace("]","");

                    /*btnPhotoGetABetterOffer=new Button(this.getActivity());
                    btnPhotoGetABetterOffer.setBackgroundResource(R.drawable.button_blue_gradient);
                    btnPhotoGetABetterOffer.setText("Next");
                    btnPhotoGetABetterOffer.setTextSize(22);
                    btnPhotoGetABetterOffer.setTextColor(Color.parseColor("#ffffff"));
                    btnPhotoGetABetterOffer.setTextAppearance(getActivity(),R.style.questionnaireButtons);
                    btnPhotoGetABetterOffer.setGravity(Gravity.CENTER_HORIZONTAL);
                    tableLayout.addView(btnPhotoGetABetterOffer);*/
                    //btnNextCustomerInfo.setText(seperate);
                    //merge.add(answerIdArray.toString());
                    /*questionAdapter=new ArrayAdapter<String>(getActivity(),android.R.layout.simple_list_item_1,merge);
                    questionAdapter.setDropDownViewResource(android.R.layout.simple_dropdown_item_1line);
                    question.setAdapter(questionAdapter);
                    questionAdapter.notifyDataSetChanged();*/
                    //questionIdArray;
                    break;
                case 2:
                    isValidZipCode = jso.get("Is_Valid_Zip_Code").toString();
                    if(isValidZipCode=="true")
                    {
                        photoFragment = new PhotoFragment();
                        fragmentTransaction = getFragmentManager().beginTransaction();
                        args = new Bundle();
                        args.putString("GetABetterOffer", "GetABetterOffer");
                        args.putString("Year", year);
                        args.putString("Make", make);
                        args.putString("MakeId", makeId);
                        args.putString("Model", model);
                        args.putString("ModelId", modelId);
                        args.putString("Cylinders", cylinders);
                        args.putString("ZipCode", zipCode);
                        args.putString("Questionnaire",strId);
                        //args.putString("email",email);
                        photoFragment.setArguments(args);
                        fragmentTransaction.replace(R.id.container, photoFragment);
                        fragmentTransaction.commit();
                    }
                    break;
                default:
                    break;
            }
            clearControls();
        } catch (Exception e) {

            btnPhotoGetABetterOffer.setText(e.getMessage());
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
