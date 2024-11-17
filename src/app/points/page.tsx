'use client'

import React from 'react'
import { Progress } from "@/components/ui/progress"
import ItemCard from '../components/ItemCard';
import Chart from "../../components/Chart";
import { useState } from 'react';

const Page = () => {
    const [totalPoints, setTotalPoints] = useState(260);
    const checkpoints = [0, 5, 10, 15, 20];
    return (
        <div className="flex flex-col items-center justify-between min-h-screen bg-gray-100">
          <p className="text-4xl font-bold mt-5">
            Points so far
          </p>
          <div className="text-7xl font-bold text-gray-800 mb-6 mt-5">
            {totalPoints}
          </div>
            <Progress className="w-2/3 h-4 mx-auto" value={(totalPoints/700) * 100 }/>
            <div className="flex w-2/3 justify-between text-s text-gray-800 mb-5 mt-2">
            {checkpoints.map((checkpoint) => (
                <span key={checkpoint} className="text-center mb-2">{checkpoint}%</span>
            ))}
          </div>
          <p className="text-4xl font-bold mb-4 ">Items in cart</p>
          <ItemCard
            imageUrl= "/soap.jpeg"
            points={250}
            itemName="EcoFriendly Soap"
            description="description about how you can get 20% off your next order of soap"
            discountCode='VJ78O9LK'
            totalPoints={totalPoints}
            setTotalPoints={setTotalPoints}/>
          <ItemCard
            imageUrl= "/detergent.jpg"
            points={100}
            itemName="EcoFriendly Detergent"
            description="description about how you can get 20% off your next order of soap"
            discountCode='KJE23LS'
            totalPoints={totalPoints}
            setTotalPoints={setTotalPoints}/>
            <Chart/>
        </div>
    );
};

export default Page;