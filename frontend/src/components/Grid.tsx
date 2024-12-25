import React from "react";

// Define the interface for the grid item
interface GridItem {
  title: string;
  description: string;
}

interface GridComponentProps {
  items: GridItem[];
}

const GridComponent: React.FC<GridComponentProps> = ({ items }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 p-4">
      {items.map((item, index) => (
        <div
          key={index}
          className="bg-white p-4 border rounded-lg shadow-md hover:shadow-lg transition duration-300"
        >
          <h3 className="font-bold text-lg">{item.title}</h3>
          <p className="text-gray-600">{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default GridComponent;
