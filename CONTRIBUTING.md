# Contributing to Bech-Do

First off, thanks for taking the time to contribute! ❤️

The following is a set of guidelines for contributing to Bech-Do. These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Style Guide](#style-guide)

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## Getting Started

- Make sure you have a [GitHub account](https://github.com/signup/free)
- Submit a ticket for your issue, assuming one does not already exist
  - Clearly describe the issue including steps to reproduce when it's a bug
  - Make sure you fill in the earliest version that you know has the issue
- Fork the repository on GitHub

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps which reproduce the problem**
- **Provide specific examples to demonstrate the steps**
- **Describe the behavior you observed after following the steps**
- **Explain which behavior you expected to see instead and why**
- **Include screenshots if possible**

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

- **Use a clear and descriptive title**
- **Provide a step-by-step description of the suggested enhancement**
- **Provide specific examples to demonstrate the steps**
- **Describe the current behavior and explain the behavior you expected to see**
- **Explain why this enhancement would be useful**

### Your First Code Contribution

Unsure where to begin contributing? You can start by looking through these `beginner` and `help-wanted` issues:

- Beginner issues - issues which should only require a few lines of code
- Help wanted issues - issues which should be a bit more involved

## Development Setup

1. **Clone your fork**
   ```bash
   git clone https://github.com/yourusername/bech-do.git
   cd bech-do
   ```

2. **Run the setup script**
   ```bash
   ./setup.sh
   ```

3. **Set up environment variables**
   - Copy and update `backend/.env.example` to `backend/.env`
   - Copy and update `frontend/.env.example` to `frontend/.env.local`

4. **Start the development servers**
   ```bash
   # Backend (in one terminal)
   cd backend
   go run cmd/server/main.go
   
   # Frontend (in another terminal)
   cd frontend
   npm run dev
   ```

## Pull Request Process

1. **Fork the repository** and create your branch from `main`
2. **Make your changes** following our style guide
3. **Add tests** if you've added code that should be tested
4. **Ensure the test suite passes**
5. **Make sure your code lints**
6. **Update documentation** if needed
7. **Submit a pull request**

### Pull Request Template

```
## Description
Brief description of the changes

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)  
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] This change requires a documentation update

## Testing
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes

## Screenshots (if applicable)
Add screenshots to help explain your changes

## Checklist
- [ ] My code follows the style guidelines of this project
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
```

## Style Guide

### Frontend (TypeScript/React)
- Use TypeScript for all new code
- Follow the existing component structure
- Use Tailwind CSS for styling
- Use meaningful variable and function names
- Add proper TypeScript types
- Follow React hooks best practices

### Backend (Go)
- Follow standard Go formatting (`gofmt`)
- Use meaningful package and function names
- Add proper error handling
- Write descriptive comments for exported functions
- Follow Go best practices and idioms

### Git Commit Messages
- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line

Example:
```
Add user authentication system

- Implement JWT-based authentication
- Add login and registration endpoints
- Include password hashing with bcrypt
- Add middleware for protected routes

Closes #123
```

### Code Comments
- Write self-documenting code when possible
- Add comments for complex business logic
- Use JSDoc for TypeScript functions
- Use Go doc comments for exported functions

## Additional Notes

### Issue and Pull Request Labels

- `bug` - Something isn't working
- `enhancement` - New feature or request
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention is needed
- `question` - Further information is requested

Thank you for contributing to Bech-Do! 🎉