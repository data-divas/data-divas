'use client'

import React from 'react'
import { Progress } from "@/components/ui/progress"
import ItemCard from '../components/ItemCard';
import { useState } from 'react';

const Page = () => {
    const [totalPoints, setTotalPoints] = useState(500);
    const checkpoints = [0, 25, 50, 75, 100];
    return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100">
          <div className="text-7xl font-bold text-gray-800 mb-6 mt-10">
            {totalPoints}
          </div>
            <Progress className="w-2/3 h-4 mx-auto" value={(totalPoints/700) * 100 }/>
            <div className="flex w-2/3 justify-between text-s text-gray-800 mb-5 mt-2">
            {checkpoints.map((checkpoint) => (
                <span key={checkpoint} className="text-center mb-2">{checkpoint}%</span>
            ))}
          </div>
          <ItemCard
            imageUrl= "/soap.jpeg"
            points={250}
            itemName="EcoFriendly Soap"
            description="description about how you can get 20% off your next order of soap"
            discountCode='VJ78O9LK'
            totalPoints={totalPoints}
            setTotalPoints={setTotalPoints}/>
        </div>
    );
};

export default Page;
