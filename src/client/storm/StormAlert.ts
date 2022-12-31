import { Exclude, Expose } from "class-transformer";

@Exclude()
export class StormAlert {

    @Expose()
    // @ts-ignore
    guid: string

    @Expose()
    // @ts-ignore
    area: string

    @Expose()
    // @ts-ignore
    name: string

    @Expose()
    // @ts-ignore
    rewards: string

    @Expose({ name: "power_level" })
    // @ts-ignore
    power: number

    @Expose({ name: "expires_at" })
    // @ts-ignore
    expiresAt: Date
}

export class StormAlertZoned {

    constructor(readonly scope: string, readonly missions: StormAlert[]) {

    }
}