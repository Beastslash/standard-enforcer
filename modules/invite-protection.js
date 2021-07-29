var Database, dbClient, db, collection;

module.exports = async function(bot, msg) {
  if (!Database) {
    Database = await require("../database");
    dbClient = Database.mongoClient;
    db = dbClient.db("guilds");
    collection = db.collection("GuildInviteWhitelist");
  };
  
  var matches = msg.content.match(/discord.gg\/(\S+)/mi);
  if (msg.channel.id !== "868879799601496084" && !msg.member.roles.find((r) => {
    return {
      "862071715441803285": r, 
      "862071540521369661": r,
      "549312685255294976": r,
      "753661816999116911": r
    }[r];
  }) && matches) {
    
    // Check if it's unverified
    var verificationStatus = await collection.findOne({inviteCode: matches[1]});
    
    if (!verificationStatus || verificationStatus.whitelisted !== 1) {
      await msg.delete();
      await msg.channel.createMessage({
        content: "<@" + msg.author.id + "> Please ask the <@&497608104230387713> before posting an unverified invite link.",
        allowedMentions: {
          roles: false,
          users: true
        }
      });
      return false;
    };
  };
  
  return true;
}