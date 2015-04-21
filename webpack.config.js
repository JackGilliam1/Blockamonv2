module.exports = {
    entry: './public/scripts/app.js',
    output: {
        path: './public/scripts',
        filename: 'bundle.js'
    },
    
    module: {
        loaders: [
            { test: /\.jsx$/, loader: 'jsx' },
            { test: /\.scss$/, loader: 'style!css!sass' }
        ]
    },
    
    resolve: {
            modulesDirectories: ['node_modules', 'scripts', 'scripts/core', 'styles', 
                                            'public', 'public/settings', 'public/connections',
                                            'schemas', 'settings'],
            extensions: ['', '.js', '.jsx', '.scss']
    }
}