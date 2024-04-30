# MakeItMVP Launch Academy Member Repository

Welcome to Communiti's Member feature! As a Member Management Tool for Communiti, this repository focuses on member management with a unique integration of engagement tools, aiming to carve out its own niche in the market landscape.

## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Technologies](#technologies)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

To begin working on your project, follow these steps:

1. Clone this repository to your local machine:

   ```
   git clone hgit@github.com:makeitMVPadmin/Member.git
   ```



2. Change your working directory to the cloned repository:

   ```
   cd Member
   ```

3. Install the project dependencies:

   ```
   npm install
   ```

3. Setup connection to Firebase:

   ```
   1) Duplicate the ".env.sample" file in the root of your project and    rename the file to ".env"
   2) Navigate to your desired firebase project.
   3) Click on 'project settings' and scroll down to 'Your apps'. Select one of the apps, likely a web app.
   4) Copy each of the values in the firebaseConfig object.
   5) Paste each of the values from step 4 into the .env file you created in step 1.
   ```

4. Start the development server:

   ```
   npm start
   ```

5. Open your web browser and navigate to `http://localhost:3000` to see your project running.

Now you're ready to start building your project using the provided structure!

## Project Structure

The project structure is organized as follows:

```
├── src/
│   ├── components/
│   │   ├── App.js
│   │   ├── ...
│   ├── functions/
│   │   ├── users.js
│   ├── styles/
│   │   ├── main.scss
│   │   ├── ...
├── public/
│   ├── index.html
│   ├── ...
├── package.json
├── README.md
```

- `src/`: Contains the main source code for your project, including React components and styles.
- `public/`: Contains static assets and your project's HTML template.
- `package.json`: Defines project dependencies and scripts.

Feel free to customize the project structure to fit your specific project requirements.

## Technologies

This repository uses the following technologies:

- React: A JavaScript framework for building user interfaces.
- Sass: A CSS extension language.
- Firebase: A platform developed by Google for creating mobile and web applications.
- React Toastify: A small toast library for React.

## Contributing

We welcome contributions from the community. If you have suggestions or improvements for this starter repository, please open an issue or create a pull request. For more information on how to contribute, check our [CONTRIBUTING.md](CONTRIBUTING.md) file.

## License

This project is licensed under the [MIT License](LICENSE).

```

```
