# SolveSphere – Project Plan

## Project Overview
SolveSphere is an AI-powered collaborative platform where users can post real-world problems, contributors can join those problems, work on solutions, and submit completed projects for review.

## Users
- Problem Owner: posts a problem and reviews submitted solutions.
- Contributor: joins a problem and submits a project solution.
- Admin: manages platform content in future versions.

## Main Workflow
1. A problem owner posts a problem statement.
2. Gemini AI analyzes the problem.
3. Contributors browse and join the problem.
4. Contributors build their solution.
5. Contributors submit GitHub link, demo link, documentation, PPT, and screenshots.
6. The problem owner reviews and accepts, rejects, or marks a solution as best.

## Core Features
- User authentication
- Create, edit, and close problem statements
- Browse, search, and filter problems
- Join and leave a problem
- View participants working on a problem
- AI-generated problem analysis and roadmap
- Submit completed projects
- Review and update solution status

## Technology Stack
- Frontend: React + Vite
- Backend: Python + FastAPI
- Database: PostgreSQL
- AI: Gemini API
- Authentication: JWT
- File Storage: Cloudinary or Firebase Storage

## Team Work Division

### Member 1 – Backend and AI
- Database design
- FastAPI backend
- Authentication APIs
- Problem, participant, and submission APIs
- Gemini AI integration
- Database deployment

### Member 2 – Frontend and UI/UX
- React frontend
- Page design and routing
- Forms and dashboards
- API integration
- Responsive UI
- Frontend deployment
