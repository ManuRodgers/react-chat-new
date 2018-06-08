// third party library
const express = require("express");
const userRouter = express.Router();

const utils = require("utility");
// own code
const model = require("./model");
const User = model.getModel("user");
const Chat = model.getModel("chat");
const filter = { pwd: 0, __v: 0 };

// User.remove({ user: "Liao" }, function(err, doc) {
//   console.log(doc);
// });

userRouter.get("/list", function(req, res) {
  const { kind } = req.query;

  User.find({ kind }, filter, function(err, doc) {
    if (err) {
      return res.json({ code: 1, msg: "something wrong with back end" });
    }
    if (doc) {
      return res.json({ code: 0, data: doc });    }
  });
});

userRouter.get("/msgList", function(req, res) {
  const user = req.cookies.userId;
  let users = {};
  User.find({}, function(err, userDoc) {
    userDoc.forEach(v => {
      users[v._id] = { name: v.user, avatar: v.avatar };
    });
    Chat.find({ $or: [{ from: user }, { to: user }] }, function(err, doc) {
      if (!err) {
        return res.json({ code: 0, msgList: doc, users: users });
      }
    });
  });
});
userRouter.post("/markMsg", function(req, res) {
  const currentUserId = req.cookies.userId;
  const { from } = req.body;
  Chat.update(
    { from, to: currentUserId },
    { $set: { read: true } },
    { multi: true },
    function(err, doc) {
      if (!err && doc) {
        return res.json({
          code: 0,
          numModified: doc.nModified,
          currentUserId,
          from
        });
      }
    }
  );
});

userRouter.get("/info", function(req, res) {
  const { userId } = req.cookies;
  if (!userId) {
    return res.json({ code: 1, msg: "something wrong with cookie" });
  }

  User.findById(userId, filter, function(err, doc) {
    if (err) {
      return res.json({ code: 1, msg: "something wrong with back end" });
    }
    if (doc) {
      // console.log(doc);

      if (doc.kind === "boss") {
        const {
          user,
          kind,
          avatar,
          company,
          salary,
          title,
          description,
          _id
        } = doc;
        return res.json({
          code: 0,
          data: { user, kind, avatar, company, salary, title, description, _id }
        });
      } else {
        const { user, kind, avatar, wage, job, profile, _id } = doc;
        return res.json({
          code: 0,
          data: { user, kind, avatar, wage, job, profile, _id }
        });
      }
    }
  });
});

userRouter.post("/register", function(req, res) {
  const { user, pwd, kind } = req.body;

  User.findOne({ user }, filter, function(err, doc) {
    if (doc) {
      return res.json({ code: 1, msg: "the user you entered already existed" });
    }
    const userModel = new User({ user, kind, pwd: getPwdMd5(pwd) });
    userModel.save(function(err, doc) {
      if (err) {
        return res.json({ code: 1, msg: "something wrong with back end" });
      }
      const { user, kind, _id } = doc;
      res.cookie("userId", _id);
      return res.json({ code: 0, data: { user, kind, _id } });
    });
  });
});

userRouter.post("/login", function(req, res) {
  const { user, pwd } = req.body;
  User.findOne({ user, pwd: getPwdMd5(pwd) }, filter, function(err, doc) {
    if (!err && doc) {
      const {
        user,
        kind,
        _id,
        company,
        salary,
        title,
        description,
        avatar
      } = doc;

      res.cookie("userId", _id);
      return res.json({
        code: 0,
        data: { user, kind, _id, company, salary, title, description, avatar }
      });
    } else {
      return res.json({ code: 1, msg: "username or password is wrong" });
    }
  });
});

userRouter.post("/updateBoss", function(req, res) {
  const { userId } = req.cookies;
  if (!userId) {
    return res.json({ code: 1, msg: "something wrong with cookie" });
  }

  const { avatar, company, salary, title, description } = req.body;

  User.findByIdAndUpdate(
    userId,
    { avatar, company, salary, title, description },
    function(err, doc) {
      if (err) {
        return res.json({ code: 1, msg: "something wrong with back end" });
      }
      if (doc) {
        const data = Object.assign(
          {},
          { user: doc.user, kind: doc.kind },
          { avatar, company, salary, title, description }
        );

        return res.json({ code: 0, data: data });
      } else {
        return res.json({ code: 1, msg: "something wrong with back end" });
      }
    }
  );
});

userRouter.post("/updateGenius", function(req, res) {
  const { userId } = req.cookies;
  if (!userId) {
    return res.json({ code: 1, msg: "something wrong with cookie" });
  }
  const { avatar, wage, job, profile } = req.body;

  User.findByIdAndUpdate(userId, { avatar, wage, job, profile }, function(
    err,
    doc
  ) {
    if (err) {
      return res.json({ code: 1, msg: "something wrong with back end" });
    }
    if (doc) {
      const data = Object.assign(
        {},
        { user: doc.user, kind: doc.kind },
        { avatar, wage, job, profile }
      );

      return res.json({ code: 0, data: data });
    }
  });
});

function getPwdMd5(pwd) {
  const salt = "manurodgersgoat@gmail.com";
  return utils.md5(utils.md5(pwd + salt));
}

module.exports = userRouter;
