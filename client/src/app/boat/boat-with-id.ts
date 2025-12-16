import { Boat } from "./boat";

export type BoatWithId = {
    "id": number,
} & Boat;
