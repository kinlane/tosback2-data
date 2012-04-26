/* From object.js (reset to local variable so that the prototype methods added to Object don't collide with other libraries) ------------------------------ */

var object = {
  getType: function(o) {
    switch(o) {
      case null: return 'Null';
      case (void 0): return 'Undefined';
    }
    var type = typeof o;
    switch(type) {
      case 'boolean': return 'Boolean';
      case 'number':  return 'Number';
      case 'string':  return 'String';
    }
    return 'Object';
  },

  keys: function(object) {
    if (this.getType(object) !== 'Object') { alert('type error'); }
    var results = [];
    for (var property in object) {
      if (object.hasOwnProperty(property)) {
        results.push(property);
      }
    }
    return results;
  },

  isFunction: function(object) {
    return Object.prototype.toString.call(object) === '[object Function]';
  },

  isUndefined: function(object) {
    return typeof object === "undefined";
  },

  extend: function(destination, source) {
    for (var property in source)
      destination[property] = source[property];
    return destination;
  }
};

/* From array.js ------------------------------ */
function $A(iterable) {
  if (!iterable) return [];
  // Safari <2.0.4 crashes when accessing property of a node list with property accessor.
  // It nevertheless works fine with `in` operator, which is why we use it here
  if ('toArray' in Object(iterable)) return iterable.toArray();
  var length = iterable.length || 0, results = new Array(length);
  while (length--) results[length] = iterable[length];
  return results;
};

