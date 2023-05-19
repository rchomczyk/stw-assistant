import { Expose } from "class-transformer";

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

    @Expose()
    // @ts-ignore
    power_level: number

    @Expose()
    // @ts-ignore
    expires_at: Date
}

export class StormAlertZoned {

    constructor(readonly scope: StormAlertZone, readonly missions: StormAlert[]) {

    }
}

// Source: https://stackoverflow.com/a/47714083
export class StormAlertZone {

    private static AllValues: { [name: string]: StormAlertZone } = {};

    static readonly Stonewood = new StormAlertZone("Stonewood", "https://static.wikia.nocookie.net/fortnite_gamepedia/images/e/eb/Stonewood_Homebase_Storm_Shield.png/revision/latest/scale-to-width-down/1000?cb=20180626174726")
    static readonly Plankerton = new StormAlertZone("Plankerton", "https://static.wikia.nocookie.net/fortnite_gamepedia/images/3/3a/Plankerton_Homebase_Storm_Shield.png/revision/latest/scale-to-width-down/1000?cb=20181117104045")
    static readonly CannyValley = new StormAlertZone("Canny Valley", "https://static.wikia.nocookie.net/fortnite_gamepedia/images/2/27/Canny_Valley_Homebase_Storm_Shield.png/revision/latest/scale-to-width-down/1000?cb=20180625151314")
    static readonly TwinePeaks = new StormAlertZone("Twine Peaks", "https://static.wikia.nocookie.net/fortnite_gamepedia/images/c/c5/Twine_Peaks_Homebase_Storm_Shield.png/revision/latest?cb=20180625152648")

    private constructor(public readonly name: string, public readonly icon: string) {
        StormAlertZone.AllValues[name] = this;
    }

    public static parse(data: string): StormAlertZone {
        return StormAlertZone.AllValues[data];
    }
}