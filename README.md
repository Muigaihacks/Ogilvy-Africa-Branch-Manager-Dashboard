# Branch Manager Dashboard - Ogilvy Africa Assessment

This repository contains the solution for the **Full Stack Engineering Take-Home Assignment**. It implements a responsive, interactive Branch Manager Dashboard that allows for filtering, visualizing, and analyzing key performance metrics for sales agents and branches.

## 🏗️ Architecture & Technology Stack

The project follows a **Monorepo** structure for simplicity and ease of evaluation, separating the frontend and backend concerns while keeping them in a single repository.

### **Frontend (Client)**
*   **Framework:** [Next.js 15 (App Router)](https://nextjs.org/) - Chosen for its robust routing, server-side rendering capabilities, and modern React 19 integration.
*   **Language:** TypeScript - For type safety and better developer experience.
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/) - Used for rapid, responsive, and consistent UI development matching the provided design specs.
*   **Visualization:** [Recharts](https://recharts.org/) - Selected for its composable API to build the required complex Area, Donut, and Bar charts.
*   **Icons:** Lucide React.
*   **State Management:** React Hooks (`useState`, `useEffect`) - Implemented to manage local filter states and handle data fetching side-effects.

### **Backend (Server)**
*   **Runtime:** Node.js
*   **Framework:** [Express.js](https://expressjs.com/) - A minimal and flexible framework to quickly set up the required REST API endpoints.
*   **Data Source:** In-memory Mock Data (`data.js`) - Simulates a database with comprehensive datasets for Agents, Branches, and historical metrics.
*   **Logic:** Custom filtering logic implemented in the controller to handle query parameters (`?branch=A&agent=Jane`) and simulate dynamic data changes (KPI adjustments, chart trend shifts).

---

## 🚀 Setup & Run Instructions

To run this project locally, you will need **Node.js (v18 or higher)** and **npm**.

### 1. Clone the Repository
```bash
git clone https://github.com/Muigaihacks/Ogilvy-Africa-Branch-Manager-Dashboard.git
cd Ogilvy-Africa-Branch-Manager-Dashboard
```

### 2. Start the Backend API
The backend runs on **Port 8000** (to avoid conflicts with system services on macOS).

1.  Open a terminal and navigate to the server directory:
    ```bash
    cd server
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the server:
    ```bash
    npm run dev
    ```
    ✅ You should see: `Server running on port 8000`

### 3. Start the Frontend Application
The frontend runs on **Port 3000**.

1.  Open a **new** terminal window (keep the server terminal running).
2.  Navigate to the client directory:
    ```bash
    cd client
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```
4.  Start the development server:
    ```bash
    npm run dev
    ```
    ✅ Access the app at: [http://localhost:3000](http://localhost:3000)

---

## ✨ Key Features Implemented

*   **Pixel-Perfect UI:** Closely matched the provided design mockups, including the specific "Optimus" logo, color palette, and layout structure (Sidebar, Top Nav, Dashboard Grid).
*   **Interactive Filtering:**
    *   The **Filter Bar** drives the entire dashboard. Selecting a **Branch** (e.g., Branch A) filters the Charts, Tables, and even adjusts the KPI cards to reflect that specific branch's data.
    *   **"Filter By" Dropdowns** on charts trigger visual updates (simulating time-scale changes).
*   **Dynamic Data Visualization:**
    *   **Area Charts:** Smooth gradients for Leads and Revenue trends.
    *   **Donut Chart:** "Lead Status" distribution that updates proportionally based on filters.
    *   **Bar Chart:** "Agent Performance" comparison.
*   **Robust Data Handling:**
    *   The backend simulates realistic data relationships (e.g., selecting "Branch A" only shows agents belonging to Branch A in the rankings).
    *   Implemented **Loading Skeletons** and **Error States** for a production-grade user experience.

## 📝 Notes for the Evaluator

*   **Port Configuration:** The backend is configured to run on port `8000` by default. If you need to change this, update `server/server.js` and `client/src/lib/api.ts`.
*   **Data Simulation:** While the backend uses mock data, the filtering logic is functional. You will see values change when applying filters to demonstrate the full-stack connection.

---
**Submission by:** Tyrese Muigai
