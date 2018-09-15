const Commando = require('discord.js-commando');

module.exports = class PSO2Commands extends Commando.Command {
    constructor(client) {
        super(client, {
            name: "orders",
            group: "pso2",
            memberName: "orders",
            description: "Enables Daily Orders alerts",
            examples: ["orders #general"],
            guildOnly: true,

            args: [
                {
                    key: 'dchannel',
                    label: 'dchannel',
                    prompt: 'on what channel do you want the alerts to be displayed on?',
                    type: 'channel'
                }
               /* {
                    key: 'ships',
                    label: 'ship',
                    prompt: 'for what ship(s)? Each following message will be treated as a different ship.',
                    validate: (args) => {
                        if (args >= 1 && args <= 10){
                            return true;
                        }
                    },
                    type: 'integer',
                    infinite: true
                },*/
            ]
        })
    }

    hasPermission(msg) {
        return msg.member.hasPermission('MANAGE_GUILD');
    }

    async run(msg, args, client){
        let channel = args.dchannel;
        let dict = {}
//        dict["ships"] = args.ships;
        dict["dchannel"] = channel.id;

        this.client.provider.set(msg.guild, "dorders", dict);
        return msg.channel.sendMessage(`${msg.author}`, {embed:
            {
            color: 3447003,
            description: (`Alerts successfully enabled \n\`on channel\` : **#${args.dchannel.name}**`)
            }
        });
    }
}
