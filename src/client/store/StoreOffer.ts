import { Exclude, Expose } from "class-transformer";

@Exclude()
export class StoreOffer {

    @Expose()
    // @ts-ignore
    offerid: string

    @Expose()
    // @ts-ignore
    item: string

    @Expose()
    // @ts-ignore
    desc: string

    @Expose()
    // @ts-ignore
    rarity: string

    @Expose()
    // @ts-ignore
    limit: number

    @Expose()
    // @ts-ignore
    price: number
}