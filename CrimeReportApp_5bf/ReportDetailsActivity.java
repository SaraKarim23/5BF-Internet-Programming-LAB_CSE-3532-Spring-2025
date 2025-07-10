package com.yourname.crimereportapp;

import android.os.Bundle;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

public class ReportDetailsActivity extends AppCompatActivity {

    TextView reportTitle, reportDesc, reportTime;
    ImageView reportImage;
    Button addImageBtn;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_report_details);

        reportTitle = findViewById(R.id.reportTitle);
        reportDesc = findViewById(R.id.reportDesc);
        reportTime = findViewById(R.id.reportTime);
        reportImage = findViewById(R.id.reportImage);
        addImageBtn = findViewById(R.id.addImageBtn);

        // Get the title from the intent (from ViewReportsActivity)
        String title = getIntent().getStringExtra("reportDetails");

        reportTitle.setText(title);

        // Dummy time
        String time = "Reported on: 25 June 2025, 4:32 PM";
        reportTime.setText(time);

        // Dummy description
        String description = "Details are currently not available.";
        if (title != null) {
            if (title.contains("Robbery")) {
                description = "Armed robbery occurred in the market area. Police have secured the scene.";
            } else if (title.contains("Drug")) {
                description = "Suspicious activity involving illegal substances near a school.";
            } else if (title.contains("Assault")) {
                description = "A physical altercation was reported in the Riverside neighborhood.";
            } else if (title.contains("Cyber")) {
                description = "Unauthorized access to private information via phishing.";
            } else if (title.contains("Kidnapping")) {
                description = "Child suspected to be missing from local park.";
            }
        }

        reportDesc.setText(description);

        // Set placeholder image
        reportImage.setImageResource(R.drawable.ic_crime); // Make sure this exists

        // Placeholder image picker logic
        addImageBtn.setOnClickListener(v -> {
            Toast.makeText(this, "Image picker not implemented yet", Toast.LENGTH_SHORT).show();
        });
    }
}

