import { StormAlert, StormAlertZone } from "./StormAlert";
import { fetchStormAlerts } from "./StormAlertController";
import { EmbedMessage, EmbedField, EmbedThumbnail, EmbedFooter } from "../notification/discord/component/EmbedMessage";
import { DiscordClient } from "../notification/discord/DiscordClient";
import { Webhook } from "../notification/discord/webhook/Webhook";
import moment from "moment";

export class StormAlertNotifier {

    private readonly matchers = [ "V-Bucks", "(Legendary)", "Mythic" ]
    private readonly iconUrl: string = "https://static.wikia.nocookie.net/fortnite/images/e/eb/V-Bucks_-_Icon_-_Fortnite.png/revision/latest?cb=20170806013747"

    constructor(public readonly client: DiscordClient,
                public readonly target: string | null) {

    }

    async notify(): Promise<void> {
        await fetchStormAlerts()
            .then(async (alerts) => {
                const notifications = []

                for (const alert of alerts) {
                    const location = alert.scope
                    const missions = alert.missions.filter(mission => this.matchers.some(matcher => mission.rewards.includes(matcher)))
                    if (missions.length > 0) {
                        notifications.push(this.getMessageWithAlerts(location, missions))
                    }
                }

                if (notifications.length > 0) {
                    await this.client.sendWebhook(this.target, this.getWebhook(notifications))
                }
            })
    }

    private getWebhook(components: Array<EmbedMessage>) {
        return new Webhook("stw-assistant", components, "<@&1109105344426283030>", this.iconUrl)
    }

    private getMessageWithAlerts(location: StormAlertZone, missions: Array<StormAlert>): EmbedMessage {
        return new EmbedMessage(
            `Mission alerts in ${location.name} for ${moment(Date.now()).format("DD/MM/YYYY")}`,
            15856929,
            missions.map(mission => new EmbedField(`${mission.name} [🗲 ${mission.power_level}]`, mission.rewards, false)),
            "A spicy dose of new missions with pretty good rewards.",
            moment().toISOString(true),
            new EmbedThumbnail(location.icon),
            new EmbedFooter("stw-assistant fetches data from Free The V-Bucks ❤", this.iconUrl))
    }
}