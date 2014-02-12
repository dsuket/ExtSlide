Ext.define('ExtSlide.controller.Main', {
  extend: 'Ext.app.Controller',
  requires: [
    'ExtSlide.PageManager'
  ],

  refs: [{
    ref: 'main',
    selector: 'app-main'
  }],

  pageManager: null,

  /**
   * Controller initialize.
   */
  init: function() {
    var me = this,
        pageManager;

    // Ext.FocusManager.enable(true);
    me.pageManager = pageManager = Ext.create('ExtSlide.PageManager', {
      pageSize: 5
    });
    pageManager.on({
      loadpage    : me.onLoadPage,
      loadpagefail: me.onLoadPageFail,
      scope: me
    });

  },

  /**
   * Controller initialize on launch.
   */
  onLaunch: function() {
    var me = this,
        main = me.getMain();

    var nav = new Ext.util.KeyNav({
        target: main.el,
        left : me.moveLeft,
        right : me.moveRight,
        enter : me.showInfo,
        scope : me
    });
    main.focus();

    var page = location.hash.substring(1) || 1;
    me.pageManager.loadPage(Number(page));
  },

  onLoadPage: function(mgr, response) {
    var me = this,
        main = me.getMain();

    console.log('onPageLoad');
    var page = Ext.create('app-page', {
      // hidden: true,
      html: response.responseText
    });
    main.removeAll();
    main.add(page);
    // main.layout.setActiveItem(page);
  },

  onLoadPageFail: function(mgr, response) {
    Ext.Msg.alert('ERROR', 'Fail to load. ' + response.status);
  },

  /**
   * show left page
   */
  moveLeft: function() {
    this.pageManager.prev();
  },

  /**
   * show right page
   */
  moveRight: function() {
    this.pageManager.next();
  },

  showInfo: function() {
    console.log('showInfo');
  }

});
