// Model
// ------------------
var Model = Backbone.Model.extend({
  defaults: {
		text: 'Zombie'
	}
});

// View
// -----------------
var View = Backbone.View.extend({
  tagName: 'li',
	className: 'zombie',
	template: _.template('<%= text %>'),

	initialize: function () {
    this.model.on( 'change', this.render, this );
		this.options.parent.on( 'close:all', this.close, this );
	},

	events: {
		'click': 'close'
	},
	render: function () {
		this.$el.html( this.template( this.model.toJSON() ));
		return this;
	},
	close: function () {
		console.log('Kill: ', this);

    this.unbind(); // unbind all internal event bindings
    this.remove();
/*    
		this.model.unbind( 'change', this.render, this ); // unbind reference to the model
		this.options.parent.unbind( 'close:all', this.close, this ); // unbind reference to the parent view

		delete this.$el; // delete any jQuery wrapped objects
		delete this.el; // delete the variable reference to this node
*/
	}
});

// App Level View
// ------------------
var AppView = Backbone.View.extend({
	el: '#app',

	events: {
		'click #add': 'addView',
		'click #remove-all': 'closeAll'
	},

	addView: function () {
		var model = new Model();
		var view = new View({
			model: model,
			parent: this
		});

		$('#bin').append(view.render().el);
	},

	closeAll: function () {
		this.trigger('close:all');
	}
});

// DOC Ready
// ------------------

$(function() {
	var appView = new AppView();
});
