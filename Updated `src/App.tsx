import React, { useState, useEffect } from 'react';

interface Animal {
  name: string;
  image: string;
  sound: string;
  pinned: boolean;
}

const animals: Animal[] = [
  { name: 'Dog', image: '/images/dog.jpg', sound: '/sounds/dog.mp3', pinned: false },
  { name: 'Cat', image: '/images/cat.jpg', sound: '/sounds/cat.mp3', pinned: false },
];

const App: React.FC = () => {
  const [pinnedAnimals, setPinnedAnimals] = useState<string[]>([]);

  useEffect(() => {
    const storedPinnedAnimals = localStorage.getItem('pinnedAnimals');
    if (storedPinnedAnimals) {
      setPinnedAnimals(JSON.parse(storedPinnedAnimals));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('pinnedAnimals', JSON.stringify(pinnedAnimals));
  }, [pinnedAnimals]);

  const togglePin = (name: string) => {
    setPinnedAnimals((prevPinnedAnimals) =>
      prevPinnedAnimals.includes(name)
        ? prevPinnedAnimals.filter((animal) => animal !== name)
        : [...prevPinnedAnimals, name]
    );
  };

  const playSound = (sound: string) => {
    const audio = new Audio(sound);
    audio.play();
  };

  return (
    <div className="min-h-screen flex flex-col items-center">
      <h1 className="header">Animal Sounds App</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {animals.map((animal) => (
          <div
            key={animal.name}
            className="animal-card"
            onClick={() => playSound(animal.sound)}
          >
            <img src={animal.image} alt={animal.name} className="animal-image" />
            <h2 className="animal-name">{animal.name}</h2>
            <button
              className={`pin-button ${pinnedAnimals.includes(animal.name) ? 'pinned' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                togglePin(animal.name);
              }}
            >
              {pinnedAnimals.includes(animal.name) ? 'Unpin' : 'Pin'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
