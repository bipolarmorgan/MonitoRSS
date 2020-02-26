const Profile = require('../../structs/db/Profile.js')
const Feed = require('../../structs/db/Feed.js')

module.exports = async (message) => {
  const content = message.content.split(' ')
  if (content.length !== 2) return
  const guildId = content[1]
  const profile = await Profile.get(guildId)
  console.log('Profile ', profile)
  const feeds = await Feed.getManyBy('guild', guildId)
  console.log('Feeds ', feeds)
  await message.channel.send('Check console log')
}
