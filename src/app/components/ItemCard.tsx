/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Image from 'next/image';

interface ItemCardProps {
  imageUrl: string;
  points: number;
  itemName: string;
}

const ItemCard: React.FC<ItemCardProps> = ({ imageUrl, points, itemName }) => {
  return (
    <div className="w-2/3 mx-auto bg-white p-6 rounded-lg shadow-lg flex items-center space-x-6">
      <div className="flex-shrink-0 w-1/3">
        <Image
          src={imageUrl}
          alt={itemName}
          className="object-cover rounded-md"
          width={200}
          height={100}
        />
      </div>
      <div className="flex flex-col justify-between w-2/3 ">
        <h2 className="text-xl font-semibold text-gray-800">{itemName}</h2>
        <p className="text-lg text-gray-600">Redeem for {points} points</p>
      </div>
    </div>
  );
};

export default ItemCard;