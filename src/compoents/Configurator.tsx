"use client"
import React, { useRef } from "react";
import { useBottleStore } from "@/store/useBottleStore";
import { capsuleOptions } from "@/constants/capsules";
import { bottleOptions } from "@/constants/bottles";
import Konva from "konva";

export const Configurator = () => {
    const {
        step, liquidColor, selectedBottleType, selectedCapsuleType,
        setLiquidColor, setBottleType, setCapsuleType, nextStep, prevStep, capColor, setCapColor, setLabelImage,
        setIsEditingLabel, labelImage, stageRef
    } = useBottleStore();
    const fileInputRef = useRef<HTMLInputElement>(null);
    // const stageRef = useRef<Konva.Stage>(null)
    const handleDownload = () => {
        const stage = stageRef?.current;
        if (!stage) return;
        setIsEditingLabel(false);
        const dataUrl = stage.toDataURL({
            pixelRatio: 3, // High quality
            mimeType: 'image/png'
        });
        const link = document.createElement("a");
        link.download = `custom-bottle-design.png`;
        link.href = dataUrl;
        link.click();
        document.body.removeChild(link);
    }

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setLabelImage(reader.result as string);
                setIsEditingLabel(true);
            };
            reader.readAsDataURL(file);
        }
    };
    const currentCapsules = capsuleOptions[selectedBottleType];
    return (
        <div className="w-full md:w-[400px] bg-white border-l flex flex-col shadow-xl">
            <div className="p-6 border-b">
                <h2 className="text-xl font-bold">Customize Bottle</h2>
                <div className="flex gap-2 mt-4">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className={`h-1 flex-1 rounded-full ${step >= i ? 'bg-cyan-600' : 'bg-slate-200'}`} />
                    ))}
                </div>
            </div>

            <div className="flex-1 p-6 overflow-y-auto">
                {step === 1 && (
                    <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-right-4">
                        {bottleOptions.map(b => (
                            <button key={b.type} onClick={() => setBottleType(b.type)}
                                className={`p-4 border-2 rounded-2xl transition-all ${selectedBottleType === b.type ? 'border-cyan-600 bg-blue-50' : 'border-slate-100'}`}>
                                <img src={b.image} className="h-32 mx-auto object-contain" alt={b.name} />
                                <p className="text-xs mt-2 font-bold">{b.name}</p>
                            </button>
                        ))}
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                        <input type="color" value={liquidColor} onChange={(e) => setLiquidColor(e.target.value)}
                            className="w-full h-20 rounded-xl cursor-pointer" />
                        <div className="grid grid-cols-5 gap-2">
                            {['#722F37', '#EEEDC4', '#E6B422', '#3498db'].map(c => (
                                <div key={c} onClick={() => setLiquidColor(c)} style={{ backgroundColor: c }} className="h-8 rounded-lg cursor-pointer  shadow-sm" />
                            ))}
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-right-4">
                        {currentCapsules.map(c => (
                            <button key={c.type} onClick={() => setCapsuleType(c.type)}
                                className={`p-4 border-2 rounded-2xl transition-all ${selectedCapsuleType === c.type ? 'border-cyan-600 bg-blue-50' : 'border-slate-100'}`}>
                                <img src={c.previewImage} className="h-20 mx-auto object-contain" alt={c.type} />
                                <p className="text-xs mt-2 font-bold capitalize">{c.type}</p>
                            </button>
                        ))}
                    </div>
                )}

                {step === 4 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                            Step 4: Cap Color
                        </h3>

                        {/* Hidden Color Input */}
                        <input
                            type="color"
                            id="hiddenColorPicker"
                            className="sr-only" // Tailwind class to hide visually but keep accessible
                            value={capColor}
                            onChange={(e) => setCapColor(e.target.value)}
                        />

                        {/* Text Trigger */}
                        <button
                            onClick={() => document.getElementById('hiddenColorPicker')?.click()}
                            className="w-full   mb-4 border-slate-300 text-slate-600 font-medium hover:border-cyan-500 hover:text-cyan-600 transition-all flex items-center justify-between cursor-pointer"
                        >
                            <span>Choose my own color</span>
                        </button>

                        {/* Preset Swatches */}
                        <div className="grid grid-cols-5 gap-3">
                            {['#333333', '#C0C0C0', '#D4AF37', '#800000', '#000080'].map(color => (
                                <button
                                    key={color}
                                    onClick={() => setCapColor(color)}
                                    className={`w-full aspect-square rounded-lg border-2 transition-transform hover:scale-110 ${capColor === color ? 'border-cyan-500 scale-110' : 'border-white'
                                        }`}
                                    style={{ backgroundColor: color }}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {step === 5 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                        <div className="flex flex-col gap-1">
                            <h2 className="text-xl font-bold text-slate-800">Upload and Adjust Label</h2>
                            <p className="text-xs text-slate-500">Attach your brand artwork to the bottle surface.</p>
                        </div>

                        {!labelImage ? (
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="border-2 border-dashed border-slate-200 rounded-3xl p-10 bg-slate-50 flex flex-col items-center justify-center cursor-pointer hover:border-cyan-500 transition-colors group"
                            >
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleUpload}
                                />
                                <div className="mb-4 text-slate-300 group-hover:text-cyan-500 transition-colors">
                                    <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                    </svg>
                                </div>
                                <p className="text-sm font-semibold text-slate-600 text-center">Select Labels or drag and drop here</p>
                                <p className="text-[10px] text-slate-400 mt-1">JPG or PNG up to 10MB</p>
                            </div>
                        ) : (
                            <div className="relative p-4 bg-slate-50 border border-slate-100 rounded-3xl flex flex-col items-center animate-in zoom-in-95">
                                <div className="relative w-full aspect-square max-h-[220px] bg-white rounded-2xl overflow-hidden shadow-inner border border-white flex items-center justify-center p-4">
                                    <img src={labelImage} className="max-w-full max-h-full object-contain drop-shadow-md" alt="Preview" />
                                    <button
                                        onClick={() => setLabelImage(null)}
                                        className="absolute top-1 right-1 p-1.5 bg-slate-100 shadow-2xl rounded-full hover:bg-red-600  transition-colors cursor-pointer"
                                    >
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" color="black">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        )}

                    </div>
                )}
                {step === 6 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                        <h2 className="text-2xl font-black text-slate-800">Review Your Design</h2>
                        <p className="text-slate-500 text-sm">Review the details before finalizing your custom bottle.</p>

                        <div className="bg-slate-50 p-6 rounded-[32px] border border-slate-100 space-y-4">
                            <div className="flex justify-between items-center pb-3 border-b border-slate-200/50">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Bottle Style</span>
                                <span className="font-bold text-slate-700">{selectedBottleType}</span>
                            </div>
                            <div className="flex justify-between items-center pb-3 border-b border-slate-200/50">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Liquid Color</span>
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded-full border border-white shadow-sm" style={{ backgroundColor: liquidColor }} />
                                    <span className="font-mono text-xs text-slate-600 uppercase">{liquidColor}</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-center pb-3 border-b border-slate-200/50">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Cap Finish</span>
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded-full border border-white shadow-sm" style={{ backgroundColor: capColor }} />
                                    <span className="font-mono text-xs text-slate-600 uppercase">{capColor}</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Custom Label</span>
                                <span className={`text-xs font-black px-2 py-1 rounded-md ${labelImage ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                                    {labelImage ? 'ATTACHED' : 'NONE'}
                                </span>
                            </div>
                        </div>

                        <div className="p-6 bg-cyan-50 rounded-[32px] border border-cyan-100">
                            <div className="flex justify-between items-center">
                                <span className="text-cyan-800 font-bold">Estimated Total</span>
                                <span className="text-2xl font-black text-cyan-900">$45.00</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="p-6 bg-slate-50 border-t flex gap-3">
                {step > 1 && (
                    <button
                        onClick={prevStep}
                        className="flex justify-center cursor-pointer w-full py-3 border border-slate-200 bg-white rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                    >
                        Back
                    </button>
                )}

                <button
                    onClick={() => {
                        if (step === 6) {
                            handleDownload();
                        } else {
                            nextStep();
                        }
                    }}
                    className="flex justify-center cursor-pointer w-full py-3 bg-cyan-600 text-white rounded-xl font-bold shadow-lg shadow-cyan-200 hover:bg-cyan-700 transition-all active:scale-95"
                >
                    {/* Check if we are on the final Review step (6) */}
                    {step === 6 ? 'Download' : 'Next Step'}
                </button>
            </div>
        </div>
    );
}