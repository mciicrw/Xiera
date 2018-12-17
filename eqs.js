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
                let eqs = data[0]["eqs"].filter(item => { return settings["ships"].includes(item["ship"]) });
                let format = [];
                
                if (!client.channels.get(settings['channel'])) continue;
                let channel = client.channels.get(settings['channel']);

                if (eqs.length <= 0) continue;
                if (eqs.length > 0 && eqs.length !== 10) {
                    for (let eq of eqs) {
                        format.push(`**SHIP ${eq['ship']} :**\n${eq['name']}`);
                    }
                }
                else {
                        format.push(`**ALL SHIPS:**\n${eqs[0]['name']}`);
                    }
                

                let donationString = "Support Our Server to help this bot keep alive!";
                let time = moment(data[0]["when"]);
                let string = format.join('\n\n');
                let titler = `EQ Notice on ${time.utcOffset('+0900').format("HH")} JST`;
                let footers = donationString;
                let embed = {
                    embed:
                        {
                            
                            title: `Phantasy Star Online 2 Emergency Quest (click to donate the bot)`,
                            url: "https://goo.gl/vo56Kj",
                            description: string,
                            thumbnail: {
                                url: "http://bumped.org/psublog/wp-content/uploads/2011/04/logo_pso2.png"
                            },
                            author: {
                                name: titler,
                                icon_url: "https://lh3.googleusercontent.com/-q2UouE29NsY/XBb3cfG-48I/AAAAAAAAAkI/a340upmcEm8UKxMstfUYpPL3TA2Ty64ygCHMYCw/s0/2018-12-17_09-08-24.png"
                            },
                            footer: {
                                icon_url: 'https://lh3.googleusercontent.com/-bcuH8xG81Zc/XBb4LTC8u3I/AAAAAAAAAkQ/fudH4K_9Uz4jf1Uqv-PTwUebIoVKPbCMQCHMYCw/s0/69927141_p0_master1200.png',
                                text: footers
                                }
                        }
                    };               
                if (channel.type == "text" && channel.permissionsFor(client.user).has("SEND_MESSAGES") && channel.permissionsFor(client.user).has("READ_MESSAGES") && guild[1].available) {
                    try {
                        await client.channels.get(settings['channel']).send("", embed);
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
/*                let titler = `:watch:**EQ Notice on** **${time.utcOffset('+0900').format("HH:MM")} JST**`;
                let string = format.join(',');
//                let editformat = `[${string}]`
                let footers = donationString;
                let embed = {
                    embed:
                        {
                            
                            title: `Phantasy Star Online 2 Emergency Quest (click to donate the bot)`,
                            url: "https://goo.gl/vo56Kj",
                            thumbnail: {
                                url: "http://bumped.org/psublog/wp-content/uploads/2011/04/logo_pso2.png"
                            },
                            author: {
                                name: titler},
                            footer: {
                                icon_url: 'https://lh3.googleusercontent.com/-RQW9qIM2acM/XAS_9DYpW7I/AAAAAAAAAiY/KJw0Mg1GHoYwyNPDPuGc7K_pxA29mQ5ogCHMYCw/s0/me.jpg',
                                text: footers
                                },
                            fields: [string]
                        }
                    };
 */               
                
