import React, { useState, useEffect } from 'react';

const GRID_COLUMNS = 3; // 3 columns
const GRID_ROWS = 4;    // 4 rows
const GRID_SIZE = GRID_COLUMNS * GRID_ROWS; // 12 pieces total

function Puzzle() {
  const [pieces, setPieces] = useState([]);
  const [shuffled, setShuffled] = useState(false); // Track shuffled state
  const [imageLoaded, setImageLoaded] = useState(false); // Track if image is loaded
  const [isSolved, setIsSolved] = useState(false); // Track if the puzzle is solved

  const imageURL = '/her-photo.jpeg'; // Path to your image

  // Handle image loading
  const handleImageLoad = () => {
    setImageLoaded(true); // Image has been loaded
  };

  // Initialize puzzle pieces and shuffle them immediately without animation
  useEffect(() => {
    const newPieces = [...Array(GRID_SIZE).keys()]; // Create an array of pieces
    setPieces(newPieces); // Set the pieces
    // Shuffle immediately without animation when the page first loads
    const shuffledPieces = [...newPieces].sort(() => Math.random() - 0.5);
    setPieces(shuffledPieces);
  }, []);

  // Shuffle the pieces with animation
  const shufflePuzzle = () => {
    setShuffled(true);
    const shuffledPieces = [...pieces].sort(() => Math.random() - 0.5);

    // Introduce a delay to simulate one-by-one piece movement
    shuffledPieces.forEach((piece, idx) => {
      setTimeout(() => {
        setPieces((prevPieces) => {
          const updatedPieces = [...prevPieces];
          updatedPieces[idx] = piece;
          return updatedPieces;
        });
      }, idx * 300); // Delay each piece by 300ms (adjust as needed)
    });
  };

  // Solve the puzzle (reset to the original order) with animation
  const solvePuzzle = () => {
    setShuffled(false);

    // Introduce a delay to move pieces back one by one
    const solvedPieces = [...Array(GRID_SIZE).keys()]; // Reset pieces to the solved order
    solvedPieces.forEach((piece, idx) => {
      setTimeout(() => {
        setPieces((prevPieces) => {
          const updatedPieces = [...prevPieces];
          updatedPieces[idx] = piece;
          return updatedPieces;
        });
      }, idx * 300); // Delay each piece by 300ms (adjust as needed)
    });

    // After the puzzle is solved, show the message
    setTimeout(() => {
      setIsSolved(true); // Set solved state to true
    }, GRID_SIZE * 300); // Wait until all pieces are moved back
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-200">
      <h1 className="text-2xl font-bold text-gray-700 mb-4">Picture Puzzle</h1>

      {/* Image for aspect ratio calculation */}
      <img
        src={imageURL}
        alt="Puzzle"
        className="hidden"
        onLoad={handleImageLoad} // Trigger the shuffle after image is loaded
      />

      {/* Puzzle grid with animations */}
      <div
        className="grid gap-1"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${GRID_COLUMNS}, 1fr)`,
          gridTemplateRows: `repeat(${GRID_ROWS}, 1fr)`,
          width: '80vw',
          maxWidth: '480px',  // Adjust maxWidth for larger grid size
        }}
      >
        {pieces.map((pieceIndex, idx) => (
          <div
            key={idx}
            className={`bg-cover bg-center transition-all duration-700 ease-in-out`}  // Slower animation (700ms)
            style={{
              height: '100px',  // Adjust for bigger boxes
              backgroundImage: imageLoaded ? `url(${imageURL})` : 'none', // Only set background once the image is loaded
              backgroundPosition: `${-(pieceIndex % GRID_COLUMNS) * 100}% ${
                -Math.floor(pieceIndex / GRID_COLUMNS) * 100
              }%`,
              backgroundSize: `${GRID_COLUMNS * 100}%`, // Scale image accordingly to grid
              transition: 'transform 0.7s ease-in-out, background-position 0.7s ease-in-out',  // 700ms transition for smoother effect
              transform: shuffled ? `scale(1)` : `scale(1)`, // Adding transition effect for scale
            }}
          />
        ))}
      </div>

      <div className="flex gap-4 mt-4">
        <button
          onClick={solvePuzzle} // Solve with animation
          className="px-4 py-2 bg-green-500 text-white font-semibold rounded shadow hover:bg-green-600 transition-all duration-300 ease-in-out"
        >
          Solve
        </button>
      </div>

      {/* Dialog box that appears after puzzle is solved */}
      {isSolved && (
        <div className="mt-6 bg-green-200 text-green-800 py-4 px-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold">Looking like an angel 😍</h3>
        </div>
      )}
    </div>
  );
}

export default Puzzle;
