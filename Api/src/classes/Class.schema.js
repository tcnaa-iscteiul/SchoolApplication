"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ClassSchema = exports.Class = void 0;
var mongoose_1 = require("@nestjs/mongoose");
var mongoose = require("mongoose");
var Class = /** @class */ (function () {
    function Class() {
    }
    __decorate([
        (0, mongoose_1.Prop)()
    ], Class.prototype, "id");
    __decorate([
        (0, mongoose_1.Prop)({ unique: true, required: true })
    ], Class.prototype, "name");
    __decorate([
        (0, mongoose_1.Prop)({ required: true })
    ], Class.prototype, "description");
    __decorate([
        (0, mongoose_1.Prop)({ required: true, type: Date })
    ], Class.prototype, "startDate");
    __decorate([
        (0, mongoose_1.Prop)({ required: true })
    ], Class.prototype, "endDate");
    __decorate([
        (0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
    ], Class.prototype, "teacher");
    __decorate([
        (0, mongoose_1.Prop)([{ type: mongoose.Schema.Types.ObjectId, ref: "User" }])
    ], Class.prototype, "students");
    Class = __decorate([
        (0, mongoose_1.Schema)()
    ], Class);
    return Class;
}());
exports.Class = Class;
exports.ClassSchema = mongoose_1.SchemaFactory.createForClass(Class);
