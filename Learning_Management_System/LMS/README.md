# 🎓 Learning Management System (LMS)

A full-featured Learning Management System built with modern web technologies. This platform allows users to browse and purchase courses, watch lecture videos, and track course progress. Admins can manage courses, upload video lectures, and monitor student activity.

## 👨‍💻 Contributor

| Name           | Student ID |
|----------------|------------|
| Tanha Tanven   | C231468    |

## 🚀 Features

### 🧑‍🎓 Student Features
- ✅ User authentication and role-based access
- 📚 View all enrolled courses
- 📺 Watch video lectures
- 📊 Track progress of each course and individual lecture
- 🎯 Mark course as completed/incomplete
- 💳 Mock course purchasing flow with confirmation

### 🧑‍🏫 Admin Features
- 📦 Add and manage courses
- 🎥 Upload lectures (videos via Cloudinary)
- 📌 Assign titles, descriptions, and video URLs to lectures
- 🧮 View course analytics and student completion rates

## 🛠️ Tech Stack

| Tech             | Usage                            |
|------------------|----------------------------------|
| React.js         | Frontend                         |
| Redux Toolkit    | State Management & API Handling  |
| Tailwind CSS     | Styling                          |
| Node.js + Express| Backend API                      |
| MongoDB          | Database                         |
| Cloudinary       | Video hosting & streaming        |
| Sonner / Toast   | Notification system              |

## 📁 Folder Structure

/
├── client/ # React frontend
│ ├── src/
│ │ ├── components/
│ │ ├── features/api/
│ │ ├── pages/
│ │ └── App.jsx
├── server/ # Node + Express backend
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ └── server.js
├── README.md

ScreenShots:
1. Homepage:

<img width="1895" height="853" alt="home" src="https://github.com/user-attachments/assets/b6ed35e1-48b6-4cd6-812c-b4b9e05c06aa" />
<img width="1892" height="816" alt="home2" src="https://github.com/user-attachments/assets/d09c1d28-86fa-4e4e-9866-9de4fafd0369" />
<img width="1900" height="853" alt="home3" src="https://github.com/user-attachments/assets/d548fdef-feaf-4402-a39e-b95cdf11900b" />
<img width="1902" height="498" alt="home4" src="https://github.com/user-attachments/assets/fc092b62-ce7a-4f00-ba34-16703ff85da6" />
Student's Learning page:
<img width="1836" height="816" alt="Userlearning" src="https://github.com/user-attachments/assets/f40eafc2-e68d-4597-bbf8-8c559be8dc80" />
Profile:
<img width="1735" height="843" alt="UserProfile" src="https://github.com/user-attachments/assets/018439ea-a23b-4d70-a63d-446abbc70c45" />
Course Details page:
<img width="1911" height="844" alt="Coursedetail" src="https://github.com/user-attachments/assets/b9781e79-9f32-4be0-8953-413666edfcd8" />
<img width="1840" height="838" alt="coursedetail2" src="https://github.com/user-attachments/assets/e9ef46ef-eb75-467a-b265-b54462766773" />
Billing Page(purchase course form):
<img width="1860" height="786" alt="billing" src="https://github.com/user-attachments/assets/c6416e4f-2490-443a-baf8-22b1d0c27c84" />
Course Progress Page:
<img width="1873" height="857" alt="courseprogress" src="https://github.com/user-attachments/assets/74781490-fb7b-47d3-8d52-ad55035e1f50" />


Admin DashBoard:
<img width="1888" height="842" alt="admin1" src="https://github.com/user-attachments/assets/b86000cf-17b6-44ed-83bd-cea0c1cf0522" />
<img width="1890" height="829" alt="admin2" src="https://github.com/user-attachments/assets/3ca5036b-7941-47c4-9952-4a1623a720b7" />
<img width="1897" height="833" alt="admin23" src="https://github.com/user-attachments/assets/d034ff2c-458d-4dec-ac27-b4d61d9dba97" />
<img width="1900" height="854" alt="admin3" src="https://github.com/user-attachments/assets/0083dabc-6fd4-4bdc-aa5e-1c7b361e7dbb" />
<img width="1813" height="838" alt="lectureaddadmin4" src="https://github.com/user-attachments/assets/ff57c501-729d-4c4e-857d-40671f927725" />
<img width="1881" height="842" alt="admin5" src="https://github.com/user-attachments/assets/d29e2978-d6f3-4271-8eb0-49a6a7024f75" />





## 🧪 Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/lms-project.git
cd lms-project
2️⃣ Setup Environment Variables
Create .env files in both /server and /client:

For server (/server/.env):
ini
Copy
Edit
MONGODB_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
For client (/client/.env):

VITE_API_BASE_URL=http://localhost:5000/api
3️⃣ Install Dependencies
Server:
cd server
npm install
npm start
Client:

cd client
npm install
npm run dev
🌐 Cloudinary Integration
Videos are uploaded to Cloudinary during lecture creation. The backend stores the secure_url from the Cloudinary response and passes it to the frontend, where it's rendered in a <video> tag.


📄 License
This project is open-source and available under the MIT License.


