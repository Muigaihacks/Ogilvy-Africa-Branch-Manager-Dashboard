# Branch Manager Dashboard (Ogilvy Africa Assessment)

A full-stack interactive Branch Manager Dashboard built with React (Next.js) and Node.js (Express). This application allows branch managers to track key performance indicators (KPIs), visualize lead and revenue data, and monitor agent performance.

![Dashboard Preview](DASHBOARD-Branch manager.jpg)

## 🚀 Technology Stack

- **Frontend:** Next.js 15 (React 19), Tailwind CSS, Recharts, Lucide React, Axios.
- **Backend:** Node.js, Express.js.
- **Tools:** TypeScript, ESLint.

## ✨ Features

- **Interactive Filtering:** Filter data by Date Range, Agent, Branch, Product, Segment, and Campaign.
- **KPI Tracking:** Real-time view of Turn Around Time, Conversion Rate, Contacted Leads, and Total Leads.
- **Data Visualization:**
  - Area Charts for Leads & Revenue by Branch.
  - Donut Chart for Lead Status distribution.
  - Bar Chart for Agent Performance.
- **Agent Rankings:** Detailed tables for Branch Ranking and Top Performing Agents.
- **Responsive Design:** Fully optimized for Desktop and Tablet views.

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm

### 1. Clone the Repository
```bash
git clone https://github.com/Muigaihacks/Ogilvy-Africa-Branch-Manager-Dashboard.git
cd Ogilvy-Africa-Branch-Manager-Dashboard
```

### 2. Backend Setup
The backend runs on port 5000.

```bash
cd server
npm install
npm run dev
```
_Keep this terminal running._

### 3. Frontend Setup
The frontend runs on port 3000.

```bash
# Open a new terminal
cd client
npm install
npm run dev
```

### 4. Access the Application
Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📂 Project Structure

```
├── client/                 # Next.js Frontend
│   ├── src/
│   │   ├── app/           # App Router Pages
│   │   ├── components/    # Reusable UI Components
│   │   ├── lib/           # API Utilities
│   │   └── types.ts       # TypeScript Interfaces
│   └── package.json
└── server/                 # Express Backend
    ├── server.js          # API Entry Point
    ├── data.js            # Mock Data Source
    └── package.json
```

## 🧠 Architectural Decisions

- **Monorepo-style Structure:** Kept client and server separate for clear separation of concerns while maintaining a single repository for submission.
- **Next.js App Router:** Leveraged for modern React features and routing.
- **Client-Side Fetching:** Used `useEffect` for data fetching to strictly adhere to the requirement of "managing local state of filters and triggering data fetching" on client interaction.
- **Tailwind CSS:** For rapid, consistent, and responsive styling.
- **Recharts:** Chosen for its flexibility in creating the specific custom wave/area charts required by the design.

## 📝 License
This project is part of a technical assessment for Ogilvy Africa.

