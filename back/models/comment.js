module.exports = (sequelize, DataTypes) => {
	const Comment = sequelize.define(
		'Comment',
		{
			content: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
		},
		{
			charset: 'utf8mb4', // 이모티콘도 저장되게 mb4 추가
			collate: 'utf8mb4_general_ci', // 한글+이모티콘 저장
		},
	);
	Comment.associate = db => {
		db.Comment.belongsTo(db.User);
		db.Comment.belongsTo(db.Post);
	};
	return Comment;
};
