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
import java.io.ByteArrayOutputStream;
import java.io.DataOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
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
    private int serverResponseCode = 0;
    private ImageButton imgBtnCamera1Photo,imgBtnCamera2Photo,imgBtnCamera3Photo,imgBtnCamera4Photo,imgBtnCamera5Photo,
            imgBtnOpenFolder1Photo,imgBtnOpenFolder2Photo,imgBtnOpenFolder3Photo,imgBtnOpenFolder4Photo,imgBtnOpenFolder5Photo;
    private Button btnNextCustomerInfo;
    String isValidZipCode,OfferType,year,make,makeId,model,
           modelId,cylinders,zipCode,questionnaire,email,name,address,
           stateId,cityId,phoneNumber,customerId,imagePath,uploadServerUri = null;
    Uri fileUri;
    byte[] byteArray;
    String[] pathArray=new String [5];
    ArrayList<String> path=null;
    public static final int MEDIA_TYPE_IMAGE = 1;
    private static final String IMAGE_DIRECTORY_NAME = "JunkCarPhotos";
    FragmentTransaction fragmentTransaction;
    Fragment offerFragment;
    Bundle args;
    View rootView;
    static TextView imageDetails      = null;

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
        OfferType = getArguments().getString("OfferType");
        name=getArguments().getString("Name");
        address=getArguments().getString("Address");
        stateId=getArguments().getString("StateId");
        cityId=getArguments().getString("CityId");
        phoneNumber=getArguments().getString("PhoneNumber");
        email=getArguments().getString("EmailAddress");
        year=getArguments().getString("Year");
        make=getArguments().getString("Make");
        makeId=getArguments().getString("MakeId");
        model=getArguments().getString("Model");
        modelId=getArguments().getString("ModelId");
        cylinders=getArguments().getString("Cylinders");
        questionnaire=getArguments().getString("Questionnaire");
        zipCode=getArguments().getString("ZipCode");
        customerId=getArguments().getString("CustomerId");
        path=new ArrayList<String>();
        //email=getArguments().getString("email");
        Initialize();
        return rootView;
    }

    public void Initialize()
    {
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

                Upload();
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
                try {
                    Context context = getActivity();
                    PackageManager packageManager = context.getPackageManager();
                    if (packageManager.hasSystemFeature(PackageManager.FEATURE_CAMERA) == false) {
                        Toast.makeText(getActivity(), "Your Device Does not support camera feature", Toast.LENGTH_SHORT).show();
                    } else {
                        Intent intent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
                        fileUri = getOutputMediaFileUri(MEDIA_TYPE_IMAGE);
                        intent.putExtra(MediaStore.EXTRA_OUTPUT, fileUri);
                        startActivityForResult(intent, 5);
                    }
                }
                catch (Exception e){}
            }
        });
        imgBtnCamera2Photo.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                try {
                    Context context = getActivity();
                    PackageManager packageManager = context.getPackageManager();
                    if (packageManager.hasSystemFeature(PackageManager.FEATURE_CAMERA) == false) {
                        Toast.makeText(getActivity(), "Your Device Does not support camera feature", Toast.LENGTH_SHORT).show();
                    } else {
                        Intent intent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
                        fileUri = getOutputMediaFileUri(MEDIA_TYPE_IMAGE);
                        intent.putExtra(MediaStore.EXTRA_OUTPUT, fileUri);
                        startActivityForResult(intent, 6);
                    }
                }
                catch (Exception e){}
            }
        });
        imgBtnCamera3Photo.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                try {
                    Context context = getActivity();
                    PackageManager packageManager = context.getPackageManager();
                    if (packageManager.hasSystemFeature(PackageManager.FEATURE_CAMERA) == false) {
                        Toast.makeText(getActivity(), "Your Device Does not support camera feature", Toast.LENGTH_SHORT).show();
                    } else {
                        Intent intent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
                        fileUri = getOutputMediaFileUri(MEDIA_TYPE_IMAGE);
                        intent.putExtra(MediaStore.EXTRA_OUTPUT, fileUri);
                        startActivityForResult(intent, 7);
                    }
                }
                catch (Exception e){}
            }
        });
        imgBtnCamera4Photo.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                try {
                    Context context = getActivity();
                    PackageManager packageManager = context.getPackageManager();
                    if (packageManager.hasSystemFeature(PackageManager.FEATURE_CAMERA) == false) {
                        Toast.makeText(getActivity(), "Your Device Does not support camera feature", Toast.LENGTH_SHORT).show();
                    } else {
                        Intent intent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
                        fileUri = getOutputMediaFileUri(MEDIA_TYPE_IMAGE);
                        intent.putExtra(MediaStore.EXTRA_OUTPUT, fileUri);
                        startActivityForResult(intent, 8);
                    }
                }
                catch (Exception e){}
            }
        });
        imgBtnCamera5Photo.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                try {
                    Context context = getActivity();
                    PackageManager packageManager = context.getPackageManager();
                    if (packageManager.hasSystemFeature(PackageManager.FEATURE_CAMERA) == false) {
                        Toast.makeText(getActivity(), "Your Device Does not support camera feature", Toast.LENGTH_SHORT).show();
                    } else {
                        Intent intent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
                        fileUri = getOutputMediaFileUri(MEDIA_TYPE_IMAGE);
                        intent.putExtra(MediaStore.EXTRA_OUTPUT, fileUri);
                        startActivityForResult(intent, 9);
                    }
                }
                catch (Exception e){}
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
                    Uri selectedImageUri = data.getData();
                    //MEDIA GALLERY
                    imagePath =ImageFilePath.getPath(getActivity(),selectedImageUri);
                    Bitmap bmp=BitmapFactory.decodeFile(imagePath);
                    Bitmap image=Bitmap.createScaledBitmap(bmp, 170, 170, true);
                    ivphoto1.setImageBitmap(image);
                    if(!imagePath.equals(null))
                    {
                        pathArray[0]=imagePath;
                    }
                    else
                    {
                        Toast.makeText(getActivity(),"Null value",Toast.LENGTH_SHORT).show();
                    }
                    //imageDetails.setText(imagePath);
                    //byteArray=convertToBytes(selectedImagePath);
                    //imageDetails.setText(selectedImagePath);
                    break;
                case 1:
                    selectedImageUri = data.getData();
                    imagePath = ImageFilePath.getPath(this.getActivity(), selectedImageUri);
                    bmp=BitmapFactory.decodeFile(imagePath);
                    image=Bitmap.createScaledBitmap(bmp, 170, 170, true);
                    ivphoto2.setImageBitmap(image);
                    if(!imagePath.equals(null))
                    {
                        pathArray[1]=imagePath;
                    }
                    else
                    {
                        Toast.makeText(getActivity(),"Null value",Toast.LENGTH_SHORT).show();
                    }
                    break;
                case 2:
                    selectedImageUri = data.getData();
                    imagePath = ImageFilePath.getPath(this.getActivity(), selectedImageUri);
                    bmp=BitmapFactory.decodeFile(imagePath);
                    image=Bitmap.createScaledBitmap(bmp, 170, 170, true);
                    ivphoto3.setImageBitmap(image);
                    if(!imagePath.equals(null))
                    {
                        pathArray[2]=imagePath;
                    }
                    else
                    {
                        Toast.makeText(getActivity(),"Null value",Toast.LENGTH_SHORT).show();
                    }
                    break;
                case 3:
                    selectedImageUri = data.getData();
                    imagePath = ImageFilePath.getPath(this.getActivity(), selectedImageUri);
                    bmp=BitmapFactory.decodeFile(imagePath);
                    image=Bitmap.createScaledBitmap(bmp, 170, 170, true);
                    ivphoto4.setImageBitmap(image);
                    if(!imagePath.equals(null))
                    {
                        pathArray[3]=imagePath;
                    }
                    else
                    {
                        Toast.makeText(getActivity(),"Null value",Toast.LENGTH_SHORT).show();
                    }
                    break;
                case 4:
                    selectedImageUri = data.getData();
                    imagePath = ImageFilePath.getPath(this.getActivity(), selectedImageUri);
                    bmp=BitmapFactory.decodeFile(imagePath);
                    image=Bitmap.createScaledBitmap(bmp, 170, 170, true);
                    ivphoto5.setImageBitmap(image);
                    if(!imagePath.equals(null))
                    {
                        pathArray[4]=imagePath;
                    }
                    else
                    {
                        Toast.makeText(getActivity(),"Null value",Toast.LENGTH_SHORT).show();
                    }
                    break;
                case 5:
                    // downsizing image as it throws OutOfMemory Exception for larger images
                    options.inSampleSize = 8;
                    Bitmap bitmap = BitmapFactory.decodeFile(fileUri.getPath(),
                            options);
                    imagePath=fileUri.getPath();
                    bitmap=Bitmap.createScaledBitmap(bitmap,170,170,true);
                    ivphoto1.setImageBitmap(bitmap);
                    if(!imagePath.equals(null))
                    {
                        pathArray[0]=imagePath;
                    }
                    else
                    {
                        Toast.makeText(getActivity(),"Null value",Toast.LENGTH_SHORT).show();
                    }
                    break;
                case 6:
                    options.inSampleSize = 8;

                    bitmap = BitmapFactory.decodeFile(fileUri.getPath(),
                            options);
                    imagePath=fileUri.getPath();
                    bitmap=Bitmap.createScaledBitmap(bitmap,170,170,true);
                    ivphoto2.setImageBitmap(bitmap);
                    if(!imagePath.equals(null))
                    {
                        pathArray[1]=imagePath;
                    }
                    else
                    {
                        Toast.makeText(getActivity(),"Null value",Toast.LENGTH_SHORT).show();
                    }
                    break;
                case 7:

                    options.inSampleSize = 8;
                    bitmap = BitmapFactory.decodeFile(fileUri.getPath(),
                            options);
                    imagePath=fileUri.getPath();
                    bitmap=Bitmap.createScaledBitmap(bitmap,170,170,true);
                    ivphoto3.setImageBitmap(bitmap);
                    if(!imagePath.equals(null))
                    {
                        pathArray[2]=imagePath;
                    }
                    else
                    {
                        Toast.makeText(getActivity(),"Null value",Toast.LENGTH_SHORT).show();
                    }
                    break;
                case 8:
                    options.inSampleSize = 8;
                    bitmap = BitmapFactory.decodeFile(fileUri.getPath(),
                            options);
                    imagePath=fileUri.getPath();
                    bitmap=Bitmap.createScaledBitmap(bitmap,170,170,true);
                    ivphoto4.setImageBitmap(bitmap);
                    if(!imagePath.equals(null))
                    {
                        pathArray[3]=imagePath;
                    }
                    else
                    {
                        Toast.makeText(getActivity(),"Null value",Toast.LENGTH_SHORT).show();
                    }
                    break;
                case 9:
                    options.inSampleSize = 8;
                    bitmap = BitmapFactory.decodeFile(fileUri.getPath(),
                            options);
                    imagePath=fileUri.getPath();
                    bitmap=Bitmap.createScaledBitmap(bitmap,170,170,true);
                    ivphoto5.setImageBitmap(bitmap);
                    if(!imagePath.equals(null))
                    {
                        pathArray[4]=imagePath;
                    }
                    else
                    {
                        Toast.makeText(getActivity(),"Null value",Toast.LENGTH_SHORT).show();
                    }
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

    public byte[] convertToBytes(String selectedImagePath)
    {
        try
        {
            FileInputStream fs = new FileInputStream(selectedImagePath);

            Bitmap bitmap = BitmapFactory.decodeStream(fs);

            ByteArrayOutputStream bOutput = new ByteArrayOutputStream();

            bitmap.compress(Bitmap.CompressFormat.PNG,1, bOutput);

            byte[] dataImage = bOutput.toByteArray();

            return dataImage;
        }
        catch(NullPointerException ex)
        {
            ex.printStackTrace();
            return null;
        }
        catch (FileNotFoundException e)
        {
            e.printStackTrace();
            return null;
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

    public void Upload()
    {
            dialog = ProgressDialog.show(getActivity(),
                    "Uploading", "Please Wait...", false);
            UploadFileAsync uploadFile = new UploadFileAsync();
            uploadFile.execute();

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
                    isValidZipCode = jso.get("Is_Valid_Zip_Code").toString();
                    if(isValidZipCode=="true") {
                        offerFragment = new OfferFragment();
                        fragmentTransaction = getFragmentManager().beginTransaction();
                        args = new Bundle();
                        args.putString("OfferType", OfferType);
                        args.putString("Address",address);
                        args.putString("StateId",stateId);
                        args.putString("CityId",cityId);
                        args.putString("PhoneNumber",phoneNumber);
                        args.putString("EmailAddress",email);
                        args.putString("Year", year);
                        args.putString("Make", make);
                        args.putString("MakeId", makeId);
                        args.putString("Model", model);
                        args.putString("ModelId", modelId);
                        args.putString("Cylinders", cylinders);
                        args.putString("ZipCode",zipCode);
                        args.putString("Questionnaire",questionnaire);
                        args.putString("CustomerId",customerId);
                        offerFragment.setArguments(args);
                        fragmentTransaction.replace(R.id.container, offerFragment);
                        fragmentTransaction.commit();
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
        private static final int CONN_TIMEOUT = 3000;
        // socket timeout, in milliseconds (waiting for data)
        private static final int SOCKET_TIMEOUT = 5000;
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

    private class UploadFileAsync extends AsyncTask<String, Void, String> {

        @Override
        protected String doInBackground(String... params) {
            for (int i = 0; i < pathArray.length; i++) {
                try {
                    String sourceFileUri = pathArray[i];

                    HttpURLConnection conn = null;
                    DataOutputStream dos = null;
                    String lineEnd = "\r\n";
                    String twoHyphens = "--";
                    String boundary = "*****";
                    int bytesRead, bytesAvailable, bufferSize;
                    byte[] buffer;
                    int maxBufferSize = 1 * 1024 * 1024;
                    File sourceFile = new File(sourceFileUri);

                    if (sourceFile.isFile()) {

                        try {
                            String upLoadServerUri = BASE_URL + "Home/Upload?"
                            + "customerid=" + customerId + "&cylinders=" + cylinders +
                            "&makeId=" + makeId + "&modelId=" + modelId + "&year=" + year;

                            // open a URL connection to the Servlet
                            FileInputStream fileInputStream = new FileInputStream(
                                    sourceFile);
                            URL url = new URL(upLoadServerUri);

                            // Open a HTTP connection to the URL
                            conn = (HttpURLConnection) url.openConnection();
                            conn.setDoInput(true); // Allow Inputs
                            conn.setDoOutput(true); // Allow Outputs
                            conn.setUseCaches(false); // Don't use a Cached Copy
                            conn.setRequestMethod("POST");
                            conn.setRequestProperty("Connection", "Keep-Alive");
                            conn.setRequestProperty("ENCTYPE",
                                    "multipart/form-data");
                            conn.setRequestProperty("Content-Type",
                                    "multipart/form-data;boundary=" + boundary);
                            conn.setRequestProperty("bill", sourceFileUri);

                            dos = new DataOutputStream(conn.getOutputStream());

                            dos.writeBytes(twoHyphens + boundary + lineEnd);
                            dos.writeBytes("Content-Disposition: form-data; name=\"bill\";filename=\""
                                    + sourceFileUri + "\"" + lineEnd);

                            dos.writeBytes(lineEnd);

                            // create a buffer of maximum size
                            bytesAvailable = fileInputStream.available();

                            bufferSize = Math.min(bytesAvailable, maxBufferSize);
                            buffer = new byte[bufferSize];

                            // read file and write it into form...
                            bytesRead = fileInputStream.read(buffer, 0, bufferSize);

                            while (bytesRead > 0) {

                                dos.write(buffer, 0, bufferSize);
                                bytesAvailable = fileInputStream.available();
                                bufferSize = Math
                                        .min(bytesAvailable, maxBufferSize);
                                bytesRead = fileInputStream.read(buffer, 0,
                                        bufferSize);

                            }

                            // send multipart form data necesssary after file
                            // data...
                            dos.writeBytes(lineEnd);
                            dos.writeBytes(twoHyphens + boundary + twoHyphens
                                    + lineEnd);

                            // Responses from the server (code and message)
                            serverResponseCode = conn.getResponseCode();
                            String serverResponseMessage = conn
                                    .getResponseMessage();

                            if (serverResponseCode == 200) {

                                // messageText.setText(msg);
                                Toast.makeText(getActivity(), "File Upload Complete.",
                                        Toast.LENGTH_SHORT).show();

                                // recursiveDelete(mDirectory1);

                            }

                            // close the streams //
                            fileInputStream.close();
                            dos.flush();
                            dos.close();

                        } catch (Exception e) {

                            // dialog.dismiss();
                            e.printStackTrace();

                        }
                        // dialog.dismiss();

                    } // End else block


                } catch (Exception ex) {
                    // dialog.dismiss();

                    ex.printStackTrace();
                }
                // dialog.dismiss();


            }
            dialog.dismiss();
            return "Executed";

        }

        @Override
        protected void onPostExecute(String result) {

            String answer=doInBackground().toString();
            if(answer.equals("Executed")) {

                Toast.makeText(getActivity(), "File(s) have been uploaded successfully", Toast.LENGTH_SHORT).show();

                CheckZipCode(zipCode);
            }
            else
            {
                Toast.makeText(getActivity(),"There was some problem uploading the file(s). Please try again later",Toast.LENGTH_SHORT);
            }

        }

        @Override
        protected void onPreExecute() {
        }

        @Override
        protected void onProgressUpdate(Void... values) {
        }
    }
}

