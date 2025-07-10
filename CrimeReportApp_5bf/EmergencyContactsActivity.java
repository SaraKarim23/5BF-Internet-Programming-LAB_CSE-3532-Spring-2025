package com.yourname.crimereportapp;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

public class EmergencyContactsActivity extends AppCompatActivity {

    ListView contactsListView;

    String[] contactNames = {
            "Police - 999",
            "Ambulance - 998",
            "Fire Service - 997",
            "National Emergency - 911",
            "Women Helpline - 10921",
            "Child Helpline - 1098"
    };

    String[] contactNumbers = {
            "999", "998", "997", "911", "10921", "1098"
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_emergency_contacts);

        contactsListView = findViewById(R.id.contactsListView);

        ArrayAdapter<String> adapter = new ArrayAdapter<>(
                this, android.R.layout.simple_list_item_1, contactNames);

        contactsListView.setAdapter(adapter);

        contactsListView.setOnItemClickListener((AdapterView<?> parent, android.view.View view, int position, long id) -> {
            String number = contactNumbers[position];
            Intent callIntent = new Intent(Intent.ACTION_DIAL);
            callIntent.setData(Uri.parse("tel:" + number));
            try {
                startActivity(callIntent);
            } catch (Exception e) {
                Toast.makeText(this, "Calling not supported on this device", Toast.LENGTH_SHORT).show();
            }
        });
    }
}
