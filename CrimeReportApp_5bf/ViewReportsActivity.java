package com.yourname.crimereportapp;

import android.content.Intent;
import android.os.Bundle;
import android.widget.*;
import androidx.appcompat.app.AppCompatActivity;

public class ViewReportsActivity extends AppCompatActivity {

    ListView reportListView;
    String[] dummyReports = {
            "Fire at Main Street",
            "Robbery at 5th Avenue",
            "Accident on Highway 9",
            "Suspicious activity in Park",
            "Medical Emergency near School"
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_view_reports);

        reportListView = findViewById(R.id.reportListView);
        ArrayAdapter<String> adapter = new ArrayAdapter<>(this,
                android.R.layout.simple_list_item_1, dummyReports);
        reportListView.setAdapter(adapter);

        reportListView.setOnItemClickListener((parent, view, position, id) -> {
            String selectedReport = dummyReports[position];
            Intent intent = new Intent(this, ReportDetailsActivity.class);
            intent.putExtra("reportDetails", selectedReport);
            startActivity(intent);
        });
    }
}


