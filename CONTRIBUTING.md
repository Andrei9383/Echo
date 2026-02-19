# Contributing to Echo

First off, thanks for taking the time to contribute! 🎉

The following is a set of guidelines for contributing to Echo and its packages. These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

## Code of Conduct

This project and everyone participating in it is governed by the [Echo Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to the project team.

## Getting Started

### Prerequisites

*   Node.js (LTS version recommended)
*   pnpm (recommended) or npm/yarn
*   Expo Go app on your mobile device (optional, for testing on real device)

### Installation

1.  **Fork the repository** on GitHub.
2.  **Clone your fork** locally:
    ```bash
    git clone https://github.com/Andrei9383/Echo.git
    cd Echo
    ```
3.  **Install dependencies**:
    ```bash
    pnpm install
    ```

## Development Workflow

1.  **Create a branch** for your feature or bugfix:
    ```bash
    git checkout -b feature/amazing-feature
    # or
    git checkout -b fix/annoying-bug
    ```
2.  **Make your changes**.
3.  **Run the app** to test your changes:
    ```bash
    npx expo start
    ```
4.  **Lint your code** (if applicable):
    ```bash
    npm run lint
    ```

## Pull Request Process

1.  **Push your changes** to your fork:
    ```bash
    git push origin feature/amazing-feature
    ```
2.  **Open a Pull Request** against the `main` branch of the original repository.
3.  **Describe your changes** clearly in the PR description. Link any related issues using keywords like "Fixes #123".
4.  **Wait for review**. A maintainer will review your PR and may request changes.

## Code Style

*   Follow the existing code style and formatting.
*   Use meaningful variable and function names.
*   Comment your code where necessary, but aim for self-documenting code.

## Reporting Issues

If you find a bug or have a feature request, please open an issue on GitHub.
*   **Bugs**: Describe the issue, steps to reproduce, expected behavior, and actual behavior. Include screenshots if possible.
*   **Features**: Describe the proposed feature and why it would be useful.

Thank you for contributing!
