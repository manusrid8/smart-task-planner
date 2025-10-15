# 📝 Smart Task Planner  

**Transform Your Goals Into Actionable Plans – Powered by AI**  

Smart Task Planner helps users break down goals into structured tasks, estimate timelines, and visualize actionable steps — all using **AI reasoning**.

---

## 🌟 Features  

**Goal Submission**  
- Enter any goal (e.g., “Launch a product in 2 weeks”).  

**AI-Powered Task Generation**  
- The AI analyzes your goal and returns a task breakdown with suggested deadlines and dependencies.  

**Task Management Dashboard**  
- Add, edit, or delete tasks  
- Mark tasks as completed or pending  
- View tasks with estimated durations  

**User Authentication**  
- Simple login and signup to manage personal goals  

**Intuitive Frontend Interface**  
- Responsive and clean UI to easily view, manage, and update your tasks  

---

## 🛠️ Tech Stack  

- **Frontend:** HTML, CSS, JavaScript  
- **Backend:** Node.js, Express.js  
- **Database:** MySQL  
- **AI Integration:** OpenRouter (LLaMA model) for intelligent task reasoning  

---

## 🧠 LLM Integration  

The core of Smart Task Planner’s intelligence lies in its **Large Language Model (LLM) integration**.  

- The backend uses **OpenRouter’s API key** to securely connect with an **LLM such as LLaMA**.  
- The model interprets user goals and generates:  
  - A detailed task breakdown  
  - Estimated timelines  
  - Task dependencies and order of execution  
- This allows for dynamic, human-like reasoning that makes the generated plans highly practical and adaptive.  

**Example Prompt Used:**  
> “Break down this goal into actionable tasks with suggested deadlines and dependencies.”

---

## ⚡ How It Works  

1. User submits a goal via the dashboard.  
2. The backend sends the goal text to the connected LLM (via OpenRouter API).  
3. The AI returns a detailed plan, including:  
   - List of actionable tasks  
   - Estimated days to complete each task  
   - Dependencies between tasks  
4. Users can manage and track progress directly from the dashboard.  

---

## 📦 Setup Instructions

**Clone the repository:**

```bash
git clone https://github.com/manusrid8/smart-task-planner.git
cd smart-task-planner
```

## 📦 Setup Instructions

### Backend Setup

```bash
cd backend
npm install
```

### Create a `.env` file

Create a `.env` file in the `backend` folder with the following variables:

```env
PORT=5000
DB_HOST=your_host
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=your_db
OPENROUTER_API_KEY=your_api_key
```

### Start the Backend Server

```bash
npm start
```

### Frontend

Open `frontend/index.html` in your browser to access the dashboard.


---

---

## 🎥 Demo

**Goal Input**  
- Watch how users can submit their goals.

**AI-Generated Task Breakdown**  
- See the AI break down goals into actionable tasks with suggested timelines.

**Task Management**  
- Demonstrates adding, editing, and completing tasks in real-time.
  

[demo video]

https://github.com/user-attachments/assets/dbceeb3b-45dd-42b3-b773-75ddf94c81e5

