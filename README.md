# 🎬 MoviesApp

A full-featured movie management app built with **React**, **Redux**, and **Material UI**, using a local **JSON server** as a mock backend for full CRUD operations.

---

## 🧰 Technologies Used

### Frontend

- React + Vite
- Redux Toolkit
- React Router v6+
- Material UI (MUI)
- SweetAlert2
- Axios

### Backend

- JSON Server (Mock REST API)
- `movies.json` as local database

---

## 📁 Project Structure

MoviesApp/
├── backend/ # JSON Server backend (with movies.json)
│ └── movies.json
├── frontend/ # React frontend
│ └── src/
│ ├── pages/
│ ├── redux/
│ └── ...
├── README.md

yaml
Copy
Edit

---

## ⚙️ Setup Instructions

### 🔁 1. Clone the Repository

```bash
git clone https://github.com/Ahmed-Bakr611/MoviesApp.git
cd MoviesApp
🔌 2. Start the Backend
Navigate to the backend directory and start the JSON server:

bash
Copy
Edit
cd backend
npm install json-server
npx json-server --watch movies.json --port 3001
This will start a mock API at http://localhost:3001/movies.

💻 3. Start the Frontend
Open a new terminal and run the React app:

bash
Copy
Edit
cd frontend
npm install
npm run dev
By default, the frontend runs at http://localhost:5173

✨ Features
✅ Full CRUD for Movies

🔐 Register & Login using Redux

⭐ Add & Remove Favourites

👤 User Profile Page

🌙 Material UI Dark Mode

🔄 Real-time updates

📱 Fully responsive

🔔 SweetAlert2 popups

```

🛠 API Endpoints

| Method | Endpoint     | Description          |
| ------ | ------------ | -------------------- |
| GET    | /movies      | Fetch all movies     |
| GET    | /movies/\:id | Get a specific movie |
| POST   | /movies      | Add a new movie      |
| PUT    | /movies/\:id | Update a movie       |
| DELETE | /movies/\:id | Delete a movie       |
