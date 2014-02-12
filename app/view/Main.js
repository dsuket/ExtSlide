Ext.define('ExtSlide.view.Main', {
  extend: 'Ext.container.Container',
  requires:[
    'Ext.layout.container.Card'
  ],
    
  xtype: 'app-main',

  layout: 'card',

  getActiveIndex: function() {
    return this.items.indexOf(this.layout.activeItem);
  }

});