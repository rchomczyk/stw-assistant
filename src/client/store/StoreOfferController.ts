import { plainToInstance } from "class-transformer";
import { StoreOffer } from "./StoreOffer";

export async function fetchStoreOffers(): Promise<StoreOffer[]> {
    const resp = await fetch("https://freethevbucks.com/apiforstwstore.json")
    const body = await resp.json() as any
    return body.STWRotationalEventStorefront
        .map((element: any) => plainToInstance(StoreOffer, element))
}