# IT Hub

## Project Overview

![license](https://img.shields.io/badge/license--green.svg)
</br>
IT Hub is a Web app where the developer or anyone can freely create and manage the post about IT or any topic that you would like to share.
However, only register member can perform the management tasks.

This is a full stack MERN application with authentication where the user have to create an account and login to create a post. After login the user will be taken to their dashboard page with their profile pictures and information. In their dashboard, they can create a post, remove post, add to Favorite and remove favorite.

## Key Features:

- User authentication with session management
- Secure login, registration, and logout
- Dashboard layout with protected routes
- CRUD operations for posts
- Profile editing (bio, social links, profile image)
- MongoDB persistence and Express API routing

## Motivation for Development

- An easy to use app
- It is not too complicated to use
- Is a platform for developer to share their posts
- A Profile page for displaying user’s information
- A Dashboard for user to manage the post

  ## Table of Contents

  - [Installation](#installation)
  - [Usage](#usage)
  - [License](#license)
  - [Contributing](#contributing)
  - [Tests](#tests)
  - [Questions](#questions)

  ## Installation

  Clone this repository and install dependencies for both server and client:

````bash
git clone https://github.com/wendyUVo/IT-Hub.git
cd mern-it-hub

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install

## Usage
Option 1: Run Full Stack (Recommended)

```bash
npm run dev
This uses concurrently to run both the Express server and the React client.

Option 2: Manual Startup

```bash
# Terminal 1: Start React frontend
cd client
npm start

# Terminal 2: Start Express backend
cd server
npm run dev


  ## Technology used
- MERN Stacks : MongoDb, Express, React, Node
- Semantic React
- Passport for authentication
- React Quill for rich Text Editor
- React –particles
- Cloudinary


  ## License
  This Source Code Form is subject to the terms of the  License.
  If a copy of the License was not distributed with this file, You can obtain one at https://opensource.org/licenses

  ## Link to GitHub:

  [GitHub](https://github.com/wendyVo/IT-Hub.git)

  ## Link to Deployed Applicaion:

  [Deployed Application](https://it-hub-0305.herokuapp.com/)

  ## Screenshots:
  - Header Banner and navigation of the application

  ![header-page](assets/screenshots/headerImage.PNG/)
  </br>
  - List of the post has been created by user
  ![list-post](assets/screenshots/listPost.PNG/)
  </br>
  - Signup form
  ![signup](assets/screenshots/signup.PNG/)
  </br>
  - Dashboard of the user after login
  ![dashboard](assets/screenshots/dashboard.PNG/)



  ## Questions
Please contact me should you have any questions: <br/>
:email:   Email: uyen199247@gmail.com <br/>
:octocat: GitHub:  [wendyVo](https://github.com/wendyVo)


````
