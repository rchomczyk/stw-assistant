import { StormAlertZone, StormAlertZoned } from "./StormAlert";

export async function fetchStormAlerts(): Promise<StormAlertZoned[]> {
    const resp = await fetch("https://freethevbucks.com/apiformissiontracking.json")
    const body = await resp.json() as any

    const alerts = body.alerts
    const scopes = [ "Stonewood", "Plankerton", "Canny Valley", "Twine Peaks" ]

    return scopes
        .map(scope => new StormAlertZoned(StormAlertZone.parse(scope), alerts[scope]))
        .map(scope => new StormAlertZoned(scope.scope, Object.keys(scope.missions).flatMap((inner: any) => scope.missions[inner])))
}