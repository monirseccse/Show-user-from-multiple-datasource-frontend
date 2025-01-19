
# Project Title

Show user data from various data sources in a single page application.


## Overview
This project is a React application built with Vite that allows users to select a data source dynamically via HTTP headers and perform CRUD (Create, Read, Update, Delete) operations, including list pagination with support for searching by last name.
## Prerequisites
Node.js (>= 14.x)

npm 
## Installation

1. clone project

```bash
  https://github.com/monirseccse/Show-user-from-multiple-datasource-frontend.git
```
2. install dependencies
```bash
npm install
```
3. Configure Environment Variables
```
VITE_API_BASE_UR L= https://localhost:7006
```
4. Start the Development Server
```
npm run dev
```
    
## Backend Requirements
This project assumes a backend service is available to handle API requests. Example endpoints include:

**Headers:**

The header X-DataSource is required to indicate the data source (SQL or NoSQL).

**API Endpoints:**

POST /api/user/create

GET /api/read?pageNumber=<number>&itemsperPage=<number>&search=<lastname>

PUT /api/user/{id}

DELETE /api/user/delete/{id}