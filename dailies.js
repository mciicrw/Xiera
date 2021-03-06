const fetch = require('node-fetch');
const fs = require('mz/fs');
const moment = require('moment');

module.exports = async (client) => {
    try {
        const response = await fetch('http://159.65.1.209:5000/daily/');
        if (response.status !== 200) return;

        const data = await response.json();
        const cache = JSON.parse(await fs.readFile("./cache.json"));

        if (data[0]["time"] !== cache["time"]) {
            await fs.writeFile("cache.json", `{ "time" : "${data[0]["time"]}", "i": ${cache["i"] <= 10 ? cache["i"] + 1 : 0} }`);
            const guilds = client.guilds.filter(guild => { return client.provider.get(guild, "dorders") });
            
            for (let guild of guilds) {
                let settings = await client.provider.get(guild[1], "alerts");
                let daily = data[0]["daily"].filter(item => { return settings["dchannel"]});
                let format = [];
                
                if (!client.channels.get(settings['dchannel'])) continue;
                let channel = client.channels.get(settings['dchannel']);
/*
                if (eqs.length <= 0) continue;
                if (eqs.length > 0 && eqs.length !== 10) {
                    for (let eq of eqs) {
                        format.push(`\`SHIP ${eq['ship']}:\` **${eq['name']}**`);
                    }
                }
                else {
                    format.push(`\`ALL SHIPS:\` **${eq['name']}**`);
                }
*/
                let time = moment(eq[1], 'YYYYMMDD').subtract(1, 'day');
                let string = data.join('\n');
                
                if (channel.type == "text" && channel.permissionsFor(client.user).has("SEND_MESSAGES") && channel.permissionsFor(client.user).has("READ_MESSAGES") && guild[1].available) {
                    try {
                        await client.channels.get(settings['dchannel']).send({
                        embed:
                            {
                                color: 3447003,
                                title: `Phantasy Star Online 2 Daily Order today`,
                                url: "http://pso2.js",
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
