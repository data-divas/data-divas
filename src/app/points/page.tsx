'use client'

import React from 'react'
import { Progress } from "@/components/ui/progress"
import ItemCard from '../components/ItemCard';

const page = () => {
    const score: number = 150;
    const checkpoints = [0, 25, 50, 75, 100];
    return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100">
          <div className="text-7xl font-bold text-gray-800 mb-6 mt-10">
            {score}
          </div>
            <Progress className="w-2/3 h-4 mx-auto" value={(score/700) * 100 }/>
            <div className="flex w-2/3 justify-between text-s text-gray-800 mb-5 mt-2">
            {checkpoints.map((checkpoint) => (
                <span key={checkpoint} className="text-center mb-2">{checkpoint}%</span>
            ))}
          </div>
          <ItemCard
            imageUrl= "/soap.jpeg"
            points={500}
            itemName="EcoFriendly Soap"/>
        </div>
    );
};

export default page
