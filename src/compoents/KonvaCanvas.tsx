"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Stage, Layer, Rect, Group, Image as KonvaImage } from 'react-konva';
import { bottleOptions } from '../constants/bottles';

const KonvaCanvas = () => {
    // SELECTION STATES
    const [liquidColor, setLiquidColor] = useState("#3498db");
    const [selectedBottleType, setSelectedBottleType] = useState(bottleOptions[0].type);
    const [image, setImage] = useState<HTMLImageElement | null>(null);
    const [imageDimensions, setImageDimensions] = useState({width: 200, height: 300});

    useEffect(() => {
        const selectedBottle = bottleOptions.find(b => b.type === selectedBottleType);
        if (selectedBottle) {
            const img = new window.Image();
            img.src = selectedBottle.image;
            img.onload = () => {
                const scale = Math.min(200 / img.naturalWidth, 300 / img.naturalHeight);
                const displayWidth = img.naturalWidth * scale;
                const displayHeight = img.naturalHeight * scale;
                setImageDimensions({width: displayWidth, height: displayHeight});
                setImage(img);
            };
        }
    }, [selectedBottleType]);

    return (
        <div className="flex flex-col items-center gap-8 bg-gray-50 p-10">

            {/* THE MAIN STAGE */}
            <div className="bg-white p-2 rounded-2xl shadow-xl">
                <Stage width={250} height={350}>
                    <Layer>
                        {image && <KonvaImage image={image} x={80} y={50} width={imageDimensions.width} height={imageDimensions.height} />}

                    </Layer>
                </Stage>
            </div>

            {/* CUSTOMIZATION PANEL (The "Galleries") */}
            <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-4 gap-6">

                {/* 1. Bottle Type Gallery */}
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="font-bold mb-2">Bottle Type</h3>
                    <div className="flex flex-col gap-2">
                        {bottleOptions.map(bottle => (
                            <button
                                key={bottle.type}
                                className={`p-2 border rounded flex flex-col items-center ${selectedBottleType === bottle.type ? 'border-blue-500 bg-blue-50' : ''}`}
                                onClick={() => setSelectedBottleType(bottle.type)}
                            >
                                <img src={bottle.image} alt={bottle.name} className="w-16 h-16 mb-1" />
                                {bottle.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 2. Bottle Color Gallery */}
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="font-bold mb-2">Bottle Color</h3>
                    <input
                        type="color"
                        className="w-full h-10"
                        value={liquidColor}
                        onChange={(e) => setLiquidColor(e.target.value)}
                    />
                </div>


            </div>
        </div>
    );
};

export default KonvaCanvas;