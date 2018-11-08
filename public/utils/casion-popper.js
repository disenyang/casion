import Popper from 'popper.js';
import Utils from 'utils';

export default {
	props: {
        placement: {
            type: String,
            default: 'bottom'
        },
        reference: {},
        popper: {},
        offset: {
            default: 0
        },
        visibleArrow: {
            type: Boolean,
            default: true
        },
        appendToBody: {
            type: Boolean,
            default: true
        },
        transition: {
            type: String,
            default: 'fade'
        },
        popperOptions: {
            default () {
                return {
                    modifiers: {
                        offset: {},
                        applyStyle: {
                            boundariesPadding: 10,
                            // gpuAcceleration: false
                        }
                    }
                };
            }
        }
    },
    data() {
        return {
            showPopper: false,
            currentPlacement: ''
        };
    },
    watch: {
        showPopper(val) {
            val ? this.updatePopper() : this.destroyPopper();
            this.$emit('input', val);
        }
    },
	methods: {
        createPopper() {
        	console.log("createPopper======");
            this.currentPlacement = this.currentPlacement || this.placement;
            if (!/^(top|bottom|left|right)(-start|-end)?$/g.test(this.currentPlacement)) {
                return;
            }

            const options = this.popperOptions;
            const popper = this.popperElm = this.popperElm || this.popper || this.$refs.popper;
            let reference = this.referenceElm = this.referenceElm || this.reference || this.$refs.reference;

            if (!popper || !reference) return;
            if (this.visibleArrow) this.appendArrow(popper);
            if (this.appendToBody) document.body.appendChild(this.popperElm);
            if (this.popperJS && this.popperJS.destroy) {
                this.popperJS.destroy();
            }



            options.placement = this.currentPlacement;
            options.modifiers.offset.offset = options.modifiers.offset.offset || this.offset;
            this.popperJS = new Popper(reference, popper, options);
            
            this.popperJS.popper.style.zIndex = Utils.nextZIndex();
            //this.popperElm.addEventListener('click', stop);
        },
        updatePopper() {
            this.popperJS ? this.popperJS.update() : this.createPopper();
        },
        doDestroy() {
            /* istanbul ignore if */
            if (!this.showPopper && this.popperJS) {
                this.popperJS.destroy();
                this.popperJS = null;
            }
            
            if (this.popperElm && this.popperElm.parentNode === document.body) {
                this.popperElm.removeEventListener('click', stop);
                document.body.removeChild(this.popperElm);
            }
        },
        appendArrow(element) {
            let hash;
            if (this.appended) {
                return;
            }

            this.appended = true;

            console.log("visibleArrow======",this.visibleArrow);

            for (let item in element.attributes) {
                if (/^_v-/.test(element.attributes[item].name)) {
                    hash = element.attributes[item].name;
                    break;
                }
            }

            const arrow = document.createElement('div');

            if (hash) {
                arrow.setAttribute(hash, '');
            }
            arrow.setAttribute('x-arrow', '');
            arrow.className = 'popper--arrow';
            element.appendChild(arrow);
        },
        destroyPopper() {
            if (this.popperJS) {
                this.resetTransformOrigin();
            }
        },
        resetTransformOrigin() {
            let placementMap = {
                top: 'bottom',
                bottom: 'top',
                left: 'right',
                right: 'left'
            };
            let placement = this.popperJS.popper.getAttribute('x-placement').split('-')[0];
            let origin = placementMap[placement];
            this.popperJS.popper.style.transformOrigin = ['top', 'bottom'].indexOf(placement) > -1 ? `center ${ origin }` : `${ origin } center`;
        }
    }
}