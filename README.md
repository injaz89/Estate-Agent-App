# 🏡 Estate Agent Application

A comprehensive client-side web application for searching properties, inspired by rightmove.co.uk. Built with React and modern web technologies for the Advanced Client Side coursework.

## ✨ Features

- 🔍 **Advanced Property Search**: Filter properties by type (house, flat, any), price range, bedrooms, date added, and postcode area. Combines any number of criteria seamlessly.
- 📱 **Responsive Design**: Fully responsive layout optimized for large screens, tablets (iPad landscape), and mobile devices utilizing flexbox/grid and media queries.
- 🖼️ **Property Details & Gallery**: Detailed property pages featuring a large main image, an interactive thumbnail gallery, and comprehensive information.
- 🗺️ **Interactive Tabs**: Effortless navigation between property descriptions, floor plans, and Google Maps using React Tabs.
- ❤️ **Favourites Management**: 
  - Save properties to favourites via a convenient button/icon or by utilizing intuitive Drag-and-Drop functionality.
  - Easily remove properties from favourites (by dragging out or clicking delete) or clear the entire list.
  - View your favourite properties directly from the search page.
- 🛡️ **Client-Side Security**: Protected against client-side hacking using Content Security Policy (CSP) and React's built-in JSX encoding.

## 🛠️ Technology Stack & Libraries

- **Frontend Framework**: ⚛️ React 18
- **Build Tool**: ⚡ Vite
- **Routing**: 🛤️ React Router DOM
- **UI & Interaction Widgets**:
  - 🖱️ `react-dnd` & `react-dnd-html5-backend` (Drag and Drop features)
  - 📅 `react-datepicker` (Date selection widget)
  - 🔽 `react-select` (Advanced dropdowns)
  - 📑 `react-tabs` (Tabbed navigation for property details)
- **Testing**: 🧪 Vitest & React Testing Library (Jest testing framework equivalent)
- **Deployment**: 🚀 GitHub Pages

## 📋 Prerequisites

To run this project locally, ensure you have the following installed:
- Node.js (v18 or higher recommended)
- npm (Node Package Manager)

## 🚀 Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/injaz89/Estate-Agent-App.git
   ```
2. **Navigate to the project directory:**
   ```bash
   cd Estate-Agent-App
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Start the development server:**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`.

## 🧪 Testing

The project includes meaningful tests implemented using Vitest and React Testing Library to cover critical application logic. To run the tests:

```bash
npm run test
```

## 🌐 Deployment

The application is deployed and hosted on GitHub Pages. You can view the live application here:
[Live Application URL](https://injaz89.github.io/Estate-Agent-App)

## 📁 Data Source

Property data is loaded from a local JSON format containing 7 unique properties covering a diverse range of types, prices, bedrooms, dates, and postcodes to allow effective search combinations.

## 🎨 Design & Aesthetics

The application places a strong emphasis on user experience and professional aesthetics:
- 🎨 Consistent color schemes and typography (limited to 2 font styles).
- 🏷️ Clear visual hierarchy with appropriate headings, bold, and italic text.
- 📦 Grouping of related items and intuitive alignment of page elements.
- 🖼️ Polished layout for property listings (picture, short description, price).