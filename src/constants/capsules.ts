import burgundyCapsule1 from "../../public/assets/capsules/burgundy/screwcap.png";
import burgundyCapsule2 from "../../public/assets/capsules/burgundy/standard.png";

import alsace1 from "../../public/assets/capsules/alsace/screwcap.png";
import alsace2 from "../../public/assets/capsules/alsace/standard.png";

import previewBurgundy1 from "../../public/assets/previewImages/burgundy/screwcap.png"
import previewBurgundy2 from "../../public/assets/previewImages/burgundy/standard.png";

import previewAlsace1 from "../../public/assets/previewImages/alsace/screwcap.png"
import previewAlsace2 from "../../public/assets/previewImages/alsace/standard.png"
import { BottleType } from "@/types/bottles";

export const capsuleOptions: Record <BottleType, { type: string; image: string; previewImage: string }[]> = {
    burgundy: [
        { type: "screw", image: burgundyCapsule1.src, previewImage: previewBurgundy1.src },
        { type: "standard", image: burgundyCapsule2.src, previewImage: previewBurgundy2.src }
    ],
    alsace: [
        { type: "screw", image: alsace1.src, previewImage: previewAlsace1.src },
        { type: "standard", image: alsace2.src, previewImage: previewAlsace2.src }
    ]
};