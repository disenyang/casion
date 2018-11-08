const fs = require('fs');
const postcss = require('postcss');
const precss = require('precss');
const autoprefixer = require('autoprefixer');
let css = `.button-wrapper{
    display: inline-block;
    cursor: pointer;
    box-sizing: border-box;
    padding: 0 20px;
    color: #fff;
    border-width: 1px;
    border-style: solid;
    text-align: center;
    border-radius: 2px;
    user-select: none;
    &.stroke{
        
    }
    &.solid{
        color: #fff;
        background-color: #248bf2;
        border-color: #248bf2;
    }
}`;
postcss([precss])
    .process(css, { from: 'src/app.css', to: 'dest/app.css' })
    .then(result => {
        console.log("result.css",result.css);
    });
