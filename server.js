const Discord = require('discord.js')
const DiscordRSS = require('./index.js')
const config = require('./config.json')
const log = require('./util/logger.js')
const DISABLED_EVENTS = ['TYPING_START', 'MESSAGE_DELETE', 'MESSAGE_UPDATE', 'PRESENCE_UPDATE', 'VOICE_STATE_UPDATE', 'VOICE_SERVER_UPDATE', 'USER_NOTE_UPDATE', 'CHANNEL_PINS_UPDATE']
const SHARDED_OPTIONS = { respawn: false }
const client = new Discord.Client({ disabledEvents: DISABLED_EVENTS })

;(function login (attempt) {
  if (attempt >= 10) throw new Error('Failed to login after 10+ attempts')
  client.login(config.bot.token)
    .then(tok => new DiscordRSS.Client(client, { readFileSchedules: true, setPresence: true }))
    .catch(err => err.message.includes('too many guilds') ? new DiscordRSS.ClientSharded(new Discord.ShardingManager('./shard.js', SHARDED_OPTIONS)) : setTimeout(() => {
      log.general.error(`Failed to login on attempt ${attempt}`, err)
      login(++attempt)
    }, 30000))
})(1)
