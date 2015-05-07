package com.junkcartrader.junkcartraderapp;

import android.app.Activity;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.database.Cursor;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.os.AsyncTask;
import android.os.Bundle;
import android.os.Environment;
import android.provider.MediaStore;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentTransaction;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageButton;
import android.widget.ImageView;
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
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Locale;


/**
 * A simple {@link Fragment} subclass.
 * Activities that contain this fragment must implement the
 * {@link PhotoFragment.OnFragmentInteractionListener} interface
 * to handle interaction events.
 * Use the {@link PhotoFragment#newInstance} factory method to
 * create an instance of this fragment.
 */
public class PhotoFragment extends Fragment implements CustomerInfoFragment.OnFragmentInteractionListener {
    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;

    private final String BASE_URL=URLHelper.GetBaseUrl();
    private  String SERVICE_URL = BASE_URL;
    private ProgressDialog dialog;
    private  static ImageView ivphoto1,ivphoto2,ivphoto3,ivphoto4,ivphoto5;
    private Integer operationType;
    private ImageButton imgBtnCamera1Photo,imgBtnCamera2Photo,imgBtnCamera3Photo,imgBtnCamera4Photo,imgBtnCamera5Photo,imgBtnOpenFolder1Photo,imgBtnOpenFolder2Photo,imgBtnOpenFolder3Photo,imgBtnOpenFolder4Photo,imgBtnOpenFolder5Photo;

    private Button btnNextCustomerInfo;
    private static final int SELECT_PHOTO = 100;
    private static final int MY_INTENT_CLICK=302;
    String isValidZipCode,OfferType,offerPrice,year,make,makeId,model,modelId,cylinders,zipCode,questionnaire;
    FragmentManager fm;
    Uri fileUri;
    public static final int MEDIA_TYPE_IMAGE = 1;
    private static final String IMAGE_DIRECTORY_NAME = "Hello Camera";
    FragmentTransaction fragmentTransaction;
    Fragment customerInfoFragment;
    Bundle args;
    View rootView;
    Uri imageUri                      = null;
    static TextView imageDetails      = null;
    PhotoFragment CameraActivity = null;

    private Button captureButton;
    private ImageView showImage;
    private Bitmap bitmap;


    private OnFragmentInteractionListener mListener;

    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment PhotoFragment.
     */
    // TODO: Rename and change types and number of parameters
    public static PhotoFragment newInstance(String param1, String param2) {
        PhotoFragment fragment = new PhotoFragment();
        Bundle args = new Bundle();
        args.putString(ARG_PARAM1, param1);
        args.putString(ARG_PARAM2, param2);
        fragment.setArguments(args);
        return fragment;
    }

