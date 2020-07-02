"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteById = exports.update = exports.create = exports.test = exports.getById = exports.getAll = void 0;
function getAll(model) {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            const document = yield model.find({});
            return res.status(200).send(document);
        }
        catch (err) {
            return next({
                status: 500,
                message: err.message,
            });
        }
    });
}
exports.getAll = getAll;
function getById(model) {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            const document = yield model.findById(req.params.id);
            return res.status(200).send(document);
        }
        catch (err) {
            return next({
                status: 500,
                message: err.message,
            });
        }
    });
}
exports.getById = getById;
function test() {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            return res.status(200).send('test completed');
        }
        catch (err) {
            return next({
                status: 500,
                message: err.message,
            });
        }
    });
}
exports.test = test;
function create(GenericModel) {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            const document = req.body;
            const newDocument = yield new GenericModel(document).save();
            return res.status(200).send(newDocument);
        }
        catch (err) {
            return next({
                status: 500,
                message: err.message,
            });
        }
    });
}
exports.create = create;
function update(GenericModel) {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            const document = req.body;
            const updatedDocument = yield GenericModel.findOneAndUpdate({ _id: req.params.id }, document);
            return res.status(200).send(updatedDocument);
        }
        catch (err) {
            return next({
                status: 500,
                message: err.message,
            });
        }
    });
}
exports.update = update;
function deleteById(GenericModel) {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        const key = Object.keys(req.params)[0];
        try {
            const deletedDocument = yield GenericModel.deleteOne({ [key]: req.params[key] });
            return res.status(200).send(deletedDocument);
        }
        catch (err) {
            return next({
                status: 500,
                message: err.message,
            });
        }
    });
}
exports.deleteById = deleteById;
//# sourceMappingURL=helpers.js.map