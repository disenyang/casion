
const MIDDLE_PAGES_LENGTH = 5;

function middlePages(first, last, current){

    current = current < first ? first : current;
    current = current > last ? last : current;

    let pages = pushCurrent(current, first, last);

    let pushTimes = getOtherLength(pages);

    if(pushTimes === MIDDLE_PAGES_LENGTH && current === first){
        pushLeft(current, first, last, pages, pushTimes);
    }else if(pushTimes === MIDDLE_PAGES_LENGTH && current === last){
        pushRight(current, first, last, pages, pushTimes);
    }else{
        pushLeft(current, first, last, pages, pushTimes);
    }

    // console.log('first=', first, 'last=', last, 'current=', current, 'pages=', pages);
    return pages;
}

function pushCurrent(current, first, last){
    return current < last && current > first ? [current] : [];
}

function getOtherLength(pages){
    return MIDDLE_PAGES_LENGTH - pages.length;
}

function pushLeft(current, first, last, pages, pushTimes){
    if(pushTimes < 1) return;

    if(canLeft(current, first, pages)){
        pages.unshift(getLeft(current, first, pages));
        pushRight(current, first, last, pages, --pushTimes);
    }else if(canRight(current, last, pages)){
        pushRight(current, first, last, pages, pushTimes);
    }
}

function canLeft(current, first, pages){
    return current - first > 1 && (!pages || pages.length < 1 || pages[0] > first + 1);

}
function getLeft(current, first, pages){
    let temp = pages && pages[0] || current;
    return temp - 1;
}

function pushRight(current, first, last, pages, pushTimes){
    if(pushTimes < 1) return;

    if(canRight(current, last, pages)){
        pages.push(getRight(current, last, pages));
        pushLeft(current, first, last, pages, --pushTimes);
    }else if(canLeft(current,first, pages)){
        pushLeft(current, first, last, pages, pushTimes);
    }
}

function canRight(current, last, pages){
    return last - current > 1 && (!pages || pages.length < 1 || pages[pages.length - 1] < last - 1);
}

function getRight(current, last, pages){
    let temp = pages && pages[pages.length - 1] || current;
    return temp + 1;
}


export {
    middlePages
};

