
export type BottleType = 'bordeaux'| 'burgundy' | 'alsace';

export interface BottleDesign {
    type: BottleType;
    color: string;
    capsule: string;
    capsuleColor: string | null;
    label: string
};

export interface BottleSteps {
    onNext: () => void;
    onBack: () => void;
    currentStep: number;
    totalSteps: number;

}