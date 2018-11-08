let memory = {
    zIndex: 2000
};

function nextZIndex(){
    return memory.zIndex++;
}
import prefix from './prefix';
import objectRemoveNull from './objectRemoveNull';
import emitter  from './emitter';
import domJson  from './domJson';
import uuid  from './uuid';
import zindex  from './zindex';
import popper from './casion-popper';
import mixins from './mixins';

export {
  	nextZIndex,
  	prefix,
  	objectRemoveNull,
  	emitter,
    domJson,
    uuid,
    zindex,
    popper,
    mixins
};
export default {
	nextZIndex,
  	prefix,
  	objectRemoveNull,
  	emitter,
    domJson,
    uuid,
    zindex,
    popper,
    mixins
};


