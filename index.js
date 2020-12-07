module.exports = class {
    constructor(target) {
        return new Proxy(target, {
            get(target, property, receiver) {
                if (target.hasOwnProperty(property) && target[property] instanceof Object) {
                    return new Proxy(target[property], this);
                } else if (target.hasOwnProperty(property)) {
                    return Reflect.get(...arguments);
                } else {
                    target[property] = {};
                }
                return new Proxy(target[property], this);
            }
        })
    }
};
