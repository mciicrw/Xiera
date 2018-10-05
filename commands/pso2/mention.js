const Commando = require('discord.js-commando');
const role = require('discord.js');

module.exports = class PSO2Commands extends Commando.Command {
    constructor(client) {
        super(client, {
            name: "role",
            group: "pso2",
            memberName: "role",
            description: "Mentions for EQ alert",
            examples: ["mention @Admin"],
            guildOnly: true,

            args: [
                {
                    key: 'role',
                    label: 'role',
                    prompt: 'who/what role do you want to mention here?',
                    type: 'role'
                },
            ]
        })
    }

    hasPermission(msg) {
        return msg.member.hasPermission('MANAGE_GUILD');
    }

    async run(msg, args, client){
        let role = args.role;
        let dict = {}
        dict["role"] = `<@&${args.role.id}>`;

        this.client.provider.set(msg.guild, "role", dict);
        return msg.channel.sendMessage(`${msg.author}`, {embed:
            {
            color: 3447003,
            description: (`Successfully changed the mention to : \n\n\**${args.role.name}**`)
            }
        });
    }
}
