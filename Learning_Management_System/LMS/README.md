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

bash
Copy
Edit

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
bash
Copy
Edit
VITE_API_BASE_URL=http://localhost:5000/api
3️⃣ Install Dependencies
Server:
bash
Copy
Edit
cd server
npm install
npm start
Client:
bash
Copy
Edit
cd client
npm install
npm run dev
🌐 Cloudinary Integration
Videos are uploaded to Cloudinary during lecture creation. The backend stores the secure_url from the Cloudinary response and passes it to the frontend, where it's rendered in a <video> tag.

📸 Screenshots


<img width="1895" height="853" alt="home" src="https://github.com/user-attachments/assets/97c2ce61-0da5-4423-9a51-bdff13c82afe" />




📄 License
This project is open-source and available under the MIT License.

yaml
Copy
Edit

---

Let me know if you also want:
- A `LICENSE` file
- To change the GitHub link above to your real profile
- To include a badge (build status, license, etc.) at the top
