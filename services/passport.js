const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const keys = require("../congif/keys");

const mongoose = require("mongoose");
const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => done(null, user));
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        // user with the googleId already exists
        done(null, existingUser);
      } else {
        // create a new user record
        const user = await new User({ googleId: profile.id }).save();
        done(null, user);
      }
    }
  )
);

// mongodb:
//IgPNqrVBX3RWFx5r

//mongodb+srv://sagarprasad480:<password>@cluster0.q7bqx5t.mongodb.net/?retryWrites=true&w=majority
