# Job Board

A React + Vite app that pulls live job postings from the Hacker News Firebase API and presents them in a searchable, sortable board.

## Overview

The app loads the current Hacker News job story IDs, fetches each item in parallel, and renders the result as a list of job cards. Users can:

- search by job title
- switch between newest-first and oldest-first order
- load additional results in groups of five
- refresh the board from the header action
- view loading, empty, error, and end-of-list states

## Current features

- Live data fetch from `https://hacker-news.firebaseio.com/v0/jobstories.json`
- Parallel fetching of full job item details from the Hacker News item endpoint
- Title-based filtering in the toolbar
- Sorting by newest or oldest posts
- Pagination with a `Load More` button
- Header refresh action to refetch jobs
- Relative time display, company-name inference from the title, and author metadata
- Empty-state, error-state, and end-of-results cards

## Tech stack

- [React 19](https://react.dev/)
- [Vite 8](https://vite.dev/)
- [ESLint](https://eslint.org/)
- CSS Modules
- Hacker News Firebase API

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) 20.19+ or 22.12+
- npm

### Install and run

```bash
git clone <your-repository-url>
cd job-board
npm install
npm run dev
```

The dev server usually runs at `http://localhost:5173`.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the Vite development server. |
| `npm run build` | Creates a production build in `dist/`. |
| `npm run preview` | Serves the production build locally. |
| `npm run lint` | Runs ESLint on the project. |

## How the app works

1. `App.jsx` fetches all job story IDs on initial load and when the refresh action is triggered.
2. `services/hackerNewsApi.js` loads each item detail with `Promise.all(...)`.
3. `JobBoard.jsx` handles search, sort, and pagination state.
4. `JobList.jsx` renders the currently visible jobs, while `JobCard.jsx` displays the listing details.
5. The toolbar filter only matches against the job title, and the clear action resets the list back to the full dataset.

Because the content is fetched at runtime from Hacker News, listings can change depending on API availability and the current job stories returned by the source.

## Project structure

```text
job-board/
├── public/
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── assets/
│   ├── components/
│   │   ├── JobCard/
│   │   ├── JobList/
│   │   ├── Preloader/
│   │   ├── emptyCard/
│   │   ├── endCard/
│   │   ├── error/
│   │   └── jobToolbar/
│   ├── context/
│   ├── hooks/
│   ├── layout/
│   │   ├── footer/
│   │   └── header/
│   ├── pages/
│   │   └── JobBoard/
│   ├── services/
│   │   └── hackerNewsApi.js
│   ├── styles/
│   └── utils/
├── eslint.config.js
├── index.html
├── package.json
├── README.md
├── vite.config.js
└── public/
```

## API behavior

This project uses the public Hacker News Firebase API and does not require an API key. The current implementation calls:

- `https://hacker-news.firebaseio.com/v0/jobstories.json`
- `https://hacker-news.firebaseio.com/v0/item/{id}.json`

## Notes

- Search is currently title-based only.
- The toolbar sort state toggles between `newToOld` and `oldToNew`.
- The `Load More` button is disabled once all filtered jobs are visible.
- This repository does not currently include a license file.
