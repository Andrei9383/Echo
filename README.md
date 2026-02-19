# Activity Tracker

![Logo](./assets/images/logo_2.png)

A personal activity tracking application built with React Native and Expo, utilizing [BNA UI](https://ui.ahmedbna.com/) components.

## Features

- **Activity Tracking**: Log and monitor your daily activities efficiently.
- **Streaks**: Visualize your consistency with streak tracking.
- **Statistics**: View daily counts and historical data.
- **Offline First**: Data is stored locally using SQLite and Drizzle ORM.
- **Beautiful UI**: Built with BNA UI for a modern and clean look.
- **Dark/Light Mode**: Automatic theme switching based on system settings.

## Tech Stack

- **Framework**: [Expo](https://expo.dev/) (React Native)
- **Navigation**: [Expo Router](https://docs.expo.dev/router/introduction/)
- **Database**: [SQLite](https://docs.expo.dev/versions/latest/sdk/sqlite/) with [Drizzle ORM](https://orm.drizzle.team/)
- **UI Components**: [BNA UI](https://ui.ahmedbna.com/)
- **Styling**: Tailwind-like styling via BNA UI components.

## Getting Started

### Prerequisites

- Node.js
- npm, yarn, or pnpm
- [Expo Go](https://expo.dev/client) app on your mobile device (optional, for testing)

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/ahmedbna/bna-app.git
    cd bna-app
    ```

2.  Install dependencies:
    ```bash
    pnpm install
    # or
    npm install
    ```

3.  Run the application:
    ```bash
    npx expo start
    ```

4.  Scan the QR code with Expo Go (Android/iOS) or run on a simulator.

## Database

The app uses a local SQLite database named `activities`. Schema definitions can be found in `db/schema.ts`.

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## Code of Conduct

Please note that this project is released with a [Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Made with ❤️ by [Ahmed BNA](https://github.com/ahmedbna)
