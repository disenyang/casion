module.exports = {
  getNodePath(){
    // 去掉返回值后缀的 %0A
    const nodePath = require('child_process').execSync('npm root -g').toString().trim();
    const CURRENT_NODE_PATH = process.env.NODE_PATH;

    // console.log('NODE_PATH:' + nodePath);

    if(!CURRENT_NODE_PATH){
      console.log('CURRENT_NODE_PATH:' + CURRENT_NODE_PATH);
      console.error('\n请设置环境变量NODE_PATH为' + nodePath);
      // console.log('err nodePath');
      return false;
    }

    const arrNodePath = CURRENT_NODE_PATH.split( process.platform.indexOf('win') === 0 ? ';' : ':');

    if(arrNodePath.indexOf(nodePath) === -1){
      console.log('CURRENT_NODE_PATH:' + CURRENT_NODE_PATH);
      console.error('\n请设置环境变量NODE_PATH为' + nodePath);
      // console.log('err nodePath')
      return false;
    }

    return nodePath;
  }
}


