const fetch = require('node-fetch');
const fs = require('mz/fs');
const moment = require('moment');

module.exports = async (client) => {
    try {
        const response = await fetch('http://35.200.25.13:5000/eq'); //this api is in my server, so if you want to add api from your server, change this to your own address
        if (response.status !== 200) return;

        const data = await response.json();
        const cache = JSON.parse(await fs.readFile("./cache.json"));

        if (data[0]["time"] !== cache["time"]) {
            await fs.writeFile("cache.json", `{ "time" : "${data[0]["time"]}", "i": ${cache["i"] <= 10 ? cache["i"] + 1 : 0} }`);
            const guilds = client.guilds.filter(guild => { return client.provider.get(guild, "alerts") });

            for (let guild of guilds) {
                let settings = await client.provider.get(guild[1], "alerts");
                let mention = await client.provider.get(guild[1], "role");
                let eqs = data[0]["eqs"].filter(item => { return settings["ships"].includes(item["ship"]) });
                let format = [];
                
                if (!client.channels.get(settings['channel'])) continue;
                let channel = client.channels.get(settings['channel']);

                if (eqs.length <= 0) continue;
                if (eqs.length > 0 && eqs.length !== 10) {
                    for (let eq of eqs) {
                        format.push(`**SHIP ${eq['ship']}:** ${eq['name']}`);
                    }
                }
                else {
                    for (let eq of eqs) {
                        format.push(`**ALL SHIPS:** ${eq['name']}`);
                    }
                }

                let donationString = "\n\nSupport Our Server to help this bot keep alive!\n(just click the link above)";
                let time = moment(data[0]["when"]);
                let string = `:watch:**EQ Notice on** **${time.utcOffset('+0900').format("HH:MM")} JST**\n${format.join('\n')}${cache["i"] === 10 ? donationString : ''}`;
                
                if (channel.type == "text" && channel.permissionsFor(client.user).has("SEND_MESSAGES") && channel.permissionsFor(client.user).has("READ_MESSAGES") && guild[1].available) {
                    try {
                        await client.channels.get(settings['channel']).send(mention['role'], {
                        embed:
                            {
                                color: 3447003,
                                title: `Phantasy Star Online 2 Emergency Quest (click to donate the bot)`,
                                url: "https://goo.gl/vo56Kj",
                                thumbnail: {
                                    url: "http://bumped.org/psublog/wp-content/uploads/2011/04/logo_pso2.png"
                                },
                                description: string
                            }
                        });
                    } catch (err) {
                        continue;
                    }
                }
            }
        }
    } catch (err) {
        console.error(err);
    }
}
