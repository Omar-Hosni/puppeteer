# Spline Screenshot Server

A standalone Node.js backend service that uses Puppeteer to capture screenshots of Spline 3D scenes.

## Setup

1. **Install dependencies**:
   ```bash
   cd server
   npm install
   ```

2. **Start the server**:
   
   **Production**:
   ```bash
   npm start
   ```
   
   **Development** (with auto-reload):
   ```bash
   npm run dev
   ```

The server will run on `http://localhost:3001`

## Environment Variables

You can customize the port by setting:
```bash
PORT=3001 npm start
```

## API Endpoint

**POST** `/api/screenshot`

**Request**:
```json
{
  "url": "https://my.spline.design/your-scene-url"
}
```

**Response**:
- Success: PNG image (Content-Type: image/png)
- Error: JSON with error message

## Deployment

This server can be deployed to:
- **Render**: Connect your Git repo and deploy as a Web Service
- **Railway**: Automatic deployment from Git
- **Heroku**: Use the included configuration
- **Any VPS**: Run with PM2 or similar process manager

### Example PM2 deployment:
```bash
npm install -g pm2
pm2 start index.js --name spline-screenshot-server
pm2 save
```

## CORS

The server has CORS enabled to accept requests from any origin. For production, you should restrict this to your frontend domain in `index.js`:

```javascript
app.use(cors({
  origin: 'https://your-frontend-domain.com'
}));
```
