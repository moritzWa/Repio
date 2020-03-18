Repio

Install dependencies

```bash
npm install
npm client-install
```

Create default.json and production.json in config folder with:

```
{
  "mongoURI": "mongodb+srv://Username:Password@mongoDBCollectionName.mongodb.net/test?retryWrites=true&w=majority",
  "jwtSecret": "secret"
}
```

### Run Server

```bash
npm run dev     # Express & React :3000 & :5000
npm run server  # Express API Only :5000
npm run client  # React Client Only :3000
```
