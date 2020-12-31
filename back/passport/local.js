const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const bcrypt = require('bcrypt');
const { User } = require('../models');

module.exports = () => {
	passport.use(new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
	}, async (email, password, done) => {
		try {
			const user = await User.findOne({
				where: {
					email,
				},
			});

			if (!user) {
				done(null, false, { reason: '존재하지 않는 사용자' });
			}

			const result = await bcrypt.compare(password, user.password);
			if (result) {
				return done(null, user);
			}
			return done(null, false, { reason: '비밀번호 불일치' });

		} catch (error) {
			console.error(error);
			return done(error); // 서버 에러
		}
		
	}));
}

// done(서버 에러, 성공 여부, 클라 에러)