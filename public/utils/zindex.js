
let memory = {
    zIndex: 2000
};


export default {
    methods: {
        // 向上广播，可跨级
        addZIndex() {
            return memory.zIndex++;
        }
    }
};
