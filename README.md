# MangoHub

## Project Introduction

**What is this project?**

MangoHub is a web app for discovering and exploring anime and manga. Users can browse top anime and manga, search for specific titles, explore content by genre, get a random recommendation, and save their favorites — all in one place.

**Why was it built?**

Built as a Module 4 project to practice working with third-party APIs, DOM manipulation, async/await, localStorage, and multi-page web app architecture.

**Who is it for?**

Anime and manga fans who want a clean, fast way to discover new titles and keep track of their favorites.

## Deployment & Demo

**Live Deployment:** https://ishtiaq-william-mls.github.io/mod-4-project/

## Additional Project Links

**Wireframes:** [Link to wireframe designs]

**Project Proposal:** https://docs.google.com/document/d/1iKl3Tdp7HrA2aFKe2P-FLp9tEPXOb5VpwN3fXcDeQBA/edit?usp=sharing

## Tech Stack

**Frontend:**

- HTML, CSS, JavaScript (ES Modules)
Vite (development build tool)

**Backend:**

- None! — fully client-side

**Database:**

- localStorage (for persisting favorites and media type preference)

**Additional Libraries & APIs:**

- Jikan API — unofficial MyAnimeList REST API for anime/manga data
- Font Awesome — icons (favorite heart button)
- Google Fonts — Inter font family

**Development Tools:**

- Git & GitHub
- Vite
- npm

## Project Setup Instructions

### Prerequisites

- Node.js v14+
- npm

### Installation Steps

1. **Clone the repository:**
```bash
git clone https://github.com/ishtiaq-william-mls/mod-4-project.git
cd mod-4-project
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start the development server:**
```bash
npm run dev
```

4. **Access the application:**

- Open your browser and navigate to http://localhost:5173

- No environment variables or database setup required, the app uses the public Jikan API and localStorage.

## Contributing
We welcome contributions to this project! Please follow these guidelines:

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch: git checkout -b feature/your-feature-name**
3. **Make your changes following our coding standards**
4. **Commit your changes with descriptive commit messages**
5. **Push to your branch: git push origin feature/your-feature-name**
6. **Submit a pull request with a clear description of your changes**

### Contribution Guidelines

- Follow the existing code style and conventions
- Write clear, descriptive commit messages
- Update documentation as needed
- Ensure nothing is broken before submitting a PR

---

## Development Workflow

This project follows a **branch and merge workflow**:

- **Never push code directly to the main branch**
- Work on separate feature branches
- Create pull requests (PRs) for all changes
- **All PRs must be reviewed and merged by someone else, even on solo projects**
- Delete branches after successful merges

### Branch Naming Convention

- `feature/feature-name` for new features
- `fix/bug-description` for bug fixes
- `update/component-name` for updates
- `style/styling-changes` for styling updates


## Documentation Standards

### Inline Comments
- Document your code with clear, concise comments
- Label different parts of the code
- Describe what functions and files are for
- **Delete any commented-out code** before committing

### Commit Message Format
Use descriptive commit messages that start with:
- `feat:` for new features
- `fix:` for bug fixes
- `update:` for updates to existing functionality
- `style:` for styling changes
- `delete:` for removing code/files

**Examples:**
```
feat: add user authentication system
fix: resolve login validation bug
update: improve error handling in API calls
style: update navigation bar styling
delete: remove deprecated helper functions
```

## Project Management

### Scrum Board
- Maintain an updated and detailed scrum board
- Use specific, descriptive cards for all tasks
- Track progress through different stages (To Do, In Progress, Review, Done)

### Pull Request Guidelines

**All PRs should include:**
- **Descriptive titles** that summarize the changes
- **Detailed descriptions** including:
  - Features added or modified
  - Bug fixes implemented
  - Successful testing results
  - Any breaking changes
  - Screenshots (if UI changes)

**PR Description Template:**
```markdown
## What this PR does
[Brief description of changes]

## Features Added/Modified
- [List of new features or modifications]

## Testing
- [X] All tests pass
- [X] Manually tested functionality
- [X] No breaking changes

## Screenshots (if applicable)
[Add screenshots of UI changes]
```

---


## Contact

Built by Ishtiaq Akanda and William Jiang
© 2026 All rights reserved.
