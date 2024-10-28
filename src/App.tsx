import React, { useState, useEffect } from 'react';

interface Animal {
  name: string;
  image: string;
  sound: string;
  pinned: boolean;
}

const initialAnimals: Animal[] = [
  { name: 'Dog', image: '/images/dog.webp', sound: '/sounds/dog.mp3', pinned: false },
  { name: 'Cat', image: '/images/cat.webp', sound: '/sounds/cat.mp3', pinned: false },
];

// Get initial state from localStorage or use default
const getInitialState = () => {
  const storedPinnedAnimals = localStorage.getItem('pinnedAnimals');
  if (storedPinnedAnimals) {
    const pinnedAnimals = JSON.parse(storedPinnedAnimals);
    return initialAnimals.map((animal) => ({
      ...animal,
      pinned: pinnedAnimals.includes(animal.name),
    }));
  }
  return initialAnimals;
};

const App: React.FC = () => {
  const [animals, setAnimals] = useState<Animal[]>(getInitialState());

  useEffect(() => {
    const pinnedAnimals = animals.filter((animal) => animal.pinned).map((animal) => animal.name);
    localStorage.setItem('pinnedAnimals', JSON.stringify(pinnedAnimals));
  }, [animals]);

  const togglePin = (name: string) => {
    setAnimals((prevAnimals) =>
      prevAnimals.map((animal) =>
        animal.name === name ? { ...animal, pinned: !animal.pinned } : animal
      )
    );
  };

  const playSound = (sound: string) => {
    const audio = new Audio(sound);
    audio.play();
  };

  const sortedAnimals = [...animals].sort((a, b) => {
    if (a.pinned && !b.pinned) {
      return -1;
    }
    if (!a.pinned && b.pinned) {
      return 1;
    }
    return 0;
  });

  return (
    <div className="min-h-screen flex flex-col items-center">
      <h1 className="header">Animal Sounds App</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {sortedAnimals.map((animal) => (
          <div
            key={animal.name}
            className="animal-card"
            onClick={() => playSound(animal.sound)}
          >
            <img src={animal.image} alt={animal.name} className="animal-image" />
            <h2 className="animal-name">{animal.name}</h2>
            <button
              className={`pin-button ${animal.pinned ? 'pinned' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                togglePin(animal.name);
              }}
            >
              {animal.pinned ? 'Unpin' : 'Pin'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
