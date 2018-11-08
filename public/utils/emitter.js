
/**
 * 向上派遣，可跨级
 * @param  {String} componentName 组件名称
 * @param  {String} eventName     事件名称
 * @param  {Object} params        事件参数
 */
function dispatch(componentName, eventName, params) {
    var parent = this.$parent || this.$root;
    var name = parent.$options._componentTag;

    while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;
        
        if (parent) {
            name = parent.$options._componentTag;
        }
    }
    console.log("parent======",parent);
    if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
    }
}

/**
 * 向下广播，可跨级
 * @param  {String} componentName 组件名称
 * @param  {String} eventName     事件名称
 * @param  {Object} params        事件参数
 */
function broadcast(componentName, eventName, params) {
    this.$children.forEach(child => {
        var name = child.$options._componentTag;

        if (name === componentName) {
            child.$emit.apply(child, [eventName].concat(params));
        } else {
            broadcast.apply(child, [componentName, eventName].concat([params]));
        }
    });
}

/**
 * 向兄弟节点分发
 * @param  {String} componentName 组件名称
 * @param  {String} eventName     事件名称
 * @param  {Object} params        事件参数
 */
function dispense(componentName, eventName, params){
    let brothers = (this.$parent || this.$root) && this.$parent.$children;
    let _this = this;
    brothers.forEach(brother => {
        let name = brother.$options._componentTag;

        if(name === componentName && _this !== brother){
            brother.$emit.apply(brother, [eventName].concat(params));
        }
    });
}
export default {
    methods: {
        // 向上广播，可跨级
        dispatch(componentName, eventName, params) {
            dispatch.call(this, componentName, eventName, params);
        },
        // 向下广播，可跨级
        broadcast(componentName, eventName, params) {
            broadcast.call(this, componentName, eventName, params);
        },
        // 向兄弟节点分发
        dispense(componentName, eventName, params) {
            dispense.call(this, componentName, eventName, params);
        }
    }
};
