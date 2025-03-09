# Task Manager Frontend

A modern task management application built with Next.js 15 that provides an intuitive interface for managing tasks through a Kanban board system.

## Features

- Interactive Kanban board interface
- Drag and drop task management
- Real-time updates and synchronization
- Responsive design for all devices
- Dark/light mode theming
- Integration with NestJS backend

## Project Structure

```
task-manager/
├── src/
│   ├── app/
│   │   ├── globals.css      # Global styles
│   │   ├── layout.tsx       # Root layout component
│   │   └── page.tsx         # Home page component
│   └── components/
│       ├── KanbanBoard.tsx  # Main Kanban board component
│       └── task-list/
│           └── Tasks.tsx    # Task list component
├── public/
├── .env                     # Environment variables
├── next.config.ts          # Next.js configuration
└── package.json            # Project dependencies
```

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```

3. Run the development server:
```bash
npm run dev
```
