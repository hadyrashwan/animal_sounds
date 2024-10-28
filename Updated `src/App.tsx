import React, { useState, useEffect } from 'react';

const animals = [
  { name: 'Dog', image: 'dog.jpg', sound: 'dog.mp3' },
  { name: 'Cat', image: 'cat.jpg', sound: 'cat.mp3' },
  // Add more animals as needed
];

const App: React.FC = () => {
  const [pinnedAnimals, setPinnedAnimals] = useState<string[]>([]);

  useEffect(() => {
    const savedPinnedAnimals = localStorage.getItem('pinnedAnimals');
    if (savedPinnedAnimals) {
      setPinnedAnimals(JSON.parse(savedPinnedAnimals));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('pinnedAnimals', JSON.stringify(pinnedAnimals));
  }, [pinnedAnimals]);

  const playSound = (sound: string) => {
    const audio = new Audio(`/sounds/${sound}`);
    audio.play();
  };

  const togglePin = (animalName: string) => {
    setPinnedAnimals((prevPinnedAnimals) =>
      prevPinnedAnimals.includes(animalName)
        ? prevPinnedAnimals.filter((name) => name !== animalName)
        : [...prevPinnedAnimals, animalName]
    );
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold mb-4">Animal Sounds</h1>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {animals.map((animal, index) => (
          <div key={index} className="relative">
            <img
              src={`/images/${animal.image}`}
              alt={animal.name}
              className="w-32 h-32 cursor-pointer rounded-full border-4 border-transparent hover:border-blue-500"
              onClick={() => playSound(animal.sound)}
            />
            <p className="text-center mt-2">{animal.name}</p>
            <button
              className={`absolute top-0 right-0 p-1 rounded-full ${
                pinnedAnimals.includes(animal.name) ? 'bg-red-500' : 'bg-gray-300'
              }`}
              onClick={() => togglePin(animal.name)}
            >
              {pinnedAnimals.includes(animal.name) ? '📌' : '📍'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
