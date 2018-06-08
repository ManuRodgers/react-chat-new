const mongoose = require("mongoose");
const DB_URL = "mongodb://127.0.0.1:27017/user";
mongoose.connect(DB_URL);
mongoose.connection.on("connected", function() {
  console.log(`mongodb connected successfully`);
});

const models = {
  user: {
    // for both boss and genius
    user: { type: String, require: true },
    pwd: { type: String, require: true },
    kind: { type: String, require: true },
    avatar: { type: String },

    // for boss only
    company: { type: String },
    salary: { type: String },
    title: { type: String },
    description: { type: String },

    // for genius only
    wage: { type: String },
    job: { type: String },
    profile: { type: String }
  },
  chat: {
    from: { type: String, require: true },
    to: { type: String, require: true },
    read: { type: Boolean, require: true, default: false },
    text: { type: String, require: true, default: "" },
    chatId: { type: String, require: true },
    createdTime: { type: Number, default: Date.now, require: true }
  }
};

for (let model in models) {
  mongoose.model(model, new mongoose.Schema(models[model]));
}

module.exports = {
  getModel: function(name) {
    return mongoose.model(name);
  }
};
