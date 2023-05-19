import { fetchStormAlerts } from "../storm/StormAlertController";
import { EmbedMessage, EmbedField, EmbedThumbnail, EmbedFooter } from "./discord/component/EmbedMessage";
import { DiscordClient } from "./discord/DiscordClient";
import { Webhook } from "./discord/webhook/Webhook";
import moment from "moment";
import { StormAlert, StormAlertZone } from "../storm/StormAlert";

export class StormAlertNotifier {

    private readonly matchers = [ "V-bucks", "(Legendary)", "Mythic" ]
    private readonly iconUrl: string = "https://static.wikia.nocookie.net/fortnite/images/e/eb/V-Bucks_-_Icon_-_Fortnite.png/revision/latest?cb=20170806013747"
    private client: DiscordClient
    private readonly target: string | null

    constructor(client: DiscordClient, target: string | null) {
        this.client = client
        this.target = target
    }

    async notify(): Promise<void> {
        await fetchStormAlerts()
            .then(alerts => alerts.forEach(async (alert) => {
                const location = alert.scope
                const missions = alert.missions.filter(mission => this.matchers.some(matcher => mission.rewards.includes(matcher)))
                if (missions.length > 0) {
                    await this.client.sendWebhook(this.target, this.buildNotification(location, missions))
                }
            }))
    }

    private buildNotification(location: StormAlertZone, missions: StormAlert[]): Webhook {
        const prettyDate = moment(Date.now()).format("DD/MM/YYYY")
        return new Webhook("stw-assistant", [
            new EmbedMessage(
                `Mission alerts in ${location.name} for ${prettyDate}`,
                15856929,
                missions.map(mission => new EmbedField(`${mission.name} [🗲 ${mission.power_level}]`, mission.rewards, false)),
                "A spicy dose of new missions with pretty good rewards.",
                moment().toISOString(true),
                new EmbedThumbnail(location.icon),
                new EmbedFooter("stw-assistant fetches data from Free The V-Bucks ❤", this.iconUrl)) ], this.iconUrl)
    }
}