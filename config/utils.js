
exports.getIp = () => {
    let ip = ''
    let interfaces = require('os').networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            let alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                ip = alias.address
            }
        }
    }
    if(ip) {
        return ip
    } else {
        console.error('获取ip失败')
        return false
    }
}