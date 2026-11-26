# 🚀 SolveSphere

### Turn Real Problems into Real Solutions.

SolveSphere is a real-world problem-solving platform that connects students with companies through practical challenges. It enables problem owners to post real-world problems and allows students to participate, develop solutions, and showcase their skills through hands-on projects.

The platform focuses on **skill-based evaluation rather than resume-based screening**, helping students demonstrate their abilities through actual work while giving problem owners an opportunity to discover talent based on practical solutions.

---

## 📌 About SolveSphere

Traditional hiring often relies heavily on resumes, academic performance, and theoretical knowledge, making it difficult to evaluate a student's actual technical and problem-solving abilities.

SolveSphere bridges this gap by creating a challenge-driven environment where:

- Companies and problem owners can post real-world challenges.
- Students can discover problems that match their interests and skills.
- Participants can work on challenges and submit their solutions.
- Problem owners can review submissions and evaluate candidates based on their work.

SolveSphere turns real-world problems into opportunities for learning, innovation, and talent discovery.

---

## 🎯 Objectives

- Bridge the gap between students and industry requirements.
- Encourage practical learning through real-world challenges.
- Help students demonstrate their skills through working solutions.
- Enable companies to discover talent based on practical ability.
- Promote creativity, innovation, and problem-solving.
- Create a challenge-based ecosystem for skill development and evaluation.

---

## ✨ Features

### 🔐 Authentication & User Management
- User registration and login.
- Role-based access for Solvers and Problem Owners.
- Authentication and session management.
- Profile access and management.
- Logout functionality.

### 🔎 Explore Challenges
- Browse available real-world problems.
- Search challenges using keywords.
- Filter and sort problems.
- View detailed problem descriptions.
- Explore objectives and expected outcomes.

### 🧩 Challenge Participation
- Join challenges.
- Leave challenges when needed.
- View challenge participants.
- Track participation in problem-solving activities.

### 🤖 AI-Powered Suggestions
- Get AI-assisted guidance for tackling challenges.
- Explore possible approaches to problem solving.
- Receive suggestions to help get started on solutions.

### 💻 Solution Submission
- Submit solutions to challenges.
- Add solution titles and detailed descriptions.
- Provide GitHub repository links.
- Attach live demo links.
- Showcase implementation and approach.

### 📊 Solver Dashboard
- Personalized solver dashboard.
- Access problem-solving activities.
- View submissions.
- Navigate challenges and user activities.

### 🏢 Problem Owner Dashboard
- Manage posted problems.
- View submissions received.
- Review submitted solutions.
- Approve or reject submissions.

### 📋 Submission Review
- View individual solution details.
- Review descriptions and project links.
- Manage submission status.
- Approve or reject submitted solutions.

### 👤 User Profile
- View user information.
- Access profile-related details.
- Manage user account information.

### 🧭 User Experience
- Responsive and organized UI.
- Intuitive navigation.
- Reusable frontend components.
- Form validation.
- User feedback and interaction states.
- Custom 404 Not Found page.

---

## 🔄 Platform Workflow

1. Users register or log into SolveSphere.
2. Solvers browse available challenges.
3. Solvers view problem details and objectives.
4. Solvers join challenges they want to work on.
5. AI suggestions help them explore possible approaches.
6. Solvers develop their solutions.
7. Solutions are submitted with descriptions and project links.
8. Problem owners review the submissions.
9. Problem owners approve or reject submitted solutions.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React.js | Frontend UI development |
| Vite | Development server and build tool |
| JavaScript | Application logic |
| CSS3 | Styling and responsive design |
| React Router | Routing and navigation |
| Java | Backend development |
| Spring Boot | REST API development |
| Database | Persistent application data |
| Git & GitHub | Version control and collaboration |
| npm | Package management |

---

## 🏗️ Architecture

SolveSphere follows a client-server architecture where the frontend communicates with the backend through REST APIs.

```text
             ┌──────────────────────┐
             │        USERS         │
             │  Solvers & Owners   │
             └──────────┬───────────┘
                        │
             ┌──────────▼───────────┐
             │   React Frontend     │
             │     Vite + CSS       │
             └──────────┬───────────┘
                        │
                   REST APIs
                        │
             ┌──────────▼───────────┐
             │   Spring Boot API    │
             │     Java Backend     │
             └──────────┬───────────┘
                        │
             ┌──────────▼───────────┐
             │      Database        │
             │  Persistent Storage  │
             └──────────────────────┘
```

---

## 📂 Project Structure

```text
SolveSphere/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── ...
│   ├── package.json
│   └── vite.config.js
│
├── backend-springboot/
│   └── Spring Boot Application
│
└── README.md
```

---

## 🚀 Installation & Setup

### Prerequisites

- Node.js
- npm
- Java JDK
- Git

### Clone the Repository

```bash
git clone <your-repository-url>
```

### Navigate to the Frontend

```bash
cd SolveSphere/frontend
```

### Install Dependencies

```bash
npm install
```

### Run the Frontend

```bash
npm run dev
```

### Access the Application

Open your browser and visit:

```text
http://localhost:5173
```

### Run the Backend

Run the Spring Boot backend application separately using your IDE or the Maven wrapper, if provided in the backend project.

---

## 🔮 Future Enhancements

- Real-time notifications.
- Advanced AI-powered solution assistance.
- Skill analytics and performance insights.
- Enhanced collaboration between participants.
- Advanced feedback and evaluation mechanisms.
- Expanded problem categories and discovery features.
- Portfolio-building features for solvers.

---

## 🌍 Vision

SolveSphere aims to create a skill-driven ecosystem where students get the opportunity to prove their abilities through real-world problem solving and companies can discover talent through demonstrated skills.

We believe skills are best demonstrated through what people build, solve, and create.

---

## SolveSphere

**Turn Real Problems into Real Solutions.**
