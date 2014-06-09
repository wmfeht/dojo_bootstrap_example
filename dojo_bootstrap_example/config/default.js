window.dojoConfig = {
    isDebug: true,
    parseOnLoad: false,
    baseUrl: '/public',
    paths: {
        'dojo': '/public/lib/dojo',
        'dijit': '/public/lib/dijit',
        'dojox': '/public/lib/dojox',
        'put-selector': '/public/lib/put-selector',
        'dgrid': '/public/lib/dgrid',
        'xstyle': '/public/lib/xstyle',
        'widgets': '/public/widgets',
        'models': '/public/models',
        'xhr': '/public/xhr'
    },
    packages: [
        {
            location: '/public/lib/dbootstrap',
            name: 'dbootstrap'
        }
    ]
};