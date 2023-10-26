# SociaLinkDB

## Description

SociaLinkDB is an exciting project that challenges you to create a robust and efficient API for a social network web application. In this project, you will leverage MongoDB, a popular NoSQL database known for its speed with large datasets and flexibility with unstructured data. The primary goal is to build a fully functional API that allows users to share thoughts, react to friends' thoughts, and manage their friend lists.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Questions](#questions)
- [Walkthrough](#walkthrough)

## Installation
1. Prerequisites:
Ensure that you have Node.js and MongoDB already installed on your machine. These are necessary to run the application.
2. Clone the Repository:
This step involves copying the project from a remote repository to your local machine using the git clone command. You replace <repository_url> with the actual URL of the repository.
3. Navigate to the Project Directory:
Change your current working directory to the project's root directory where the project's files are located, using the cd (change directory) command.
4. Install Dependencies:
By running npm install, you are installing all the dependencies that the project needs. These dependencies are listed in the package.json file in the project’s root directory.
5. Set Up MongoDB:
Ensure that the MongoDB server is up and running on your machine. This is necessary as the application will interact with MongoDB to store and retrieve data.
6. Start the Application:
npm start is the command to start the application. It will initiate the Express.js server, making the application accessible, usually at http://localhost:3000, where you can interact with the API.
7. Test the API:
Testing the API involves sending requests to the API endpoints and verifying the responses. Tools like Insomnia or Postman are commonly used for this purpose, as they allow you to easily send various types of HTTP requests to the API and see the responses.

## Usage
With the SociaLinkDB server running, you can interact with the database using HTTP requests via tools like Insomnia. The application supports the following operations:

1. Retrieve All Users and Thoughts:

Use a GET request to /api/users to fetch all user records.
Use a GET request to /api/thoughts to retrieve all thought records.

2. Retrieve a Single User or Thought:

Use a GET request to /api/users/:userId by including the user's _id in the URL to get a single user's data.
Use a GET request to /api/thoughts/:thoughtId by including the thought's _id to retrieve a single thought.

3. Add a New User or Thought:

To create a new user, send a POST request to /api/users with the required data in the request body.
To create a new thought, send a POST request to /api/thoughts with the necessary data in the request body.

4. Update a User or Thought:

To update an existing user, use a PUT request to /api/users/:userId with the user's _id in the URL and the updated data in the request body.
To update an existing thought, use a PUT request to /api/thoughts/:thoughtId with the thought's _id in the URL and the updated data in the request body.

5. Delete a User or Thought:

To delete a specific user, send a DELETE request to /api/users/:userId by including the user's _id in the URL.
To remove a particular thought, send a DELETE request to /api/thoughts/:thoughtId with the thought's _id in the URL.

6. Manage Friends and Reactions:

To add a new friend to a user's friend list, use a POST request to /api/users/:userId/friends/:friendId.
To remove a friend from a user's friend list, use a DELETE request to /api/users/:userId/friends/:friendId.
To create a new reaction to a thought, use a POST request to /api/thoughts/:thoughtId/reactions.
To remove a reaction from a thought, use a DELETE request to /api/thoughts/:thoughtId/reactions/:reactionId.

These endpoints allow you to perform various operations on the SociaLinkDB API, enabling you to manage users, thoughts, reactions, and friend relationships efficiently.

For a detailed walkthrough, please visit the link in the [Walkthrough](#walkthrough) section.

## License
This project is licensed under the MIT license.

## Contributing
N/A

## Questions
For any questions, please contact me at [https://github.com/kojootchere](https://github.com/kojootchere) or [email me](mailto:kojootchere@gmail.com).

## Walkthrough

Link to Walkthrough Video: [SociaLinkDB Walkthrough](https://drive.google.com/file/d/1N1071109F2yssAKiWtwDnhoGCK8dD6Qw/view?usp=share_link)
