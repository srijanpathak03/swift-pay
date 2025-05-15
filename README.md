# SwiftPay: Modern Digital Banking Platform

## Overview

SwiftPay is a full-featured digital banking platform built with modern web technologies. It provides a seamless experience for secure money transfers, account management, and financial insights.

## 🌟 Features

### User Application
- **Instant Money Transfers**: Send money securely to anyone
- **Smart Financial Insights**: AI-powered financial recommendations
- **Bank-Grade Security**: Enterprise-level security with biometric authentication
- **Responsive Design**: Beautiful UI that works across devices

### Simulated Banking API
- **Webhook Integration**: Simulated bank API for realistic payment flows
- **Transaction Processing**: Handles deposits and withdrawals
- **Notification System**: Real-time updates on transaction status
- **Testing Environment**: Predictable responses for development and testing

## 📸 Screenshots

### Home
![Home](./docs/images/home.png)

### User Dashboard
![User Dashboard](./docs/images/user-dashboard.png)

### Transfer Money
![Transfer Money](./docs/images/transfer-money.png)

### Recent Transactions
![Recent Transactions](./docs/images/transactions.png)

## 🛠️ Technology Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL (with Neon.tech cloud database)
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS with custom theming
- **Architecture**: Monorepo setup with Turborepo

## 📂 Project Structure

```
swiftpay/
├── apps/
│   └── user-app/         # User-facing application
├── packages/
│   ├── db/               # Shared database access layer
│   ├── ui/               # Shared UI components
│   └── config/           # Shared configuration
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn or pnpm
- PostgreSQL or Neon.tech account

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/srijanpathak03/swiftpay.git
   cd swiftpay
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Create `.env` file in `packages/db`:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/swiftpay"
   ```

4. **Run database migrations**
   ```bash
   cd packages/db
   npx prisma migrate deploy
   npx prisma db seed
   ```

5. **Start the development server**
   ```bash
   cd ../..
   npm run dev
   ```

6. **Open your browser**
   - User app: http://localhost:3000
   - Simulated Bank API: http://localhost:3001/api/webhook

## 🔐 Authentication

- **User App**: Phone number + password authentication

## 🧪 Test Accounts

| Account Type | Phone/Email | Password |
|--------------|-------------|----------|
| User         | 123456      | 123456   |

## 📱 Responsive Design

SwiftPay is designed to work seamlessly across devices:
- Desktop
- Tablet
- Mobile

## 💳 Simulated Bank API

The project includes a simulated bank API that mimics real banking interactions:

- **Deposit Processing**: Simulates money being added to accounts
- **Withdrawal Verification**: Validates and processes withdrawal requests
- **Transaction Status Updates**: Provides webhooks for transaction state changes
- **Error Simulation**: Can simulate declined transactions for testing
- **Testing Mode**: Special endpoints for triggering specific scenarios

### API Endpoints

- `/api/webhook/deposit`: Simulates a bank deposit
- `/api/webhook/withdraw`: Processes withdrawal requests
- `/api/webhook/status`: Checks transaction status
- `/api/webhook/verify`: Validates account information

## 🔄 Development Workflow

1. Make changes to the codebase
2. Test your changes locally
3. Create a pull request
4. Deploy after approval

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- NextJS and Vercel for the amazing development experience
- Tailwind CSS for the utility-first CSS framework
- Framer Motion for smooth animations
- Neon.tech for serverless PostgreSQL

---

*Built with ❤️*
