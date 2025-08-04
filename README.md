# 🔥 Digital Menu - BBQ Restaurant

A clean, responsive, and customizable digital menu system for grilled food restaurants (or any food category).  
**No ordering system included – just a showcase of food items and offers.**

---

## 📸 Preview

Coming soon...

---

## ✨ Features

- 🖼️ Display food items by category (Shawarma, Mashawy, Casseroles, Sandwiches...)
- 🧾 Top slider for rotating offers and discounts
- 📱 Fully responsive (mobile-first)
- ⚙️ Admin dashboard for:
  - Logo upload
  - Color theme customization
  - Add/Edit/Delete categories & items
  - Add daily offers
- 🧠 Built with React + Vite for fast performance
- ❌ No login / no ordering / no payment

---

## 🏗️ Folder Structure

```
digital-menu/
│
├── public/
│   └── imgs/              # All food & logo images
│
├── src/
│   ├── assets/              # Static assets (icons, logos)
│   ├── components/          # Reusable UI components
│   │   ├── Header.jsx       # Top nav and slider
│   │   ├── CategoryList.jsx # Display all food categories
│   │   ├── ItemCard.jsx     # Food item card
│   │   └── Footer.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx         # Main public menu page
│   │   └── Dashboard.jsx    # Admin customization page
│   │
│   ├── data/
│   │   ├── menu.json        # All categories and items
│   │   └── offers.json      # Daily offers to show in header
│   │
│   ├── styles/
│   │   └── global.css       # Global styles (or Tailwind)
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── .gitignore
├── index.html
├── README.md
├── package.json
└── vite.config.js
```

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/digital-menu.git
cd digital-menu
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the dev server

```bash
npm run dev
```

Visit: [http://localhost:5173](http://localhost:5173)

---

## 🛠️ Customization

| What you want to change | Where to change it |
|-------------------------|--------------------|
| Menu items              | `src/data/menu.json` |
| Offers in header        | `src/data/offers.json` |
| Logo                    | Replace image in `public/images/` |
| Theme colors            | Edit CSS/Tailwind in `styles/global.css` |
| Add new category        | Update `menu.json` and display logic |

---

## 🧰 Tech Stack

- [ReactJS](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [CSS Modules](https://github.com/css-modules/css-modules) or TailwindCSS
- [React Router](https://reactrouter.com/) *(optional for routing)*
- No backend needed (JSON/localStorage)

---

## 📄 License

This project is open for educational and commercial use — enjoy and customize freely.

---

> Designed with ❤️ for local food businesses who want a digital presence without complexity.
