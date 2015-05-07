package com.junkcartrader.junkcartraderapp;

import android.app.Activity;
import android.net.Uri;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentTransaction;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;

/**
 * Created by srameezk on 5/7/2015.
 */
public class SettingsFragment extends Fragment
{

    View rootView;
    private static final String ARG_SECTION_NUMBER = "section_number";
    private Button btnChangePassword,btnEditProfile;
    Fragment changePasswordFragment,editProfileFragment;
    FragmentTransaction fragmentTransaction;
    Bundle args;

    private OnFragmentInteractionListener mListener;

    public static SettingsFragment newInstance(int sectionNumber) {
        SettingsFragment fragment = new SettingsFragment();
        Bundle args = new Bundle();
        args.putInt(ARG_SECTION_NUMBER, sectionNumber);
        fragment.setArguments(args);
        return fragment;
    }

    public SettingsFragment() {
    }
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        rootView = inflater.inflate(R.layout.fragment_settings, container, false);
        Initialize();
        return rootView;
    }

    public void Initialize(){
        btnChangePassword=(Button)rootView.findViewById(R.id.btnChangePassword);
        btnEditProfile=(Button)rootView.findViewById(R.id.btnEditProfile);
        btnChangePassword.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                MainActivity mainActivity=(MainActivity)getActivity();
                changePasswordFragment=new ChangePasswordFragment();
                fragmentTransaction=getFragmentManager().beginTransaction();
                args=new Bundle();
                String email=mainActivity.GetEmail();
                String password=mainActivity.GetPassword();
                args.putString("email",email);
                args.putString("password",password);
                changePasswordFragment.setArguments(args);
                fragmentTransaction.replace(R.id.container,changePasswordFragment);
                fragmentTransaction.commit();

            }
        });

        btnEditProfile.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                MainActivity mainActivity=(MainActivity)getActivity();
                editProfileFragment=new EditProfileFragment();
                fragmentTransaction=getFragmentManager().beginTransaction();
                args=new Bundle();
                String email=mainActivity.GetEmail();
                String password=mainActivity.GetPassword();
                args.putString("email",email);
                args.putString("password",password);
                editProfileFragment.setArguments(args);
                fragmentTransaction.replace(R.id.container,editProfileFragment);
                fragmentTransaction.commit();
            }
        });

    }
    public interface OnFragmentInteractionListener {

        void onAttach(MainActivity activity);

        // TODO: Update argument type and name
        public void onFragmentInteraction(Uri uri);
    }

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


}