# forms.py
from django import forms  
from myapp.models import Employee  

class EmployeeForm(forms.ModelForm):  
    class Meta:  
        model = Employee  
        fields = ['name', 'contact', 'email', 'package_name', 'price']  # Add the new fields
        widgets = { 
            'name': forms.TextInput(attrs={'class': 'form-control'}), 
            'email': forms.EmailInput(attrs={'class': 'form-control'}),
            'contact': forms.TextInput(attrs={'class': 'form-control'}),
            'package_name': forms.TextInput(attrs={'class': 'form-control'}),  # New widget
            'price': forms.NumberInput(attrs={'class': 'form-control'}),  # New widget
        }
