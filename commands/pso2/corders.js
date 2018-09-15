const Commando = require('discord.js-commando');

module.exports = class PSO2Commands extends Commando.Command {
    constructor(client) {
        super(client, {
            name: "corders",
            group: "pso2",
            memberName: "disablealertsdo",
            description: "Disables Daily Order alerts on the current server.",
            examples: ["corders"],
            guildOnly: true
        })
    }

    hasPermission(msg) {
        return msg.member.hasPermission('MANAGE_GUILD');
    }

    async run(msg, args, client){
        this.client.provider.set(msg.guild, "dorders");
        return msg.reply(`Alerts successfully disabled on this server.`);
    }
}
