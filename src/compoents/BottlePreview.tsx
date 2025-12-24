"use client"
import React, { useEffect, useState, useRef } from 'react';
import { Stage, Layer, Rect, Group, Image as KonvaImage } from 'react-konva';
import Konva from 'konva';
import { useBottleStore } from '../store/useBottleStore';
import { bottleOptions } from '../constants/bottles';
import { capsuleOptions } from '../constants/capsules';
import { Transformer } from 'react-konva';

const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
};

export const BottlePreview = () => {
    const { selectedBottleType, liquidColor, selectedCapsuleType, step, capColor, labelImage, isEditingLabel, setIsEditingLabel, setLabelImage, setStageRef } = useBottleStore();

    const [bottleImg, setBottleImg] = useState<HTMLImageElement | null>(null);
    const [capsuleImg, setCapsuleImg] = useState<HTMLImageElement | null>(null);
    const [labelImageObj, setLabelImageObj] = useState<HTMLImageElement | null>(null)
    const [dims, setDims] = useState({ w: 100, h: 100 });
    const labelRef = useRef<Konva.Image>(null);
    const trRef = useRef<Konva.Transformer>(null)
    const stageRef = useRef<Konva.Stage>(null);
    const handleStageClick = (e: any) => {
        if (e.target === e.target.getStage() || e.target.className === 'Image') {
            if (e.target.className !== 'Image') setIsEditingLabel(false);
        }
    };

    const capRef = useRef<any>(null)
    // Load Bottle
    useEffect(() => {
        const bottle = bottleOptions.find(b => b.type === selectedBottleType);
        if (!bottle) return;
        const img = new Image();
        img.src = bottle.image;
        img.onload = () => {
            const scale = Math.min(250 / img.naturalWidth, 350 / img.naturalHeight);
            setDims({ w: img.naturalWidth * scale, h: img.naturalHeight * scale });
            setBottleImg(img);
        };
    }, [selectedBottleType]);

    // Load Capsule
    useEffect(() => {
        const caps = capsuleOptions[selectedBottleType];
        const cap = caps.find(c => c.type === selectedCapsuleType) || caps[0];
        const img = new Image();
        img.src = cap.image;
        img.onload = () => setCapsuleImg(img);
    }, [selectedBottleType, selectedCapsuleType]);
    useEffect(() => {
        if (capRef.current) {
            capRef.current.cache();
        }
    }, [capsuleImg, capColor]);

    useEffect(() => {
        if (labelImage) {
            const img = new Image();
            img.src = labelImage;
            img.crossOrigin = "Anonymous"; // Prevents CORS issues with filters
            img.onload = () => setLabelImageObj(img);
        }
    }, [labelImage])

    useEffect(() => {
        if (step === 5 && labelRef.current && trRef.current) {
            trRef.current.nodes([labelRef.current]);
            trRef.current.getLayer()?.batchDraw();
        }
    }, [step, labelImageObj])

    useEffect(() => {
        if (stageRef.current) {
            setStageRef(stageRef);
        }
    }, [setStageRef]);

    const rgb = hexToRgb(capColor);
    return (
        <div className="flex-1 flex items-center justify-center bg-[#F1F5F9]">
            <div className="bg-white p-12 rounded-[48px] shadow-inner border border-white/50 relative">
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-32 h-4 bg-black/10 blur-xl rounded-full" />

                <Stage width={300} height={400} onClick={handleStageClick} ref={stageRef}>
                    <Layer>
                        {bottleImg && (
                            <>
                                {/* BOTTLE GROUP: Handles the bottle shape and liquid */}
                                <Group x={(300 - dims.w) / 2} y={(400 - dims.h) / 2}>
                                    <Rect width={dims.w} height={dims.h} fill={liquidColor} />
                                    <KonvaImage
                                        image={bottleImg}
                                        width={dims.w}
                                        height={dims.h}
                                        globalCompositeOperation="destination-in"
                                    />
                                    <KonvaImage
                                        image={bottleImg}
                                        width={dims.w}
                                        height={dims.h}
                                        opacity={0.4}
                                    />

                                    {/* CAPSULE: Placed here so it sits on top of the bottle */}
                                    {step > 2 && capsuleImg && (
                                        <KonvaImage
                                            ref={capRef}
                                            image={capsuleImg}
                                            width={dims.w}
                                            height={dims.h}
                                            filters={[Konva.Filters.RGB]}
                                            red={rgb.r}
                                            green={rgb.g}
                                            blue={rgb.b}
                                            globalCompositeOperation='source-atop'
                                        />
                                    )}

                                    {/* LABEL: Must be inside the same group as the bottle to use 'source-atop' 
                        but NOT nested inside another Group using the same composite operation */}
                                    {labelImageObj && (
                                        <>
                                            <KonvaImage
                                                ref={labelRef}
                                                image={labelImageObj}
                                                draggable={isEditingLabel}
                                                onClick={() => setIsEditingLabel(true)}
                                                width={dims.w * 0.5}
                                                height={dims.h * 0.3}
                                                x={dims.w * 0.25}
                                                y={dims.h * 0.4}
                                                // This clips the label to the bottle's silhouette
                                                globalCompositeOperation="source-atop"
                                            />
                                            {/* TRANSFORMER: Only show during Step 5 (Editing) */}
                                            {isEditingLabel && step === 5 && (
                                                <Transformer
                                                    ref={trRef}
                                                    rotateEnabled={true}
                                                    boundBoxFunc={(oldBox, newBox) => {
                                                        if (Math.abs(newBox.width) < 10) return oldBox;
                                                        return newBox;
                                                    }}
                                                />
                                            )}
                                        </>
                                    )}
                                </Group>
                            </>
                        )}
                    </Layer>
                </Stage>
            </div>
        </div>
    );
};