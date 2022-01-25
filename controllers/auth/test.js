// const queryString = require('query-string');
// const jwt = require('jsonwebtoken');
// const axios = require('axios');
// const { nanoid } = require('nanoid');
// const { User } = require('../../models');
// require('dotenv').config();
// const {
//   BASE_URL,
//   GOOGLE_CLIENT_ID,
//   GOOGLE_CLIENT_SECRET,
//   SECRET_KEY,
//   FRONTEND_URL,
// } = process.env;

// const googleLogin = (req, res) => {
//   const stringifiedParams = queryString.stringify({
//     client_id: GOOGLE_CLIENT_ID,
//     redirect_uri: `${BASE_URL}/api/auth/google-redirect`,
//     scope: [
//       'https://www.googleapis.com/auth/userinfo.email',
//       'https://www.googleapis.com/auth/userinfo.profile',
//     ].join(' '),
//     response_type: 'code',
//     access_type: 'offline',
//     prompt: 'consent',
//   });

//   return res.redirect(
//     `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`,
//   );
// };

// const googleRedirect = async (req, res) => {
//   const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
//   const urlObj = new URL(fullUrl);
//   const urlParams = queryString.parse(urlObj.search);
//   const code = urlParams.code;
//   const tokenData = await axios({
//     url: `https://oauth2.googleapis.com/token`,
//     method: 'post',
//     data: {
//       client_id: GOOGLE_CLIENT_ID,
//       client_secret: GOOGLE_CLIENT_SECRET,
//       redirect_uri: `${BASE_URL}/api/auth/google-redirect`,
//       grant_type: 'authorization_code',
//       code,
//     },
//   });
//   const userData = await axios({
//     url: 'https://www.googleapis.com/oauth2/v2/userinfo',
//     method: 'get',
//     headers: {
//       Authorization: `Bearer ${tokenData.data.access_token}`,
//     },
//   });

//   const { name, email, avatar } = userData.data;
//   let possiblUser;
//   const user = await User.findOne({ email });
//   if (!user) {
//     const newUser = new User({ name, email, avatar });
//     newUser.setPassword(nanoid());
//     await newUser.save();
//     possiblUser = newUser;
//   } else {
//     possiblUser = user;
//   }

//   // const { _id: id } = user;
//   const payload = { id: user._id };

//   const token = jwt.sign(payload, SECRET_KEY, {
//     expiresIn: '14d',
//   });
//   const accessToken = token(possiblUser.email);

//   await User.findByIdAndUpdate(user._id, { accessToken });

//   return res.redirect(
//     `${FRONTEND_URL}/api/auth/google-redirect/?access_token=${accessToken}&email=${email}&name=${name}&avatar=${avatar}`,
//   );
// };
// module.exports = { googleLogin, googleRedirect };

// //   const user = await User.findOne({ email: userData.data.email });
// //   let token = '';

// //   const addToken = async id => {
// //     token = await jwt.sign({ _id: id }, SECRET_KEY);
// //     await User.findOneAndUpdate({ email: userData.data.email }, { token });
// //   };

// //   if (!user) {
// //     await User.create({
// //       name: userData.data.name,
// //       email: userData.data.email,
// //     });
// //     const user = await User.findOne({ email: userData.data.email });
// //     await addToken(user._id);
// //   } else {
// //     await addToken(user._id);
// //   }
// //   return res.redirect(
// //     `http://localhost:3001/api/auth/google-redirect/?access_token=${token}&email=${user.email}&avatar=${user.avatar}&name=${user.name}`,
// //   );
// // };

// // const googleRedirect = async (req, res) => {
// //   const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
// //   const urlObj = new URL(fullUrl);
// //   const urlParams = queryString.parse(urlObj.search);
// //   const code = urlParams.code;
// //   const tokenData = await axios({
// //     url: 'https://oauth2.googleapis.com/token',
// //     method: 'post',
// //     data: {
// //       client_id: GOOGLE_CLIENT_ID,
// //       client_secret: GOOGLE_CLIENT_SECRET,
// //       redirect_uri: `http://localhost:3001/api/auth/google-redirect`,
// //       grant_type: 'authorization_code',
// //       code,
// //     },
// //   });
// //   const userData = await axios({
// //     url: 'https://www.googleapis.com/oauth2/v2/userinfo',
// //     method: 'get',
// //     headers: {
// //       Authorization: `Bearer ${tokenData.data.access_token}`,
// //     },
// //   });
// //   const email = userData.data.email;
// //   const name = userData.data.given_name;
// //   const user = await Users.findUserByEmail(email);
// //   if (!user) {
// //     const password = nanoid();
// //     const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
// //     const newUser = {
// //       email,
// //       name,
// //       password: hashPassword,
// //     };
// //     const user = await Users.createUser(newUser);
// //     const { id } = user;
// //     const payload = {
// //       id,
// //     };
// //     const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1d' });
// //     await Users.updateToken(id, token);
// //     return res.redirect(
// //       `${process.env.HOME_URL}/google-redirect/?token=${token}&email=${
// //         user.email
// //       }&balance=${user.balance}&name=${Object.values(user)[2].name}`,
// //     );
// //   }