/* From function.js ------------------------------ */
Function.prototype.argumentNames = function() {
  var names = this.toString().match(/^[\s\(]*function[^(]*\(([^)]*)\)/)[1]
    .replace(/\/\/.*?[\r\n]|\/\*(?:.|[\r\n])*?\*\//g, '')
    .replace(/\s+/g, '').split(',');
  return names.length == 1 && !names[0] ? [] : names;
};

// patched with inline helpers from function.js
Function.prototype.bind = function(context) {
  if (arguments.length < 2 && object.isUndefined(arguments[0])) return this;
  var __method = this,
    args = Array.prototype.slice.call(arguments, 1);
  function update(array, args) {
    var arrayLength = array.length, length = args.length;
    while (length--) array[arrayLength + length] = args[length];
    return array;
  }
  function merge(array, args) {
    array = Array.prototype.slice.call(array, 0);
    return update(array, args);
  }
  return function() {
    var a = merge(args, arguments);
    return __method.apply(context, a);
  }
};

// patched with inline helper from function.js
Function.prototype.wrap = function(wrapper) {
  function update(array, args) {
    var arrayLength = array.length, length = args.length;
    while (length--) array[arrayLength + length] = args[length];
    return array;
  }
  var __method = this;
  return function() {
    var a = update([__method.bind(this)], arguments);
    return wrapper.apply(this, a);
  }
};

/* From class.js ------------------------------ */
/* Based on Alex Arnell's inheritance implementation. */
/* Refer to Prototype's web site for a [tutorial on classes and inheritance (http://prototypejs.org/learn/class-inheritance). */
var Class = (function() {

  // Some versions of JScript fail to enumerate over properties, names of which
  // correspond to non-enumerable properties in the prototype chain
  var IS_DONTENUM_BUGGY = (function(){
    for (var p in { toString: 1 }) {
      // check actual property name, so that it works with augmented Object.prototype
      if (p === 'toString') return false;
    }
    return true;
  })();

  function extend( destination, source ) {
    for (var property in source)
      destination[property] = source[property];
    return destination;
  }

  function subclass() {}
  function create() {
    var parent = null, properties = $A(arguments);
    if (object.isFunction(properties[0]))
      parent = properties.shift();

    function klass() {
      this.initialize.apply(this, arguments);
    }

    extend(klass, Class.Methods);
    klass.superclass = parent;
    klass.subclasses = [];

    if (parent) {
      subclass.prototype = parent.prototype;
      klass.prototype = new subclass;
      parent.subclasses.push(klass);
    }

    for (var i = 0, length = properties.length; i < length; i++)
      klass.addMethods(properties[i]);

    if (!klass.prototype.initialize)
      klass.prototype.initialize = function() {};

    klass.prototype.constructor = klass;
    return klass;
  }

  function addMethods(source) {
    var ancestor   = this.superclass && this.superclass.prototype,
        properties = object.keys(source);

    // IE6 doesn't enumerate `toString` and `valueOf` (among other built-in `Object.prototype`) properties,
    // Force copy if they're not Object.prototype ones.
    // Do not copy other Object.prototype.* for performance reasons
    if (IS_DONTENUM_BUGGY) {
      if (source.toString != Object.prototype.toString)
        properties.push("toString");
      if (source.valueOf != Object.prototype.valueOf)
        properties.push("valueOf");
    }

    for (var i = 0, length = properties.length; i < length; i++) {
      var property = properties[i],
          value = source[property];
      if (ancestor && object.isFunction(value) &&
          value.argumentNames()[0] == "$super") {
        var method = value;
        value = (function(m) {
          return function() { return ancestor[m].apply(this, arguments); };
        })(property).wrap(method);

        value.valueOf = method.valueOf.bind(method);
        value.toString = method.toString.bind(method);
      }
      this.prototype[property] = value;
    }

    return this;
  }

  return {
    create: create,
    extend: extend,
    Methods: {
      addMethods: addMethods
    }
  };
})();
/**
 * Unobtrusive scripting adapter for jQuery
 *
 * Requires jQuery 1.4.3 or later.
 * https://github.com/rails/jquery-ujs
 */


(function($) {
	// Make sure that every Ajax request sends the CSRF token
	function CSRFProtection(xhr) {
		var token = $('meta[name="csrf-token"]').attr('content');
		if (token) xhr.setRequestHeader('X-CSRF-Token', token);
	}
	if ('ajaxPrefilter' in $) $.ajaxPrefilter(function(options, originalOptions, xhr){ CSRFProtection(xhr) });
	else $(document).ajaxSend(function(e, xhr){ CSRFProtection(xhr) });

	// Triggers an event on an element and returns the event result
	function fire(obj, name, data) {
		var event = $.Event(name);
		obj.trigger(event, data);
		return event.result !== false;
	}

	// Submits "remote" forms and links with ajax
	function handleRemote(element) {
		var method, url, data,
			dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

	if (fire(element, 'ajax:before')) {
		if (element.is('form')) {
			method = element.attr('method');
			url = element.attr('action');
			data = element.serializeArray();
			// memoized value from clicked submit button
			var button = element.data('ujs:submit-button');
			if (button) {
				data.push(button);
				element.data('ujs:submit-button', null);
			}
		} else {
			method = element.data('method');
			url = element.attr('href');
			data = null;
		}
			$.ajax({
				url: url, type: method || 'GET', data: data, dataType: dataType,
				// stopping the "ajax:beforeSend" event will cancel the ajax request
				beforeSend: function(xhr, settings) {
					if (settings.dataType === undefined) {
						xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
					}
					return fire(element, 'ajax:beforeSend', [xhr, settings]);
				},
				success: function(data, status, xhr) {
					element.trigger('ajax:success', [data, status, xhr]);
				},
				complete: function(xhr, status) {
					element.trigger('ajax:complete', [xhr, status]);
				},
				error: function(xhr, status, error) {
					element.trigger('ajax:error', [xhr, status, error]);
				}
			});
		}
	}

	// Handles "data-method" on links such as:
	// <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
	function handleMethod(link) {
		var href = link.attr('href'),
			method = link.data('method'),
			csrf_token = $('meta[name=csrf-token]').attr('content'),
			csrf_param = $('meta[name=csrf-param]').attr('content'),
			form = $('<form method="post" action="' + href + '"></form>'),
			metadata_input = '<input name="_method" value="' + method + '" type="hidden" />';

		if (csrf_param !== undefined && csrf_token !== undefined) {
			metadata_input += '<input name="' + csrf_param + '" value="' + csrf_token + '" type="hidden" />';
		}

		form.hide().append(metadata_input).appendTo('body');
		form.submit();
	}

	function disableFormElements(form) {
		form.find('input[data-disable-with]').each(function() {
			var input = $(this);
			input.data('ujs:enable-with', input.val())
				.val(input.data('disable-with'))
				.attr('disabled', 'disabled');
		});
	}

	function enableFormElements(form) {
		form.find('input[data-disable-with]').each(function() {
			var input = $(this);
			input.val(input.data('ujs:enable-with')).removeAttr('disabled');
		});
	}

	function allowAction(element) {
		var message = element.data('confirm');
		return !message || (fire(element, 'confirm') && confirm(message));
	}

	function requiredValuesMissing(form) {
		var missing = false;
		form.find('input[name][required]').each(function() {
			if (!$(this).val()) missing = true;
		});
		return missing;
	}

	$('a[data-confirm], a[data-method], a[data-remote]').live('click.rails', function(e) {
		var link = $(this);
		if (!allowAction(link)) return false;

		if (link.data('remote') != undefined) {
			handleRemote(link);
			return false;
		} else if (link.data('method')) {
			handleMethod(link);
			return false;
		}
	});

	$('form').live('submit.rails', function(e) {
		var form = $(this), remote = form.data('remote') != undefined;
		if (!allowAction(form)) return false;

		// skip other logic when required values are missing
		if (requiredValuesMissing(form)) return !remote;

		if (remote) {
			handleRemote(form);
			return false;
		} else {
			// slight timeout so that the submit button gets properly serialized
			setTimeout(function(){ disableFormElements(form) }, 13);
		}
	});

	$('form input[type=submit], form button[type=submit], form button:not([type])').live('click.rails', function() {
		var button = $(this);
		if (!allowAction(button)) return false;
		// register the pressed submit button
		var name = button.attr('name'), data = name ? {name:name, value:button.val()} : null;
		button.closest('form').data('ujs:submit-button', data);
	});

	$('form').live('ajax:beforeSend.rails', function(event) {
		if (this == event.target) disableFormElements($(this));
	});

	$('form').live('ajax:complete.rails', function(event) {
		if (this == event.target) enableFormElements($(this));
	});
})( jQuery );
/*
 * jQuery UI Tabs 1.8.11
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Tabs
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 */

(function( $, undefined ) {

var tabId = 0,
	listId = 0;

function getNextTabId() {
	return ++tabId;
}

function getNextListId() {
	return ++listId;
}

$.widget( "ui.tabs", {
	options: {
		add: null,
		ajaxOptions: null,
		cache: false,
		cookie: null, // e.g. { expires: 7, path: '/', domain: 'jquery.com', secure: true }
		collapsible: false,
		disable: null,
		disabled: [],
		enable: null,
		event: "click",
		fx: null, // e.g. { height: 'toggle', opacity: 'toggle', duration: 200 }
		idPrefix: "ui-tabs-",
		load: null,
		panelTemplate: "<div></div>",
		remove: null,
		select: null,
		show: null,
		spinner: "<em>Loading&#8230;</em>",
		tabTemplate: "<li><a href='#{href}'><span>#{label}</span></a></li>"
	},

	_create: function() {
		this._tabify( true );
	},

	_setOption: function( key, value ) {
		if ( key == "selected" ) {
			if (this.options.collapsible && value == this.options.selected ) {
				return;
			}
			this.select( value );
		} else {
			this.options[ key ] = value;
			this._tabify();
		}
	},

	_tabId: function( a ) {
		return a.title && a.title.replace( /\s/g, "_" ).replace( /[^\w\u00c0-\uFFFF-]/g, "" ) ||
			this.options.idPrefix + getNextTabId();
	},

	_sanitizeSelector: function( hash ) {
		// we need this because an id may contain a ":"
		return hash.replace( /:/g, "\\:" );
	},

	_cookie: function() {
		var cookie = this.cookie ||
			( this.cookie = this.options.cookie.name || "ui-tabs-" + getNextListId() );
		return $.cookie.apply( null, [ cookie ].concat( $.makeArray( arguments ) ) );
	},

	_ui: function( tab, panel ) {
		return {
			tab: tab,
			panel: panel,
			index: this.anchors.index( tab )
		};
	},

	_cleanup: function() {
		// restore all former loading tabs labels
		this.lis.filter( ".ui-state-processing" )
			.removeClass( "ui-state-processing" )
			.find( "span:data(label.tabs)" )
				.each(function() {
					var el = $( this );
					el.html( el.data( "label.tabs" ) ).removeData( "label.tabs" );
				});
	},

	_tabify: function( init ) {
		var self = this,
			o = this.options,
			fragmentId = /^#.+/; // Safari 2 reports '#' for an empty hash

		this.list = this.element.find( "ol,ul" ).eq( 0 );
		this.lis = $( " > li:has(a[href])", this.list );
		this.anchors = this.lis.map(function() {
			return $( "a", this )[ 0 ];
		});
		this.panels = $( [] );

		this.anchors.each(function( i, a ) {
			var href = $( a ).attr( "href" );
			// For dynamically created HTML that contains a hash as href IE < 8 expands
			// such href to the full page url with hash and then misinterprets tab as ajax.
			// Same consideration applies for an added tab with a fragment identifier
			// since a[href=#fragment-identifier] does unexpectedly not match.
			// Thus normalize href attribute...
			var hrefBase = href.split( "#" )[ 0 ],
				baseEl;
			if ( hrefBase && ( hrefBase === location.toString().split( "#" )[ 0 ] ||
					( baseEl = $( "base" )[ 0 ]) && hrefBase === baseEl.href ) ) {
				href = a.hash;
				a.href = href;
			}

			// inline tab
			if ( fragmentId.test( href ) ) {
				self.panels = self.panels.add( self.element.find( self._sanitizeSelector( href ) ) );
			// remote tab
			// prevent loading the page itself if href is just "#"
			} else if ( href && href !== "#" ) {
				// required for restore on destroy
				$.data( a, "href.tabs", href );

				// TODO until #3808 is fixed strip fragment identifier from url
				// (IE fails to load from such url)
				$.data( a, "load.tabs", href.replace( /#.*$/, "" ) );

				var id = self._tabId( a );
				a.href = "#" + id;
				var $panel = self.element.find( "#" + id );
				if ( !$panel.length ) {
					$panel = $( o.panelTemplate )
						.attr( "id", id )
						.addClass( "ui-tabs-panel ui-widget-content ui-corner-bottom" )
						.insertAfter( self.panels[ i - 1 ] || self.list );
					$panel.data( "destroy.tabs", true );
				}
				self.panels = self.panels.add( $panel );
			// invalid tab href
			} else {
				o.disabled.push( i );
			}
		});

		// initialization from scratch
		if ( init ) {
			// attach necessary classes for styling
			this.element.addClass( "ui-tabs ui-widget ui-widget-content ui-corner-all" );
			this.list.addClass( "ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all" );
			this.lis.addClass( "ui-state-default ui-corner-top" );
			this.panels.addClass( "ui-tabs-panel ui-widget-content ui-corner-bottom" );

			// Selected tab
			// use "selected" option or try to retrieve:
			// 1. from fragment identifier in url
			// 2. from cookie
			// 3. from selected class attribute on <li>
			if ( o.selected === undefined ) {
				if ( location.hash ) {
					this.anchors.each(function( i, a ) {
						if ( a.hash == location.hash ) {
							o.selected = i;
							return false;
						}
					});
				}
				if ( typeof o.selected !== "number" && o.cookie ) {
					o.selected = parseInt( self._cookie(), 10 );
				}
				if ( typeof o.selected !== "number" && this.lis.filter( ".ui-tabs-selected" ).length ) {
					o.selected = this.lis.index( this.lis.filter( ".ui-tabs-selected" ) );
				}
				o.selected = o.selected || ( this.lis.length ? 0 : -1 );
			} else if ( o.selected === null ) { // usage of null is deprecated, TODO remove in next release
				o.selected = -1;
			}

			// sanity check - default to first tab...
			o.selected = ( ( o.selected >= 0 && this.anchors[ o.selected ] ) || o.selected < 0 )
				? o.selected
				: 0;

			// Take disabling tabs via class attribute from HTML
			// into account and update option properly.
			// A selected tab cannot become disabled.
			o.disabled = $.unique( o.disabled.concat(
				$.map( this.lis.filter( ".ui-state-disabled" ), function( n, i ) {
					return self.lis.index( n );
				})
			) ).sort();

			if ( $.inArray( o.selected, o.disabled ) != -1 ) {
				o.disabled.splice( $.inArray( o.selected, o.disabled ), 1 );
			}

			// highlight selected tab
			this.panels.addClass( "ui-tabs-hide" );
			this.lis.removeClass( "ui-tabs-selected ui-state-active" );
			// check for length avoids error when initializing empty list
			if ( o.selected >= 0 && this.anchors.length ) {
				self.element.find( self._sanitizeSelector( self.anchors[ o.selected ].hash ) ).removeClass( "ui-tabs-hide" );
				this.lis.eq( o.selected ).addClass( "ui-tabs-selected ui-state-active" );

				// seems to be expected behavior that the show callback is fired
				self.element.queue( "tabs", function() {
					self._trigger( "show", null,
						self._ui( self.anchors[ o.selected ], self.element.find( self._sanitizeSelector( self.anchors[ o.selected ].hash ) )[ 0 ] ) );
				});

				this.load( o.selected );
			}

			// clean up to avoid memory leaks in certain versions of IE 6
			// TODO: namespace this event
			$( window ).bind( "unload", function() {
				self.lis.add( self.anchors ).unbind( ".tabs" );
				self.lis = self.anchors = self.panels = null;
			});
		// update selected after add/remove
		} else {
			o.selected = this.lis.index( this.lis.filter( ".ui-tabs-selected" ) );
		}

		// update collapsible
		// TODO: use .toggleClass()
		this.element[ o.collapsible ? "addClass" : "removeClass" ]( "ui-tabs-collapsible" );

		// set or update cookie after init and add/remove respectively
		if ( o.cookie ) {
			this._cookie( o.selected, o.cookie );
		}

		// disable tabs
		for ( var i = 0, li; ( li = this.lis[ i ] ); i++ ) {
			$( li )[ $.inArray( i, o.disabled ) != -1 &&
				// TODO: use .toggleClass()
				!$( li ).hasClass( "ui-tabs-selected" ) ? "addClass" : "removeClass" ]( "ui-state-disabled" );
		}

		// reset cache if switching from cached to not cached
		if ( o.cache === false ) {
			this.anchors.removeData( "cache.tabs" );
		}

		// remove all handlers before, tabify may run on existing tabs after add or option change
		this.lis.add( this.anchors ).unbind( ".tabs" );

		if ( o.event !== "mouseover" ) {
			var addState = function( state, el ) {
				if ( el.is( ":not(.ui-state-disabled)" ) ) {
					el.addClass( "ui-state-" + state );
				}
			};
			var removeState = function( state, el ) {
				el.removeClass( "ui-state-" + state );
			};
			this.lis.bind( "mouseover.tabs" , function() {
				addState( "hover", $( this ) );
			});
			this.lis.bind( "mouseout.tabs", function() {
				removeState( "hover", $( this ) );
			});
			this.anchors.bind( "focus.tabs", function() {
				addState( "focus", $( this ).closest( "li" ) );
			});
			this.anchors.bind( "blur.tabs", function() {
				removeState( "focus", $( this ).closest( "li" ) );
			});
		}

		// set up animations
		var hideFx, showFx;
		if ( o.fx ) {
			if ( $.isArray( o.fx ) ) {
				hideFx = o.fx[ 0 ];
				showFx = o.fx[ 1 ];
			} else {
				hideFx = showFx = o.fx;
			}
		}

		// Reset certain styles left over from animation
		// and prevent IE's ClearType bug...
		function resetStyle( $el, fx ) {
			$el.css( "display", "" );
			if ( !$.support.opacity && fx.opacity ) {
				$el[ 0 ].style.removeAttribute( "filter" );
			}
		}

		// Show a tab...
		var showTab = showFx
			? function( clicked, $show ) {
				$( clicked ).closest( "li" ).addClass( "ui-tabs-selected ui-state-active" );
				$show.hide().removeClass( "ui-tabs-hide" ) // avoid flicker that way
					.animate( showFx, showFx.duration || "normal", function() {
						resetStyle( $show, showFx );
						self._trigger( "show", null, self._ui( clicked, $show[ 0 ] ) );
					});
			}
			: function( clicked, $show ) {
				$( clicked ).closest( "li" ).addClass( "ui-tabs-selected ui-state-active" );
				$show.removeClass( "ui-tabs-hide" );
				self._trigger( "show", null, self._ui( clicked, $show[ 0 ] ) );
			};

		// Hide a tab, $show is optional...
		var hideTab = hideFx
			? function( clicked, $hide ) {
				$hide.animate( hideFx, hideFx.duration || "normal", function() {
					self.lis.removeClass( "ui-tabs-selected ui-state-active" );
					$hide.addClass( "ui-tabs-hide" );
					resetStyle( $hide, hideFx );
					self.element.dequeue( "tabs" );
				});
			}
			: function( clicked, $hide, $show ) {
				self.lis.removeClass( "ui-tabs-selected ui-state-active" );
				$hide.addClass( "ui-tabs-hide" );
				self.element.dequeue( "tabs" );
			};

		// attach tab event handler, unbind to avoid duplicates from former tabifying...
		this.anchors.bind( o.event + ".tabs", function() {
			var el = this,
				$li = $(el).closest( "li" ),
				$hide = self.panels.filter( ":not(.ui-tabs-hide)" ),
				$show = self.element.find( self._sanitizeSelector( el.hash ) );

			// If tab is already selected and not collapsible or tab disabled or
			// or is already loading or click callback returns false stop here.
			// Check if click handler returns false last so that it is not executed
			// for a disabled or loading tab!
			if ( ( $li.hasClass( "ui-tabs-selected" ) && !o.collapsible) ||
				$li.hasClass( "ui-state-disabled" ) ||
				$li.hasClass( "ui-state-processing" ) ||
				self.panels.filter( ":animated" ).length ||
				self._trigger( "select", null, self._ui( this, $show[ 0 ] ) ) === false ) {
				this.blur();
				return false;
			}

			o.selected = self.anchors.index( this );

			self.abort();

			// if tab may be closed
			if ( o.collapsible ) {
				if ( $li.hasClass( "ui-tabs-selected" ) ) {
					o.selected = -1;

					if ( o.cookie ) {
						self._cookie( o.selected, o.cookie );
					}

					self.element.queue( "tabs", function() {
						hideTab( el, $hide );
					}).dequeue( "tabs" );

					this.blur();
					return false;
				} else if ( !$hide.length ) {
					if ( o.cookie ) {
						self._cookie( o.selected, o.cookie );
					}

					self.element.queue( "tabs", function() {
						showTab( el, $show );
					});

					// TODO make passing in node possible, see also http://dev.jqueryui.com/ticket/3171
					self.load( self.anchors.index( this ) );

					this.blur();
					return false;
				}
			}

			if ( o.cookie ) {
				self._cookie( o.selected, o.cookie );
			}

			// show new tab
			if ( $show.length ) {
				if ( $hide.length ) {
					self.element.queue( "tabs", function() {
						hideTab( el, $hide );
					});
				}
				self.element.queue( "tabs", function() {
					showTab( el, $show );
				});

				self.load( self.anchors.index( this ) );
			} else {
				throw "jQuery UI Tabs: Mismatching fragment identifier.";
			}

			// Prevent IE from keeping other link focussed when using the back button
			// and remove dotted border from clicked link. This is controlled via CSS
			// in modern browsers; blur() removes focus from address bar in Firefox
			// which can become a usability and annoying problem with tabs('rotate').
			if ( $.browser.msie ) {
				this.blur();
			}
		});

		// disable click in any case
		this.anchors.bind( "click.tabs", function(){
			return false;
		});
	},

    _getIndex: function( index ) {
		// meta-function to give users option to provide a href string instead of a numerical index.
		// also sanitizes numerical indexes to valid values.
		if ( typeof index == "string" ) {
			index = this.anchors.index( this.anchors.filter( "[href$=" + index + "]" ) );
		}

		return index;
	},

	destroy: function() {
		var o = this.options;

		this.abort();

		this.element
			.unbind( ".tabs" )
			.removeClass( "ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible" )
			.removeData( "tabs" );

		this.list.removeClass( "ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all" );

		this.anchors.each(function() {
			var href = $.data( this, "href.tabs" );
			if ( href ) {
				this.href = href;
			}
			var $this = $( this ).unbind( ".tabs" );
			$.each( [ "href", "load", "cache" ], function( i, prefix ) {
				$this.removeData( prefix + ".tabs" );
			});
		});

		this.lis.unbind( ".tabs" ).add( this.panels ).each(function() {
			if ( $.data( this, "destroy.tabs" ) ) {
				$( this ).remove();
			} else {
				$( this ).removeClass([
					"ui-state-default",
					"ui-corner-top",
					"ui-tabs-selected",
					"ui-state-active",
					"ui-state-hover",
					"ui-state-focus",
					"ui-state-disabled",
					"ui-tabs-panel",
					"ui-widget-content",
					"ui-corner-bottom",
					"ui-tabs-hide"
				].join( " " ) );
			}
		});

		if ( o.cookie ) {
			this._cookie( null, o.cookie );
		}

		return this;
	},

	add: function( url, label, index ) {
		if ( index === undefined ) {
			index = this.anchors.length;
		}

		var self = this,
			o = this.options,
			$li = $( o.tabTemplate.replace( /#\{href\}/g, url ).replace( /#\{label\}/g, label ) ),
			id = !url.indexOf( "#" ) ? url.replace( "#", "" ) : this._tabId( $( "a", $li )[ 0 ] );

		$li.addClass( "ui-state-default ui-corner-top" ).data( "destroy.tabs", true );

		// try to find an existing element before creating a new one
		var $panel = self.element.find( "#" + id );
		if ( !$panel.length ) {
			$panel = $( o.panelTemplate )
				.attr( "id", id )
				.data( "destroy.tabs", true );
		}
		$panel.addClass( "ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide" );

		if ( index >= this.lis.length ) {
			$li.appendTo( this.list );
			$panel.appendTo( this.list[ 0 ].parentNode );
		} else {
			$li.insertBefore( this.lis[ index ] );
			$panel.insertBefore( this.panels[ index ] );
		}

		o.disabled = $.map( o.disabled, function( n, i ) {
			return n >= index ? ++n : n;
		});

		this._tabify();

		if ( this.anchors.length == 1 ) {
			o.selected = 0;
			$li.addClass( "ui-tabs-selected ui-state-active" );
			$panel.removeClass( "ui-tabs-hide" );
			this.element.queue( "tabs", function() {
				self._trigger( "show", null, self._ui( self.anchors[ 0 ], self.panels[ 0 ] ) );
			});

			this.load( 0 );
		}

		this._trigger( "add", null, this._ui( this.anchors[ index ], this.panels[ index ] ) );
		return this;
	},

	remove: function( index ) {
		index = this._getIndex( index );
		var o = this.options,
			$li = this.lis.eq( index ).remove(),
			$panel = this.panels.eq( index ).remove();

		// If selected tab was removed focus tab to the right or
		// in case the last tab was removed the tab to the left.
		if ( $li.hasClass( "ui-tabs-selected" ) && this.anchors.length > 1) {
			this.select( index + ( index + 1 < this.anchors.length ? 1 : -1 ) );
		}

		o.disabled = $.map(
			$.grep( o.disabled, function(n, i) {
				return n != index;
			}),
			function( n, i ) {
				return n >= index ? --n : n;
			});

		this._tabify();

		this._trigger( "remove", null, this._ui( $li.find( "a" )[ 0 ], $panel[ 0 ] ) );
		return this;
	},

	enable: function( index ) {
		index = this._getIndex( index );
		var o = this.options;
		if ( $.inArray( index, o.disabled ) == -1 ) {
			return;
		}

		this.lis.eq( index ).removeClass( "ui-state-disabled" );
		o.disabled = $.grep( o.disabled, function( n, i ) {
			return n != index;
		});

		this._trigger( "enable", null, this._ui( this.anchors[ index ], this.panels[ index ] ) );
		return this;
	},

	disable: function( index ) {
		index = this._getIndex( index );
		var self = this, o = this.options;
		// cannot disable already selected tab
		if ( index != o.selected ) {
			this.lis.eq( index ).addClass( "ui-state-disabled" );

			o.disabled.push( index );
			o.disabled.sort();

			this._trigger( "disable", null, this._ui( this.anchors[ index ], this.panels[ index ] ) );
		}

		return this;
	},

	select: function( index ) {
		index = this._getIndex( index );
		if ( index == -1 ) {
			if ( this.options.collapsible && this.options.selected != -1 ) {
				index = this.options.selected;
			} else {
				return this;
			}
		}
		this.anchors.eq( index ).trigger( this.options.event + ".tabs" );
		return this;
	},

	load: function( index ) {
		index = this._getIndex( index );
		var self = this,
			o = this.options,
			a = this.anchors.eq( index )[ 0 ],
			url = $.data( a, "load.tabs" );

		this.abort();

		// not remote or from cache
		if ( !url || this.element.queue( "tabs" ).length !== 0 && $.data( a, "cache.tabs" ) ) {
			this.element.dequeue( "tabs" );
			return;
		}

		// load remote from here on
		this.lis.eq( index ).addClass( "ui-state-processing" );

		if ( o.spinner ) {
			var span = $( "span", a );
			span.data( "label.tabs", span.html() ).html( o.spinner );
		}

		this.xhr = $.ajax( $.extend( {}, o.ajaxOptions, {
			url: url,
			success: function( r, s ) {
				self.element.find( self._sanitizeSelector( a.hash ) ).html( r );

				// take care of tab labels
				self._cleanup();

				if ( o.cache ) {
					$.data( a, "cache.tabs", true );
				}

				self._trigger( "load", null, self._ui( self.anchors[ index ], self.panels[ index ] ) );
				try {
					o.ajaxOptions.success( r, s );
				}
				catch ( e ) {}
			},
			error: function( xhr, s, e ) {
				// take care of tab labels
				self._cleanup();

				self._trigger( "load", null, self._ui( self.anchors[ index ], self.panels[ index ] ) );
				try {
					// Passing index avoid a race condition when this method is
					// called after the user has selected another tab.
					// Pass the anchor that initiated this request allows
					// loadError to manipulate the tab content panel via $(a.hash)
					o.ajaxOptions.error( xhr, s, index, a );
				}
				catch ( e ) {}
			}
		} ) );

		// last, so that load event is fired before show...
		self.element.dequeue( "tabs" );

		return this;
	},

	abort: function() {
		// stop possibly running animations
		this.element.queue( [] );
		this.panels.stop( false, true );

		// "tabs" queue must not contain more than two elements,
		// which are the callbacks for the latest clicked tab...
		this.element.queue( "tabs", this.element.queue( "tabs" ).splice( -2, 2 ) );

		// terminate pending requests from other tabs
		if ( this.xhr ) {
			this.xhr.abort();
			delete this.xhr;
		}

		// take care of tab labels
		this._cleanup();
		return this;
	},

	url: function( index, url ) {
		this.anchors.eq( index ).removeData( "cache.tabs" ).data( "load.tabs", url );
		return this;
	},

	length: function() {
		return this.anchors.length;
	}
});

$.extend( $.ui.tabs, {
	version: "1.8.11"
});

/*
 * Tabs Extensions
 */

/*
 * Rotate
 */
$.extend( $.ui.tabs.prototype, {
	rotation: null,
	rotate: function( ms, continuing ) {
		var self = this,
			o = this.options;

		var rotate = self._rotate || ( self._rotate = function( e ) {
			clearTimeout( self.rotation );
			self.rotation = setTimeout(function() {
				var t = o.selected;
				self.select( ++t < self.anchors.length ? t : 0 );
			}, ms );
			
			if ( e ) {
				e.stopPropagation();
			}
		});

		var stop = self._unrotate || ( self._unrotate = !continuing
			? function(e) {
				if (e.clientX) { // in case of a true click
					self.rotate(null);
				}
			}
			: function( e ) {
				t = o.selected;
				rotate();
			});

		// start rotation
		if ( ms ) {
			this.element.bind( "tabsshow", rotate );
			this.anchors.bind( o.event + ".tabs", stop );
			rotate();
		// stop rotation
		} else {
			clearTimeout( self.rotation );
			this.element.unbind( "tabsshow", rotate );
			this.anchors.unbind( o.event + ".tabs", stop );
			delete this._rotate;
			delete this._unrotate;
		}

		return this;
	}
});

})( jQuery );
window.log = function() {
  log.history = log.history || [];   // store logs to an array for reference
  log.history.push(arguments);
  if (this.console) {
    console.log(Array.prototype.slice.call(arguments));
  }
};
// require jquery_ujs - use this when we switch to 3.1
//
(function() {
  $.TNF || ($.TNF = {
    BRAND: {}
  });
}).call(this);
(function(i){var n=function(){var f=function(){};f.prototype={otag:"{{",ctag:"}}",pragmas:{},buffer:[],pragmas_implemented:{"IMPLICIT-ITERATOR":true},context:{},render:function(a,b,c,d){if(!d){this.context=b;this.buffer=[]}if(!this.includes("",a))if(d)return a;else{this.send(a);return}a=this.render_pragmas(a);a=this.render_section(a,b,c);if(d)return this.render_tags(a,b,c,d);this.render_tags(a,b,c,d)},send:function(a){a!=""&&this.buffer.push(a)},render_pragmas:function(a){if(!this.includes("%",a))return a;
var b=this;return a.replace(RegExp(this.otag+"%([\\w-]+) ?([\\w]+=[\\w]+)?"+this.ctag),function(c,d,e){if(!b.pragmas_implemented[d])throw{message:"This implementation of mustache doesn't understand the '"+d+"' pragma"};b.pragmas[d]={};if(e){c=e.split("=");b.pragmas[d][c[0]]=c[1]}return""})},render_partial:function(a,b,c){a=this.trim(a);if(!c||c[a]===undefined)throw{message:"unknown_partial '"+a+"'"};if(typeof b[a]!="object")return this.render(c[a],b,c,true);return this.render(c[a],b[a],c,true)},render_section:function(a,
b,c){if(!this.includes("#",a)&&!this.includes("^",a))return a;var d=this;return a.replace(RegExp(this.otag+"(\\^|\\#)\\s*(.+)\\s*"+this.ctag+"\n*([\\s\\S]+?)"+this.otag+"\\/\\s*\\2\\s*"+this.ctag+"\\s*","mg"),function(e,j,k,h){e=d.find(k,b);if(j=="^")return!e||d.is_array(e)&&e.length===0?d.render(h,b,c,true):"";else if(j=="#")return d.is_array(e)?d.map(e,function(g){return d.render(h,d.create_context(g),c,true)}).join(""):d.is_object(e)?d.render(h,d.create_context(e),c,true):typeof e==="function"?
e.call(b,h,function(g){return d.render(g,b,c,true)}):e?d.render(h,b,c,true):""})},render_tags:function(a,b,c,d){var e=this,j=function(){return RegExp(e.otag+"(=|!|>|\\{|%)?([^\\/#\\^]+?)\\1?"+e.ctag+"+","g")},k=j(),h=function(o,m,l){switch(m){case "!":return"";case "=":e.set_delimiters(l);k=j();return"";case ">":return e.render_partial(l,b,c);case "{":return e.find(l,b);default:return e.escape(e.find(l,b))}};a=a.split("\n");for(var g=0;g<a.length;g++){a[g]=a[g].replace(k,h,this);d||this.send(a[g])}if(d)return a.join("\n")},
set_delimiters:function(a){a=a.split(" ");this.otag=this.escape_regex(a[0]);this.ctag=this.escape_regex(a[1])},escape_regex:function(a){if(!arguments.callee.sRE)arguments.callee.sRE=RegExp("(\\/|\\.|\\*|\\+|\\?|\\||\\(|\\)|\\[|\\]|\\{|\\}|\\\\)","g");return a.replace(arguments.callee.sRE,"\\$1")},find:function(a,b){a=this.trim(a);var c;if(b[a]===false||b[a]===0||b[a])c=b[a];else if(this.context[a]===false||this.context[a]===0||this.context[a])c=this.context[a];if(typeof c==="function")return c.apply(b);
if(c!==undefined)return c;return""},includes:function(a,b){return b.indexOf(this.otag+a)!=-1},escape:function(a){a=String(a===null?"":a);return a.replace(/&(?!\w+;)|["<>\\]/g,function(b){switch(b){case "&":return"&amp;";case "\\":return"\\\\";case '"':return'"';case "<":return"&lt;";case ">":return"&gt;";default:return b}})},create_context:function(a){if(this.is_object(a))return a;else{var b=".";if(this.pragmas["IMPLICIT-ITERATOR"])b=this.pragmas["IMPLICIT-ITERATOR"].iterator;var c={};c[b]=a;return c}},
is_object:function(a){return a&&typeof a=="object"},is_array:function(a){return Object.prototype.toString.call(a)==="[object Array]"},trim:function(a){return a.replace(/^\s*|\s*$/g,"")},map:function(a,b){if(typeof a.map=="function")return a.map(b);else{for(var c=[],d=a.length,e=0;e<d;e++)c.push(b(a[e]));return c}}};return{name:"mustache.js",version:"0.3.0",to_html:function(a,b,c,d){var e=new f;if(d)e.send=d;e.render(a,b,c);if(!d)return e.buffer.join("\n")}}}();window.ich=new function(){var f=this;
f.VERSION="0.9";f.templates={};f.partials={};f.addTemplate=function(a,b){if(f[a])throw"Invalid name: "+a+".";if(f.templates[a])throw'Template " + name + " exists';f.templates[a]=b;f[a]=function(c,d){c=c||{};var e=n.to_html(f.templates[a],c,f.partials);return d?e:i(e)}};f.addPartial=function(a,b){if(f.partials[a])throw'Partial " + name + " exists';else f.partials[a]=b};f.grabTemplates=function(){i('script[type="text/html"]').each(function(a,b){var c=i(typeof a==="number"?b:a),d="".trim?c.html().trim():
i.trim(c.html());f[c.hasClass("partial")?"addPartial":"addTemplate"](c.attr("id"),d);c.remove()})};f.clearAll=function(){for(var a in f.templates)delete f[a];f.templates={};f.partials={}};f.refresh=function(){f.clearAll();f.grabTemplates()}};i(function(){ich.grabTemplates()})})(window.jQuery||window.Zepto);

(function($){

  var Paginator = Class.create({

    el: null,
    $el: null,
    pageCount: -1,
    itemsCount: 0,
    currentPage: 1,
    offset: 0,

    initialize: function(el, options) {
      this.el = el;
      this.$el = $(this.el);

      this.options = $.extend(true, {}, Paginator.defaultOptions, options);
      this.itemsCount = this.options.collection.length;
      this.pageCount = this.getPageCount();
      this.generateJQuerySelectors();
      if (!this.options.testMode) {
        this.buildControlsContainer();
        this.loadPage(0);
        this.bindPageLinks();
      }
      this.$el.data('tnf:brand:paginator', this);
      // log('collection json', this.options.collection);
    },

    generateJQuerySelectors: function() {
      for (var key in this.options.selectors) {
        this['$' + key] = this.$el.find(this.options.selectors[key]);
      }
    },

    getPageFromIndex: function(index) {
      return Math.ceil((index + 1) / this.options.perPage);
    },

    getPageCount: function() {
      var collectionGridVolume = this.itemsCount;
      if (this.options.firstPageOffset) {
        collectionGridVolume -= this.options.firstPageOffset;
      }
      return Math.ceil(collectionGridVolume / this.options.perPage);
    },

    setPage: function(page) {
      page = parseInt(page);
      if (page < 1) {
        this.currentPage = 1;
      } else if (page > this.pageCount) {
        this.currentPage = this.pageCount;
      } else {
        this.currentPage = page;
      }
      this.offset = (this.currentPage - 1) * this.options.perPage;
    },

    loadUrl: function(url) {
      var page = url.split("/").pop();
      this.loadPage(page);
    },

    loadPage: function(page) {
      this.setPage(page);
      this.activatePageLink();
      this.updatePageControls();
      this.buildItems();
      this.updatePageRange();
      $.interface.resetAfterDomWrite();
      this.$el.trigger('TNF:paginator:loaded-page', [page])
    },

    updatePageControls: function() {
      if (this.pageCount == 1) {
        this.$el.find(this.options.selectors.controls).addClass(this.options.classNames.inactive);
      } else {
        this.$el.find(this.options.selectors.prevLink).removeClass(this.options.classNames.inactive);
        this.$el.find(this.options.selectors.nextLink).removeClass(this.options.classNames.inactive);
        if (this.currentPage == 1) {
          this.$el.find(this.options.selectors.prevLink).addClass(this.options.classNames.inactive);
        } else if (this.currentPage == this.pageCount) {
          this.$el.find(this.options.selectors.nextLink).addClass(this.options.classNames.inactive);
        }
      }
    },

    activatePageLink: function() {
      this.$el.find(this.options.selectors.pageLinks).removeClass(this.options.classNames.active);
      this.$el.find(this.options.selectors.pageLinks + '[href$="page/' + this.currentPage + '"]').addClass(this.options.classNames.active);
      if (this.currentPage == 1) {
        this.$el.find(this.options.selectors.nextLink).removeClass(this.options.classNames.inactive);
      } else if (this.itemsCount <= this.sliceEnd()) {
        this.$el.find(this.options.selectors.prevLink).removeClass(this.options.classNames.inactive);
      }
    },

    updatePageRange: function() {
      var total = this.itemsCount;
      var pageRange = function() {
        var lastItem = (this.sliceEnd() < total) ? this.sliceEnd() : total;
        var range = (this.sliceStart() + 1) + '-' + lastItem;
        return range + ' of ' + total
      }.bind(this);

      var string = "";
      if (this.pageCount == 1) {
        string += total;
      } else {
        string += pageRange();
      }
      string += ' ' + this.options.collectionTitle
      if (this.itemsCount != 1) {
        string += 's';
      }

      this.$el.find(this.options.selectors.pageAmountContainer).html(string);
    },

    sliceStart: function() {
      var sliceStart = this.offset;
      if (this.offset != 0) {
        if (this.options.firstPageOffset) {
          sliceStart += this.options.firstPageOffset;
        }
      }
      return sliceStart;
    },

    sliceEnd: function() {
      var sliceEnd = this.options.perPage + this.offset;
      if (this.options.firstPageOffset) {
        sliceEnd += this.options.firstPageOffset;
      }
      return sliceEnd;
    },

    buildItems: function() {
      var html = "";

      var offsetCollection = this.options.collection.slice(this.sliceStart(), this.sliceEnd());
      $.each(offsetCollection, function(i, item) {
        var item = offsetCollection[i];

        var indexAttribute = this.options.collectionTitle.toLowerCase() + 'Index';
        item[indexAttribute] = i + (this.options.perPage * (this.currentPage - 1));

        var template = this.options.templateName;
        if(this.options.allowsAlternateTemplates && (typeof(item.template) !== 'undefined')) {
          template = item.template + '_' + template;
        }
        html += ich[template](item).html();
      }.bind(this));
      this.$itemsContainer.html(html);
    },

    buildControlsContainer: function() {
      html = ich.pagination_template();
      this.$controlsContainer.html(html);
      this.updatePageRange();
      this.buildControls();
    },

    buildControls: function() {
      html = "";
      for (var i=1; i <= this.pageCount; i++) {
        html += ich.page_link_template({page_number: i}).html();
      }
      this.$el.find(this.options.selectors.pageLinksList).html(html);
    },

    bindPageLinks: function() {
      this.$el.find(this.options.selectors.pageLinks).click(function(e) {
        e.preventDefault();
        var url = $(e.currentTarget).attr("href");
        this.loadUrl(url);
      }.bind(this));

      this.$el.find(this.options.selectors.prevLink).click(function(e) {
        e.preventDefault();
        this.loadPage(this.currentPage - 1);
      }.bind(this));

      this.$el.find(this.options.selectors.nextLink).click(function(e) {
        e.preventDefault();
        this.loadPage(this.currentPage + 1);
      }.bind(this));
    }
  });

  Paginator.defaultOptions = {
    templateName: 'athlete_template',
    collection: [],
    collectionTitle: 'Athlete',
    perPage: 12,
    allowsAlternateTemplates: true,
    firstPageOffset: false,
    selectors: {
      pageLinksList: '.pages ul',
      pageLinks: '.pages ul li a',
      prevLink: '.pagination .prev a',
      nextLink: '.pagination .next a',
      itemsContainer: '.athletes-grid',
      controlsContainer: '.paginator-controls',
      controls: '.controls',
      pageAmountContainer: '.amount'
    },
    classNames: {
      active: 'active',
      inactive: 'inactive'
    }
  };

  // exposed for traditional usage patterns and specs
  $.TNF.BRAND.Paginator = Paginator;

  // make it a jQuery plugin
  $.fn.tnfBrandPaginator = function(options){
    return this.each(function(){
      (new Paginator(this, options));
    });
  };

})(jQuery);
(function ($) {
  $.fn.clearInputs = function () {
    var $inputs = $(this);
    $inputs.addClass('invalid_field');

    $inputs.focus(function () {
      if (this.defaultValue === this.value) {
        $(this).removeClass('invalid_field');
        this.value = "";
      }
      $(this).blur(function () {
        if (this.value === "") {
          $(this).addClass('invalid_field');
          this.value = this.defaultValue;
        } else if (this.value !== this.defaultValue && this.value !== "") {
          $(this).removeClass('invalid_field');
        }
      });
    });
    return $inputs;
  };
}(jQuery));
(function($) {
  $.uri = function(uri) {
    var parts = uri.match(/^((http[s]?|ftp):\/\/)?(((.+)@)?([^:\/\?#\s]+)(:(\d+))?)?(\/?[^\?#]+)?(\?([^#]+))?(#(.*))?$/i);
    parts = {scheme: parts[2], credentials: parts[5], host: parts[6], port: parts[8], path: parts[9], query: parts[11], hash: parts[13]};
    var out = {};
    out.uri = uri;
    out.scheme = (parts.scheme === undefined) ? window.location.protocol.toString().match(/^([a-z]+)/i)[1] : parts.scheme;
    out.host = (parts.host === undefined) ? (document.domain) ? document.domain : 'localhost' : parts.host;
    out.port = (parts.port === undefined) ? 80 : parts.port;
    out.credentials = (parts.credentials === undefined) ? false : parts.credentials.split(':');
    out.path = (parts.path === undefined) ? (window.location.pathname) ? window.location.pathname : '' : (parts.path == '') ? '/' : parts.path;
    out.query = (parts.query === undefined) ? (window.location.search) ? window.location.search.replace('?', '') : '' : parts.query;
    out.hash = (parts.hash === undefined) ? (window.location.hash) ? window.location.hash.replace('#') : '' : parts.hash;
    out.args = {};
    out.query.replace(/([^&=]*)=([^&=]*)/g, function (m, attr, value) {
      if (out.args[attr] === undefined) {
        out.args[attr] = value;
      } else {
        if (typeof(out.args[attr]) != 'object') out.args[attr] = [out.args[attr]];
        out.args[attr].push(value);
      }
    });
    return out;
  };
})(jQuery);
(function() {
  var locale, localizations;
  localizations = {
    "en-US": {
      "activity": {
        "tabs": {
          "ui": {
            "events": "Events",
            "news": "News"
          }
        },
        "ui": {
          "back_to_news": "Back To News",
          "next": "Next",
          "prev": "Previous"
        }
      },
      "articles": {
        "and": "and",
        "categories": "Categories",
        "no_categories_chosen": "No categories chosen",
        "published": "Published",
        "summary": "Summary",
        "title": "Title"
      },
      "athlete": {
        "articles": {
          "next": "Next",
          "prev": "Previous",
          "ui": {
            "back_to_dispatches": "Back To Dispatches"
          }
        },
        "expeditions": {
          "learn_more": "Learn More"
        },
        "view_profile": "View Profile",
        "view_athlete_profile": "View Athlete Profile",
        "back_to_speaker_series": "&laquo; Back to Speaker Series Home"
      },
      "athletes": {
        "tabs": {
          "ui": {
            "biography": "Biography",
            "blog_dispatches": "Blog Dispatches",
            "career_highlights": "Career Highlights",
            "quick_facts": "Quick Facts"
          }
        },
        "ui": {
          "expeditions": "%{possessive_name} expeditions",
          "gear": "%{possessive_name} Top 3 Gear Picks",
          "hide_additional_athletes": "Hide Additional Athletes",
          "show_additional_athletes": "Show Additional Athletes"
        }
      },
      "breadcrumbs": {
        "home": "Home"
      },
      "email_updates": {
        "ui": {
          "submit": "Submit"
        }
      },
      "events": {
        "date": "Date",
        "errors": {
          "load_error": "Buzzkill. There was an error finding events."
        },
        "location": "Location",
        "ui": {
          "back": "Go Back",
          "back_to_events": "Back To Events",
          "read_more": "Read More"
        },
        "load_more": "Load More Events",
        "calendar": "Events Calendar"
      },
      "expeditions": {
        "proven_gear": "Expedition-Proven Gear",
        "tabs": {
          "ui": {
            "blog_dispatches": "Blog Dispatches",
            "summary": "Summary"
          }
        },
        "recent": "Recent"
      },
      "fallback_page_title": "Page",
      "faq": {
        "ui": {
          "back_to_top": "Back to Top",
          "choose": "Please choose one&#8230;"
        }
      },
      "gallery": {
        "ui": {
          "full_size": "View image full-size"
        }
      },
      "hero_gallery": {
        "watch_video": "Watch the video"
      },
      "media_gallery": {
        "ui": {
          "full_size": "View image full-size",
          "next": "next",
          "prev": "previous"
        }
      },
      "news_box": {
        "ui": {
          "events_calendar": "Events Calendar",
          "view_blog": "View the blog"
        }
      },
      "pagination": {
        "disabled": "pagination disabled",
        "ui": {
          "athletes": {
            "collection_title": "Athletes"
          },
          "expeditions": {
            "collection_title": "Expeditions"
          },
          "next_page": "Next Page",
          "prev_page": "Prev Page",
          "video_gallery": {
            "collection_title": "Video"
          }
        },
        "view_all": "View All %{collection_type}"
      },
      "preview": {
        "email_updates": {
          "ui": {
            "email_address": "Email Address"
          }
        },
        "navigation": {
          "equipment": "Equipment",
          "exploration": "Exploration",
          "get_outdoors": "Get Outdoors",
          "innovation": "Innovation",
          "kids": "Kids",
          "mens": "Men's",
          "shop_by": "Shop By",
          "ui": {
            "search": "SEARCH"
          },
          "womens": "Women's"
        },
        "region_dropdown": {
          "canada_english": "Canada",
          "united_states_english": "United States"
        },
        "ui": {
          "store_locator": {
            "postal_code": "Zip Code",
            "submit": "Submit",
            "stores_near_you": "Stores Near You",
            "find_a_store": "Find a Store",
            "loading": "Loading...",
            "title": "Store Locator"
          }
        }
      },
      "products_scroller": {
        "in_action": "See it in action",
        "proven_gear": "Expedition-Proven Gear"
      },
      "sitemap": {
        "shop_gear_and_clothing": "Shop Gear and Clothing"
      },
      "social": {
        "email": "Email",
        "share": "Share",
        "facebook": "Facebook",
        "twitter": "Twitter",
        "youtube": "Youtube",
        "our_blog": "Our Blog"
      },
      "store_locator": {
        "ui": {
          "submit": "Submit"
        }
      },
      "ui": {
        "news_box": {
          "events_calendar": "Events Calendar",
          "more": "More News",
          "view_the_blog": "View the blog"
        },
        "social": {
          "our_blog": "Our Blog"
        }
      },
      "time": {
        "formats": {
          "article_published_date": "%B %-e %Y",
          "feed_source_last_updated": "%m-%d-%Y at %I:%M",
          "omnifind_xml": "%m-%d-%Y",
          "sitemap": "%Y-%m-%d",
          "article_published_at": "%m-%d %Y",
          "expedition_detail": "%B %Y",
          "expedition_formatted": "%b %d, %Y",
          "speaker_series_serialized": "%b %-e %Y"
        }
      },
      "date": {
        "formats": {
          "expedition_formatted": "%b %d, %Y",
          "speaker_series_serialized": "%b %-e %Y",
          "expedition_detail": "%B %Y"
        }
      },
      "bold_chat": {
        "live_chat_software": "Live Chat Software"
      },
      "corporate_info": {
        "title": "40 years of innovation and exploration"
      },
      "feed_source": {
        "updated_time": "Feeds last updated"
      },
      "get_outdoors": {
        "all_activities": "All Activities",
        "hike": "Hike",
        "bike": "Bike",
        "climb": "Climb",
        "run": "Run",
        "camp": "Camp",
        "board": "Board",
        "ski": "Ski",
        "play": "Play",
        "volunteer": "Volunteer",
        "learn": "Learn",
        "within_10_miles": "Within 10 Miles",
        "within_25_miles": "Within 25 Miles",
        "within_50_miles": "Within 50 Miles",
        "within_75_miles": "Within 75 Miles",
        "within_100_miles": "Within 100 Miles",
        "within_200_miles": "Within 200 Miles",
        "within_250_miles": "Within 250 Miles",
        "within_500_miles": "Within 500 Miles",
        "within_750_miles": "Within 750 Miles",
        "within_1500_miles": "Within 1500 Miles",
        "within_2000_miles": "Within 2000 Miles",
        "planet_explore": "powered by Planet Explore",
        "find_event": "Find Event"
      },
      "logo": {
        "gore_tex": "Gore-Tex",
        "bandit": "Bandit",
        "outside": "Outside",
        "primaloft": "PrimaLoft",
        "brought_to_you_by": "Brought to you by"
      },
      "user": {
        "messages": {
          "errors": {
            "500": "We've been notified about this issue and we'll take a look at it shortly.",
            "sorry": "We're sorry, but something went wrong."
          }
        }
      },
      "webiq": {
        "having_trouble": "Having Trouble?",
        "privacy_statement": "Privacy Statement"
      },
      "speaker_series": {
        "athletes": {
          "region": "Region",
          "title": "Title",
          "location": "Location",
          "athlete_name": "Athlete Name",
          "date": "Date",
          "tickets": "Tickets"
        }
      },
      "kids_grid": {
        "title": {
          "shop_boys": "Shop Boys'",
          "shop_girls": "Shop Girls'",
          "shop_infants": "Shop Infants'",
          "shop_toddlers": "Shop Toddlers'",
          "jackets_and_vests": "Jackets &amp; Vests",
          "pants_and_shorts": "Pants &amp; Shorts",
          "shirts": "Shirts",
          "accessories": "Accessories",
          "footwear": "Footwear"
        },
        "url": {
          "boys": {
            "jackets_and_vests": "http://www.thenorthface.com/catalog/sc-gear/boys-jackets-vests.html",
            "shirts": "http://www.thenorthface.com/catalog/sc-gear/boys-shirts.html",
            "pants_and_shorts": "http://www.thenorthface.com/catalog/sc-gear/boys-pants-shorts.html",
            "footwear": "http://www.thenorthface.com/catalog/sc-gear/boys-footwear.html",
            "accessories": "http://www.thenorthface.com/catalog/sc-gear/boys-accessories.html"
          },
          "girls": {
            "jackets_and_vests": "http://www.thenorthface.com/catalog/sc-gear/girls-jackets-vests.html",
            "shirts": "http://www.thenorthface.com/catalog/sc-gear/girls-shirts.html",
            "pants_and_shorts": "http://www.thenorthface.com/catalog/sc-gear/girls-pants-shorts.html",
            "footwear": "http://www.thenorthface.com/catalog/sc-gear/girls-footwear.html",
            "accessories": "http://www.thenorthface.com/catalog/sc-gear/girls-accessories.html"
          },
          "infants": {
            "jackets_and_vests": "http://www.thenorthface.com/catalog/sc-gear/infants-3m-24m-jackets-amp-vests",
            "shirts": "http://www.thenorthface.com/catalog/sc-gear/infants-3m-24m-shirts",
            "pants_and_shorts": "http://www.thenorthface.com/catalog/sc-gear/infants-3m-24m-pants-amp-shorts",
            "footwear": "http://www.thenorthface.com/catalog/sc-gear/infants-3m-24m-footwear-0-9-mo",
            "accessories": "http://www.thenorthface.com/catalog/sc-gear/infants-3m-24m-accessories"
          },
          "toddlers": {
            "jackets_and_vests": "http://www.thenorthface.com/catalog/sc-gear/toddlers-2t-4t-jackets-amp-vests",
            "shirts": "http://www.thenorthface.com/catalog/sc-gear/toddlers-2t-4t-shirts",
            "pants_and_shorts": "http://www.thenorthface.com/catalog/sc-gear/toddlers-2t-4t-pants-amp-shorts",
            "accessories": "http://www.thenorthface.com/catalog/sc-gear/toddlers-2t-4t-accessories"
          }
        }
      },
      "storeLocator": {
        "page": "indexNEW.html"
      },
      "gift_guide": {
        "title": {
          "shop_mens": "SHOP MEN'S GIFTS",
          "shop_womens": "SHOP WOMEN'S GIFTS",
          "shop_kids": "SHOP KIDS' GIFTS",
          "shop_equipment": "SHOP EQUIPMENT GIFTS",
          "shop_all": "SHOP ALL GIFTS",
          "remove_filters": "REMOVE FILTERS",
          "select_category": "SELECT CATEGORY:",
          "select_subcategory": "SELECT SUB-CATEGORY:",
          "select_activity": "SELECT ACTIVITY:",
          "shop_now": "SHOP NOW",
          "choose_one": "Choose one"
        },
        "div_class": {
          "background_image": "english"
        },
        "url": {
          "shop_mens": "http://www.thenorthface.com/catalog/sc-gear/mens-collections-holiday",
          "shop_womens": "http://www.thenorthface.com/catalog/sc-gear/womens-collections-holiday",
          "shop_kids": "http://www.thenorthface.com/catalog/sc-gear/kids-collections-holiday",
          "shop_equipment": "http://www.thenorthface.com/catalog/sc-gear/equipment-collections-holiday"
        }
      }
    },
    "fr-CA": {
      "time": {
        "formats": {
          "article_published_at": "%m-%d %Y",
          "article_published_date": "%B %-e %Y",
          "feed_source_last_updated": "%m-%d-%Y at %I:%M",
          "omnifind_xml": "%m-%d-%Y",
          "sitemap": "%Y-%m-%d",
          "expedition_detail": "%B %Y"
        }
      },
      "activity": {
        "tabs": {
          "ui": {
            "events": "\u00e9v\u00e9nements",
            "news": "Les Nouvelles "
          }
        },
        "ui": {
          "back_to_news": "Back To News",
          "next": "Next",
          "prev": "Previous"
        }
      },
      "preview": {
        "ui": {
          "store_locator": {
            "postal_code": "CODE POSTAL",
            "submit": "Submit",
            "stores_near_you": "LES MAGASINS PR\u00c8S DE CHEZ VOUS",
            "find_a_store": "Rechercher un magasin",
            "loading": "Loading...",
            "title": "Store Locator"
          }
        },
        "navigation": {
          "ui": {
            "search": "Rechercher"
          },
          "kids": "Enfants",
          "mens": "Hommes",
          "womens": "Femmes",
          "equipment": "\u00c9quipement",
          "shop_by": "Acheter par",
          "exploration": "Exploration",
          "innovation": "Innovation",
          "get_outdoors": "S'implique"
        },
        "email_updates": {
          "ui": {
            "email_address": "Email Address"
          }
        },
        "region_dropdown": {
          "canada_english": "Canada",
          "united_states_english": "United States"
        }
      },
      "events": {
        "ui": {
          "back": "Retour",
          "back_to_events": "Back To Events",
          "read_more": "Read More"
        },
        "date": "Date",
        "errors": {
          "load_error": "Buzzkill. There was an error finding events."
        },
        "location": "Location",
        "load_more": "Load More Events",
        "calendar": "Events Calendar"
      },
      "social": {
        "email": "Courriel",
        "share": "Share",
        "facebook": "Facebook",
        "twitter": "Twitter",
        "youtube": "Youtube",
        "our_blog": "Our Blog"
      },
      "pagination": {
        "ui": {
          "video_gallery": {
            "collection_title": "Vid\u00e9o"
          },
          "next_page": "Page suivant",
          "prev_page": "Page pr\u00e9c\u00e9dent",
          "athletes": {
            "collection_title": "Athl\u00e8tes"
          },
          "expeditions": {
            "collection_title": "Expeditions"
          }
        },
        "disabled": "pagination disabled",
        "view_all": "View All %{collection_type}"
      },
      "store_locator": {
        "ui": {
          "submit": "Soumettre"
        }
      },
      "articles": {
        "title": "Titre",
        "categories": "Cat\u00e9gories",
        "published": "Publi\u00e9",
        "summary": "Sommaire",
        "and": "et",
        "no_categories_chosen": "No categories chosen"
      },
      "athlete": {
        "articles": {
          "next": "Next",
          "prev": "Previous",
          "ui": {
            "back_to_dispatches": "Back To Dispatches"
          }
        },
        "expeditions": {
          "learn_more": "Learn More"
        },
        "view_profile": "View Profile",
        "view_athlete_profile": "View Athlete Profile",
        "back_to_speaker_series": "&laquo; Back to Speaker Series Home"
      },
      "athletes": {
        "tabs": {
          "ui": {
            "biography": "Biographie",
            "blog_dispatches": "Blog Dispatches",
            "career_highlights": "Career Highlights",
            "quick_facts": "Quick Facts"
          }
        },
        "ui": {
          "expeditions": "%{possessive_name} expeditions",
          "gear": "%{possessive_name} Top 3 Gear Picks",
          "hide_additional_athletes": "Hide Additional Athletes",
          "show_additional_athletes": "Show Additional Athletes"
        }
      },
      "breadcrumbs": {
        "home": "Accueil"
      },
      "email_updates": {
        "ui": {
          "submit": "Submit"
        }
      },
      "expeditions": {
        "proven_gear": "Expedition-Proven Gear",
        "tabs": {
          "ui": {
            "blog_dispatches": "Blog Dispatches",
            "summary": "Summary"
          }
        },
        "recent": "Recent"
      },
      "fallback_page_title": "Page",
      "faq": {
        "ui": {
          "back_to_top": "Back to Top",
          "choose": "Please choose one..."
        }
      },
      "gallery": {
        "ui": {
          "full_size": "View image full-size"
        }
      },
      "hero_gallery": {
        "watch_video": "Visionnez le Vid\u00e9o"
      },
      "media_gallery": {
        "ui": {
          "full_size": "View image full-size",
          "next": "next",
          "prev": "previous"
        }
      },
      "news_box": {
        "ui": {
          "events_calendar": "Events Calendar",
          "view_blog": "View the blog"
        }
      },
      "products_scroller": {
        "in_action": "See it in action",
        "proven_gear": "Expedition-Proven Gear"
      },
      "sitemap": {
        "shop_gear_and_clothing": "Shop Gear and Clothing"
      },
      "ui": {
        "news_box": {
          "events_calendar": "Events Calendar",
          "more": "More News",
          "view_the_blog": "View the blog"
        },
        "social": {
          "our_blog": "Our Blog"
        }
      },
      "date": {
        "formats": {
          "expedition_formatted": "%b %d, %Y",
          "speaker_series_serialized": "%b %-e %Y"
        }
      },
      "bold_chat": {
        "live_chat_software": "Live Chat Software"
      },
      "corporate_info": {
        "title": "40 years of innovation and exploration"
      },
      "feed_source": {
        "updated_time": "Feeds last updated"
      },
      "get_outdoors": {
        "all_activities": "All Activities",
        "hike": "Hike",
        "bike": "Bike",
        "climb": "Climb",
        "run": "Run",
        "camp": "Camp",
        "board": "Board",
        "ski": "Ski",
        "play": "Play",
        "volunteer": "Volunteer",
        "learn": "Learn",
        "within_10_miles": "Within 16 km",
        "within_25_miles": "Within 40 km",
        "within_50_miles": "Within 80 km",
        "within_75_miles": "Within 121 km",
        "within_100_miles": "Within 161 km",
        "within_200_miles": "Within 322 km",
        "within_250_miles": "Within 402 km",
        "within_500_miles": "Within 805 km",
        "within_750_miles": "Within 1207 km",
        "within_1500_miles": "Within 2414 km",
        "within_2000_miles": "Within 3219 km",
        "planet_explore": "powered by Planet Explore",
        "find_event": "Find Event"
      },
      "logo": {
        "gore_tex": "Gore-Tex",
        "bandit": "Bandit",
        "outside": "Outside",
        "primaloft": "PrimaLoft",
        "brought_to_you_by": "Brought to you by"
      },
      "user": {
        "messages": {
          "errors": {
            "500": "We've been notified about this issue and we'll take a look at it shortly.",
            "sorry": "We're sorry, but something went wrong."
          }
        }
      },
      "webiq": {
        "having_trouble": "Having Trouble?",
        "privacy_statement": "Privacy Statement"
      },
      "speaker_series": {
        "athletes": {
          "region": "Region",
          "title": "Title",
          "location": "Location",
          "athlete_name": "Athlete Name",
          "date": "Date",
          "tickets": "Tickets"
        }
      },
      "kids_grid": {
        "title": {
          "footwear": "Chaussures",
          "accessories": "Accessoires",
          "shirts": "Chemises",
          "pants_and_shorts": "Pantalons et Shorts",
          "jackets_and_vests": "Manteaux et Vestes",
          "shop_toddlers": "Tout-petits",
          "shop_infants": "Nourrissons",
          "shop_girls": "Filles",
          "shop_boys": "Gar\u00e7ons"
        },
        "url": {
          "boys": {
            "jackets_and_vests": "http://www.thenorthface.com/catalog/ca_ecom/fr/sc-gear/boys-jackets-vests",
            "shirts": "http://www.thenorthface.com/catalog/ca_ecom/fr/sc-gear/boys-shirts",
            "pants_and_shorts": "http://www.thenorthface.com/catalog/ca_ecom/fr/sc-gear/boys-pants-shorts",
            "footwear": "http://www.thenorthface.com/catalog/ca_ecom/fr/sc-gear/boys-footwear",
            "accessories": "http://www.thenorthface.com/catalog/ca_ecom/fr/sc-gear/boys-accessories"
          },
          "girls": {
            "jackets_and_vests": "http://www.thenorthface.com/catalog/ca_ecom/fr/sc-gear/girls-jackets-vests",
            "shirts": "http://www.thenorthface.com/catalog/ca_ecom/fr/sc-gear/girls-shirts",
            "pants_and_shorts": "http://www.thenorthface.com/catalog/ca_ecom/fr/sc-gear/girls-pants-shorts",
            "footwear": "http://www.thenorthface.com/catalog/ca_ecom/fr/sc-gear/girls-footwear",
            "accessories": "http://www.thenorthface.com/catalog/ca_ecom/fr/sc-gear/girls-accessories"
          },
          "infants": {
            "jackets_and_vests": "http://www.thenorthface.com/catalog/ca_ecom/fr/sc-gear/infants-3m-24m-jackets-amp-vests",
            "shirts": "http://www.thenorthface.com/catalog/ca_ecom/fr/sc-gear/infants-3m-24m-shirts",
            "pants_and_shorts": "http://www.thenorthface.com/catalog/ca_ecom/fr/sc-gear/infants-3m-24m-pants-amp-shorts",
            "footwear": "http://www.thenorthface.com/catalog/ca_ecom/fr/sc-gear/infants-3m-24m-footwear-0-9-mo",
            "accessories": "http://www.thenorthface.com/catalog/ca_ecom/fr/sc-gear/infants-3m-24m-accessories"
          },
          "toddlers": {
            "jackets_and_vests": "http://www.thenorthface.com/catalog/ca_ecom/fr/sc-gear/toddlers-2t-4t-jackets-amp-vests",
            "shirts": "http://www.thenorthface.com/catalog/ca_ecom/fr/sc-gear/toddlers-2t-4t-shirts",
            "pants_and_shorts": "http://www.thenorthface.com/catalog/ca_ecom/fr/sc-gear/toddlers-2t-4t-pants-amp-shorts",
            "accessories": "http://www.thenorthface.com/catalog/ca_ecom/fr/sc-gear/toddlers-2t-4t-accessories"
          }
        }
      },
      "storeLocator": {
        "page": "indexNEW_CAfr.html"
      },
      "gift_guide": {
        "div_class": {
          "background_image": "french"
        },
        "title": {
          "shop_mens": "ACHETER LES CADEAUX POUR HOMMES",
          "shop_womens": "ACHETER LES CADEAUX POUR FEMMES",
          "shop_kids": "ACHETER LES CADEAUX POUR ENFANTS",
          "shop_equipment": "ACHETER NOS SUGGESTIONS D'ID\u00c9ES-CADEAUX POUR L'\u00c9QUIPEMENT",
          "shop_all": "ACHETER TOUS LES CADEAUX",
          "remove_filters": "SUPPRIMER LES FILTRES",
          "select_category": "CAT\u00c9GORIE:",
          "select_subcategory": "SOUS-CAT\u00c9GORIE:",
          "select_activity": "ACTIVIT\u00c9:",
          "shop_now": "ACHETER",
          "choose_one": "Choisir un"
        },
        "url": {
          "shop_mens": "http://www.thenorthface.com/catalog/ca_ecom/fr/sc-gear/mens-collections-holiday",
          "shop_womens": "http://www.thenorthface.com/catalog/ca_ecom/fr/sc-gear/womens-collections-holiday",
          "shop_kids": "http://www.thenorthface.com/catalog/ca_ecom/fr/sc-gear/kids-collections-holiday",
          "shop_equipment": "http://www.thenorthface.com/catalog/ca_ecom/fr/sc-gear/equipment-collections-holiday"
        }
      }
    },
    "en-CA": {
      "activity": {
        "tabs": {
          "ui": {
            "events": "Events",
            "news": "News"
          }
        },
        "ui": {
          "back_to_news": "Back To News",
          "next": "Next",
          "prev": "Previous"
        }
      },
      "articles": {
        "and": "and",
        "categories": "Categories",
        "no_categories_chosen": "No categories chosen",
        "published": "Published",
        "summary": "Summary",
        "title": "Title"
      },
      "athlete": {
        "articles": {
          "next": "Next",
          "prev": "Previous",
          "ui": {
            "back_to_dispatches": "Back To Dispatches"
          }
        },
        "expeditions": {
          "learn_more": "Learn More"
        },
        "view_profile": "View Profile",
        "view_athlete_profile": "View Athlete Profile",
        "back_to_speaker_series": "&laquo; Back to Speaker Series Home"
      },
      "athletes": {
        "tabs": {
          "ui": {
            "biography": "Biography",
            "blog_dispatches": "Blog Dispatches",
            "career_highlights": "Career Highlights",
            "quick_facts": "Quick Facts"
          }
        },
        "ui": {
          "expeditions": "%{possessive_name} expeditions",
          "gear": "%{possessive_name} Top 3 Gear Picks",
          "hide_additional_athletes": "Hide Additional Athletes",
          "show_additional_athletes": "Show Additional Athletes"
        }
      },
      "breadcrumbs": {
        "home": "Home"
      },
      "email_updates": {
        "ui": {
          "submit": "Submit"
        }
      },
      "events": {
        "date": "Date",
        "errors": {
          "load_error": "Buzzkill. There was an error finding events."
        },
        "location": "Location",
        "ui": {
          "back": "Go Back",
          "back_to_events": "Back To Events",
          "read_more": "Read More"
        },
        "load_more": "Load More Events",
        "calendar": "Events Calendar"
      },
      "expeditions": {
        "proven_gear": "Expedition-Proven Gear",
        "tabs": {
          "ui": {
            "blog_dispatches": "Blog Dispatches",
            "summary": "Summary"
          }
        },
        "recent": "Recent"
      },
      "fallback_page_title": "Page",
      "faq": {
        "ui": {
          "back_to_top": "Back to Top",
          "choose": "Please choose one..."
        }
      },
      "gallery": {
        "ui": {
          "full_size": "View image full-size"
        }
      },
      "hero_gallery": {
        "watch_video": "Watch the video"
      },
      "media_gallery": {
        "ui": {
          "full_size": "View image full-size",
          "next": "next",
          "prev": "previous"
        }
      },
      "news_box": {
        "ui": {
          "events_calendar": "Events Calendar",
          "view_blog": "View the blog"
        }
      },
      "pagination": {
        "disabled": "pagination disabled",
        "ui": {
          "athletes": {
            "collection_title": "Athletes"
          },
          "expeditions": {
            "collection_title": "Expeditions"
          },
          "next_page": "Next Page",
          "prev_page": "Prev Page",
          "video_gallery": {
            "collection_title": "Video"
          }
        },
        "view_all": "View All %{collection_type}"
      },
      "preview": {
        "email_updates": {
          "ui": {
            "email_address": "Email Address"
          }
        },
        "navigation": {
          "equipment": "Equipment",
          "exploration": "Exploration",
          "get_outdoors": "Get Outdoors",
          "innovation": "Innovation",
          "kids": "Kids",
          "mens": "Men's",
          "shop_by": "Shop By",
          "ui": {
            "search": "SEARCH"
          },
          "womens": "Women's"
        },
        "region_dropdown": {
          "canada_english": "Canada",
          "united_states_english": "United States"
        },
        "ui": {
          "store_locator": {
            "postal_code": "Postal Code",
            "submit": "Submit",
            "stores_near_you": "Stores Near You",
            "find_a_store": "Find a Store",
            "loading": "Loading...",
            "title": "Store Locator"
          }
        }
      },
      "products_scroller": {
        "in_action": "See it in action",
        "proven_gear": "Expedition-Proven Gear"
      },
      "sitemap": {
        "shop_gear_and_clothing": "Shop Gear and Clothing"
      },
      "social": {
        "email": "Email",
        "share": "Share",
        "facebook": "Facebook",
        "twitter": "Twitter",
        "youtube": "Youtube",
        "our_blog": "Our Blog"
      },
      "store_locator": {
        "ui": {
          "submit": "Submit"
        }
      },
      "ui": {
        "news_box": {
          "events_calendar": "Events Calendar",
          "more": "More News",
          "view_the_blog": "View the blog"
        },
        "social": {
          "our_blog": "Our Blog"
        }
      },
      "time": {
        "formats": {
          "article_published_at": "%m-%d %Y",
          "article_published_date": "%B %-e %Y",
          "feed_source_last_updated": "%m-%d-%Y at %I:%M",
          "omnifind_xml": "%m-%d-%Y",
          "sitemap": "%Y-%m-%d",
          "expedition_detail": "%B %Y"
        }
      },
      "date": {
        "formats": {
          "expedition_formatted": "%b %d, %Y",
          "speaker_series_serialized": "%b %-e %Y"
        }
      },
      "bold_chat": {
        "live_chat_software": "Live Chat Software"
      },
      "corporate_info": {
        "title": "40 years of innovation and exploration"
      },
      "feed_source": {
        "updated_time": "Feeds last updated"
      },
      "get_outdoors": {
        "all_activities": "All Activities",
        "hike": "Hike",
        "bike": "Bike",
        "climb": "Climb",
        "run": "Run",
        "camp": "Camp",
        "board": "Board",
        "ski": "Ski",
        "play": "Play",
        "volunteer": "Volunteer",
        "learn": "Learn",
        "within_10_miles": "Within 16 km",
        "within_25_miles": "Within 40 km",
        "within_50_miles": "Within 80 km",
        "within_75_miles": "Within 121 km",
        "within_100_miles": "Within 161 km",
        "within_200_miles": "Within 322 km",
        "within_250_miles": "Within 402 km",
        "within_500_miles": "Within 805 km",
        "within_750_miles": "Within 1207 km",
        "within_1500_miles": "Within 2414 km",
        "within_2000_miles": "Within 3219 km",
        "planet_explore": "powered by Planet Explore",
        "find_event": "Find Event"
      },
      "logo": {
        "gore_tex": "Gore-Tex",
        "bandit": "Bandit",
        "outside": "Outside",
        "primaloft": "PrimaLoft",
        "brought_to_you_by": "Brought to you by"
      },
      "user": {
        "messages": {
          "errors": {
            "500": "We've been notified about this issue and we'll take a look at it shortly.",
            "sorry": "We're sorry, but something went wrong."
          }
        }
      },
      "webiq": {
        "having_trouble": "Having Trouble?",
        "privacy_statement": "Privacy Statement"
      },
      "speaker_series": {
        "athletes": {
          "region": "Region",
          "title": "Title",
          "location": "Location",
          "athlete_name": "Athlete Name",
          "date": "Date",
          "tickets": "Tickets"
        }
      },
      "kids_grid": {
        "url": {
          "boys": {
            "jackets_and_vests": "http://www.thenorthface.com/catalog/ca_ecom/en/sc-gear/boys-jackets-vests",
            "shirts": "http://www.thenorthface.com/catalog/ca_ecom/en/sc-gear/boys-shirts",
            "pants_and_shorts": "http://www.thenorthface.com/catalog/ca_ecom/en/sc-gear/boys-pants-shorts",
            "footwear": "http://www.thenorthface.com/catalog/ca_ecom/en/sc-gear/boys-footwear",
            "accessories": "http://www.thenorthface.com/catalog/ca_ecom/en/sc-gear/boys-accessories"
          },
          "girls": {
            "jackets_and_vests": "http://www.thenorthface.com/catalog/ca_ecom/en/sc-gear/girls-jackets-vests",
            "shirts": "http://www.thenorthface.com/catalog/ca_ecom/en/sc-gear/girls-shirts",
            "pants_and_shorts": "http://www.thenorthface.com/catalog/ca_ecom/en/sc-gear/girls-pants-shorts",
            "footwear": "http://www.thenorthface.com/catalog/ca_ecom/en/sc-gear/girls-footwear",
            "accessories": "http://www.thenorthface.com/catalog/ca_ecom/en/sc-gear/girls-footwear"
          },
          "infants": {
            "jackets_and_vests": "http://www.thenorthface.com/catalog/ca_ecom/en/sc-gear/infants-3m-24m-jackets-amp-vests",
            "shirts": "http://www.thenorthface.com/catalog/ca_ecom/en/sc-gear/infants-3m-24m-shirts",
            "pants_and_shorts": "http://www.thenorthface.com/catalog/ca_ecom/en/sc-gear/infants-3m-24m-pants-amp-shorts",
            "footwear": "http://www.thenorthface.com/catalog/ca_ecom/en/sc-gear/infants-3m-24m-footwear-0-9-mo",
            "accessories": "http://www.thenorthface.com/catalog/ca_ecom/en/sc-gear/infants-3m-24m-accessories"
          },
          "toddlers": {
            "jackets_and_vests": "http://www.thenorthface.com/catalog/ca_ecom/en/sc-gear/toddlers-2t-4t-jackets-amp-vests",
            "shirts": "http://www.thenorthface.com/catalog/ca_ecom/en/sc-gear/toddlers-2t-4t-shirts",
            "pants_and_shorts": "http://www.thenorthface.com/catalog/ca_ecom/en/sc-gear/toddlers-2t-4t-pants-amp-shorts",
            "accessories": "http://www.thenorthface.com/catalog/ca_ecom/en/sc-gear/toddlers-2t-4t-accessories"
          }
        }
      },
      "storeLocator": {
        "page": "indexNEW_CA.html"
      },
      "gift_guide": {
        "url": {
          "shop_mens": "http://www.thenorthface.com/catalog/ca_ecom/en/sc-gear/mens-collections-holiday",
          "shop_womens": "http://www.thenorthface.com/catalog/ca_ecom/en/sc-gear/womens-collections-holiday",
          "shop_kids": "http://www.thenorthface.com/catalog/ca_ecom/en/sc-gear/kids-collections-holiday",
          "shop_equipment": "http://www.thenorthface.com/catalog/ca_ecom/en/sc-gear/equipment-collections-holiday"
        }
      }
    }
  };
  locale = $('body').attr('data-locale');
  $.extend(TNF.lang, localizations[locale]);
}).call(this);
(function($) {

  //Event Finder Singleton
  var ShareButtons = Class.create({

    initialize: function($element) {
      this.$element = $element;
      this.$show = $(".show", this.$element);
      this.$icons = $(".icons", this.$element);
      this.$iconLinks = $(".icon", this.$icons);
      this.$icons.hide();
      this.mouseoutTimeout;
      this.setupObservers();
    },
    setupObservers: function(){
      var self = this;

      this.$show.click(function(e){
        e.preventDefault();
      }).bind('mouseover', function(e) {
        clearTimeout(self.mouseoutTimeout);
        self.$icons.hide();
        self.$show.fadeOut("slow",function(){
          self.$icons.fadeIn();
        });
      });
      this.$iconLinks.bind('mouseover', function(e) {
        self.$show.hide();
        clearTimeout(self.mouseoutTimeout);
      });
      this.$iconLinks.bind('mouseout', function(e) {
        clearTimeout(self.mouseoutTimeout);
        self.mouseoutTimeout = setTimeout(function(){
          self.$icons.fadeOut("slow",function(){
            self.$show.fadeIn();
          });
        }, 500);
      });
    }

  });
  $.TNF.BRAND.ShareButtons = ShareButtons;

  // exposed for traditional usage patterns and specs
  $.fn.tnfShareButtons = function() {
    return this.each(function () {
      new ShareButtons($(this));
    });
  };

}(jQuery));
(function($) {

  var VideoInterface = Class.create({
    API_READY_FAULT_TOLERANCE: 15,

    /* options:
    *    embedCode: string,
    *    onLoad: function
    *
    *    TODO: add autoplay option
    */
    initialize: function(options) {
      this.height = options.height || 538;
      this.width = options.width || 936;
      this.playerReadyFault = 0;
      this.apiReadyFault = 0;
      this.playerId = options.playerId;
      this.embedCode = options.embedCode;
      this.onLoad = options.onLoad;
      this.loaded = false;
      this.Ooyala = window.tnfOoyala;
      this.player = document.getElementById(this.playerId);
      this.load();
    },


    load: function(callback) {
      if (typeof callback === 'function') {
        this.loaded = false;
        this.onLoad = callback;
      }
      this.commitVideoUpdate() || this.retryVideoUpdate();
    },

    pause: function() {
      this.player.pauseMovie();
    },

    play: function() {
      this.player.playMovie();
    },
    setPlayheadTime: function(time){
      this.playerReady(function(){
        this.player.setPlayheadTime(time);
      }.bind(this));

    },
    getPlayheadTime: function(){
      if(this.player && this.Ooyala.mobile === false){
        return this.player.getPlayheadTime();
      } else {
        return 0;
      }
    },
    retryVideoUpdate: function() {
      this.updateVideoInterval = setInterval(function() {
        this.commitVideoUpdate() || this.abandonVideoUpdateTimeout();

        this.apiReadyFault += 0.5;
      }.bind(this), 500);
    },

    commitVideoUpdate: function() {
      this.player = document.getElementById(this.playerId);
      if (this.player === null || this.Ooyala.apiReady[this.playerId] !== true ) {
        return false;
      }
      $(this.player).parent().css({height: this.height, width: this.width});
      this.player.height = this.height;
      this.player.width = this.width;
      this.clearVideoRetryInterval();
      if (typeof this.onLoad === 'function' && !this.loaded) {
        this.onLoad.call(this);
        this.loaded = true;
      }
      $(document).trigger({type: 'tnf:brand:video_finished_loading', embedCode: this.embedCode});
    },

    clearVideoRetryInterval: function() {
      clearInterval(this.updateVideoInterval);
      this.apiReadyFault = 0;
    },

    abandonVideoUpdateTimeout: function() {
      if (this.apiReadyFault >= this.API_READY_FAULT_TOLERANCE) {
        this.clearVideoRetryInterval();
        $(document).trigger('tnf:brand:ooyala:apiNeverLoaded');
      }
    },

    playerReady: function(callback, retryCount){
      if (!this.Ooyala.apiReady[this.playerId]){
        if (!retryCount) retryCount = 0;
        if (retryCount === this.API_READY_FAULT_TOLERANCE){
            return false;
        } else {
          retryCount += 1;
          setTimeout(function(){
            this.playerReady(callback, retryCount);
          }.bind(this), 500);
          return false;
        }
      }
      if (typeof callback === 'function'){
        callback();
      }
    }

  });

  $.TNF.BRAND.videoInterface = VideoInterface;

  /* options:
  *    container: $element,
  *    width: int,
  *    height: int,
  *    embedCode: string,
  *    onLoad: function
  */
  VideoInterface.factory = function(options) {
    // usage: this.videoInterface = $.TNF.BRAND.VideoInterface.factory(options);
    // iframe building
    // TODO: Calculate width & height if they are not provided
   
    options.playerId = 'player'+ new Date().getTime();
    var scriptTag = document.createElement('script');
    scriptTag.src = "http://player.ooyala.com/player.js?hasModuleParams=1&playerBrandingId=db367c03b0de4bcf8bf82a54c001a356&playerContainerId=ooyala-video-"+options.playerId+"&callback=tnfOoyala.handlePlayerReadyStateChange&playerId="+options.playerId+"&wmode=transparent&width=" + options.width + "&height=" + options.height + "&embedCode=" + options.embedCode + "&autoplay="
    options.container.append('<div id="ooyala-video-'+options.playerId+'" class="ooyala-player"></div>');
    options.container.append(scriptTag);
    return new VideoInterface(options);
  };
  window.tnfOoyala = (function(window) {
    return {
      apiReady: {},
      mobile: false,
      handlePlayerReadyStateChange: function (playerId, eventName, eventArgs) {
        if(eventName === 'playerEmbedded') {
          $('#'+playerId)[0].setModuleParams({"vfc-buy-ui":{"region":"US"}});
        } else if(eventName === 'apiReady') {
          tnfOoyala.apiReady[playerId] = true;
          if( $('#'+playerId+'_MobileContainer').length > 0 ){
            tnfOoyala.mobile = true;
          } 
          $(document).trigger('tnf:ooyala:event:' + eventName, playerId, eventArgs);
        }
      }
    };
  })(window);

}(jQuery));
(function($){
  var VideoGallery = Class.create({

    initialize: function(el, options) {
      this.setUrl();
      this.options = $.extend({}, this.defaultOptions, options);
      this.videoAutoPlayQueued = false;
      this.element = el;
      this.$element = $(el);
      this.videoGallery = this.options.data.video_gallery;

      this.generateJQuerySelectors();

      this.setupObservers();

      this.selectChannel(0);
      this.currentVideoIndex = 0;

      this.evaluatePageHash();

      this.initialized = false;
    },

    setUrl: function(str) {
      this.oldUrl = window.location.hash;
    },

    defaultOptions: {
      data: {},
      selectors: {
        paginator: '.paginator',
        tabsListItems: '.tabs li',
        tabLinks: '.tabs li a',
        hero: '#video_gallery_hero',
        videoInterfaceContainers: '.video-interface',
        breadCrumbs: '.crumbs',
        pageTitle: '.page-title h1'
      }
    },

    buildScrollControls: function() {
      this.$hero.append('\
             <a class="video-gallery-arrow-left arrow-box-left"><div class="arrow"></div></a>\
             <a class="video-gallery-arrow-right arrow-box"><div class="arrow"></div></a>');
      this.scrollControls = {
        next: '.video-gallery-arrow-right',
        prev: '.video-gallery-arrow-left'
      }
    },

    updateScrollControls: function() {
      if (typeof this.scrollControls === 'undefined') { this.buildScrollControls(); }

      var nextIndex = this.currentVideoIndex + 1,
          prevIndex = this.currentVideoIndex - 1,
          nextVideo = this.video(nextIndex),
          prevVideo = this.video(prevIndex),
          nextEmbedCode = (typeof nextVideo === 'undefined') ? null : nextVideo.embed_code,
          prevEmbedCode = (typeof prevVideo === 'undefined') ? null : prevVideo.embed_code,
          nextLink = $(this.scrollControls.next),
          prevLink = $(this.scrollControls.prev);

      if (prevIndex < 0) {
        prevLink.removeClass('enabled');
        this.hidePrevLink();
      } else {
        prevLink.addClass('enabled');
        this.showPrevLink();
      }

      if (nextIndex >= this.channel().videos.length) {
        nextLink.removeClass('enabled');
        this.hideNextLink();
      } else {
        nextLink.addClass('enabled');
        this.showNextLink();
      }

      prevLink.attr('data-embed-code', prevEmbedCode);
      nextLink.attr('data-embed-code', nextEmbedCode);
      prevLink.attr('data-video-index', prevIndex);
      nextLink.attr('data-video-index', nextIndex);
    },

    showPrevLink: function() {
      var prevLink = $(this.scrollControls.prev);
      if (prevLink.hasClass('enabled')) { prevLink.show(); }
    },

    showNextLink: function() {
      var nextLink = $(this.scrollControls.next);
      if (nextLink.hasClass('enabled')) { nextLink.show(); }
    },

    hidePrevLink: function() {
      $(this.scrollControls.prev).hide();
    },

    hideNextLink: function() {
      $(this.scrollControls.next).hide();
    },

    showControls: function() {
      this.showNextLink();
      this.showPrevLink();
    },

    hideControls: function() {
      this.hideNextLink();
      this.hidePrevLink();
    },

    video: function(index) {
      if (typeof index === 'undefined') { index = this.currentVideoIndex; }
      return this.channel().videos[index];
    },

    channel: function(index) {
      if (typeof index === 'undefined') { index = this.currentChannelIndex; }
      return this.videoGallery.video_channels[index];
    },

    setupObservers: function() {
      var self = this;

      this.$hero.hover(function() {
        self.showControls();
      }, function() {
        self.hideControls();
      });

      $('a[data-embed-code]').live('click', function(e) {
        e.preventDefault();
        $el = $(e.currentTarget);

        // first thing: pause the video before removing or changing it.
        var player = $('.OoyalaVideoPlayer')[0];
        if ( player && typeof player.pauseMovie === 'function'){
          player.pauseMovie();
        }

        self.previousVideoIndex = self.currentVideoIndex;
        self.currentVideoIndex = parseInt($el.attr('data-video-index'));
        self.updateURL();

        if ($el.attr('data-video-autoplay') === 'true') {
          $(document).trigger({type:'tnf:brand:queue_video_autoplay'});
        }
      });

      $(window).bind('hashchange', function(e) {
        var hash = window.location.hash;
        if (hash.indexOf('#/video/') === 0) {
          self.evaluatePageHash();
        }
      });

      if ('onhashchange' in window) {
      } else {
        setInterval(function() {
          if (window.location.hash !== self.oldUrl) {
            self.setUrl();
            $(window).trigger('hashchange');
          }
        }, 100);
      }

      $(document).bind('tnf:brand:queue_video_autoplay', function() {
        self.videoAutoPlayQueued = true;
      });

      $('body').bind('tnf:brand:load_video', function(e) {

        var incomingPlayer, incomingCSS, outgoingPlayer;

        if (typeof self.previousVideoIndex === 'undefined' || self.previousVideoIndex === self.currentVideoIndex) {
          incomingPlayer = self.$videoInterfaceContainers;
          outgoingPlayer = null;
        } else if (self.previousVideoIndex < self.currentVideoIndex) {
          $(self.$videoInterfaceContainers.selector).after('<div class="video-interface" style="z-index: 7;"></div>');
          incomingPlayer = $(self.$videoInterfaceContainers.selector).last();
          outgoingPlayer = $(self.$videoInterfaceContainers.selector).first();
          incomingCSS = {'left': 956, 'z-index': 9};
        } else {
          $(self.$videoInterfaceContainers.selector).before('<div class="video-interface" style="z-index: 7;"></div>');
          incomingPlayer = $(self.$videoInterfaceContainers.selector).first();
          outgoingPlayer = $(self.$videoInterfaceContainers.selector).last();
          incomingCSS = {'left': -956, 'z-index': 9};
        }

        self.videoInterface = $.TNF.BRAND.videoInterface.factory({
          width: 956,
          height: 538,
          container: incomingPlayer,
          embedCode: e.embedCode,
          onLoad: function() {

            if (incomingCSS && self.initialized) {
              incomingPlayer.css(incomingCSS);
            }

            incomingPlayer.animate({ left: 0 }, 500, 'easeInOutSine', function() {
              $(this).css('z-index', '8');
              if (outgoingPlayer !== null) {
                outgoingPlayer.remove();
              }

              if ( e.autoPlay === true || self.videoAutoPlayQueued ) {
                self.videoInterface.play();
                self.videoAutoPlayQueued = false;
              }
            });

            self.initialized = true;
          }
        });

      });

      this.$tabLinks.click(function(e) {
        e.preventDefault();

        // This is dangerously coupled with the markup
        // TODO: Split up their unholy marriage.
        var index = $(e.currentTarget).parent().index();
        this.selectChannel(index);
      }.bind(this));

      $(document).bind('tnf:brand:video_finished_loading', function() {
        this.updateBreadcrumbs();
        this.updatePageTitle();
        // this.updateURL();
      }.bind(this));
    },

    evaluatePageHash: function() {
      var hash = window.location.hash;
      if (hash.indexOf('#/video/') === 0) {
        var channelMatch = hash.match(/\/channel\/([\d]+)/),
            video;

        if (channelMatch !== null) {
          var channels = this.videoGallery.video_channels,
              channel;

          for (var n = 0; n < channels.length; n++) {
            channel = channels[n];
            if (channel.id === parseInt(channelMatch[1]) && channel != this.channel()) {
              this.selectChannel(n);
              break;
            }
          }
        }

        var videos = this.channel().videos;

        for (var n = 0; n < videos.length; n++) {
          video = videos[n];
          if (window.location.hash.indexOf('#/video/' + video.id + '/') === 0) {

            var grid = this.options.paginatorOptions.selectors.itemsContainer,
                embedCode = video.embed_code,
                videoLoadOptions = {type: 'tnf:brand:load_video', embedCode: embedCode, autoPlay: false};

            if (this.currentVideoIndex !== n) {
              // TODO:
              // This branch of logic needs to be refactored, but is currently needed to handle two cases:
              // 1. User clicks a video anchor & click event handles setting previousVideoIndex, etc.
              // 2. User clicks back / forward browser buttons (necessitating that we handle indexes here)
              this.previousVideoIndex = this.currentVideoIndex;
              this.currentVideoIndex = n;
            }
            this.updateScrollControls();

            $('body').trigger(videoLoadOptions);

            var paginator = this.$paginator.data('tnf:brand:paginator'),
                pageNumber = paginator.getPageFromIndex(n);
            paginator.loadPage(pageNumber);

            $('a[data-embed-code]', grid).removeClass('active');
            $('a[data-embed-code="' + embedCode + '"]', grid).addClass('active');

            this.updateInterface();
            break;
          }
        }
      }
    },

    updateInterface: function() {
      this.updateScrollControls();
      this.updateBreadcrumbs();
      this.updatePageTitle();
    },

    selectChannel: function(index) {
      this.currentChannelIndex = index;
      this.$tabsListItems.removeClass('active');
      this.$tabsListItems.eq(index).addClass('active');
      var videos = this.videoGallery.video_channels[index].videos;
      this.callPaginator(videos);
    },

    updateBreadcrumbs: function() {
      if (! (this.$breadCrumbs && this.$breadCrumbs.length) ) { return; }

      var $currentVideoAnchor = $('a.current-video', this.$breadCrumbs);
      var video = this.video();

      this.$breadCrumbs.find('a').removeClass('title');
      var currentVideoMarkup = '<a title="' + video.title + '" class="title current-video">' + video.short_title + '</a>';

      if ($currentVideoAnchor.length === 0) {
        this.$breadCrumbs.append('/ ' + currentVideoMarkup);
      } else {
        $currentVideoAnchor.replaceWith(currentVideoMarkup);
      }
    },

    updatePageTitle: function() {
      if (! (this.$pageTitle && this.$pageTitle.length) ) { return; }

      var video = this.video();
      this.$pageTitle.text(video.short_title);
    },

    updateURL: function(autoplay) {
      var video = this.video(),
          channel = this.channel();

      this.setUrl();
      window.location.hash = '/video/' + video.id + '/channel/' + channel.id;
    },

    generateJQuerySelectors: function() {
      for (var key in this.options.selectors) {
        this['$' + key] = $(this.options.selectors[key]);
      }
    },

    callPaginator: function(collection) {
      var newCollection = { collection: collection };
      var paginatorOptions = $.extend({}, this.options.paginatorOptions, newCollection);
      this.$paginator.tnfBrandPaginator(paginatorOptions);
    }

  });


  // exposed for traditional usage patterns and specs
  $.TNF.BRAND.VideoGallery = VideoGallery;

  // make it a jQuery plugin
  $.fn.tnfBrandVideoGallerize = function(options){
    return this.each(function(){
      (new VideoGallery(this, options));
    });
  };
})(jQuery);
(function($) {

  var InlineVideoExpander = Class.create({
    videoInterface: null,
    initialize: function($actionElm, $targetCont, ratio) {
    /*
      $actionElm: the link or element that click event is attached to
      $targetCont: the element the video is getting injected into.
      ratio: what the video ratio should be. for 16:9 this should be 0.5625
    */
      var that = this;
      // if not set, default to 16:9
      ratio = ratio || 0.5625;
      this.embedCode = $actionElm.attr("data-embed-code");
      this.$targetCont = $targetCont;
      this.heroCont = $(".hero", this.$targetCont);
      this.targetImage = $("img", this.$targetCont);
      this.targetContWidth = this.$targetCont.width();
      this.ratioHeight = Math.ceil(this.targetContWidth * ratio);
      this.playHeadTime = 0;
      $actionElm.bind('click', function(e) {
        e.preventDefault();
        // requery when the user has clicked
        that.targetContHeight = that.heroCont.outerHeight();
        that.$targetCont.height(that.targetContHeight);
        that.adjustVideoSpace(true);
      });
      $(this.$targetCont).bind("close-event", function(){
        if (that.videoInterface){
          that.videoInterface.pause();
          window.tnfOoyala.apiReady[that.videoInterface.playerId] = false;
          that.playheadTime = that.videoInterface.getPlayheadTime();
        }
        that.adjustVideoSpace();
      });
    },

    adjustVideoSpace:function(insert) {
      var that = this,
          height = that.ratioHeight;
          playerCont = $('.player-container', that.$targetCont);
      if(insert) {
        that.heroCont.fadeOut('fast', function() {
          if (TNF.ipad){
            height = height + 35;
          }
         that.$targetCont.animate({height: height }, 1000, function() {
            that.handleVideo(insert);
            if (TNF.ipad){
              playerCont.animate({'padding-top': '35px' });
              $('a.video-interface-close', playerCont).css({"border-radius": '10px 10px 0 0'});
            }
          });
        });
      } else {
        that.$targetCont.animate({height: that.targetContHeight}, 1000, function() {
          that.heroCont.fadeIn('fast', function() {
              that.handleVideo();
              if (TNF.ipad){
                playerCont.animate({'padding-top': '0px' });
                $('a.video-interface-close', playerCont).css({"border-radius": '0 0 0 10px'});
              }
            });
          });
        }
    },

    handleVideo: function (insert) {
      var playerContainer = $(".player-container", this.$targetCont),
          player = null,
          that = this;
      if (this.videoInterface){
        player = $("#"+this.videoInterface.playerId);
      }
      if (insert) {
        if ($(player).length === 0){
          this.videoInterface = $.TNF.BRAND.videoInterface.factory({
            container: playerContainer,
            width: that.targetContWidth,
            height: that.ratioHeight,
            embedCode: that.embedCode,
            onLoad: function() {
              that.videoInterface.play();
            }
          });

          playerContainer.append('<a class="video-interface-close"></a>');
          $('a.video-interface-close', playerContainer).click(function(e) {
            e.preventDefault();
            playerContainer.trigger("close-event");
            playerContainer.fadeOut("fast");
          });

        } else {
          playerContainer.fadeIn("fast", function(){
            that.videoInterface.setPlayheadTime(that.playheadTime);
          }); 
        }
      } else {
        playerContainer.fadeOut("fast");
      }
    }
  });

  $.TNF.BRAND.InlineVideoExpander = InlineVideoExpander;


  $.fn.tnfInlineVideoExpanderer = function($targetCont, ratio) {
    return this.each(function () {
      new InlineVideoExpander($(this), $targetCont, ratio);
    });
  };

}(jQuery));
(function($) {

  var IframeVideoLoader = Class.create({
    initialize: function(iframeCont, embedCode) {
      // for the lightbox...
      this.videoInterface = $.TNF.BRAND.videoInterface.factory({
        container:iframeCont,
        width: 936,
        height: 518,
        embedCode: embedCode,
        onLoad: function() {
          this.play();
        }
      });
    },
    pause: function(){
      this.videoInterface.pause();
    }
  });

  $.TNF.BRAND.IframeVideoLoader = IframeVideoLoader;

}(jQuery));
(function($) {

  /* The main Hero Gallery class.. it requires specific markup, so check the
   * specs to see what that markup should look like.
   *
   * @element - a jQuery element object (eg. $('#element').first())
   */

  var Gallery = Class.create({
    element: null,
    items: [],
    currentPage: 0,

    initialize: function(element) {
      this.element = element;

      this.shortClass = 'tall';
      if (this.element.hasClass('short') == true) {
        this.shortClass = 'short';
      }

      // remove any instances of HeroGallery on the element, then set it
      if (this.element.data('hero_gallery')) {
        this.element.data('hero_gallery').dispose();
      }
      this.element.data('hero_gallery', this);

      this.build();
      this.setupObservers();
      this.autoRotate();
    },

    autoRotate: function() {
      this.autoRotationPaused = false;
      this.autoRotateInterval = setInterval(function() {
        if(this.autoRotationPaused !== true) {
          this.nextPage();
        }
      }.bind(this), 7000);
    },

    stopAutoRotation: function() {
      clearInterval(this.autoRotateInterval);
      this.autoRotateInterval = null;
    },

    build: function() {
      // find all the items that we can page through
      var items = this.element.find('div.hero-gallery-item');
      this.items = [];
      items.each(function(i, element) {
        var type = $(element).data('type');

        // It shouldn't be possible to get undefined if the data is accurate,
        // but data is unlikely to be accurate on integration - opting to make
        // the implementation less brittle.
        var object = (type === 'standard' || type === undefined) ? $.TNF.BRAND.HeroGallery.Standard : $.TNF.BRAND.HeroGallery.Rotator;
        this.items.push(new object.Item($(element)));
      }.bind(this));

      // add in the markup we'll need for pagination
      this.paginatable = this.items.length > 1;
      if (this.paginatable) {
        this.element.append('\
               <a class="hero-gallery-arrow-left arrow-box-left ' + this.shortClass + '"><div class="arrow"></div></a>\
               <a class="hero-gallery-arrow-right arrow-box ' + this.shortClass + '"><div class="arrow"></div></a>');
        this.element.append('<div class="hero-gallery-paginator"><em></em>' + (new Array(this.items.length + 1).join('<a></a>')) + '</div>');
      }

      // find the elements we'll use for pagination
      this.prevButton = this.element.find('a.hero-gallery-arrow-left');
      this.nextButton = this.element.find('a.hero-gallery-arrow-right');
      this.paginator = this.element.find('div.hero-gallery-paginator');
      this.pageIndicator = this.element.find('div.hero-gallery-paginator em');
      this.scroller = this.element.find('div.hero-gallery-scroller');

      // get some widths
      this.width = this.element.width();
      this.itemWidth = this.element.find('div.hero-gallery-item').width();

      // size the scroller
      this.scroller.width(this.itemWidth * this.items.length);

      // center the paginator
      this.paginator.css('left', (this.width / 2) - (this.paginator.outerWidth() / 2));
    },

    setupObservers: function() {
      this.element.hover(
        // mouseenter
        function(e) {
          this.autoRotationPaused = true;
        }.bind(this),

        // mouseleave
        function(e) {
          this.autoRotationPaused = false;
        }.bind(this)
      );

      // clicking on the background
      this.element.click(function(e) {
        this.stopAutoRotation();
        try{
          var element = $(e.target);
          if (element.hasClass('hero-gallery-item') || element.hasClass('hero-gallery-content')) {
            $("body").trigger({type: 'hero_gallery_paged', page: this.currentPage});
          }
        } catch (e) {}
      }.bind(this));

      // left and right pagination
      this.prevButton.click(this.prevPage.bind(this));
      this.nextButton.click(this.nextPage.bind(this));

      // page indicator pagination
      this.paginator.find('a').click(function(e) {
        this.jumpToPage($(e.target).prevAll('a').length);
      }.bind(this));

      $("body").bind('hero_gallery_popup_opened', function(e) {
        this.paginator.animate({opacity: 0}, 200, 'easeInOutSine', function() { this.paginator.hide(); }.bind(this));
      }.bind(this));

      $("body").bind('hero_gallery_popup_closed', function(e) {
        this.paginator.show();
        this.paginator.animate({opacity: 1}, 200, 'easeInOutSine');
      }.bind(this));

      // if the flyout opens or closes, we should move our paging arrow
      $("body").bind('hero_gallery_flyout_opened', function(e) {
        this.nextButton.animate({opacity: 0}, 200, 'easeInOutSine', function() { this.nextButton.hide(); }.bind(this));
        this.prevButton.animate({opacity: 0}, 200, 'easeInOutSine', function() { this.prevButton.hide(); }.bind(this));
        this.paginator.animate({opacity: 0}, 200, 'easeInOutSine', function() { this.paginator.hide(); }.bind(this));
      }.bind(this));

      $("body").bind('hero_gallery_flyout_closed', function(e) {
        this.nextButton.show();
        this.prevButton.show();
        this.paginator.show();
        this.nextButton.animate({opacity: 1}, 200, 'easeInOutSine');
        this.prevButton.animate({opacity: 1}, 200, 'easeInOutSine');
        this.paginator.animate({opacity: 1}, 200, 'easeInOutSine');
      }.bind(this));
    },

    prevPage: function() {
      this.jumpToPage(this.currentPage - 1);
    },

    nextPage: function() {
      this.jumpToPage(this.currentPage + 1);
    },

    jumpToPage: function(page) {
      if (page > this.items.length - 1) page = 0;
      if (page < 0) page = this.items.length - 1;
      this.currentPage = page;

      // trigger an event so items can clean themselves up
      $("body").trigger({type: 'hero_gallery_paged', page: page});

      // move the scroller and the page indicator
      this.scroller.animate({'left': -(page * this.itemWidth)}, 500, 'easeInOutSine');
      this.pageIndicator.animate({'left': (page * 19)}, 500, 'easeInOutSine');
    },

    dispose: function() {
      this.element.data('hero_gallery', null);

      this.prevButton.unbind('click').remove();
      this.nextButton.unbind('click').remove();
      this.paginator.remove();

      for (var item in this.items) {
        this.items[item].dispose();
      }

      this.element = null;
      delete(this); // no idea if this works
    }
  });

  var AbstractItemLogic = {

    videoInterfaceContainer: null,
    element: null,
    flyoutVisible: false,

    initialize: function(element) {
      this.element = element;

      this.build();
      this.setupObservers();
      this.gallery = $(this.element).parent().parent('.hero-gallery');
      this.galleryHeight = this.gallery.outerHeight();
      this.videoInterfaceContainer = $('.hero-gallery-video-interface', this.gallery );
      this.embedCode = '';
    },

    showFlyoutIEBranch: function() {
      if ($.browser.msie && parseInt($.browser.version, 10) <= 7) {
        this.content.hide();
      } else {
        this.content.animate({'opacity': 0}, 200, 'easeInOutSine', function() {
          this.content.css('display', 'none');
        }.bind(this));
      }
    },

    hideFlyoutIEBranch: function() {
      if ($.browser.msie && parseInt($.browser.version, 10) <= 7) {
        this.content.show();
      } else {
        this.content.css('display', 'block');
        this.content.animate({'opacity': 1}, 200, 'easeInOutSine');
      }
    },

    hideVideo: function() {
      var self = this;
      self.videoInterface.pause();
      this.videoInterfaceContainer.fadeOut(function(){
        self.adjustVideoSpace();
      });
    },

    showVideo: function() {
      var self = this;

      this.videoInterfaceContainer.append('<a class="video-interface-close"></a>');
      $('a.video-interface-close', this.videoInterfaceContainer).click(function(e) {
        e.preventDefault();
        self.hideVideo();
        if (TNF.ipad){
          // don't like this 
          self.videoInterfaceContainer.animate({"padding-top": '0px'});
          $('a.video-interface-close').css({"border-radius": '0 0 0 10px'});
        }
      });
      if (TNF.ipad){
        this.videoInterfaceContainer.animate({"padding-top": '35px'});
        $('a.video-interface-close').css({"border-radius": '10px 10px 0 0'});
      }
      self.videoInterface.play();

    },

    unloadVideo: function() {
      $(this.videoInterfaceContainer).children().unbind();
      $(this.videoInterfaceContainer).empty();
    },

    loadVideo: function() {
      var self = this;
      this.videoInterfaceContainer.css({"z-index": 9120, 'display': 'block', "visibility": 'visible'});

      this.videoInterface = $.TNF.BRAND.videoInterface.factory({
        container: $(this.videoInterfaceContainer),
        width: 956,
        height: 538,
        embedCode: this.embedCode,
        onLoad: function() {
          self.showVideo();
        }
      });
    },

    adjustVideoSpace:function(insert) {
      var that = this,
          videoHeight = 538,
          playerCont = $('.player-container', that.gallery );

      if (TNF.ipad) {
        videoHeight = videoHeight + 35;
      }

      if (insert) {
        $(that.element).parent().fadeOut('fast', function() {
          that.gallery.animate({height: videoHeight}, 1000, function() {
            that.loadVideo();
            if (TNF.ipad) {
              playerCont.animate({'padding-top': '0px' });
              $('a.video-interface-close', playerCont).css({"border-radius": '0 0 0 10px'});
            }
          });
        });
      } else {
        that.gallery.animate({height: that.galleryHeight}, 1000, function() {
          contentBox = $(this).closest('.content-box');
          oldPosition = contentBox.css('position');

          contentBox.css({ position: 'relative' })
                    .css({ position: oldPosition });

          $(that.element).parent().fadeIn('fast', function() {
            that.unloadVideo();
            if (TNF.ipad) {
              playerCont.animate({'padding-top': '0px' });
              $('a.video-interface-close', playerCont).css({"border-radius": '0 0 0 10px'});
            }
          });
        });
      }
    },

    dispose: function() {
      this.element.find('a.arrow-box').unbind('click');
      this.element.find('a.hero-gallery-flyout-close').remove();

      for (var callout in this.callouts) {
        this.callouts[callout].dispose();
      }

      this.element = null;
      delete(this); // no idea if this works
    }
  };

  var AbstractCalloutLogic = {
    element: null,
    showing: false,

    activateMarker: function() {
      this.markerIndicator.addClass('active');
      this.markerCircle.animate({top: 0, left: 0, width: this.markerSize, height: this.markerSize}, 200, 'easeInOutSine')
    },

    deactivateMarker: function() {
      this.markerIndicator.removeClass('active');
      this.markerCircle.animate({top: this.markerSize / 2, left: this.markerSize / 2, width: 0, height: 0}, 200, 'easeInOutSine')
    }
  };

  // exposed for traditional usage patterns and specs
  $.TNF.BRAND.HeroGallery = Gallery;
  $.TNF.BRAND.HeroGallery.AbstractItemLogic = AbstractItemLogic;
  $.TNF.BRAND.HeroGallery.AbstractCalloutLogic = AbstractCalloutLogic;

  // for jQuery style usage
  $.fn.TNFBrandHeroGallerize = function (options) {
    return this.each(function () {
      new Gallery($(this), options);
    });
  };

}(jQuery));

(function($) {

  var Standard = {};

  //********************************************************//
  /* Hero Galleries contain many Items.  This is for them.  Items have specific
   * markup, so check specs to see what that markup should look like.
   *
   * Items can have flyouts, and any number of callouts.
   *
   * @element - a jQuery element object (eg. $('#element').first())
   */
  //********************************************************//

  Standard.Item = {

    build: function() {
      this.content = this.element.find('div.hero-gallery-item-content');

      // find the flyout
      this.flyout = this.element.find('div.hero-gallery-flyout-left, div.hero-gallery-flyout-right').first();
      if (this.flyout.length) {
        this.flyout.append('<a class="hero-gallery-flyout-close"></a>');

        this.flyoutWidth = parseInt(this.flyout.attr('data-width'));
        setTimeout(function() {
          this.flyout.css('background-image', 'url(' + this.flyout.attr('data-background') + ')');
        }.bind(this), 1000);
        this.flyoutSide = this.flyout.hasClass('hero-gallery-flyout-left') ? 'left' : 'right';
      }

      // find all the callouts and instantiate them
      var callouts = this.element.find('div.hero-gallery-callout');
      this.callouts = [];
      callouts.each(function(i, element) {
        this.callouts.push(new Standard.Callout($(element)));
      }.bind(this));
    },

    setupObservers: function() {
      // make the call to action open the flyout
      $('.cta a.arrow-box, .hero-cta a.hero-arrow-box', this.element).click(function(e) {
        var element = $(e.currentTarget);
        if (element.data('embed-code')) {
          e.preventDefault();
          this.embedCode = element.data('embed-code');
          this.adjustVideoSpace(true);
        } else if (element.data('flyout-link')) {
          e.preventDefault();
          this.showFlyout();
        }
      }.bind(this));

      this.element.find('a.hero-gallery-flyout-close').click(function() {
        this.hideFlyout();
      }.bind(this));

      $("body").bind('hero_gallery_popup_opened', function() {
        if (this.flyoutVisible) this.hideFlyout();
      }.bind(this));

      // listen for pagination, so we can hide our flyout etc.
      $("body").bind('hero_gallery_paged', function() {
        if (this.flyoutVisible) this.hideFlyout(true);
      }.bind(this));
    },

    showFlyout: function() {
      if (!this.flyout) return;
      $("body").trigger({type: 'hero_gallery_flyout_opened', item: this});

      var animation = {};
      animation[this.flyoutSide] = 0;

      this.showFlyoutIEBranch();

      this.flyout.css(this.flyoutSide, -this.flyoutWidth).width(this.flyoutWidth).css('display', 'block');
      this.flyout.animate(animation, 200, 'easeInOutSine');
      this.flyoutVisible = true;
    },

    hideFlyout: function(instant) {
      if (!this.flyout) return;
      $("body").trigger({type: 'hero_gallery_flyout_closed', item: this, instant: instant});

      var animation = {};
      animation[this.flyoutSide] = -this.flyoutWidth;

      this.hideFlyoutIEBranch();

      this.flyout.animate(animation, 200, 'easeInOutSine', function() {
        this.flyout.hide();
      }.bind(this));

      this.flyoutVisible = false;
    }
  };

  Standard.Item = Class.create($.extend(Standard.Item, $.TNF.BRAND.HeroGallery.AbstractItemLogic));

  /* Items contain many Callouts.  Callouts are simply divs with some content,
   * a top and left, and the rest of the markup is built for you.
   *
   * @element - a jQuery element object (eg. $('#element').first())
   */

  Standard.Callout = {

    initialize: function(element) {
      this.element = element;

      // get the parent element and it's width/height for positioning popups
      this.parentElement = element.parent();
      this.containerWidth = this.parentElement.width();
      this.containerHeight = this.parentElement.height();

      this.build();
      this.setupObservers();
    },

    build: function() {
      this.position = this.element.position();

      // add the marker
      this.parentElement.append('<div class="hero-gallery-callout-marker"><em></em><a></a></div>');

      // add the popup
      this.parentElement.append('\
        <div class="hero-gallery-callout-popup">\
          <div class="hero-gallery-callout-popup-content"></div>\
          <a class="hero-gallery-callout-popup-close"></a>\
          <div class="hero-gallery-callout-popup-arrow"></div>\
        </div>');

      // find the marker and get it's width
      this.marker = this.parentElement.find('div.hero-gallery-callout-marker:last');
      this.markerCircle = this.marker.find('em');
      this.markerIndicator = this.marker.find('a');

      // find the popup
      this.popup = this.parentElement.find('div.hero-gallery-callout-popup:last');

      // get the size of the marker and where it's center is
      this.markerSize = this.marker.width();

      // position the marker
      this.marker
        .css('top', this.position['top'] - (this.markerSize / 2))
        .css('left', this.position['left'] - (this.markerSize / 2));

      // position the marker circle
      this.markerCircle
        .css('top', this.markerSize / 2)
        .css('left', this.markerSize / 2);

      // fill the popup and position it
      var contentElement = this.element.clone().css('top', 0).css('left', 0).css('visibility', 'visible').css('position', 'static');
      this.popup.find('div.hero-gallery-callout-popup-content').append(contentElement);
      this.positionPopup();
    },

    setupObservers: function() {
      $("body").bind('hero_gallery_popup_opened', this.fadePopup.bind(this));
      $("body").bind('hero_gallery_flyout_opened', this.fadePopup.bind(this));
      $("body").bind('hero_gallery_paged', this.fadePopup.bind(this));

      this.markerIndicator.bind('mouseover', function() {
        this.markerCircle.animate({top: 0, left: 0, width: this.markerSize, height: this.markerSize}, 100, 'easeInOutSine')
      }.bind(this));

      this.markerIndicator.bind('mouseout', function() {
        if (this.showing) return;
        this.deactivateMarker();
      }.bind(this));

      this.markerIndicator.bind('click', this.showPopup.bind(this));
      this.popup.find('a.hero-gallery-callout-popup-close').click(this.fadePopup.bind(this));
    },

    positionPopup: function() {
      var popupWidth = this.popup.outerWidth(),
          popupHeight = this.popup.outerHeight();

      // find the top, and adjust if there isn't enough room
      var top = this.position['top'] - popupHeight - 30;
      var left = 0;
      if (top <= 10) {
        top = this.position['top'] + (this.markerSize / 2);

        // not enough room below, so move to the right
        if (top + popupHeight + 30 > this.containerHeight) {

          top = (this.containerHeight - popupHeight) / 2;
          if (top <= 10) top = 10;
          left = this.position['left'] + 30;

          // not enough room on the right, so move to the left
          if (left + popupWidth + 30 > this.containerWidth) {

            top = (this.containerHeight - popupHeight) / 2;
            if (top <= 10) top = 10;
            left = this.position['left'] - popupWidth - 30;

            this.popup.addClass('hero-gallery-callout-popup-left');
            this.setArrowTop(top);
          } else {
            this.popup.addClass('hero-gallery-callout-popup-right');
            this.setArrowTop(top);
          }

        } else {
          left = this.positionPopupLeft(popupWidth);
          this.popup.addClass('hero-gallery-callout-popup-bottom');
        }

      } else {
        left = this.positionPopupLeft(popupWidth);
        this.popup.addClass('hero-gallery-callout-popup-top');
      }

      // position the popup
      this.popup.css('top', top).css('left', left).css('display', 'none');
    },

    setArrowTop: function(top) {
      var arrowTop = (this.position['top'] - top) - 8;
      this.popup.find('div.hero-gallery-callout-popup-arrow').css('top', arrowTop);
    },

    positionPopupLeft: function(width) {
      var left = this.position['left'] - (width / 2);
      if (left <= 10) left = 10;
      if (left + width >= this.containerWidth - 10) left = this.containerWidth - width - 10;

      var arrowLeft = (this.position['left'] - left) - 8;
      if (arrowLeft < 6) arrowLeft = 6;
      this.popup.find('div.hero-gallery-callout-popup-arrow').css('left', arrowLeft);

      return left;
    },

    showPopup: function() {
      if (this.showing) {
        this.hidePopup();
        return;
      }

      $("body").trigger({type: 'hero_gallery_popup_opened', callout: this});
      this.activateMarker();

      this.popup.css('opacity', 0).css('display', 'block');
      this.popup.animate({opacity: 1}, 200, 'easeInOutSine');
      this.showing = true;
    },

    hidePopup: function() {
      $("body").trigger({type: 'hero_gallery_popup_closed', callout: this});

      this.deactivateMarker();
      this.popup.animate({opacity: 0}, 200, 'easeInOutSine', function() {
        this.popup.css('display', 'none');
      }.bind(this));
      this.showing = false;
    },

    fadePopup: function() {
      if (!this.showing) return;

      $("body").trigger({type: 'hero_gallery_popup_closed', callout: this});
      this.deactivateMarker();
      this.popup.animate({opacity: 0}, 200, 'easeInOutSine', function() {
        this.popup.css('display', 'none');
      }.bind(this));
      this.showing = false;
    },

    dispose: function() {
      this.marker.remove();
      this.popup.remove();

      this.element = null;
      delete(this); // no idea if this works
    }
  };

  Standard.Callout = Class.create($.TNF.BRAND.HeroGallery.AbstractCalloutLogic, Standard.Callout);

  // exposed for traditional usage patterns and specs
  $.TNF.BRAND.HeroGallery.Standard = {Item: Standard.Item, Callout: Standard.Callout};

}(jQuery));
(function($) {

  var Rotator = {};

  //********************************************************//
  /* Hero Galleries contain many Items.  This is for them.  Items have specific
   * markup, so check specs to see what that markup should look like.
   *
   * Items can have flyouts, and any number of callouts.
   *
   * @element - a jQuery element object (eg. $('#element').first())
   */
  //********************************************************//

  Rotator.Item = {

    build: function() {
      this.images = $.parseJSON(this.element.attr('data-image-paths'));
      this.totalFrames = this.images.length;
      this.content = this.element.find('div.hero-gallery-item-content');

      // add the flyout
      this.flyout = this.element.find('div.hero-gallery-flyout-left, div.hero-gallery-flyout-right', this.element).first();
      this.flyoutClose = $('<a>', {'class': 'hero-gallery-flyout-close'}).appendTo(this.flyout);

      this.flyoutWidth = parseInt(this.flyout.attr('data-width'));
      this.flyoutSide = this.flyout.hasClass('hero-gallery-flyout-left') ? 'left' : 'right';

      var rotatorContainer = $('.hero-gallery-rotator-container', this.element);
      this.rotator = $('.hero-gallery-rotator', rotatorContainer);
      this.loader = $('.hero-gallery-rotator-loading', rotatorContainer);
      this.image = $('img', this.rotator);
      this.activeIndex = 0;

      // preloading calls through to finishLoading when it's complete
      this.preload();
    },

    setupObservers: function() {
      // make the call to action open the flyout
      $('.cta a.arrow-box, .hero-cta a.hero-arrow-box', this.element).click(function(e) {
        var element = $(e.currentTarget);
        if (element.data('embed-code')) {
          e.preventDefault();
          this.embedCode = element.data('embed-code');
          this.adjustVideoSpace(true);
        } else if (element.data('flyout-link')) {
          e.preventDefault();
          this.showFlyout();
        }
      }.bind(this));

      this.element.find('a.hero-gallery-flyout-close').click(function() {
        this.hideFlyout();
      }.bind(this));

      this.element.bind('mousedown', function(e) {
        this.gallery.data('hero_gallery').stopAutoRotation();
        this.isTracking(e, true);
      }.bind(this));
      this.element.bind('mouseup', function(e) { this.isTracking(e, false); }.bind(this));
      this.element.bind('mousemove', function(e) { this.tracking(e); }.bind(this));
    },

    finishLoading: function() {

      var center = this.image.width() / 2;
      this.stepDistance = 30;

      // find all the callouts and instantiate them
      var callouts = this.element.find('div.hero-gallery-callout');
      this.callouts = [];
      callouts.each(function(i, element) {
        this.callouts.push(new Rotator.Callout($(element), center, this));
        $(element).css({top: '', left: '', visibility: 'visible', display: 'none'});
      }.bind(this));

      this.loader.hide();
    },


    isTracking: function(e, b) {
      if (b) e.preventDefault();
      this.mouseTracking = b;
      this.startingPageX = e.pageX;
    },

    tracking: function(e) {
      e.preventDefault();

      if (!this.mouseTracking) return;

      var moved = this.startingPageX - e.pageX;
      var direction = moved > 0 ? -1 : 1;
      if (Math.abs(moved) >= this.stepDistance) {
        this.startingPageX = e.pageX;
        this.activeIndex += direction;

        if (this.activeIndex >= this.images.length) {
          this.activeIndex = 0;
        } else if (this.activeIndex < 0) {
          this.activeIndex = this.images.length - 1;
        }

        this.image.attr('src', this.images[this.activeIndex]);

        for (var i = 0, length = this.callouts.length; i < length; i += 1) {
          this.callouts[i].position(this.activeIndex);
        }
      }
    },

    preload: function() {
      var loadedImages = 0;
      var imageErrors = 0;
      var imageQueue = [];

      for (var i = 1, length = this.images.length; i < length; i += 1) {
        var image = $(new Image());
        image.bind('load', (function(scope) {
          return function() {
            loadedImages += 1;
            imageQueue.push($(this));

            if (loadedImages === scope.images.length - 1) {
              scope.finishLoading();
              scope.cleanupImages(imageQueue);
            }
          };
        })(this));

        image.bind('error', (function(scope) {
          return function() {
            imageQueue.push($(this));
            imageErrors += 1;
            if (imageErrors === 2) {
              //TODO
            }
          };
        })(this));

        image.attr({src: this.images[i]});
      }
    },

    cleanupImages: function(images) {
      for (var i = 0, length = images.length; i < length; i += 1) {
        images[i].unbind();
        delete(images[i]);
      }
    },

    showFlyout: function(activeCallout) {

      if (this.activeCallout && this.activeCallout == activeCallout) {
        return false;
      } else if (this.activeCallout && this.activeCallout != activeCallout) {
        this.activeCallout.hide();
      }

      if (activeCallout) {
        this.activeCallout = activeCallout;
        activeCallout.show();
      }

      if (this.flyoutVisible) return;

      $("body").trigger({type: 'hero_gallery_flyout_opened', item: this});

      var animation = {};
      animation[this.flyoutSide] = -32;

      this.showFlyoutIEBranch();

      this.flyout.css(this.flyoutSide, -this.flyoutWidth).width(this.flyoutWidth).css('display', 'block');
      this.flyout.animate(animation, 200, 'easeInOutSine', function() {
        this.flyoutClose.fadeIn(200);
      }.bind(this));

      this.flyoutVisible = true;
    },

    hideFlyout: function(instant) {
      if (!this.flyoutVisible) return;

      if (this.activeCallout) {
        this.activeCallout.hide();
        this.activeCallout = false;
      }

      $("body").trigger({type: 'hero_gallery_flyout_closed', item: this, instant: instant});

      var animation = {};
      animation[this.flyoutSide] = -this.flyoutWidth - 32;

      this.content.css('display', 'block');

      this.hideFlyoutIEBranch();

      this.flyoutClose.hide();
      this.flyout.animate(animation, 200, 'easeInOutSine');

      this.flyoutVisible = false;
    }
  };

  Rotator.Item = Class.create($.extend(Rotator.Item, $.TNF.BRAND.HeroGallery.AbstractItemLogic));

  /* Items contain many Callouts.  Callouts are simply divs with some content,
   * a top and left, and the rest of the markup is built for you.
   *
   * @element - a jQuery element object (eg. $('#element').first())
   */

  Rotator.Callout = {

    initialize: function(element, center, item) {
      this.element = element;
      this.item = item;

      this.radius = Math.abs(center - parseInt(this.element.css('left'), 10));
      this.center = center;
      this.totalFrames = this.item.images.length;
      this.rotator = this.item.rotator;
      this.y = this.element.css('top');

      this.build();
      this.setupObservers();
    },

    build: function() {
      this.initialPosition = this.element.position();

      // add the marker
      this.rotator.append('<div class="hero-gallery-callout-marker"><em></em><a></a></div>');
      this.rotator.append('<div class="hero-gallery-callout-marker-interaction"></div>');

      // find the marker and get it's width
      this.marker = this.rotator.find('div.hero-gallery-callout-marker:last');
      this.markerCircle = this.marker.find('em');
      this.markerIndicator = this.marker.find('a');

      // get the size of the marker and where it's center is
      this.markerSize = this.marker.width();

      this.markerInteraction = this.rotator.find('div.hero-gallery-callout-marker-interaction:last')
          .css({zIndex: 30, top: this.initialPosition['top'] - (this.markerSize / 2)})
          .css({left: this.initialPosition['left'] - (this.markerSize / 2), width: 30, height: 30})
          .css({position: 'absolute'});

      // position the marker
      this.marker
        .css('top', this.initialPosition['top'] - (this.markerSize / 2))
        .css('left', this.initialPosition['left'] - (this.markerSize / 2));

      // position the marker circle
      this.markerCircle
        .css('top', this.markerSize / 2)
        .css('left', this.markerSize / 2);
    },

    setupObservers: function() {
      this.markerInteraction.bind('mouseover', function() {
        this.markerCircle.animate({top: 0, left: 0, width: this.markerSize, height: this.markerSize}, 100, 'easeInOutSine');
      }.bind(this));

      this.markerInteraction.bind('mouseout', function() {
        if (this.showing) return;
        this.deactivateMarker();
      }.bind(this));

      this.markerInteraction.bind('click', function() {
        this.item.showFlyout(this);
      }.bind(this));
    },

    show: function(instant) {
      this.showing = true;
      this.activateMarker();
      this.element.fadeIn();
    },

    hide: function(instant) {
      this.showing = false;
      this.deactivateMarker();
      this.element.fadeOut();
    },

    position: function(frameIndex) {
      var x = Math.floor(this.radius * Math.cos(2 * Math.PI * frameIndex / this.totalFrames));
      var y = Math.floor(this.radius * Math.sin(2 * Math.PI * frameIndex / this.totalFrames));
      var called;
      var callback = function() {
        var z = (y * -1) <= 0 ? 1 : 20;
        this.marker.css({zIndex: z});
      }.bind(this);

      if (y < 0) {
        callback();
        called = true;
      }

      this.markerInteraction.css({left: this.center + x - (this.markerSize / 2)});
      this.marker.stop(false, true).animate({left: this.center + x - (this.markerSize / 2)}, 100, (function(y) {
        return function () { if (!called) callback(); }
      })(y));
    }
  };

  Rotator.Callout = Class.create($.TNF.BRAND.HeroGallery.AbstractCalloutLogic, Rotator.Callout);

  // exposed for traditional usage patterns and specs
  $.TNF.BRAND.HeroGallery.Rotator = {Item: Rotator.Item, Callout: Rotator.Callout};

}(jQuery));
(function ($) {

  var MediaGalleryBase = Class.create({
    element: null,

    initialize: function(element) {
      this.element = element;
      this.setData();
      this.propagateManifest();
    },

    setData: function() {
      if (this.element.data(this.dataLabel)) {
        this.element.data(this.dataLabel).dispose();
      }
      this.element.data(this.dataLabel, this);
    },

    propagateManifest: function() {
      for (var attr in this.manifest) {
        var targetValue = this.manifest[attr],
            value = targetValue;

        if (typeof targetValue === 'object') {
          value = jQuery.extend(true, [], targetValue);
        }
        this[attr] = value;
      }
    },

    dispose: function() {
      this.element.data(this.dataLabel, null);
      this.element = null;
      this.propagateManifest();
    }

  });

  var MediaGallery = Class.create(MediaGalleryBase, {

    manifest: {
      thumbnails: [],
      player: null,
      thumbnailSetOffset: 0,
      trayViewportWidth: 605, // TODO: Pass this in or calculate it.
      initilizerTimeout: null
    },
    thumb_container: null,
    thumb_tray: null,
    dataLabel: 'media_gallery',

    initialize: function($super, element) {
      // eval('log($super)');
      $super(element);
      this.thumb_container = $('.horizontal-gallery-thumbs .thumbs', this.element);
      this.thumb_tray = $('.thumb-tray', this.thumb_container);
      this.thumb_inner = $('.thumb-inner', this.thumb_tray);
      this.trayViewportWidth = this.thumb_tray.width();
      this.build();
      this.setupObservers();
      if (this.thumbnails[0].element.data('embed-code')) {
        this.thumbnails[0].element.click();
      } else {
        this.thumbnails[0].element.addClass('selected');
      }
      this.explodeThumbnailTray();

      this.initialized = false;
    },

    explodeThumbnailTray: function () {
      var trayWidth = this.thumbnails.length * (this.thumbnails[0].element.width() + 5),
          result = this.trayViewportWidth - trayWidth,
          remainder = Math.abs(result) % this.trayViewportWidth,
          target = result;
      if (remainder > 0) {
        target = result + remainder - this.trayViewportWidth;
      }
      this.thumbnailSetMaxOffset = target;

      this.thumb_inner.width(trayWidth);
    },

    atThumbnailSetEnd: function() {
      return this.thumbnailSetOffset - this.trayViewportWidth < this.thumbnailSetMaxOffset;
    },

    atThumbnailSetBegin: function() {
      return this.thumbnailSetOffset + this.trayViewportWidth > 0;
    },

    nextThumbnailSet: function() {
      if (this.atThumbnailSetEnd()) {
        return; 
      }
      this.thumbnailSetOffset -= this.trayViewportWidth;
      this.thumb_inner.animate({ left: this.thumbnailSetOffset + 'px'});
      $('#prev_gallery').removeClass('inactive');

      if (this.atThumbnailSetEnd()) {
        $('#next_gallery').addClass('inactive');
      }
    },

    prevThumbnailSet: function() {
      if(this.atThumbnailSetBegin()) { return; }

      this.thumbnailSetOffset += this.trayViewportWidth;
      this.thumb_inner.animate({ left: this.thumbnailSetOffset + 'px'});
      $('#next_gallery').removeClass('inactive');

      if (this.atThumbnailSetBegin()) {
        $('#prev_gallery').addClass('inactive');
      }
    },

    build: function () {
      this.player = new Player($('.player-container', this.element), this);

      var thumbs = $('.thumb', this.element);
      thumbs.each(function(i, element) {
        this.thumbnails.push(new Thumb($(element).first(), this));
      }.bind(this));

      if (this.thumbnails.length > 5) {
        var nextThumbButton = $('<a href="#media-gallery" id="next_gallery">' + TNF.lang.media_gallery.ui.next + '</a>');
        var prevThumbButton = $('<a href="#media-gallery" id="prev_gallery" class="inactive">' + TNF.lang.media_gallery.ui.previous + '</a>');

        var thumbContainer = this.thumb_container;
        thumbContainer.append(nextThumbButton);
        thumbContainer.prepend(prevThumbButton);

        nextThumbButton.click(function(e) {
          e.preventDefault();
          this.nextThumbnailSet();
        }.bind(this));

        prevThumbButton.click(function(e) {
          e.preventDefault();
          this.prevThumbnailSet();
        }.bind(this));
      }

    },

    setupObservers: function() {
      this.element.bind('tnf:brand:media_gallery:media_changed', function(customEvent, options) {
        this.handleMediaChanged(options);
      }.bind(this));

      var filmStrip = this.thumb_container;

      // this could probably use some UI love...
      $('.thumb-opener', this.element).click(function(e) {
        e.preventDefault();
        filmStrip.clearQueue();
        filmStrip.slideToggle();
      });

      $('.lightbox-gallery').live('click', function(e) {
        e.preventDefault();

        var cacheImage = document.createElement('img'),
            imgContainer = $('<div id="lightbox-gallery-container" style="display: none"></div>');

        // preload the image here, otherwise we get problems
        // with the colorbox autosizing to an image that
        // isn't yet loaded
        cacheImage.src = $(this).attr('href');

        $('#content').append(imgContainer);

        imgContainer.append($(cacheImage));

        $(cacheImage).load(function () {
          $.colorbox({
            width: 957,
            maxWidth: 957,
            href: '#lightbox-gallery-container',
            inline: true,
            onLoad: function () {
              imgContainer.show();
              $.fn.colorbox.resize();
              $('#colorbox').addClass('brand');
            },
            onCleanup: function () {
              imgContainer.remove();
            },
            onClosed: function () {
              $('#colorbox').removeClass('brand');
            }
          });
        });

      });
    },

    handleMediaChanged: function(options) {
      this.player.updateMedia(options);
    }
  });

  var Thumb = Class.create(MediaGalleryBase, {

    manifest: {
      gallery: null
    },
    dataLabel: 'media_gallery_thumb',

    initialize: function($super, element, gallery) {
      // eval('log($super)');
      $super(element);
      this.element = $(this.element);
      this.gallery = gallery;
      this.preloadImage();
      this.setupObservers();
    },
    preloadImage: function(){
      var img, src = this.element.data('full-size-src');
      if (src) {
        img = new Image();
        img.src = src;
      }
    },

    setupObservers: function() {
      this.element.click(function(event) { this.handleClick(event); }.bind(this));
    },

    handleClick: function(event) {
      event.preventDefault();

      if(this.element.hasClass('selected')) { return; }
      var eventData = {
            src: this.element.attr('href'),
            embedCode: this.element.data('embed-code'),
            fullSizeSrc: this.element.data('full-size-src')
          },
          siblings = this.element.siblings();

      siblings.removeClass('selected');
      this.element.addClass('selected');
      this.element.trigger('tnf:brand:media_gallery:media_changed', eventData);
    }

  });

  var Player = Class.create(MediaGalleryBase, {

    manifest: {
      gallery: null,
      incomingPlayer: null,
      outgoingPlayer: null,
      updateVideoInterval: null,
      mediaOptions: {},
      dimensions: [0, 0]
    },
    dataLabel: 'media_gallery_player',

    initialize: function($super, element, gallery) {
      // eval('log($super)');
      $super(element);
      this.gallery = gallery;
      this.setDimensions();
    },

    setDimensions: function() {
      this.dimensions = [ this.gallery.element.width(), this.gallery.element.height() ];
    },

    // This is meant to be the primary public interface for this class.
    // Usage: player.updateMedia({src: 'image.jpg'}); // load an image
    //        player.updateMedia({embedCode: 'blahblahblah'}); // load a video
    updateMedia: function(options) {
      this.mediaOptions = options;
      this.incomingPlayer = this.element.clone().empty();
      this.incomingPlayer.css({'z-index': 7});
      this.outgoingPlayer = this.element;
      this.outgoingPlayer.css({'z-index': 8});
      this.element.after(this.incomingPlayer);
      this.element = this.incomingPlayer;
      this.loadMedia();
    },

    // PRIVATE FOR NOW...

    loadMedia: function() {
      // set up stuff here
      var self = this;

      if (this.videoInterface) {
        this.videoInterface.pause();
      }

      if (typeof this.mediaOptions['embedCode'] !== 'undefined') {
        this.videoInterface = $.TNF.BRAND.videoInterface.factory({
          container: this.element,
          width: this.dimensions[0],
          height: this.dimensions[1],
          embedCode: this.mediaOptions.embedCode,
          onLoad: function() {
            setTimeout(function(){
              self.updateInterface();
            },500); // this time out is here because some browsers seem to try to pause the video after it has moved off the screen... 
          }
        });
      } else if (this.mediaOptions.src) {
        this.element.append('<img src="' + this.mediaOptions.src + '" />');

        if (this.mediaOptions.fullSizeSrc) {
          this.element.append('<a href="' + this.mediaOptions.fullSizeSrc + '" class="lightbox-gallery">' + TNF.lang.gallery.ui.full_size + '</a>');
        }

        this.videoInterface = null;
        setTimeout(function(){
          this.updateInterface();
        }.bind(this),500);// this time out is here because some browsers seem to try to pause the video after it has moved off the screen... 
      }
    },

    updateInterface: function() {
      var self = this;

      if (this.gallery.initialized) {
        this.incomingPlayer.css({left: 676}).animate({left: '0px'}, 500);
      } else {
      
        setTimeout(function() {
         $('.horizontal-gallery-thumbs .thumbs').slideUp();
        }, 3000);
      
      }

      this.outgoingPlayer.animate({left: '-=676px'}, 500, function () {
        self.outgoingPlayer.remove();
      });

      this.gallery.initialized = true;
    }

  });

  $.TNF.BRAND.MediaGallery = MediaGallery;
  $.TNF.BRAND.MediaGalleryThumb = Thumb;
  $.TNF.BRAND.MediaGalleryPlayer = Player;

  $.fn.tnf_brand_media_gallerize = function () {
    return this.each(function () {
      new MediaGallery($(this));
    });
  };

}(jQuery));
(function ($) {

  var DisciplineFilter = Class.create({

    initialize: function(el, paginator, options) {
      this.el = el;
      this.options = options;
      this.paginator = paginator;
      this.callPaginator(this.options.collection);
      this.setupObservations();
    },

    callPaginator: function(options) {
      var paginatorOptions = $.extend({}, this.options, options);
      this.paginator.tnfBrandPaginator(paginatorOptions);
    },

    filterCollection: function (filterName) {
      // filter the collection with the given filter name
      var newCollection = [], i,
          firstPageOffset = false,
          allowsAlternateTemplates = false;
      if (filterName === "all") {
        newCollection = this.options.collection;
        firstPageOffset = this.options.firstPageOffset;
        allowsAlternateTemplates = true;
      } else {
        for(i=0; i<this.options.collection.length; i++) {
          if (jQuery.inArray(filterName, this.options.collection[i].sport_list.split(/, ?/)) >= 0 ){
            newCollection.push(this.options.collection[i]);
          }
        }
      }

      var options = {
        collection: newCollection,
        firstPageOffset: firstPageOffset,
        allowsAlternateTemplates: allowsAlternateTemplates
      };
      this.callPaginator(options);
    },

    setupObservations: function() {
      // watch for click events
      var lists = $("li", this.el),
          tabs = $("a", lists),
          that = this;

      tabs.click(function(e){
        e.preventDefault();
        // grab filter name from "data-filter"
        var filterName = $(this).data("filter");
        // removing the old active class and add the new one
        lists.removeClass("active");
        $(this).parent().addClass("active");

        that.filterCollection(filterName);
      });
    }
    // TODO: watch the url and grab the hash for deep linking.

  });

$.TNF.BRAND.DisciplineFilter = DisciplineFilter;


$.fn.tnfBrandDisciplineFilterize = function (paginator, options) {
  return this.each(function () {
    new DisciplineFilter($(this), paginator, options);
  });
};

}(jQuery));
(function ($) {

  var RegionFilter = Class.create({

    initialize: function(el, options, paginatorOptions) {
      this.$el = $(el);
      this.options = options;
      this.paginatorOptions = paginatorOptions;
      this.generateJQuerySelectors();
      this.bindFilterSelect();
      this.paginate(this.options.collection);
    },

    generateJQuerySelectors: function() {
      for (var key in this.options.selectors) {
        this['$' + key] = $(this.options.selectors[key]);
      }
    },

    bindFilterSelect: function() {
      this.$el.change(function(e) {
        this.filterCollection(e.currentTarget.value);
      }.bind(this));
    },

    filterCollection: function (filterName) {
      var newCollection = [];
      if (filterName.toLowerCase() == this.options.defaultFilterName.toLowerCase()) {
        newCollection = this.options.collection;
      } else {
        for(i=0; i<this.options.collection.length; i++) {
          if (this.options.collection[i].region.toLowerCase() == filterName.toLowerCase()) {
            newCollection.push(this.options.collection[i]);
          }
        }
      }

      this.paginate(newCollection);
    },

    paginate: function(collection) {
      var newCollection = { collection: collection }; 
      var paginatorOptions = $.extend({}, this.paginatorOptions, newCollection);
      this.$paginator.tnfBrandPaginator(paginatorOptions);
    }

  });

$.TNF.BRAND.RegionFilter = RegionFilter;


$.fn.tnfBrandRegionFilterize = function (options, paginatorOptions) {
  return this.each(function () {
    new RegionFilter($(this), options, paginatorOptions);
  });
};

}(jQuery));
(function ($) {

  var Item  = Class.create({

    initialize: function( el ) {
      var that = this;
      this.$item = $(el);
      this.$image = $(".image img", this.$item);
      this.$date = $(".date", this.$item);
      this.$text = $(".text", this.$item);
      this.$author = $(".author", this.$item);

      this.$paras = $("p", this.$text);
      // grab teaser element
      var teaserText = this.$text.data("teaser");
      this.$text.prepend("<p class='teaser'>" + teaserText + "<a href='#' class='read-more'>" + TNF.lang.events.ui.read_more + "</a></p>");
      this.$teaser = $(".teaser", this.$text);
      this.$readMore = $(".read-more", this.$teaser);
      this.$readMore.click(function(e){
        e.preventDefault();
        that.$item.trigger('readMore');
        that.loadFull();
      });
      this.swapImages(this.$image);
    },

    loadFull: function() {
//      var that = this;
      this.$item.removeClass("item-teaser");
      this.swapImages(this.$image);
      this.$image.addClass("active");
      this.$author.show();
      this.$paras.show();
      this.$teaser.hide();
      this.$item.trigger('readMore');
      this.$item.fadeIn("slow");

    },

    loadTeaser: function() {
      this.$item.addClass("item-teaser");
      if (this.$image.hasClass("active")){
        this.swapImages(this.$image);
        this.$image.removeClass("active");
      }
      this.$author.hide();
      this.$paras.hide();
      this.$teaser.show();
      this.$item.fadeIn("slow");
    },

    swapImages: function($image){
      if (!this.$image.hasClass("event")){
        var newImageUrl = $image.attr("data-src");
        $image.attr("data-src", $image.attr("src"));
        $image.attr("src", newImageUrl);
      }
    }

  });
  var EventBuilder  = Class.create({

    initialize: function( el, activity ) {
      var that = this;
      this.eventPanel = $("#events-panel");
      this.cont = $("#item-container");
      this.$loadingDivCont = $(document.createElement('div'));
      this.$loadingDiv = $(document.createElement('div'));
      this.$loadingDiv.addClass("loading");
      this.$loadingDivCont.addClass("loading-cont");
      this.$loadingDivCont.append(this.$loadingDiv);
      this.cont.append(this.$loadingDivCont);
      this.top = Math.round( ( this.cont.height() - this.$loadingDiv.height() ) *0.5 ) - $(".tabs", this.cont).height() - $(".item-controls", this.cont).height();
      this.left = Math.round(  (this.eventPanel.width()/2) - (this.$loadingDiv.width()*0.5));
      this.eventTemplate = $(".item.template", this.eventPanel);
      this.$eventTemplateClone = this.eventTemplate.clone(false);
      this.eventTemplate.remove();
      this.eventsLoading = false;
      this.requestUrl = "http://www.planetexplore.com/api/event_list.php?page=1&display=24&activity=" + activity;
      el.mouseup(function(){
        if(!that.eventsLoading){
          that.showLoading(true);
          that.callAjax();
        }
      });
    },
    callAjax: function(){
      var that = this;

      $.ajax(this.requestUrl, {
        beforeSend: function(jqXHR, settings) {
          that.eventsLoading = true;
          that.showLoading(true);
        },
        cache: false,
        dataType: 'jsonp',
        success: function(json) {
          that.buildEvents(json);
        },
        error: function() {
          that.handleErrors();
        }
      });

    },
    handleErrors:function(){
      // TODO: show a message that says they should try again.
      this.showLoading(false);
      this.eventsLoading = false;
      this.$itemContainer = $("#events-panel");
      this.$itemContainer.append('<h2 class="heading" id="errorMsg">' + TNF.lang.events.errors.load_error + '</h2>');
    },
    showLoading: function(loading){
      var $errorMsg = $("#errorMsg");
      if ($errorMsg.length > 0) {
        $errorMsg.remove();
      }
      if (loading) {
        this.$loadingDiv.css({top:this.top, left:this.left});
        this.$loadingDiv.show();
      } else {
        this.$loadingDiv.hide();
      }
    },
    getEventMarkup: function(event) {
      var $localTemplate = this.$eventTemplateClone.clone(false);

      $localTemplate.attr('href', event.eventDetailUrl);

      // if (event.eventImageUrl !== null) {
        // $('.image img', $localTemplate).attr("src", "http://www.planetexplore.com/images/event_photo/" + event.eventImageUrl);
      // }else{
        // $('.image img', $localTemplate).attr("src", "/brand/images/test/article-teaser-156x123.jpg");
      // }
      (event.eventTitle) ? $('.item-title', $localTemplate).html(event.eventTitle) : $('.item-title', $localTemplate).hide();
      (event.eventLocation) ? $('.location span', $localTemplate).after(' ' + event.eventLocation) : $('.location', $localTemplate).hide();
      (event.eventStart) ? $('.date span', $localTemplate).after(' ' + event.eventStart) : $('.date', $localTemplate).hide();
      (event.eventSumaryFull) ? $('.text', $localTemplate).html("<p>" + event.eventSumaryFull + "</p>") : $('.text', $localTemplate).hide();
      $('.text', $localTemplate).attr("data-teaser", event.eventSummary);
      return $localTemplate;
    },

    buildEvents: function(json){
      if (typeof json.events !== 'undefined' && json.events.length > 0) {

        $.each(json.events, function(i) {
          this.eventPanel.append($(this.getEventMarkup(json.events[i])));
        }.bind(this));
        $(this.eventPanel).tnfBrandItemBuilder();

       this.showLoading(false);
      } else {
        this.handleErrors();
      }
    }


  });
  var ItemBuilder  = Class.create({

    initialize: function(el) {
      var that = this;
      this.panel = el;
      this.$itemContainer = $("#item-container");
      this.tabs = $(".tabs", this.$itemContainer );
      this.arrowBoxes = $(".big-arrow-box", this.$itemContainer );
      this.itemPerPage = this.arrowBoxes.length;
      if (this.itemPerPage < 1 ){
        this.itemPerPage = 3;
      }
      this.$itemControls = $(".item-controls", this.panel);

      this.$goBack = $(".go-back", this.$itemControls );
      this.$previous = $(".previous", this.$itemControls );
      this.$forward = $(".forward", this.$itemControls );
      this.$indicator = $(".indicator", this.$itemControls );
      this.items = [];
      this.itemElements = $(".item", this.panel);
      this.itemElements.each(function(){
        var item = new Item(this);
        item.$item.bind('readMore', function() {
          that.handlePagaination(true);
          that.hideItems();
        });
        that.items.push( item );
        $(this).hide();
      });
      this.pages = Math.ceil( this.itemElements.length / this.itemPerPage );
      this.curPage = 1;

      this.itemElements.prepend("<a href='#' class='go-back-top'>" + TNF.lang.events.ui.back + "</a>");
      this.$goBackTopLink = $(".go-back-top", this.itemElements);
      this.renderPage(this.curPage);
      this.setupObservations();
    },

    hideItems: function(fade) {
      if (fade) {
        this.panel.fadeOut("slow", function(){
          this.itemElements.hide(function(){
            this.panel.fadeIn("slow");
          });
        });
      } else {
        this.itemElements.hide();
      }
    },

    handlePagaination: function(goback) {
      if (goback){
        this.$goBackTopLink.show();
        this.$goBack.show();
        this.$previous.hide();
        this.$forward.hide();
        this.$indicator.hide();
      } else {
        this.$goBackTopLink.hide();
        this.$goBack.hide();
        if (this.curPage !== 1 ) {
          // We are at the start so don't show the previous button
          this.$previous.show();
        } else{
          this.$previous.hide();
        }
        if (this.curPage < this.pages) {
          // We are at the end so don't show the next button
          this.$forward.show();
        } else {
          this.$forward.hide();
        }
      }
    },
    updatePageIndicator: function(){
      if (this.pages > 1) {
        $(this.$indicator).html(TNF.lang.fallback_page_title + " " + this.curPage + " of " + this.pages);
        $(this.$indicator).fadeIn("slow");
      }
    },
    setupObservations: function() {
      var that = this;
      this.$goBack.click(function(e){
        e.preventDefault();
        that.scrollToTop();
        that.renderPage(that.curPage);
      });
      this.$goBackTopLink.click(function(e){
        e.preventDefault();
        that.scrollToTop();
        that.renderPage(that.curPage);
      });
      this.$previous.click(function(e){
        e.preventDefault();
        that.curPage = that.curPage - 1;
        that.renderPage(that.curPage);
      });
      this.$forward.click(function(e){
        e.preventDefault();
        that.curPage = that.curPage + 1;
        that.renderPage(that.curPage);
      });
    },
    scrollToTop: function() {
      var itemScrollTop = this.tabs.offset().top;
      if (($('html').scrollTop() || $('body').scrollTop()) > itemScrollTop) {
        $('html,body').animate({ scrollTop: itemScrollTop - 15 }, { duration: 'slow', easing: 'easeOutExpo'});
      }
    },
    renderPage: function(currentPage) {
      this.handlePagaination();
      this.hideItems();
      for( var i = ( currentPage - 1 ) * this.itemPerPage; i < ( this.itemPerPage * currentPage ); i++ ) {
        if (this.items[i]){
          this.items[i].loadTeaser();
        }
      }
      this.updatePageIndicator();
    }

  });

$.TNF.BRAND.EventBuilder = EventBuilder;

$.fn.tnfBrandEventBuilder = function (activity) {
  return this.each(function () {
    new EventBuilder($(this), activity);
  });
};

$.TNF.BRAND.ItemBuilder = ItemBuilder;


$.fn.tnfBrandItemBuilder = function () {
  return this.each(function () {
    new ItemBuilder($(this));
  });
};

}(jQuery));
(function($) {

  //Event Finder Singleton
  var EventFinder = Class.create({

    eventsPerPage: 4,

    initialize: function($element) {
      this.$container = $element;
      this.page = 1;
      this.working = false;
      this.init = false;

      this.process();
      this.build();
      this.setupObservers();
      this.$zipCodeField.val(this.$zipCodeField.attr('data-default-value'));
    },

    process: function() {
      this.$form = $('form', this.$container);
      this.$zipCodeField = $('#zip', this.$form);

      this.$resultsContainer = $('.find-results', this.$container);
      this.$allResultsSetsContainer = $(document.createElement('div'));
      this.$lockDiv = $(document.createElement('div')).addClass('find-lock');
      this.$searchForm = $('.find-box', this.$container);
      this.$newResultsSetContainer = $(document.createElement('div'));

      this.$eventBox = $('.event-box', this.$resultsContainer);
      this.eventBoxHeight = this.$eventBox.outerHeight();
      this.$eventTemplateClone = $(this.$eventBox).clone(false);
      this.$eventBox.remove();

      this.$submitButton = $('.find-event-submit', this.$form);
      this.$loadMoreButton = $('.find-more-events', this.$container);

      this.apiURL = this.$form.attr('action');
      this.newRequestURL = null;
      this.lastRequestURL = null;
    },

    build: function() {
      var self = this;

      this.$container.prepend(this.$lockDiv);

      this.$resultsContainer.append(this.$allResultsSetsContainer);

      this.$lockDiv.css({'top': self.$searchForm.position().top + 'px'});

      this.$resultsContainer.hide();
      this.$loadMoreButton.hide();
    },

    setupObservers: function() {
      this.$form.bind('submit', function() {
        this.getEvents(0);
        return false;
      }.bind(this));

      this.$submitButton.bind('click', function() {
        this.$form.submit();
        return false;
      }.bind(this));

      this.$loadMoreButton.bind('click', function() {
        this.getEvents(1);
        return false;
      }.bind(this));

      this.$zipCodeField.bind('focus', function() {
        if($(this).val() === $(this).attr('data-default-value')) {
          $(this).val('');
        }
      }).bind('blur', function() {
        if($(this).val() === '') {
          $(this).val($(this).attr('data-default-value'));
        }
      });
    },

    clearEvents: function() {
      this.$allResultsSetsContainer.empty();
    },

    getEvents: function(page) {

      this.newRequestURL = this.buildRequestURL(page);

      //Same request URL - or still in working state, i.e., AJAX
      if (this.newRequestURL === this.lastRequestURL || this.working) return false;
      if (this.page === 1 ) {
        this.clearEvents();
        this.$loadMoreButton.hide();
      }

      this.getEventsData();
    },

    getEventsData: function() {
      var self = this;

      $.ajax(this.newRequestURL, {
        beforeSend: function(jqXHR, settings) {
          self.lockInterface(true);
        }, 
        cache: false,
        dataType: 'jsonp',
        success: function(json) {
          self.lastRequestURL = self.newRequestURL;
          self.validateEvents(json);
        },
        error: function() {
          self.lastRequestURL = self.newRequestURL;
          self.handleErrors();
        }
      });
    },

    validateEvents: function(json) {
      if (typeof json.events !== 'undefined' && json.events.length > 0)
        this.addNewEvents(json);
      else
        this.handleErrors();
    },

    addNewEvents: function(json) {
      var $newResultsSetContainerClone = this.$newResultsSetContainer.clone();

      $.each(json.events, function(i) {
        $newResultsSetContainerClone.append($(this.getEventMarkup(json.events[i])));
      }.bind(this));

      this.$allResultsSetsContainer.append($newResultsSetContainerClone);


      this.lockInterface(false);

      this.transitionNewEvents();

    },


    transitionNewEvents: function() {

      if (!this.init) {
        this.$resultsContainer.slideDown();
        this.init = true;
      } else {
        this.stopRunningEventTransitions();
      }
      this.$loadMoreButton.show();

    },

    stopRunningEventTransitions: function() {
      $('html, body').stop(true, true);
      this.$allResultsSetsContainer.stop(true, true);
    },

    getEventMarkup: function(event) {
      var $localTemplate = this.$eventTemplateClone.clone(false);

      $localTemplate.attr('href', event.eventDetailUrl);
      //TODO: Image?
      (event.eventTitle) ? $('.title', $localTemplate).html(event.eventTitle) : $('.title', $localTemplate).hide();
      (event.eventLocation) ? $('.location span', $localTemplate).after(' ' + event.eventLocation) : $('.location', $localTemplate).hide();
      (event.eventStart) ? $('.date span', $localTemplate).after(' ' + event.eventStart) : $('.date', $localTemplate).hide();
      (event.eventSummary) ? $('.summary', $localTemplate).html(event.eventSummary) : $('.summary', $localTemplate).hide();

      return $localTemplate;
    },

    buildRequestURL: function(page) {
      this.page = (page) ? this.page += page : 1;
      return this.apiURL + '?' + this.$form.serialize() + '&page=' + this.page + '&display=' + this.eventsPerPage;
    },

    handleErrors: function() {
      this.lockInterface(false);
    },

    lockInterface: function(lock) {
      var self = this;

      if (lock) {
        var resultsHeight = 0;
        if (self.$resultsContainer.is(':visible')) {
          resultsHeight = self.$resultsContainer.outerHeight() + self.$loadMoreButton.outerHeight();
        }
        this.$lockDiv.css({ height: self.$searchForm.outerHeight() + resultsHeight + 'px'});

        this.working = true;
        this.$form.css({opacity: .5});
        $('*', this.$form).attr('disabled', 'disabled');
        this.$lockDiv.show();
      } else {
        this.working = false;
        this.$form.css({opacity: 1});
        $('*', this.$form).attr('disabled', '');
        this.$lockDiv.hide();
      }
    }
  });

  $.TNF.BRAND.EventFinder = EventFinder;

  // exposed for traditional usage patterns and specs
  $.fn.EventFinderize = function() {
    return this.each(function () {
      new EventFinder($(this));
    });
  };

}(jQuery));
/*global Class*/

/*global jQuery*/

(function ($) {

  var ProductsScroller = Class.create({

    initialize: function (el, options) {
      this.$el = $(el);
      this.options = $.extend({}, ProductsScroller.defaultOptions, options);
      this.generateJQuerySelectors();
      this.build();
    },

    generateJQuerySelectors: function () {
      for (var key in this.options.selectors) {
        if (typeof this.$el.find(this.options.selectors[key]) !== 'undefined') {
          this['$' + key] = this.$el.find(this.options.selectors[key]);
        }
      }
    },

    build: function () {
      this.fetchFromCategory();
    },

    fetchFromCategory: function () {
      var self = this,
          response,
          url = this.options.url + this.$el.attr('data-product-category-id');

      $.ajax({
        url: url,
        type: 'get',
        dataType: 'json',
        success: function (data) {
          self.updateProductsWith(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
          self.$el.trigger('tnf:products_scroller:ajax_error', [errorThrown]);
        }
      });
    },

    updateProductsWith: function (data) {
      var html = "";
      if (data.catentries && data.catentries.length) {
        html += '<div class="gutter-01"><div class="col-12">';
        html += '<h4 class="section-title">' + this.$el.attr('data-related-products-title') + '</h4>';
        html += '</div></div><div class="products-list">';
        $.each(data.catentries, function (i, product) {
          if (i >= 3) {
            return;
          }

          html += '<div class="gutter-01"><div class="col-04">';
          html += '<a class="box" href="' + product.url + '">';
          html += '<img src="' + product.imageUrl + '" alt="' + product.name + '" />';
          html += '<span class="rollover-bg"></span><span class="rollover">';
          html += '<h3>' + product.name + '</h3>';
          html += '<span class="cta">' + TNF.lang.products_scroller.in_action + '</span>';
          html += '</a></span></div></div>';
        });
        html += '</div>';
      } else {
      }
      this.$el.html(html);

      // Looks like jQuery formats the HTML itself. Unfortunately, we actually *do* want divs inside anchors...
      $('a.box img', this.$el).after('<div class="cta"><div class="arrow-box"><div class="arrow"></div></div></div>');
    }

  });

  ProductsScroller.defaultOptions = {
    url: '/',
    title: TNF.lang.products_scroller.proven_gear,
    selectors: {
      list: '.products-list'
    }
  };

  // exposed for traditional usage patterns and specs
  $.TNF.BRAND.ProductsScroller = ProductsScroller;

  // make it a jQuery plugin
  $.fn.tnfBrandProductsScroller = function (options) {
    return this.each(function () {
      return new ProductsScroller(this, options);
    });
  };

}(jQuery));
(function() {
  var Locale;
  Locale = (function() {
    var instance;
    function Locale() {}
    instance = null;
    Locale.singleton = function() {
      if (!(instance != null)) {
        instance = new this;
      }
      return instance;
    };
    Locale.prototype.locales = [
      {
        "catalog_identifier": "10251",
        "created_at": "2011-08-18T20:09:27Z",
        "id": 2,
        "lang_identifier": "-12",
        "language": "en",
        "name": "en-CA",
        "region": "CA",
        "store_identifier": "208",
        "updated_at": "2011-09-21T20:24:13Z"
      }, {
        "catalog_identifier": "10201",
        "created_at": "2011-03-04T21:31:30Z",
        "id": 1,
        "lang_identifier": "-1",
        "language": "en",
        "name": "en-US",
        "region": "US",
        "store_identifier": "207",
        "updated_at": "2011-08-19T18:12:06Z"
      }, {
        "catalog_identifier": "10251",
        "created_at": "2011-08-18T20:09:27Z",
        "id": 3,
        "lang_identifier": "-13",
        "language": "fr",
        "name": "fr-CA",
        "region": "CA",
        "store_identifier": "208",
        "updated_at": "2011-09-23T22:11:13Z"
      }
    ];
    Locale.prototype.current = function() {
      var currentLocale, locale;
      currentLocale = $('html').attr('lang');
      return ((function() {
        var _i, _len, _ref, _results;
        _ref = this.locales;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          locale = _ref[_i];
          if (("" + locale.language + "-" + locale.region) === currentLocale) {
            _results.push(locale);
          }
        }
        return _results;
      }).call(this))[0];
    };
    Locale.prototype.storeIdentifier = function() {
      return this.current()['store_identifier'];
    };
    Locale.prototype.catalogIdentifier = function() {
      return this.current()['catalog_identifier'];
    };
    Locale.prototype.langIdentifier = function() {
      return this.current()['lang_identifier'];
    };
    return Locale;
  })();
  $(function() {
    return $.TNF.BRAND.Locale = Locale.singleton();
  });
}).call(this);
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __indexOf = Array.prototype.indexOf || function(item) {
    for (var i = 0, l = this.length; i < l; i++) {
      if (this[i] === item) return i;
    }
    return -1;
  };
  $.TNF.BRAND.GeoContentReplacement = (function() {
    function GeoContentReplacement(data, container) {
      this.container = container;
      this.writeHeaderTopRightText(data["header-top-right-text"]);
      this.writeProductCTAText(data["product-cta-text"]);
      this.writeProductImageURL(data["product-image-url"]);
      this.writeProductName(data["product-name"]);
      this.writeProductLinkURL(data["product-url"]);
    }
    GeoContentReplacement.prototype.writeHeaderTopRightText = function(text) {
      return this.container.find(".col-headers a").text(text);
    };
    GeoContentReplacement.prototype.writeProductCTAText = function(text) {
      return this.container.find("a.box .rollover .cta").text(text);
    };
    GeoContentReplacement.prototype.writeProductImageURL = function(url) {
      return this.container.find("a.box img").attr("src", url);
    };
    GeoContentReplacement.prototype.writeProductName = function(text) {
      return this.container.find("a.box .rollover h3").text(text);
    };
    GeoContentReplacement.prototype.writeProductLinkURL = function(url) {
      return this.container.find("a.box").attr("href", url);
    };
    return GeoContentReplacement;
  })();
  $.TNF.BRAND.GeoContentableProductGrid = (function() {
    function GeoContentableProductGrid(el) {
      this.wrapper = $(el);
      this.geoData = this.wrapper.data("location-specific-grids");
      if ((this.state() != null) && (this.contentForState() != null)) {
        this.substituteDefaultContent();
      }
    }
    GeoContentableProductGrid.prototype.contentForState = function() {
      return this.geoData[this.region()];
    };
    GeoContentableProductGrid.prototype.state = function() {
      if (this.overrideParameter() != null) {
        return this.overrideParameter();
      } else {
        return $.cookie("Edgescape-State");
      }
    };
    GeoContentableProductGrid.prototype.overrideParameter = function() {
      var hash, hashes, pair, vars, _i, _len;
      vars = [];
      hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
      for (_i = 0, _len = hashes.length; _i < _len; _i++) {
        pair = hashes[_i];
        hash = pair.split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
      }
      return vars["overrideEdgescapeState"];
    };
    GeoContentableProductGrid.prototype.substituteDefaultContent = function() {
      return this.wrapper.find("> div").each(__bind(function(index, el) {
        var data;
        data = this.contentForState()[index];
        if (data != null) {
          return new $.TNF.BRAND.GeoContentReplacement(data, $(el));
        }
      }, this));
    };
    GeoContentableProductGrid.prototype.region = function() {
      var region, regions, _ref, _results;
      regions = {
        "NORTHEAST": ["CT", "DE", "DC", "ME", "MD", "MA", "MN", "NH", "NJ", "NY", "PA", "RI", "VT", "VA", "WV"],
        "SOUTHEAST": ["AL", "AR", "FL", "GA", "KY", "LA", "MI", "NC", "ND", "SC", "TN", "TX"],
        "WEST": ["AZ", "CA", "CO", "ID", "MT", "NV", "NM", "OR", "UT", "WA", "WY"],
        "MIDWEST": ["IL", "IN", "IA", "KA", "MI", "MO", "NE", "OH", "OK", "SD", "WI"]
      };
      _results = [];
      for (region in regions) {
        if ((_ref = this.state(), __indexOf.call(regions[region], _ref) >= 0)) {
          _results.push(region);
        }
      }
      return _results;
    };
    return GeoContentableProductGrid;
  })();
}).call(this);
// jquery.tweet.js - See http://tweet.seaofclouds.com/ or https://github.com/seaofclouds/tweet for more info
// Copyright (c) 2008-2011 Todd Matthews & Steve Purcell
(function($) {
  $.fn.tweet = function(o){
    var s = $.extend({
      username: null,                           // [string or array] required unless using the 'query' option; one or more twitter screen names (use 'list' option for multiple names, where possible)
      list: null,                               // [string]   optional name of list belonging to username
      favorites: false,                         // [boolean]  display the user's favorites instead of his tweets
      query: null,                              // [string]   optional search query (see also: http://search.twitter.com/operators)
      avatar_size: null,                        // [integer]  height and width of avatar if displayed (48px max)
      count: 3,                                 // [integer]  how many tweets to display?
      fetch: null,                              // [integer]  how many tweets to fetch via the API (set this higher than 'count' if using the 'filter' option)
      page: 1,                                  // [integer]  which page of results to fetch (if count != fetch, you'll get unexpected results)
      retweets: true,                           // [boolean]  whether to fetch (official) retweets (not supported in all display modes)
      intro_text: null,                         // [string]   do you want text BEFORE your your tweets?
      outro_text: null,                         // [string]   do you want text AFTER your tweets?
      join_text:  null,                         // [string]   optional text in between date and tweet, try setting to "auto"
      auto_join_text_default: "i said,",        // [string]   auto text for non verb: "i said" bullocks
      auto_join_text_ed: "i",                   // [string]   auto text for past tense: "i" surfed
      auto_join_text_ing: "i am",               // [string]   auto tense for present tense: "i was" surfing
      auto_join_text_reply: "i replied to",     // [string]   auto tense for replies: "i replied to" @someone "with"
      auto_join_text_url: "i was looking at",   // [string]   auto tense for urls: "i was looking at" http:...
      loading_text: null,                       // [string]   optional loading text, displayed while tweets load
      refresh_interval: null ,                  // [integer]  optional number of seconds after which to reload tweets
      twitter_url: "twitter.com",               // [string]   custom twitter url, if any (apigee, etc.)
      twitter_api_url: "api.twitter.com",       // [string]   custom twitter api url, if any (apigee, etc.)
      twitter_search_url: "search.twitter.com", // [string]   custom twitter search url, if any (apigee, etc.)
      template: "{avatar}{time}{join}{text}",   // [string or function] template used to construct each tweet <li> - see code for available vars
      comparator: function(tweet1, tweet2) {    // [function] comparator used to sort tweets (see Array.sort)
        return tweet2["tweet_time"] - tweet1["tweet_time"];
      },
      filter: function(tweet) {                 // [function] whether or not to include a particular tweet (be sure to also set 'fetch')
        return true;
      }
    }, o);

    // See http://daringfireball.net/2010/07/improved_regex_for_matching_urls
    var url_regexp = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/gi;

    // Expand values inside simple string templates with {placeholders}
    function t(template, info) {
      if (typeof template === "string") {
        var result = template;
        for(var key in info) {
          var val = info[key];
          result = result.replace(new RegExp('{'+key+'}','g'), val === null ? '' : val);
        }
        return result;
      } else return template(info);
    }
    // Export the t function for use when passing a function as the 'template' option
    $.extend({tweet: {t: t}});

    function replacer (regex, replacement) {
      return function() {
        var returning = [];
        this.each(function() {
          returning.push(this.replace(regex, replacement));
        });
        return $(returning);
      };
    }

    function escapeHTML(s) {
      return s.replace(/</g,"&lt;").replace(/>/g,"^&gt;");
    }

    $.fn.extend({
      linkUser: replacer(/(^|[\W])@(\w+)/gi, "$1@<a href=\"http://"+s.twitter_url+"/$2\">$2</a>"),
      // Support various latin1 (\u00**) and arabic (\u06**) alphanumeric chars
      linkHash: replacer(/(?:^| )[\#]+([\w\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u00ff\u0600-\u06ff]+)/gi,
                         ' <a href="http://'+s.twitter_search_url+'/search?q=&tag=$1&lang=all'+((s.username && s.username.length == 1 && !s.list) ? '&from='+s.username.join("%2BOR%2B") : '')+'">#$1</a>'),
      capAwesome: replacer(/\b(awesome)\b/gi, '<span class="awesome">$1</span>'),
      capEpic: replacer(/\b(epic)\b/gi, '<span class="epic">$1</span>'),
      makeHeart: replacer(/(&lt;)+[3]/gi, "<tt class='heart'>&#x2665;</tt>")
    });

    function linkURLs(text, entities) {
      return text.replace(url_regexp, function(match) {
        var url = (/^[a-z]+:/i).test(match) ? match : "http://"+match;
        var text = match;
        for(var i = 0; i < entities.length; ++i) {
          var entity = entities[i];
          if (entity.url == url && entity.expanded_url) {
            url = entity.expanded_url;
            text = entity.display_url;
            break;
          }
        }
        return "<a href=\""+escapeHTML(url)+"\">"+escapeHTML(text)+"</a>";
      });
    }

    function parse_date(date_str) {
      // The non-search twitter APIs return inconsistently-formatted dates, which Date.parse
      // cannot handle in IE. We therefore perform the following transformation:
      // "Wed Apr 29 08:53:31 +0000 2009" => "Wed, Apr 29 2009 08:53:31 +0000"
      return Date.parse(date_str.replace(/^([a-z]{3})( [a-z]{3} \d\d?)(.*)( \d{4})$/i, '$1,$2$4$3'));
    }

    function relative_time(date) {
      var relative_to = (arguments.length > 1) ? arguments[1] : new Date();
      var delta = parseInt((relative_to.getTime() - date) / 1000, 10);
      var r = '';
      if (delta < 1) {
        r = 'just now';
      } else if (delta < 60) {
        r = delta + ' seconds ago';
      } else if(delta < 120) {
        r = 'a minute ago';
      } else if(delta < (45*60)) {
        r = (parseInt(delta / 60, 10)).toString() + ' minutes ago';
      } else if(delta < (2*60*60)) {
        r = 'an hour ago';
      } else if(delta < (24*60*60)) {
        r = '' + (parseInt(delta / 3600, 10)).toString() + ' hours ago';
      } else if(delta < (48*60*60)) {
        r = 'a day ago';
      } else {
        r = (parseInt(delta / 86400, 10)).toString() + ' days ago';
      }
      return 'about ' + r;
    }

    function build_auto_join_text(text) {
      if (text.match(/^(@([A-Za-z0-9-_]+)) .*/i)) {
        return s.auto_join_text_reply;
      } else if (text.match(url_regexp)) {
        return s.auto_join_text_url;
      } else if (text.match(/^((\w+ed)|just) .*/im)) {
        return s.auto_join_text_ed;
      } else if (text.match(/^(\w*ing) .*/i)) {
        return s.auto_join_text_ing;
      } else {
        return s.auto_join_text_default;
      }
    }

    function build_api_url() {
      var proto = ('https:' == document.location.protocol ? 'https:' : 'http:');
      var count = (s.fetch === null) ? s.count : s.fetch;
      var common_params = '&include_entities=1&callback=?';
      if (s.list) {
        return proto+"//"+s.twitter_api_url+"/1/"+s.username[0]+"/lists/"+s.list+"/statuses.json?page="+s.page+"&per_page="+count+common_params;
      } else if (s.favorites) {
        return proto+"//"+s.twitter_api_url+"/favorites/"+s.username[0]+".json?page="+s.page+"&count="+count+common_params;
      } else if (s.query === null && s.username.length == 1) {
        return proto+'//'+s.twitter_api_url+'/1/statuses/user_timeline.json?screen_name='+s.username[0]+'&count='+count+(s.retweets ? '&include_rts=1' : '')+'&page='+s.page+common_params;
      } else {
        var query = (s.query || 'from:'+s.username.join(' OR from:'));
        return proto+'//'+s.twitter_search_url+'/search.json?&q='+encodeURIComponent(query)+'&rpp='+count+'&page='+s.page+common_params;
      }
    }

    function extract_avatar_url(item, secure) {
      if (secure) {
        return ('user' in item) ?
          item.user.profile_image_url_https :
          extract_avatar_url(item, false).
            replace(/^http:\/\/[a-z0-9]{1,3}\.twimg\.com\//, "https://s3.amazonaws.com/twitter_production/");
      } else {
        return item.profile_image_url || item.user.profile_image_url;
      }
    }

    // Convert twitter API objects into data available for
    // constructing each tweet <li> using a template
    function extract_template_data(item){
      var o = {};
      o.item = item;
      o.source = item.source;
      o.screen_name = item.from_user || item.user.screen_name;
      o.avatar_size = s.avatar_size;
      o.avatar_url = extract_avatar_url(item, (document.location.protocol === 'https:'));
      o.retweet = typeof(item.retweeted_status) != 'undefined';
      o.tweet_time = parse_date(item.created_at);
      o.join_text = s.join_text == "auto" ? build_auto_join_text(item.text) : s.join_text;
      o.tweet_id = item.id_str;
      o.twitter_base = "http://"+s.twitter_url+"/";
      o.user_url = o.twitter_base+o.screen_name;
      o.tweet_url = o.user_url+"/status/"+o.tweet_id;
      o.reply_url = o.twitter_base+"intent/tweet?in_reply_to="+o.tweet_id;
      o.retweet_url = o.twitter_base+"intent/retweet?tweet_id="+o.tweet_id;
      o.favorite_url = o.twitter_base+"intent/favorite?tweet_id="+o.tweet_id;
      o.retweeted_screen_name = o.retweet && item.retweeted_status.user.screen_name;
      o.tweet_relative_time = relative_time(o.tweet_time);
      o.entities = item.entities ? (item.entities.urls || []).concat(item.entities.media || []) : [];
      o.tweet_raw_text = o.retweet ? ('RT @'+o.retweeted_screen_name+' '+item.retweeted_status.text) : item.text; // avoid '...' in long retweets
      o.tweet_text = $([linkURLs(o.tweet_raw_text, o.entities)]).linkUser().linkHash()[0];
      o.tweet_text_fancy = $([o.tweet_text]).makeHeart().capAwesome().capEpic()[0];

      // Default spans, and pre-formatted blocks for common layouts
      o.user = t('<a class="tweet_user" href="{user_url}">{screen_name}</a>', o);
      o.join = s.join_text ? t(' <span class="tweet_join">{join_text}</span> ', o) : ' ';
      o.avatar = o.avatar_size ?
        t('<a class="tweet_avatar" href="{user_url}"><img src="{avatar_url}" height="{avatar_size}" width="{avatar_size}" alt="{screen_name}\'s avatar" title="{screen_name}\'s avatar" border="0"/></a>', o) : '';
      o.time = t('<span class="tweet_time"><a href="{tweet_url}" title="view tweet on twitter">{tweet_relative_time}</a></span>', o);
      o.text = t('<span class="tweet_text">{tweet_text_fancy}</span>', o);
      o.reply_action = t('<a class="tweet_action tweet_reply" href="{reply_url}">reply</a>', o);
      o.retweet_action = t('<a class="tweet_action tweet_retweet" href="{retweet_url}">retweet</a>', o);
      o.favorite_action = t('<a class="tweet_action tweet_favorite" href="{favorite_url}">favorite</a>', o);
      return o;
    }

    return this.each(function(i, widget){
      var list = $('<ul class="tweet_list">');
      var intro = '<p class="tweet_intro">'+s.intro_text+'</p>';
      var outro = '<p class="tweet_outro">'+s.outro_text+'</p>';
      var loading = $('<p class="loading">'+s.loading_text+'</p>');

      if(s.username && typeof(s.username) == "string"){
        s.username = [s.username];
      }

      $(widget).bind("tweet:load", function(){
        if (s.loading_text) $(widget).empty().append(loading);
        $.getJSON(build_api_url(), function(data){
          $(widget).empty().append(list);
          if (s.intro_text) list.before(intro);
          list.empty();

          var tweets = $.map(data.results || data, extract_template_data);
          tweets = $.grep(tweets, s.filter).sort(s.comparator).slice(0, s.count);
          list.append($.map(tweets, function(o) { return "<li>" + t(s.template, o) + "</li>"; }).join('')).
              children('li:first').addClass('tweet_first').end().
              children('li:odd').addClass('tweet_even').end().
              children('li:even').addClass('tweet_odd');

          if (s.outro_text) list.after(outro);
          $(widget).trigger("loaded").trigger((tweets.length === 0 ? "empty" : "full"));
          if (s.refresh_interval) {
            window.setTimeout(function() { $(widget).trigger("tweet:load"); }, 1000 * s.refresh_interval);
          }
        });
      }).trigger("tweet:load");
    });
  };
})(jQuery);
(function() {
  var TwitterSnippet;
  TwitterSnippet = (function() {
    function TwitterSnippet() {
      var element, twitter_usernames;
      element = $('.tweet-container');
      twitter_usernames = element.attr("data-twitter-usernames");
      element.tweet({
        count: 3,
        username: twitter_usernames.split(/, ?/),
        loading_text: 'Loading Tweets...',
        template: "<a href='http://twitter.com/{screen_name}'>{screen_name}</a> {text} <div class='twitter-intents'>{time} {reply_action} {retweet_action} {favorite_action}</div>"
      });
    }
    return TwitterSnippet;
  })();
  $.TNF.BRAND.TwitterSnippet = TwitterSnippet;
}).call(this);
(function() {
  var RaceNav;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  RaceNav = (function() {
    function RaceNav() {
      this.redirectToVal = __bind(this.redirectToVal, this);      this.element = $('#race_event');
      this.setupObservers();
    }
    RaceNav.prototype.setupObservers = function() {
      return this.element.change(this.redirectToVal);
    };
    RaceNav.prototype.redirectToVal = function() {
      var path;
      path = this.element.val();
      if (path[0] === '/') {
        return window.location.replace(path);
      }
    };
    return RaceNav;
  })();
  $.TNF.BRAND.RaceNav = RaceNav;
}).call(this);
(function() {
  var RaceCountdown;
  RaceCountdown = (function() {
    function RaceCountdown(element) {
      if ($(element).length === 0) {
        return;
      }
      this.element = element;
      this.countdownElement = $('.race-countdown', this.element);
      this.dayElement = $('.race-units', this.element);
      this.applyCountdown();
    }
    RaceCountdown.prototype.applyCountdown = function() {
      var dayDelta, oneDay;
      oneDay = 1000 * 60 * 60 * 24;
      dayDelta = Math.ceil((this.raceDate() - this.today()) / oneDay);
      this.countdownElement.text(dayDelta);
      if (dayDelta === 1) {
        return this.dayElement.text('day');
      }
    };
    RaceCountdown.prototype.today = function() {
      return new Date();
    };
    RaceCountdown.prototype.raceDate = function() {
      return new Date(this.element.attr('title'));
    };
    return RaceCountdown;
  })();
  $.TNF.BRAND.RaceCountdown = RaceCountdown;
}).call(this);
(function() {
  var Rating;
  Rating = (function() {
    function Rating(element) {
      var ratingWidth;
      this.element = $(element);
      if (!(this.element.length > 0)) {
        return;
      }
      this.rating = this.element.data('rating');
      ratingWidth = 12 * this.rating;
      $('.rating-container', this.element).append("<span class='rating-scope'>out of 5</span>");
      $('.rating-container', this.element).append("<span style='width: " + ratingWidth + "px' class='rating-value'>" + this.rating + "</span>");
    }
    return Rating;
  })();
  $.TNF.BRAND.Rating = Rating;
}).call(this);
(function($) {
  $(function() {
    $.interface.initialize();
  });

  $.interface = {
    initialize: function() {
      this.trackPageView();
      this.activateNavigation();
      if ($(".faq-section").length) {this.setupFaq(); }
      if ($(".displayed_athletes").length) { this.toggleAthleteGrid(); }
      if ($("#media-gallery").length) { $("#media-gallery").tnf_brand_media_gallerize(); }
      if ($(".store_locator_frame").length) { this.setupStoreLocatorIframe(); }
      if ($('#related_products[data-product-category-id]').length) { this.setupProductsScroller(); }
      if ($('.share').length) { this.setupSharing(); }
      if ($('.paginator').length) { this.setupPaginator(); }
      if ($('.products-grid').length) { this.setupProductGridTracking(); }
      if (location.href.indexOf('/shop-by/') > -1) { this.setupShopByTracking(); }
      if ($('.boldchatNow').length) { this.setupBoldchatLink(); }
      if ($(".products-grid-wrapper").length) { this.setupGeoContentableProductGrids(); }
      if ($(".tweet-container").length) { new $.TNF.BRAND.TwitterSnippet() }
      if ($("#race_event").length) { new $.TNF.BRAND.RaceNav() }
      new $.TNF.BRAND.RaceCountdown($('.race-start'))

      $('#rating-wrapper .rating').each(function() {
        new $.TNF.BRAND.Rating($(this));
      });

      if (top.Midas) {
        $('body').addClass('editing-via-midas');
      } else {
        $('body').removeClass('editing-via-midas');
      }

      this.resetAfterDomWrite();

      $('.tertiary table.chart').each(function(){
       $('tr:odd', this).addClass('odd');
      });
      $('.hero-box .cta a.video, .hero-cta a .hero-arrow-box').tnfInlineVideoExpanderer($(".hero-box.box"));

      $('#content').append('<div id="colorbox-empty-content"></div>');
      $('a.lightview').colorbox({
        iframe:true,
        innerWidth:'538px',
        innerHeight: '550px'
      });
    },

    resetAfterDomWrite: function() {
      var iframed;
      $('.lightbox').colorbox({
        innerWidth:"956px",
        innerHeight:"538px",
        inline: true,
        href: '#colorbox-empty-content',
        onComplete: function() {
          var embedCode = $(this).attr('data-embed-code'),
              iframeCont = $("#colorbox-empty-content");
         iframed = new $.TNF.BRAND.IframeVideoLoader(iframeCont,embedCode);
        },
        onLoad: function(){
          $('#colorbox').addClass('brand');
        },
        onClosed: function() {
          var player = $('.OoyalaVideoPlayer')[0];
          if ( player && typeof player.pauseMovie === 'function'){
            player.pauseMovie();
          }
          iframed.pause(); 
          $('#colorbox').removeClass('brand');
        },
        onCleanup: function() {
          var player = $('.OoyalaVideoPlayer')[0];
          if ( player && typeof player.pauseMovie === 'function'){
            player.pauseMovie();
          }
          iframed.pause(); 
          $('.ooyala-player').css({'height':'1px', 'width':'1px', 'overflow':'hidden'});
        }
      });
    },

    activateNavigation: function() {
      var uri = $.uri(window.location.href);
          navItems = $('#nav .main-menu li[class!="pipe"]');
      navItems.each(function(){
        var href = $('a', this).attr('href');
        if (uri.path.indexOf(href) > 0) {
          $(this).addClass('active');
        }
      });
    },

    setupShopByTracking: function () {
      if (typeof cmCreateManualLinkClickTag === 'function') {
        $('a.box').click(this.trackLink);
      }
    },

    setupProductGridTracking: function () {
      var buttons = $('.products-grid .buttons a'),
          products = $('.products-grid a.box');

      if (typeof cmCreateManualLinkClickTag === 'function') {
        $(buttons, products).click(this.trackLink);
      }
    },

    setupPaginator: function() {
      var $paginator = $('.paginator');
      if ($('.disciplines').length) {
        $('.disciplines').tnfBrandDisciplineFilterize($paginator, {
          collection: AthletesPage.collection,
          firstPageOffset: AthletesPage.firstPageOffset
        });
      } else if(typeof ExpeditionPage !== 'undefined') {
        $paginator.tnfBrandPaginator({
          collection: ExpeditionPage.collection,
          templateName: 'expedition_template',
          collectionTitle: 'Expedition',
          firstPageOffset: ExpeditionPage.firstPageOffset,
          selectors: {
            itemsContainer: '.expeditions-grid'
          }
        });
      }
    },

    setupProductsScroller: function() {
      var url = '';
      if((location.href.indexOf("thenorthface.com") > -1) || (location.href.indexOf("vfc.com") > -1)) {
        var storeId = $.TNF.BRAND.Locale.storeIdentifier(),
             langId = $.TNF.BRAND.Locale.langIdentifier(),
          catalogId = $.TNF.BRAND.Locale.catalogIdentifier();

        url = '/webapp/wcs/stores/servlet/CategoryInformation?storeId=' + storeId + '&langId=' + langId + '&catalogId=' + catalogId + '&identifier=';
      } else {
        url = '/products_scroller?identifier=';
      }

      $('#related_products[data-product-category-id]').tnfBrandProductsScroller({ url: url });
    },

    setupSharing: function(){
      $(".share").each(function(){
        $(this).tnfShareButtons();
      });
    },

    setupFaq: function(){
      $(".faq-item").each(function(){
        var that = this,
            dt = $(".faq-question", this),
            dd = $(".faq-answer", this);
        dd.hide();
        $(this).removeClass("active");
        dt.click(function(){
          $(that).toggleClass("active");
          dd.slideToggle("slow");
        });
      });
    },
    toggleAthleteGrid: function() {
      var togglerLink = $('#show_hide_athletes');

      if (togglerLink) {
        var athleteShowMoreText = $('#show_more_athletes_text', togglerLink),
            remainingAthleteBox = $('.remaining_athletes');
        togglerLink.toggle(function() {
          remainingAthleteBox.slideDown('slow');
          athleteShowMoreText.text(TNF.lang.athletes.ui.hide_additional_athletes); 
        }, function() {
          remainingAthleteBox.slideUp('slow');
          athleteShowMoreText.text(TNF.lang.athletes.ui.show_additional_athletes); 
        });
      }
    },
    setupStoreLocatorIframe: function() {
      var uri = $.uri(window.location.href),
          zipCode = uri.args.zipcode,
          src = 'http://locations.thenorthface.com/',
          pageName = TNF.lang.storeLocator.page;
      if (uri.args.tab === 'stores') pageName = pageName.replace(/index/, "stores");
      src += pageName;
      if (zipCode) src += '?form=locator_search&addressline=' + zipCode;

      storeLocatorContainer = $('.store_locator_frame')
      if (storeLocatorContainer.hasClass("retail")) {
        var prefix = "&";
        if (src.indexOf("?") == -1) {
          prefix = "?";
        }

        src += prefix + "NORTHFACE=1";
      }

      storeLocatorContainer.append($('<iframe id="store-locator" src="' + src + '" scrolling="no" frameborder="0" />'));
    },

    trackLink: function(event) {
      // "this" === the anchor that was clicked in this context
      try {
        if (typeof cmCreateManualLinkClickTag === 'function') {
          var href = $(this).attr('href'),
              currentPageName = $('h1').first().text(),
              targetPageName = $(this).text().replace(/(\s{3})/g, ''),
              linkName = currentPageName + ' / ' + targetPageName,
              pageId = $('#content').attr('data-tracking-page-id') || location.pathname;

          cmCreateManualLinkClickTag(href, linkName, pageId);
        }
      } catch (e) {
        // intentionally do nothing on error to ensure that user is taken to the page
      }
      return true;
    },

    trackPageView: function() {
      try {
        if (typeof cmCreatePageviewTag === 'function') {
          var categoryID = $('#content').attr('data-tracking-category-id') || 'no category assigned',
              pageID = $('#content').attr('data-tracking-page-id') || location.pathname;
          cmCreatePageviewTag(pageID, categoryID);
        }
      } catch (e) {
        // intentionally do nothing on error to ensure that user is taken to the page
      }
    },

    setupBoldchatLink: function() {
      var boldchatWebId = "4388611242818298611";
      if ( location.href.indexOf('www') > -1 ) {
        boldchatWebId = "483713437851576667";
      }
      $('.boldchatNow').click(function(e) {
        e.preventDefault();
        window.open('https://livechat.boldchat.com/aid/303292010053200/bc.chat?cwdid=1604085870321787882&wdid='+boldchatWebId+'&rdid=3546246270438552630&url='+escape(document.location.href),'Chat2432923122777161943','toolbar=0,scrollbars=1,location=0,statusbar=0,menubar=0,resizable=1,width=640,height=480');
      });
    },

    setupGeoContentableProductGrids: function() {
      $(".products-grid-wrapper").each(function(i, el) {
        new $.TNF.BRAND.GeoContentableProductGrid($(el));
      })
    }

  };
}(jQuery));
//
