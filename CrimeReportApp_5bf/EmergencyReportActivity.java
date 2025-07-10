package com.yourname.crimereportapp;

import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

public class EmergencyReportActivity extends AppCompatActivity {

    EditText reportTitleEditText, reportDescriptionEditText;
    Button submitReportBtn;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_emergency_report);

        reportTitleEditText = findViewById(R.id.reportTitleEditText);
        reportDescriptionEditText = findViewById(R.id.reportDescriptionEditText);
        submitReportBtn = findViewById(R.id.submitReportBtn);

        submitReportBtn.setOnClickListener(v -> {
            String title = reportTitleEditText.getText().toString().trim();
            String desc = reportDescriptionEditText.getText().toString().trim();

            if (title.isEmpty() || desc.isEmpty()) {
                Toast.makeText(this, "Please fill all fields", Toast.LENGTH_SHORT).show();
            } else {
                // Simulate report submission
                Toast.makeText(this, "Report submitted successfully", Toast.LENGTH_LONG).show();
                reportTitleEditText.setText("");
                reportDescriptionEditText.setText("");
            }
        });
    }
}
