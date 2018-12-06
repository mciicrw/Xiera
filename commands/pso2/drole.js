const Commando = require('discord.js-commando');

module.exports = class PSO2Commands extends Commando.Command {
    constructor(client) {
        super(client, {
            name: "drole",
            group: "pso2",
            memberName: "disablerole",
            description: "Disables role mention on alerts in current server.",
            examples: ["drole"],
            guildOnly: true
        })
    }

    hasPermission(msg) {
        return msg.member.hasPermission('MANAGE_GUILD');
    }

    async run(msg, args, client){
        this.client.provider.set(msg.guild, "role");
        return msg.reply(`Role successfully removed from alerts.`);
    }
}