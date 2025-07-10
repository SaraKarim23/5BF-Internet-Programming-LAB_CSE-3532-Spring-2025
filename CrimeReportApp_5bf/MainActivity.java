package com.yourname.crimereportapp;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {

    Button reportBtn, viewReportsBtn, logoutBtn, emergencyContactsBtn;
    TextView welcomeText;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        reportBtn = findViewById(R.id.reportBtn);
        viewReportsBtn = findViewById(R.id.viewReportsBtn);
        logoutBtn = findViewById(R.id.logoutBtn);
        emergencyContactsBtn = findViewById(R.id.emergencyContactsBtn);
        welcomeText = findViewById(R.id.welcomeText);

        // Optional: show logged-in role
        String role = getIntent().getStringExtra("role");
        if (role != null) {
            welcomeText.setText("Welcome " + role + "!");
        }

        reportBtn.setOnClickListener(v -> {
            startActivity(new Intent(MainActivity.this, EmergencyReportActivity.class));
        });

        viewReportsBtn.setOnClickListener(v -> {
            startActivity(new Intent(MainActivity.this, ViewReportsActivity.class));
        });

        emergencyContactsBtn.setOnClickListener(v -> {
            startActivity(new Intent(MainActivity.this, EmergencyContactsActivity.class));
        });

        logoutBtn.setOnClickListener(v -> {
            Intent intent = new Intent(MainActivity.this, LoginActivity.class);
            intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
            startActivity(intent);
            finish();
        });
    }
}
