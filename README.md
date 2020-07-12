Repio

Thinks to fix/investigate

- [0] login removes token

token is removen in authReducer after this case is triggered
```
case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT
```


Install dependencies

```bash
npm install
npm client-install
```

Create config.env

```
MONGO_URI='...'
SECRET_KEY='...'
```

### Run Server

```bash
npm run dev     # Express & React :3000 & :5000
npm run server  # Express API Only :5000
npm run client  # React Client Only :3000
```
