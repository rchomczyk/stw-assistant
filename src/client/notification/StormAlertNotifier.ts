import { fetchStormAlerts } from "../storm/StormAlertController";
import { EmbedMessage, EmbedField, EmbedThumbnail } from "./discord/component/EmbedMessage";
import { DiscordClient } from "./discord/DiscordClient";
import { Webhook } from "./discord/webhook/Webhook";
import moment from "moment";

export class StormAlertNotifier {

    private readonly matchers = [ "V-bucks", "(Legendary)" ]
    private client: DiscordClient
    private readonly target: string | null

    constructor(client: DiscordClient, target: string | null) {
        this.client = client
        this.target = target
    }

    async notify() {
        await fetchStormAlerts()
            .then(alerts => alerts.flatMap(alert => alert.missions))
            .then(missions => missions.filter(mission => this.matchers.some(matcher => mission.rewards.includes(matcher))))
            .then(async missions => {
                const fields = missions.map(mission => new EmbedField(`${mission.area} - ${mission.name}`, mission.rewards, true))
                await this.client.sendWebhook(this.target, this.buildNotification(fields))
            })
    }

    private buildNotification(fields: Array<EmbedField>) {
        return new Webhook("stw-assistant", [
            new EmbedMessage(`New mission alerts - ${moment(Date.now()).format("DD/MM/YYYY")}`, 15856929, fields, new EmbedThumbnail("https://static.wikia.nocookie.net/fortnite/images/e/eb/V-Bucks_-_Icon_-_Fortnite.png/revision/latest?cb=20170806013747")) ])
    }
}