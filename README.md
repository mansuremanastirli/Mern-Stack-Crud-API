# Crud API

## Technologies / MongoDB , Expressjs , Reactjs , Nodejs

* Backend Packages: Expressjs , Body-parser , cors , dotenv , mongoose , nodemon 
* Frontend packages : axios , bootstrap , nodemon , react-bootstrap 

**How is it working:** saves the information entered by the user in the database and the saved information appears in the form of a card. 

## Structure

```
├─ Crud
│  ├─ client
│  │    ├─ public
│  │    │   └─ favicon.ico
│  │    │   └─ index.html
│  │    │   └─ manifest.json
│  │    │   └─ robots.txt
│  │    │
│  │    ├─ src
│  │    │   └─ App.js
│  │    │   └─ index.js
│  │    │   └─ modal.js
│  │    │   └─ reportWebVitals.js
│  │    │   └─ reportWebVitals.js
│  │        
│  └─ .gitignore    
│  └─ package-lock.json
│  └─ package.json
│  └─ README.md
│  │
│  ├─ server
│  │    └─ .gitignore
│  │    └─ app.js        
│  │    └─ example.env
│  │    └─ package-lock.json
│  │    └─ package.json
│  │    └─ routes.js
│  │    └─ userModel.js
│
├─ README.md
```

## Installation
```
git clone https://github.com/mansuremanastirli/Mern-Stack-Crud-API
cd Mern-Stack-Crud-API
cd Crud-API
cd client
npm install
cd ..
cd server
npm install

# Prepare your environment variables with generating .env file as example.env file

npm start
cd .. 
cd client
npm start
```