    public PhotoFragment() {
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
        rootView= inflater.inflate(R.layout.fragment_photo, container, false);
        OfferType = getArguments().getString("GetABetterOffer");
        year=getArguments().getString("Year");
        make=getArguments().getString("Make");
        makeId=getArguments().getString("MakeId");
        model=getArguments().getString("Model");
        modelId=getArguments().getString("ModelId");
        cylinders=getArguments().getString("Cylinders");
        questionnaire=getArguments().getString("Questionnaire");
        zipCode=getArguments().getString("ZipCode");
        Initialize();
        return rootView;
    }
public void Initialize()
{

    CameraActivity = this;

    imageDetails = (TextView) rootView.findViewById(R.id.imageDetails);

    //ImageView assignment
    ivphoto1 = (ImageView) rootView.findViewById(R.id.ivphoto1);
    ivphoto2 = (ImageView) rootView.findViewById(R.id.ivphoto2);
    ivphoto3 = (ImageView) rootView.findViewById(R.id.ivphoto3);
    ivphoto4 = (ImageView) rootView.findViewById(R.id.ivphoto4);
    ivphoto5 = (ImageView) rootView.findViewById(R.id.ivphoto5);

    //ImageButton assignment
    imgBtnCamera1Photo=(ImageButton)rootView.findViewById(R.id.imgBtnCamera1Photo);
    imgBtnCamera2Photo=(ImageButton)rootView.findViewById(R.id.imgBtnCamera2Photo);
    imgBtnCamera3Photo=(ImageButton)rootView.findViewById(R.id.imgBtnCamera3Photo);
    imgBtnCamera4Photo=(ImageButton)rootView.findViewById(R.id.imgBtnCamera4Photo);
    imgBtnCamera5Photo=(ImageButton)rootView.findViewById(R.id.imgBtnCamera5Photo);
    imgBtnOpenFolder1Photo=(ImageButton)rootView.findViewById(R.id.imgBtnOpenFolder1Photo);
    imgBtnOpenFolder2Photo=(ImageButton)rootView.findViewById(R.id.imgBtnOpenFolder2Photo);
    imgBtnOpenFolder3Photo=(ImageButton)rootView.findViewById(R.id.imgBtnOpenFolder3Photo);
    imgBtnOpenFolder4Photo=(ImageButton)rootView.findViewById(R.id.imgBtnOpenFolder4Photo);
    imgBtnOpenFolder5Photo=(ImageButton)rootView.findViewById(R.id.imgBtnOpenFolder5Photo);

    //Button assignment
    btnNextCustomerInfo=(Button)rootView.findViewById(R.id.btnNextCustomerInfo);

    //Button click function declaration
    btnNextCustomerInfo.setOnClickListener(new View.OnClickListener() {
        @Override
        public void onClick(View v) {
            CheckZipCode(zipCode);
        }
    });

    imgBtnOpenFolder1Photo.setOnClickListener(new View.OnClickListener() {
        @Override
        public void onClick(View v) {
            Intent intent = new Intent();
            intent.setType("image/*");
            intent.setAction(Intent.ACTION_GET_CONTENT);
            startActivityForResult(Intent.createChooser(intent, "Select File"), 0);
        }

    });
    imgBtnOpenFolder2Photo.setOnClickListener(new View.OnClickListener() {
        @Override
        public void onClick(View v) {
            Intent intent = new Intent();
            intent.setType("image/*");
            intent.setAction(Intent.ACTION_GET_CONTENT);
            startActivityForResult(Intent.createChooser(intent, "Select File"),1);
        }
    });
    imgBtnOpenFolder3Photo.setOnClickListener(new View.OnClickListener() {
        @Override
        public void onClick(View v) {
            Intent intent = new Intent();
            intent.setType("image/*");
            intent.setAction(Intent.ACTION_GET_CONTENT);
            startActivityForResult(Intent.createChooser(intent, "Select File"),2);
        }
    });
    imgBtnOpenFolder4Photo.setOnClickListener(new View.OnClickListener() {
        @Override
        public void onClick(View v) {
            Intent intent = new Intent();
            intent.setType("image/*");
            intent.setAction(Intent.ACTION_GET_CONTENT);
            startActivityForResult(Intent.createChooser(intent, "Select File"),3);
        }
    });
    imgBtnOpenFolder5Photo.setOnClickListener(new View.OnClickListener() {
        @Override
        public void onClick(View v) {
            Intent intent = new Intent();
            intent.setType("image/*");
            intent.setAction(Intent.ACTION_GET_CONTENT);

            startActivityForResult(Intent.createChooser(intent, "Select File"),4);
        }
    });


    imgBtnCamera1Photo.setOnClickListener(new View.OnClickListener() {
        @Override
        public void onClick(View v) {
            Context context=getActivity();
            PackageManager packageManager=context.getPackageManager();
            if(packageManager.hasSystemFeature(PackageManager.FEATURE_CAMERA)==false){
                Toast.makeText(getActivity(),"Your Device Does not support camera feature",Toast.LENGTH_LONG).show();
            }
            else{
                /*Intent intent=new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
                intent.putExtra(MediaStore.EXTRA_OUTPUT, MediaStore.Images.Media.EXTERNAL_CONTENT_URI.getPath());
                startActivityForResult(intent, 5);*/
                Intent intent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
                fileUri = getOutputMediaFileUri(MEDIA_TYPE_IMAGE);
                intent.putExtra(MediaStore.EXTRA_OUTPUT, fileUri);
                // start the image capture Intent
                startActivityForResult(intent, 5);
            }
        }
    });
    imgBtnCamera2Photo.setOnClickListener(new View.OnClickListener() {
        @Override
        public void onClick(View v) {
            Context context=getActivity();
            PackageManager packageManager=context.getPackageManager();
            if(packageManager.hasSystemFeature(PackageManager.FEATURE_CAMERA)==false){
                Toast.makeText(getActivity(),"Your Device Does not support camera feature",Toast.LENGTH_LONG).show();
            }
            else{
                Intent intent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
                fileUri = getOutputMediaFileUri(MEDIA_TYPE_IMAGE);
                intent.putExtra(MediaStore.EXTRA_OUTPUT, fileUri);
                startActivityForResult(intent, 6);
            }
        }
    });
    imgBtnCamera3Photo.setOnClickListener(new View.OnClickListener() {
        @Override
        public void onClick(View v) {
             Context context=getActivity();
            PackageManager packageManager=context.getPackageManager();
            if(packageManager.hasSystemFeature(PackageManager.FEATURE_CAMERA)==false){
                Toast.makeText(getActivity(),"Your Device Does not support camera feature",Toast.LENGTH_LONG).show();
            }
            else{
                Intent intent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
                fileUri = getOutputMediaFileUri(MEDIA_TYPE_IMAGE);
                intent.putExtra(MediaStore.EXTRA_OUTPUT, fileUri);
                startActivityForResult(intent, 7);
            }
        }
    });
    imgBtnCamera4Photo.setOnClickListener(new View.OnClickListener() {
        @Override
        public void onClick(View v) {
            Context context=getActivity();
            PackageManager packageManager=context.getPackageManager();
            if(packageManager.hasSystemFeature(PackageManager.FEATURE_CAMERA)==false){
                Toast.makeText(getActivity(),"Your Device Does not support camera feature",Toast.LENGTH_LONG).show();
            }
            else{
                Intent intent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
                fileUri = getOutputMediaFileUri(MEDIA_TYPE_IMAGE);
                intent.putExtra(MediaStore.EXTRA_OUTPUT, fileUri);
                startActivityForResult(intent, 8);
            }
        }
    });
    imgBtnCamera5Photo.setOnClickListener(new View.OnClickListener() {
        @Override
        public void onClick(View v) {

            Context context=getActivity();
            PackageManager packageManager=context.getPackageManager();
            if(packageManager.hasSystemFeature(PackageManager.FEATURE_CAMERA)==false){
                Toast.makeText(getActivity(),"Your Device Does not support camera feature",Toast.LENGTH_LONG).show();
            }
            else{
                Intent intent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
                fileUri = getOutputMediaFileUri(MEDIA_TYPE_IMAGE);
                intent.putExtra(MediaStore.EXTRA_OUTPUT, fileUri);
                startActivityForResult(intent, 9);
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
    public void onActivityResult(int requestCode, int resultCode, Intent data)
    {
        if (resultCode == Activity.RESULT_OK)
        {
            BitmapFactory.Options options = new BitmapFactory.Options();

            switch (requestCode)
            {
                case 0:
                    String selectedImagePath;
                    String capturedImagePath;
                    Uri selectedImageUri = data.getData();
                    //MEDIA GALLERY
                    selectedImagePath =ImageFilePath.getPath(getActivity(),selectedImageUri);
                    Bitmap bmp=BitmapFactory.decodeFile(selectedImagePath);
                    Bitmap image=Bitmap.createScaledBitmap(bmp, 170, 170, true);
                    ivphoto1.setImageBitmap(image);
                    //imageDetails.setText(selectedImagePath);
                    break;
                case 1:
                    selectedImageUri = data.getData();
                    selectedImagePath = ImageFilePath.getPath(this.getActivity(), selectedImageUri);
                    bmp=BitmapFactory.decodeFile(selectedImagePath);
                    image=Bitmap.createScaledBitmap(bmp, 170, 170, true);
                    ivphoto2.setImageBitmap(image);
                    break;
                case 2:
                    selectedImageUri = data.getData();
                    selectedImagePath = ImageFilePath.getPath(this.getActivity(), selectedImageUri);
                    bmp=BitmapFactory.decodeFile(selectedImagePath);
                    image=Bitmap.createScaledBitmap(bmp, 170, 170, true);
                    ivphoto3.setImageBitmap(image);
                    break;
                case 3:
                    selectedImageUri = data.getData();
                    selectedImagePath = ImageFilePath.getPath(this.getActivity(), selectedImageUri);
                    bmp=BitmapFactory.decodeFile(selectedImagePath);
                    image=Bitmap.createScaledBitmap(bmp, 170, 170, true);
                    ivphoto4.setImageBitmap(image);
                    break;
                case 4:
                    selectedImageUri = data.getData();
                    selectedImagePath = ImageFilePath.getPath(this.getActivity(), selectedImageUri);
                    bmp=BitmapFactory.decodeFile(selectedImagePath);
                    image=Bitmap.createScaledBitmap(bmp, 170, 170, true);
                    ivphoto5.setImageBitmap(image);
                    break;
                case 5:
                   /* Log.i("StartUpActivity", "Photo Captured");
                    bitmap=(Bitmap) data.getExtras().get("data");
                    MediaStore.Images.Media.insertImage(getActivity().getContentResolver(),bitmap,null,null);
                    //ByteArrayOutputStream baos = new ByteArrayOutputStream();
                    //bitmap.compress(Bitmap.CompressFormat.JPEG, 100, baos);
                    bitmap=Bitmap.createScaledBitmap(bitmap,170,170,true);
                    ivphoto1.setImageBitmap(bitmap);*/
                    // downsizing image as it throws OutOfMemory Exception for larger images
                    options.inSampleSize = 8;
                    Bitmap bitmap = BitmapFactory.decodeFile(fileUri.getPath(),
                            options);
                    capturedImagePath=fileUri.getPath();
                    bitmap=Bitmap.createScaledBitmap(bitmap,170,170,true);
                    ivphoto1.setImageBitmap(bitmap);
                    break;
                case 6:
                    options.inSampleSize = 8;
                    bitmap = BitmapFactory.decodeFile(fileUri.getPath(),
                            options);
                    capturedImagePath=fileUri.getPath();
                    bitmap=Bitmap.createScaledBitmap(bitmap,170,170,true);
                    ivphoto2.setImageBitmap(bitmap);
                    break;
                case 7:
                    options.inSampleSize = 8;
                    bitmap = BitmapFactory.decodeFile(fileUri.getPath(),
                            options);
                    capturedImagePath=fileUri.getPath();
                    bitmap=Bitmap.createScaledBitmap(bitmap,170,170,true);
                    ivphoto3.setImageBitmap(bitmap);
                    break;
                case 8:
                    options.inSampleSize = 8;
                    bitmap = BitmapFactory.decodeFile(fileUri.getPath(),
                            options);
                    capturedImagePath=fileUri.getPath();
                    bitmap=Bitmap.createScaledBitmap(bitmap,170,170,true);
                    ivphoto4.setImageBitmap(bitmap);
                    break;
                case 9:
                    options.inSampleSize = 8;
                    bitmap = BitmapFactory.decodeFile(fileUri.getPath(),
                            options);
                    capturedImagePath=fileUri.getPath();
                    bitmap=Bitmap.createScaledBitmap(bitmap,170,170,true);
                    ivphoto5.setImageBitmap(bitmap);
                    break;
            }
        }
    }


    public Uri getOutputMediaFileUri(int type) {
        return Uri.fromFile(getOutputMediaFile(type));
    }

    /**
     * returning image / video
     */
    private static File getOutputMediaFile(int type) {

        // External sdcard location
        File mediaStorageDir = new File(
                Environment
                        .getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES),
                IMAGE_DIRECTORY_NAME);

        // Create the storage directory if it does not exist
        if (!mediaStorageDir.exists()) {
            mediaStorageDir.mkdirs();
            if (!mediaStorageDir.mkdirs()) {
                Log.d(IMAGE_DIRECTORY_NAME, "Oops! Failed create "
                        + IMAGE_DIRECTORY_NAME + " directory");
                return null;
            }
        }

        // Create a media file name
        String timeStamp = new SimpleDateFormat("yyyyMMdd_HHmmss",
                Locale.getDefault()).format(new Date());
        File mediaFile;
        if (type == MEDIA_TYPE_IMAGE) {
            mediaFile = new File(mediaStorageDir.getPath() + File.separator
                    + "IMG_" + timeStamp + ".jpg");
        }
        else {
            return null;
        }

        return mediaFile;
    }


    public String getPath(Uri uri) {
        String[] projection = { MediaStore.Images.Media.DATA };
        Cursor cursor = getActivity().getContentResolver().query(uri, projection, null, null, null);
        if(cursor!=null){
        int column_index = cursor.getColumnIndexOrThrow(MediaStore.Images.Media.DATA);
        cursor.moveToFirst();
        return cursor.getString(column_index);}
        return uri.getPath();
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
    public void retrieveSampleData(View vw) {
        WebServiceTask wst = new WebServiceTask(WebServiceTask.GET_TASK, getActivity(), "Getting data...");
        wst.execute(new String[]{SERVICE_URL});
    }

    public interface OnFragmentInteractionListener {
        void onAttach(MainActivity activity);

        // TODO: Update argument type and name
        public void onFragmentInteraction(Uri uri);
    }
    private void CheckZipCode(String zipCode)
    {
        operationType = 1;
        dialog=ProgressDialog.show(getActivity(),
                "Loading","Please Wait...",false);
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
            dialog.dismiss();
            switch(operationType)
            {
                case 1:
                    isValidZipCode = jso.get("Is_Valid_Zip_Code").toString();
                    if(isValidZipCode=="true") {
                        customerInfoFragment = new CustomerInfoFragment();
                        fragmentTransaction = getFragmentManager().beginTransaction();
                        args = new Bundle();
                        args.putString("GetABetterOffer", "GetABetterOffer");
                            /*args.putString("Name", etName.getText().toString());
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
                            args.putString("ZipCode", etZipCode.getText().toString());*/
                        customerInfoFragment.setArguments(args);
                        fragmentTransaction.replace(R.id.container, customerInfoFragment);
                        fragmentTransaction.commit();

                        // GetAnOffer(address, cityId, cylinders, emailAddress, make, model, name, phone, makeId, modelId, year, stateId, zipCode);
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

