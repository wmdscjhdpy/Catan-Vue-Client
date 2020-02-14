const production = process.env.NODE_ENV === 'production'

module.exports = {
    configureWebpack: config => {
    if (!production) {
        config.output.devtoolModuleFilenameTemplate = info => {
            const resPath = info.resourcePath
            if ((/\.vue$/.test(resPath) && !/type=script/.test(info.identifier)) || /node_modules/.test(resPath)) 
            {
                return `webpack:///${resPath}?${info.hash}`
            }
            return `webpack:///${resPath.replace('./src', 'my-code/src')}`
        }
    }
}
}