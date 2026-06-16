# Opura AI — AI Shopping Assistant

Full-stack AI-powered shopping assistant built with **React**, **Tailwind CSS**, and **Node.js/Express**.

Assignment: BotMakers Pvt Ltd — Full Stack Developer Intern  
Design reference: [Figma — AI Shopping Assistant](https://www.figma.com/design/9iGNHKi7vwCCnPrBLwwQxc/AI-Shopping-Assistant)

---

## Features

| Screen | Route | Description |
|--------|-------|-------------|
| Chat Home | `/` | Greeting, animated background, AI search bar |
| Chat Results | `/chat-results` | Live chat with product recommendations |
| Product Card | `/product-card` | Default + active card states, size/color pickers |
| Compare Products | `/compare` | Side-by-side comparison table |

- AI answers **general questions** (Wikipedia lookup, math, small talk)
- AI helps **find shoes**, compare products, check prices
- **Voice input** (Chrome/Edge)
- **Add to compare list** from product card → opens Compare page
- Fully **responsive** (mobile + desktop)
- Optional **Gemini API** for smarter replies

---

## Tech Stack

- **Frontend:** React 19, Vite, Tailwind CSS v4, React Router, Lucide Icons
- **Backend:** Node.js, Express, CORS
- **AI:** Built-in Opura assistant + Wikipedia API + optional Google Gemini

---

## How to Run

### 1. Install dependencies

```bash
npm install
```

### 2. Start frontend + backend together

```bash
npm run dev:all
```

- Frontend: http://localhost:5173  
- Backend API: http://localhost:3001  

### Or run separately

```bash
# Terminal 1
npm run server

# Terminal 2
npm run dev
```

### 3. (Optional) Enable Gemini AI

Copy `.env.example` to `.env` and add your key:

```
GEMINI_API_KEY=your_key_here
```

---

## API Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| GET | `/api/health` | Server status |
| GET | `/api/products` | Product catalog |
| POST | `/api/chat` | Send message, get AI reply |

**Example:**

```bash
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d "{\"message\": \"find running shoes under 5000\"}"
```

---

## Project Structure

```
opura-ai/
├── server/           # Express backend
│   ├── index.js      # API routes
│   ├── assistant.js  # AI reply logic
│   ├── generalChat.js# Wikipedia + math + small talk
│   └── products.js   # Product catalog
├── src/
│   ├── pages/        # 4 main screens
│   ├── components/   # UI components
│   └── context/      # Chat + Compare state
└── package.json
```

---

## Build for Production

```bash
npm run build
npm run preview
```

---

## Author

Himanshu — BotMakers Assignment Submission
