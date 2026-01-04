import React, { createContext, useContext, useState, useEffect } from 'react';


 // Context for managing favourite properties across the application
 // Provides global state and methods for adding/removing favourites

const FavouritesContext = createContext();

export const useFavourites = () => {
  const context = useContext(FavouritesContext);
  if (!context) {
    throw new Error('useFavourites must be used within FavouritesProvider');
  }
  return context;
};

export const FavouritesProvider = ({ children }) => {
  // Initialize favourites from localStorage or empty array
  const [favourites, setFavourites] = useState(() => {
    try {
      const saved = localStorage.getItem('favouriteProperties');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Error loading favourites:', error);
      return [];
    }
  });

  // Save to localStorage whenever favourites change
  useEffect(() => {
    try {
      localStorage.setItem('favouriteProperties', JSON.stringify(favourites));
    } catch (error) {
      console.error('Error saving favourites:', error);
    }
  }, [favourites]);

  
   // Add a property to favourites
   // Prevents duplicates by checking property ID
   
  const addFavourite = (property) => {
    setFavourites((prev) => {
      // Check if property already exists
      const exists = prev.some((fav) => fav.id === property.id);
      if (exists) {
        console.log('Property already in favourites');
        return prev;
      }
      return [...prev, property];
    });
  };

  // Remove a property from favourites by ID
   
  const removeFavourite = (propertyId) => {
    setFavourites((prev) => prev.filter((fav) => fav.id !== propertyId));
  };

  // Clear all favourites
  
  const clearFavourites = () => {
    setFavourites([]);
  };

  // Check if a property is in favourites
   
  const isFavourite = (propertyId) => {
    return favourites.some((fav) => fav.id === propertyId);
  };

  const value = {
    favourites,
    addFavourite,
    removeFavourite,
    clearFavourites,
    isFavourite,
  };

  return (
    <FavouritesContext.Provider value={value}>
      {children}
    </FavouritesContext.Provider>
  );
};