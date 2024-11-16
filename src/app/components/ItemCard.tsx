/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface ItemCardProps {
  imageUrl: string;
  points: number;
  itemName: string;
  description: string;
  discountCode: string;
  totalPoints: number;  // State passed from the parent
  setTotalPoints: React.Dispatch<React.SetStateAction<number>>;
}
  
  const ItemCard: React.FC<ItemCardProps> = ({ imageUrl, points, itemName, description, discountCode, setTotalPoints }) => {
  const [flipped, setFlipped] = useState(false);
  const [modalOpen, setModalOpen] = useState(false); 
  const [discountRevealed, setDiscountRevealed] = useState(false);

  const handleClick = () => {
    setFlipped(!flipped);
  };

  const handleRedeemClick = () => {
    setModalOpen(true); // Show the modal when "Redeem" is clicked
  };

  const closeModal = () => {
    setModalOpen(false); // Close the modal
  };

  const revealDiscount = () => {
    setDiscountRevealed(true); // Show the discount
  };

  const subtractPoints = () => {
    setTotalPoints(totalPoints => totalPoints - points);  // Use the previous state value
  };

  
  return (
    <div className='w-full'>
      <div className={`hover:shadow-xl w-2/3 mx-auto bg-white p-6 rounded-lg shadow-lg flex items-center space-x-6 ${flipped ? 'hidden' : ''}`}
      onClick={handleClick}>
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

      <div className={`hover:shadow-xl w-2/3 mx-auto bg-white p-6 rounded-lg shadow-lg flex items-center space-x-6 ${flipped ? '' : 'hidden'}`}
      onClick={handleClick}>
        <div className="flex flex-col justify-between w-2/3 ">
            <h2 className="text-xl font-semibold text-gray-800">{itemName}</h2>
            <p className="text-lg text-gray-600">Description: {description}</p>
        </div>
        <div className="flex-shrink-0"/>
        <Button onClick={handleRedeemClick}>Redeem</Button>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-semibold text-gray-800">Discount Code</h2>
            <p className="text-lg text-gray-600">This is a modal. Here you can put some information or an action prompt.</p>
          
            <div className="mt-4 flex justify-end space-x-2">
              <div>
                {!discountRevealed ? (
                  <Button onClick={() => { revealDiscount(); subtractPoints(); }}>Reveal</Button>
                ) : ( 
                  <p className="text-xl text-green-600">{discountCode}</p>
                )}
              </div>
              <Button onClick={closeModal}>Close</Button>
            </div>

          </div>
        </div>
      )}
    </div>    
  );
};

export default ItemCard;