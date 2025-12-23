import { create } from 'zustand';
import { BottleType } from '@/types/bottles';
import { bottleOptions } from '@/constants/bottles';
import { capsuleOptions } from '@/constants/capsules';

interface BottleState {
    step: number;
    liquidColor: string;
    selectedBottleType: BottleType;
    selectedCapsuleType: string;
    capColor: string
    labelImage: string | null;
    isEditingLabel: boolean;


    setStep: (step: number) => void;
    setLiquidColor: (color: string) => void;
    setCapColor: (color: string) => void;
    setBottleType: (type: BottleType) => void;
    setCapsuleType: (type: string) => void;
    setLabelImage: (img: string | null) => void;
    setIsEditingLabel: (isEditing: boolean) => void;
    nextStep: () => void;
    prevStep: () => void;
}

export const useBottleStore = create<BottleState>((set) => ({
    step: 1,
    liquidColor: "#3498db",
    capColor: "#333333",
    selectedBottleType: bottleOptions[0].type,
    selectedCapsuleType: capsuleOptions[bottleOptions[0].type][0].type,
    labelImage: null,
    isEditingLabel: false,
    setStep: (step) => set({ step }),
    setLiquidColor: (liquidColor) => set({ liquidColor }),
    setCapColor: (capColor) => set({ capColor }),
    setBottleType: (type) => set({
        selectedBottleType: type,
        // Reset capsule to valid one for this bottle type
        selectedCapsuleType: capsuleOptions[type][0].type
    }),
    setCapsuleType: (type) => set({ selectedCapsuleType: type }),
    setLabelImage: (img) => set({ labelImage: img }),
    setIsEditingLabel: (isEditing) => set({ isEditingLabel: isEditing }),
    nextStep: () => set((state) => ({ step: Math.min(state.step + 1, 6) })),
    prevStep: () => set((state) => ({ step: Math.max(state.step - 1, 1) })),
}));
