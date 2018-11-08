
import Vue from 'vue';
import Utils from 'utils';

let LoadingConstructor = Vue.extend(require('./loading.vue'));
let shown = false;
let vm = null;

const DEFAULT_OPTIONS = {
    text: '',
    customClass: '',
    zIndex: 0,
    maskOpacity: .6,
    target: document.body
};

function remove(){

    if(!vm) return;

    vm.$el && vm.$el.parentNode && vm.$el.parentNode.removeChild(vm.$el);
    
    vm.$destroy();
}

function show(options){

    if(shown){
        return;
    }

    options = Object.assign({}, DEFAULT_OPTIONS, {
        zIndex: 1000
    }, options);

    if(typeof options.target === 'string'){
        options.target = document.querySelectorAll(options.target)[0] || DEFAULT_OPTIONS.target;
    }
    
    vm = new LoadingConstructor({
        data: options
    }).$mount();
    
    options.target.appendChild(vm.$el);

    vm.modalShow = true;

    shown = true;
}

function hide(){

    remove();

    shown = false;

}

export default {
    show,
    hide
};
