const Commando = require('discord.js-commando');
const path = require('path');
const sqlite = require('sqlite')
const fetch = require('node-fetch');
const fs = require('mz/fs');
const moment = require('moment');
const handleEQs = require('./eqs.js');
const handleBumped = require('./bumped.js');

if (!fs.existsSync('./config.json')) {
    fs.writeFileSync('./config.json', '{"token" : "", "prefix" : "!"}')
    console.log('WARNING: Config file is missing. Please edit "config.json" and re-run the script.')
    process.exit()
}

if (!fs.existsSync('./cache.json')) {
    fs.writeFileSync('./cache.json', '{ "time" : "02-19-2017 19:05:04 +0000" }')
}

if (!fs.existsSync('./bumped.json')) {
    fs.writeFileSync('./bumped.json', '{ "isoDate" : "2017-09-22T05:58:27.000Z" }')
}

const config = require('./config.json')

const client = new Commando.Client({
    owner: '296442142203576321',
    commandPrefix: config.prefix
});

client
    // Events
    .on('error', console.error)
    .on('warn', console.warn)
    //.on('debug', console.log)
    .on('ready', () => {
        console.log(`-> Client ready! \n-> Logged in as ${client.user.username}#${client.user.discriminator}`)
        console.log(`-> Servers: ${client.guilds.size}`)
            setInterval(function(){
                let statuses = [`${client.guilds.size} server | !info`, `${client.guilds.size} server | @${client.user.username}#${client.user.discriminator} help`, `${client.guilds.size} server | PSO EQ alert Bot`, `${client.guilds.size} server | donate and help us`]
                let string = statuses[Math.floor(Math.random()*statuses.length)];
                client.user.setPresence({
                    game:
                        {
                            name: string,
                            status: "Idle"
                            
                        }
                    });
            }, 7000)

    })

    .on('commandError', (cmd, err) => {
        if (err instanceof Commando.FriendlyError) return;
        console.error('Error in command ${cmd.groupID}:${cmd.memberName}', err)
        
    })



client.registry
    // Custom groups
    .registerGroups([
        ['pso2', 'Admin Commands'],
        ['general', 'General commands'],
        ['fun_and_games', "Fun and Games commands"]
    ])

    // Register default groups, commands and argument types
    .registerDefaults()

    // Register every command in the ./commands/ directory
    .registerCommandsIn(path.join(__dirname, 'commands'))

client.setProvider(
    sqlite.open(path.join(__dirname, 'settings.sqlite3')).then(db => new Commando.SQLiteProvider(db))
).catch(console.error);

// EQ / Bumped alerts
client.setInterval(handleEQs, 25000, client);
client.setInterval(handleBumped, 25000, client);

client.login(config.token);
