const { User, Post } = require('../models');

exports.validateUsername = () => {
  return async (req, res, next) => {
    try {
      await User.exists(req.query, (err, result) => {
        if (err) {
          console.log('Error: ', err);
          return next({
            status: 400,
            message: err,
          });
        }
        return res.status(200).json({ message: 'Todo all right', result });
      });
    } catch (err) {
      return next({
        status: 400,
        message: err.message,
      });
    }
  };
};

exports.getUsersPosts = () => {
  return async (req, res, next) => {
    try {
      const { id } = req.params;
      const usersPost = await Post.find({ author: id }).sort('date');
      return res.status(200).json(usersPost);
    } catch (err) {
      return next({
        status: 400,
        message: err.message
      });
    }
  }
}
