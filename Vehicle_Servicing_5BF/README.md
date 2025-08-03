🚗 Vehicle Servicing Management System  
A responsive and user-friendly web platform for managing vehicle servicing and appointments, built with HTML, CSS, and PHP.

📋 Project Overview  
The **Vehicle Servicing Management System** is designed to streamline vehicle service booking, tracking, and customer management. It features a clean interface for users to book services and view service history, while admins can manage records, respond to inquiries, and update status through a secure panel. Built using core web technologies, it runs on any standard LAMP stack.

🌟 Features  
✅ User Registration & Login System (PHP Sessions)  
✅ Service Booking Form  
✅ Admin Dashboard (Manage Users, Services, Feedback)  
✅ View Past Service Records  
✅ Contact & Inquiry Form  
✅ Responsive Layout (Mobile & Desktop)  
✅ Clean & Intuitive UI  
✅ Email Confirmation / Alerts (Optional via PHP Mail)  

🛠 Tech Stack  
**Frontend:**  
- HTML5  
- CSS3 (Tailwind Optional)  
- JavaScript (Basic Interactivity)  
- Designed & Developed in Visual Studio Code  

**Backend:**  
- PHP (Core PHP, no framework)  
- MySQL (Database)  
- Apache Server (XAMPP/WAMP recommended)  

📜 Pages  
1️⃣ **Home Page** – Welcome banner, featured services, contact link  
2️⃣ **Login / Registration Page** – User authentication using PHP sessions  
3️⃣ **Book Service Page** – Form to request vehicle servicing  
4️⃣ **Service History Page** – View past service records  
5️⃣ **Admin Dashboard** – Add/Remove services, manage users  
6️⃣ **Contact Page** – Form for queries or feedback  
7️⃣ **About Page** – Info about the service center and goals  

👨‍💻 Submitted By  
| Name                    | ID        |  
|-------------------------|-----------|  
| Subah Mashiat Chowdhury | C231459   |  
| Aysha Dil Afroz         | C231451   |  
| Rownok Jahan            | C231453   |  

📌 Setup & Installation  

### ✅ Prerequisites  
- XAMPP or WAMP installed  
- Visual Studio Code  
- PHP and MySQL configured  

### ⚙️ Steps  

1️⃣ **Clone or Download the Project Folder**  
```bash  
git clone <repo-link>  
# or download ZIP and extract  
2️⃣ Move Project to Server Directory
For XAMPP:

bash
Copy
Edit
Move the folder to: C:/xampp/htdocs/vehicle-servicing  
3️⃣ Create MySQL Database

Open phpMyAdmin

Create a new database: vehicle_service

Import the database.sql file (included in project folder)

4️⃣ Update Database Connection
Edit the /config/db.php file:

php
Copy
Edit
$host = 'localhost';  
$user = 'root';  
$pass = '';  
$dbname = 'vehicle_service';  
$conn = new mysqli($host, $user, $pass, $dbname);  
5️⃣ Run the Application
Start Apache and MySQL from XAMPP.
Go to your browser and enter:

arduino
Copy
Edit
http://localhost/vehicle-servicing  
📅 Development Roadmap

🟢 Phase 1 – Basic UI in HTML/CSS (Home, Book Service, Contact)
🟡 Phase 2 – User Login/Register (PHP & MySQL Integration)
🔵 Phase 3 – Admin Panel & Service History
🟣 Phase 4 – Testing, Email Features, Final Debug

🎯 Final Words
Our goal is to digitize and simplify vehicle maintenance processes for both customers and service centers.
Drive safe, stay updated, and service smart! 🚘
