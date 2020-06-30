exports.getAll = function (model, fields) {
  return async function (req, res, next) {
    try {
      let document = await model.find({}, fields);
      return res.status(200).send(document);
    } catch (err) {
      return next({
        status: 500,
        message: err.message
      });
    }
  }
}

exports.getById = function (model, fields) {
  return async function (req, res, next) {
    try {
      let document = await model.findById(req.params.id, fields);
      return res.status(200).send(document);
    } catch (err) {
      return next({
        status: 500,
        message: err.message
      });
    }
  }
}

exports.getByField = function (model) {
  return async function (req, res, next) {
    try {
      let document = await model.find(req.query);
      return res.status(200).send(document);
    } catch (err) {
      return next({
        status: 500,
        message: err.message
      });
    }
  }
}

exports.create = function (model) {
  return async function (req, res, next) {
    try {
      let document = req.body;
      if (req.files) {
        await Object.keys(req.files).forEach(async key => {
          let file = req.files[key]
          await new Promise((resolve, reject) => {
            resolve(file.mv(upload_dir + file.name, (err) => { console.error(err); reject(err) }));
          })
          document[key] = {
            name: file.name,
            size: file.size,
            mimetype: file.mimetype || file.type,
            url: upload_dir + file.name
          }
        })
      }
      const newDocument = await new model(document).save();
      if (req.express && req.express.next) {
        req.document = newDocument;
        next();
      } else {
        return res.status(200).send(newDocument);
      }
    } catch (err) {
      return next({
        status: 500,
        message: err.message
      })
    }
  }
}

exports.createMany = function (model) {
  return async function (req, res, next) {
    try {
      const documents = await model.insertMany(req.body);
      return res.status(200).send(documents);
    } catch (err) {
      return next({
        status: 500,
        message: err.message
      })
    }
  }
}

exports.update = function (model) {
  return async function (req, res, next) {
    try {
      let document = req.body
      if (req.files) {
        await Object.keys(req.files).forEach(async key => {
          let file = req.files[key]
          await new Promise((resolve, reject) => {
            resolve(file.mv(upload_dir + file.name, (err) => { console.error(err); reject(err) }));
          })
          document[key] = {
            name: file.name,
            size: file.size,
            mimetype: file.mimetype || file.type,
            url: upload_dir + file.name
          }
        })
      }
      let updatedDocument = await model.findOneAndUpdate({ _id: req.params.id }, document);
      let updatedDocument2 = await model.findOne({ _id: updatedDocument._id });
      if (req.express && req.express.next) {
        req.document = updatedDocument2;
        next();
      } else {
        return res.status(200).send(updatedDocument2);
      }
    } catch (err) {
      return next({
        status: 500,
        message: err.message
      });
    }
  }
}

exports.deleteById = function (model) {
  return async function (req, res, next) {
    const key = Object.keys(req.params)[0];
    try {
      let deletedDocument = await model.deleteOne({ [key]: req.params[key] });
      return res.status(200).send(deletedDocument);
    } catch (err) {
      return next({
        status: 500,
        message: err.message
      })
    }
  }
}

// Regex function for search functionality
exports.escapeRegex = function (string) {
  return string.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};