# Modrek

### Getting Started

**These instructions will help you build, release and run the application.**


### Requirements
```bash
  node -v
  ## You should see "v12.x.x"
```

```bash
  yarn -v
  ## You should see "v1.x.x"
```

```bash
  npm -v
  ## You should see "v6.x.x"
```

**Modrek Backend App require a connection to MongoDB database, currently we use  MongoDB version: `3.6.12`**


### How to install

**Clone the repository and install dependencies**

```bash
  git clone https://github.com/910ths/modrek-app.git
  cd modrek-app
  
  # Using yarn
  yarn setup:yarn

  # Using npm
  npm run setup:npm
```

### Start the backend server

```bash
cd backend

# Using yarn
yarn build
yarn start

# Using npm
npm run build
npm run start
```

### Start the frontend server

```bash
cd frontend

# Using yarn
yarn start

# Using npm
npm run start
```

### Backend app Env Variables

```
DATABASE_URI=mongodb://<dbuser>:<dbpassword>@<dbhost>/<dbname>
NODE_ENV=production|development
```

### FrontEnd app Env Variables

```
REACT_APP_BACKEND_URL= <backend_url> 
```
