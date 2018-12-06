const Commando = require('discord.js-commando');
const fetch = require('node-fetch');

module.exports = class PSO2Commands extends Commando.Command {
    constructor(client) {
        super(client, {
            name: "dailies",
            group: "general",
            memberName: "dailies",
            description: "Returns the currently active daily orders",
            examples: ["dailies (type the `prefix`dailies to see the daily order right now)"],
        })
    }

    async run(msg, args, client) {
        try {
            const data = await (await fetch('http://159.65.1.209:5000/daily')).json(); //this api is in my server, so if you want to use api from your server, change this to your api address

            return msg.reply("", {
                embed: {
                    color: 3447003,
                    title: "PSO2 Daily Orders",
                    url: "http://pso2.jp",
                    fields: [{
                        name: "Orders",
                        value: data.join("\n")
                    }]
                }
            })
        } catch (err) {
            console.log(err);
        }
    }
}
