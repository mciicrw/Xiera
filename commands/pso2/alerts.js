const Commando = require('discord.js-commando');

module.exports = class PSO2Commands extends Commando.Command {
    constructor(client) {
        super(client, {
            name: "alerts",
            group: "pso2",
            memberName: "alerts",
            description: "Enables EQ alerts. separate each ship with space\nAnd the alert only available for 1 channel, if you edit the alert channel (like doing this command for another channel) the current channel will stop alerting",
            examples: ["<prefix>alerts #general 5[space]7[space]9"],
            guildOnly: true,

            args: [
                {
                    key: 'channel',
                    label: 'channel',
                    prompt: 'on what channel do you want the alerts to be displayed on?',
                    type: 'channel'
                },
                {
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
                },
            ]
        })
    }

    hasPermission(msg) {
        return msg.member.hasPermission('MANAGE_GUILD');
    }

    async run(msg, args, client){
        let channel = args.channel;
        let dict = {}
        dict["ships"] = args.ships;
        dict["channel"] = channel.id;

        this.client.provider.set(msg.guild, "alerts", dict);
        return msg.channel.send(`${msg.author}`, {embed:
            {
            color: 3447003,
            description: (`:ballot_box_with_check: Alerts successfully enabled for : \n\n\ **Ship(s)** : ${args.ships.join(', ')} \n\ **On Channel** : #${args.channel.name}`)
            }
        });
    }
}
