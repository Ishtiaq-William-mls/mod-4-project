MangoHub
Project Introduction
What is this project?
MangoHub is a web app for discovering and exploring anime and manga. Users can browse top anime and manga, search for specific titles, explore content by genre, get a random recommendation, and save their favorites — all in one place.
Why was it built?
Built as a Module 4 project to practice working with third-party APIs, DOM manipulation, async/await, localStorage, and multi-page web app architecture.
Who is it for?
Anime and manga fans who want a clean, fast way to discover new titles and keep track of their favorites.

Deployment & Demo
Live Deployment: https://ishtiaq-william-mls.github.io/mod-4-project/

Additional Project Links

Wireframes: [Link to wireframe designs]
Project Proposal: https://docs.google.com/document/d/1iKl3Tdp7HrA2aFKe2P-FLp9tEPXOb5VpwN3fXcDeQBA/edit?usp=sharing

Tech Stack
Frontend:

HTML, CSS, JavaScript (ES Modules)
Vite (development build tool)

Backend:

None — fully client-side

Database:

localStorage (for persisting favorites and media type preference)

Additional Libraries & APIs:

Jikan API — unofficial MyAnimeList REST API for anime/manga data
Font Awesome — icons (favorite heart button)
Google Fonts — Inter font family

Development Tools:

Git & GitHub
Vite
npm


Project Setup Instructions
Prerequisites

Node.js v14+
npm

Installation Steps

Clone the repository:

git clone https://github.com/ishtiaq-william-mls/mod-4-project.git
cd mod-4-project

Install dependencies:

npm install

Start the development server:

npm run dev

Access the application:

Open your browser and navigate to http://localhost:5173




No environment variables or database setup required — the app uses the public Jikan API and localStorage.


Contributing
We welcome contributions to this project! Please follow these guidelines:
How to Contribute

Fork the repository
Create a feature branch: git checkout -b feature/your-feature-name
Make your changes following our coding standards
Commit your changes with descriptive commit messages
Push to your branch: git push origin feature/your-feature-name
Submit a pull request with a clear description of your changes

Contribution Guidelines

Follow the existing code style and conventions
Write clear, descriptive commit messages
Update documentation as needed
Ensure nothing is broken before submitting a PR

Development Workflow

Never push code directly to the main branch
Work on separate feature branches
Create pull requests for all changes
All PRs must be reviewed before merging
Delete branches after successful merges

Branch Naming Convention

feature/feature-name for new features
fix/bug-description for bug fixes
update/component-name for updates
style/styling-changes for styling updates


Documentation Standards
Inline Comments

Document code with clear, concise comments
Describe what functions and files are for
Delete commented-out code before committing

Commit Message Format

feat: for new features
fix: for bug fixes
update: for updates to existing functionality
style: for styling changes
delete: for removing code/files

Examples:
feat: add favorites page with localStorage
fix: resolve 429 rate limit error on favorites load
update: improve modal content layout
style: update nav bar styling

Project Management
Scrum Board

Maintain an updated scrum board with detailed task cards
Track progress through stages: To Do → In Progress → Review → Done

Pull Request Guidelines
All PRs should include:

Descriptive titles summarizing the changes
Features added or modified
Bug fixes implemented
Testing results
Screenshots for UI changes

PR Description Template:
## What this PR does
[Brief description of changes]

## Features Added/Modified
- [List of new features or modifications]

## Testing
- [ ] Manually tested functionality
- [ ] No breaking changes

## Screenshots (if applicable)
[Add screenshots of UI changes]

Contact
Built by Ishtiaq Akanda and William Jiang
© 2026 All rights reserved.
