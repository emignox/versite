const mongoose = require("mongoose");
const uri =
  "mongodb+srv://emignox:Difficilissimo97@atlascluster.hzdivvv.mongodb.net/Whisper?retryWrites=true&w=majority";

mongoose
  .connect(uri)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

module.exports = mongoose;
