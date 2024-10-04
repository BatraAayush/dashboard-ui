# Device Dashboard

An application for viewing device data graphically. Data is very large and stored in Postgres Database.

## Features

- Average MBRT Graph
- Peak Time Analysis
- Average Time per Device
- Device Success Rate Breakdown


## Technologies Used

- **Frontend:** React, Bootstrap, Chart.js
- **Backend:** Node.js, Express.js, Prisma, Postgres

## Installation

Follow these steps to get your development environment set up:

   ```bash
   git clone https://github.com/BatraAayush/dashboard-ui
   cd dashboard-ui
   npm i
   npm run dev
  ```

## Implementation process

### Backend

- At first I started with Backend. I initialized my backend app and then installed required dependencies. I created index.js. I used Aiven for Database hosting. I created Schema for the data. Then i created file to seed data in backend. After that created route to get data from Backend. After that I hosted it on Vercel.
  
### Frontend

- I created react app using vite. Then i created basic routing using react router. After that i created context for global state management and fetching data. After that i created Navbar component. After that i worked on different graphs specified in the assignment. At last I hosted it online on netlify

## Live Links
### Frontend
- Source Code: [https://github.com/BatraAayush/dashboard-ui](https://github.com/BatraAayush/dashboard-ui)
- Live Link: [https://device-dashboard-ab.netlify.app/](https://device-dashboard-ab.netlify.app/)

### Backend
- Source Code: [https://github.com/BatraAayush/dashboard-api](https://github.com/BatraAayush/dashboard-api)
- Live Link: [https://dashboard-api-iota.vercel.app/](https://dashboard-api-iota.vercel.app/)
