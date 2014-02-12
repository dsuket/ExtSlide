Ext.Loader.setConfig({
    disableCaching : false
});

Ext.define('ExtSlide.Application', {
    name: 'ExtSlide',

    extend: 'Ext.app.Application',

    views: [
        'Page'
    ],

    controllers: [
        'Main'
    ],

    stores: [
        // TODO: add stores here
    ]
});
