[![dev chat](https://discordapp.com/api/guilds/312824132897341440/widget.png?style=shield)](https://discord.gg/uKDqmG8)[![Donate](https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=SYJ9PCCAPPJ7U)
# Xiera
Discord bot used for alerting on Emergency Quests on Phantasy Star Online 2

Hello Xiera here! a Discord bot who's main functionality is to alert for Emergency Quests that happen on Phantasy Star Online 2. Ported from Rodrigo's [Weeb Bot](https://github.com/RodrigoLeiteF/WeebBot-v2)

## How to use

If you simply wish to have the bot on your server, just [click here](https://discordapp.com/oauth2/authorize?client_id=550576031145132036&scope=bot&permissions=537263184) and use the `!alerts` command to enable the EQ alerts.

## Dependencies

- [Node 8+](https://nodejs.org/en/download/current/)(Node 10 is recommended)
- Node Dependencies for bot can be found [here](https://github.com/mciicrw/Xiera/blob/master/package.json)

If you want to re-host the bot, you'll need to edit the `config.json` file with your bot's token, navigate into the bot's directory and run `npm install`.

## Commands

#### General

- `ping`: Pong!
- `cat`: Displays a random cat gif.

#### Phantasy Star Online 2

- `pso2`: General information regarding the game.
- `item <itemname>`: Looks up the japanese name of `<itemname>`.
- `alerts`: Enables EQ alerts.
- `dalerts`: Disables EQ alerts.
- `builds`: Displays current meta builds.
- `bumped`: Enables alerts for new articles on [Bumped](http://bumped.org/psublog).

#### Card games

- `sv <cardname>`: Returns information about `<cardname>`
- `mtg <cardname>`: Returns information about `<cardname>`

#### Settings 

All the following commands can be run by mentioning the bot and only work for server admins.

- `groups`: Lists all command groups.
- `prefix <prefix>`: Changes the bot's prefix to `<prefix>`. (Example: `@Xiera prefix -` changes the prefix to `-`, but you can still mention xiera and use it as prefix)
- `enable <group or command>`: Enables `<group or command>` to be used in this server.
- `disable <group or command>`: Disables `<group or command>` to be used in this server.

#### Experimental (not yet can be used)
- `alertsdo`: Enables Daily Order alerts.
- `dalertsdo`: Disables Daily Order alerts.

## Support

If you have any questions or something went wrong, please contact me at `MCII#3619` or `[ Ari Knight ]#9453` or [our support server](https://discord.gg/uKDqmG8) or Rodrigo at `Kaze#0001` or on [Rodrigo's server](https://discord.gg/0xMXCNAFbH032Ig1).

## Donations

If you want to donate to this bot, you can click the donation button above
thank you
