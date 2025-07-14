# 🏪 Warehouse E-Commerce Site
A web-based e-commerce platform built using Python-Django, HTML, CSS, JavaScript, and Owl Carousel. This platform enables users to browse products, manage inventory, and complete purchases efficiently.

Additionally, the project features an AI-powered chatbot that provides real-time product details, pricing, and availability by fetching data from the Django admin panel and external AI resources.

## 👥 Team Member
| Name            | ID       | Role      |
|---------------|---------|-----------|
| Maksuda Islam | C231440 | Developer |

## 🚀 Features
- ✅ **User Authentication** – Secure login and registration system.
- ✅ **Product Management** – Add, edit, and delete products from the Django admin panel.
- ✅ **AI Chatbot** – Provides product information, pricing, and availability.
- ✅ **Dynamic UI** – Engaging user experience with Owl Carousel for product display.
- ✅ **Order Management** – Users can place, track, and manage orders.
- ✅ **Secure Payment (Optional)** – Integrate payment gateways for seamless transactions.
- ✅ **Search & Filters** – Advanced filtering options for easier product discovery.

## 🛠️ Technologies Used
### Backend:
- Python-Django

### Frontend:
- HTML, CSS, JavaScript
- Owl Carousel (for product display)

### Database:
- SQLite (or PostgreSQL/MySQL if configured)

### AI Integration:
- Chatbot fetching data via API

### Deployment:
- Vercel
- Render

## 📌 Installation Guide
Follow these steps to set up the project on your local machine:

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-repo/warehouse-ecommerce.git
cd warehouse-ecommerce
```

### 2️⃣ Create a Virtual Environment
```bash
python -m venv venv
source venv/bin/activate   # For macOS/Linux
venv\Scripts\activate      # For Windows
```

### 3️⃣ Install Dependencies
```bash
pip install -r requirements.txt
```

### 4️⃣ Run Migrations
```bash
python manage.py migrate
```

### 5️⃣ Create a Superuser (For Admin Access)
```bash
python manage.py createsuperuser
```

### 6️⃣ Start the Development Server
```bash
python manage.py runserver
```
Visit [http://127.0.0.1:8000/](http://127.0.0.1:8000/) in your browser to access the project.

## 🤖 Chatbot Integration
- 💬 The chatbot icon appears on the website.
- 🔍 Users can interact with it to get product details.
- 📺 Data is fetched from the Django admin and an external AI API.

## 📍 Development Roadmap
This roadmap outlines the planned phases of development for the Warehouse E-Commerce Site.

### 🚀 Phase 1: Core Development (Completed ✅)
- ✔ Set up Django project structure.
- ✔ Implement user authentication (registration, login, logout).
- ✔ Create Django admin panel for product and order management.
- ✔ Build frontend with HTML, CSS, and JavaScript.
- ✔ Integrate Owl Carousel for product display.
- ✔ Set up the database (SQLite/PostgreSQL/MySQL).

### 🛠️ Phase 2: AI Chatbot Integration (In Progress 🛠️)
- 🔹 Develop a chatbot UI with an interactive message window.
- 🔹 Connect the chatbot to fetch product data from the Django admin panel.
- 🔹 Implement API integration for external AI-powered responses.
- 🔹 Optimize chatbot responses for faster interaction.

### 🔍 Phase 3: Advanced Features (Planned 💟)
- 🔹 Implement an advanced search and filtering system.
- 🔹 Add order tracking and management features.
- 🔹 Improve user dashboard with order history and saved items.
- 🔹 Enhance UI/UX for a seamless shopping experience.

### 💳 Phase 4: Payment & Deployment (Future Goals 🚀)
- 🔹 Integrate a secure payment gateway (Stripe, PayPal, etc.).
- 🔹 Optimize the website for better performance and security.
- 🔹 Deploy the project on a hosting platform (Heroku, AWS, DigitalOcean).
- 🔹 Set up monitoring and maintenance for long-term stability.

### 📈 Phase 5: Expansion & Enhancements (Future Scope 🌎)
- 🔹 Add multi-vendor functionality for warehouse owners.
- 🔹 Implement AI-powered recommendations for users.
- 🔹 Develop a mobile-friendly version or a dedicated mobile app.
- 🔹 Introduce bulk order management and analytics.

## 📸 Screenshots
## Banner
* ![image](https://github.com/user-attachments/assets/d97a12d6-95c4-43e0-9ec3-ac14ab80211b)
## Prooduct
* ![image](https://github.com/user-attachments/assets/358fd522-5ea2-4530-89db-80f36d6fe070)
## Product Title and about Product
* ![image](https://github.com/user-attachments/assets/1131676b-61c1-4fd2-a17d-568d63df9902)
## Shopping Cart
* ![image](https://github.com/user-attachments/assets/bb874e39-6794-46ed-97c5-a9911f450a42)
## Order Summary
* ![image](https://github.com/user-attachments/assets/570378a4-1245-44bc-951c-57d3aba532e8)
## My Order Status
* ![image](https://github.com/user-attachments/assets/c42d2a91-c2f8-42a8-a7ab-2a720bbe07f4)





## 📌 Contributing
If you wish to contribute, follow these steps:

1. Fork the repository.

2. Create a new branch:
```bash
git checkout -b feature-branch
```

3. Make your changes and commit:
```bash
git commit -m "Added new feature"
```

4. Push to your fork:
```bash
git push origin feature-branch
```

5. Create a Pull Request (PR).


