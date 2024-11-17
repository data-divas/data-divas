/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Terminal } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface ItemCardProps {
  imageUrl: string;
  points: number;
  itemName: string;
  description: string;
  discountCode: string;
  totalPoints: number; 
  setTotalPoints: React.Dispatch<React.SetStateAction<number>>;
}
  
  const ItemCard: React.FC<ItemCardProps> = ({ imageUrl, points, itemName, description, discountCode, totalPoints, setTotalPoints }) => {
  const [flipped, setFlipped] = useState(false);
  const [modalOpen, setModalOpen] = useState(false); 
  const [discountRevealed, setDiscountRevealed] = useState(false);
  const [showAlert, setShowAlert] = useState<boolean>(false); // Alert state

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
    setTotalPoints(totalPoints => totalPoints - points);
  };

  const handleButtonClick = () => {
    if (totalPoints >= points) {
      revealDiscount();
      subtractPoints();
    } else {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false); 
      }, 3000); 
    }
  };

  return (
  <div className="w-full">
    <div className={`hover:shadow-xl cursor-pointer h-[200px] w-2/3 mx-auto bg-white p-6 rounded-lg shadow-lg flex items-center mb-10 space-x-6 ${flipped ? 'hidden' : ''} ${discountRevealed ? 'bg-green-100' : ''}`}
        onClick={handleClick}>
        <div className="flex-shrink-0 w-1/5 h-full relative">
            <Image
            src={imageUrl}
            alt={itemName}
            className="rounded-lg w-full h-full"
            width={100}   
            height={200}  
            />
        </div>
        <div className="flex flex-col justify-center w-2/3 h-full">
            <h2 className="text-xl font-semibold text-gray-800">{itemName}</h2>
            <p className="text-lg text-gray-600">Redeem for {points} points</p>
        </div>
        </div>
    <div
      className={`hover:shadow-xl h-[200px] w-2/3 mx-auto bg-white p-6 mb-10 rounded-lg shadow-lg flex items-center space-x-6 ${flipped ? '' : 'hidden'}`}
      onClick={handleClick}
    >
      <div className="flex items-center justify-between w-full p-6 bg-white">
        <div className="flex flex-col w-2/3 justify-center">
          <h2 className="text-xl font-semibold text-gray-800 py-3">{itemName}</h2>
          <p className="text-lg text-gray-600">Description: {description}</p>
        </div>
        <Button className="ml-auto text-white px-4 py-2 rounded-lg" onClick={handleRedeemClick}>
          Redeem
        </Button>
      </div>
    </div>

    {modalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
            <div className="relative bg-white p-6  rounded-lg shadow-lg w-1/3">
            <button
                onClick={closeModal}
                className="absolute top-2 right-4 text-2xl font-bold text-gray-600 hover:text-gray-900"
            > &times; </button>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Discount Code</h2>
            <p className="text-lg text-gray-600 mb-4">This is a modal. Here you can put some information or an action prompt.</p>
            <div className="flex flex-col items-center justify-center">
                {!discountRevealed ? (
                <div className="mt-6 flex justify-center">
                    <Button onClick={handleButtonClick}>Reveal</Button>
                </div>
                ) : (
                <div className="flex flex-row items-center">
                    <p className="text-3xl font-bold text-green-400 mr-4">{discountCode}</p>
                    <Button
                    onClick={() => { navigator.clipboard.writeText(discountCode); }}
                    className="text-white  px-4 py-2 rounded-lg"
                    >
                    <Copy />
                    </Button>
                </div>
                )}
            </div>
            {showAlert && (
                <Alert className='mt-5'>
                <Terminal className="h-4 w-4" />
                <AlertTitle>Heads up!</AlertTitle>
                <AlertDescription>
                    You do not have enough points to redeem this item.
                </AlertDescription>
                </Alert>
            )}
            </div>
        </div>
    )}
    </div>    
  );
};

export default ItemCard;