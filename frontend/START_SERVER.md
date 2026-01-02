# How to Start the Application

## Start the Development Server

1. Open a terminal/command prompt
2. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

3. Install dependencies (if not already installed):
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. The server will start and show you a URL like:
   ```
   ➜  Local:   http://localhost:5173/
   ```

6. Open that URL in your browser

## Troubleshooting

- If you see "Port already in use", the server will automatically try another port (5174, 5175, etc.)
- Check the terminal output for the exact port number
- Make sure no firewall is blocking the connection
- Check browser console (F12) for any JavaScript errors

## Available Routes

- `/` - Login page
- `/consumer/home` - Consumer homepage
- `/farmer` - Farmer dashboard
- `/admin/dashboard` - Admin dashboard


