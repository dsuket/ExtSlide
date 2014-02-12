Ext.define('ExtSlide.PageManager', {

  requires: [
    'Ext.util.History'
  ],

  mixins: {
      observable: 'Ext.util.Observable'
  },

  config: {
      currentPage: 1,
      pageSize: 3,
      pagePrefix: 'resources/page-',
      pageExtention: 'html'
  },

  constructor: function(config) {
    var me = this;

    Ext.apply(me, config || {});
    me.mixins.observable.constructor.apply(me, arguments);
    me.addEvents('loadpage', 'loadpagefail');

    Ext.util.History.init();
    Ext.util.History.on('change', me.onHistoryChange, me);
  },

  /**
   * On history change
   */
  onHistoryChange: function(token, opts) {
    console.log('historyChanged', token);
    this.loadPage(Number(token));
  },


  next: function() {
    var me = this;

    if (me.currentPage < me.pageSize) {
      me.currentPage += 1;
      Ext.util.History.add(me.currentPage);
    }
  },
  prev: function() {
    var me = this;

    if (me.currentPage > 1) {
      me.currentPage -= 1;
      Ext.util.History.add(me.currentPage);
    }
  },

  loadPage: function(pageNo) {
    var me = this;

    pageNo = Ext.isEmpty(pageNo) ? me.currentPage : pageNo;
    me.currentPage = pageNo;

    Ext.Ajax.request({
      url: me.getPageUrl(pageNo),
      success: me.onLoadPage,
      failure: me.onFailurePage,
      scope: me
    })
  },

  onLoadPage: function(response, opts) {
    var me = this;
    me.fireEvent('loadpage', me, response);
  },

  onFailurePage: function(response, opts) {
    var me = this;
    me.fireEvent('loadpagefail', me, response);
  },

  getPageUrl: function(path) {
    var me = this;
    if (Ext.isNumber(path)) {
      path = me.pagePrefix + Ext.util.Format.leftPad(path, 3, '0') + '.' + me.pageExtention;
    }
    return path;
  }

});
