(function ($) {
    ['width', 'height'].forEach(function (dimension) { $.fn[dimension] = function (value) { var offset, body = document.body, html = document.documentElement, Dimension = dimension.replace(/./, function (m) { return m[0].toUpperCase(); }); if (value === undefined) { return this[0] == window ? html['client' + Dimension] : this[0] == document ? Math.max(body['scroll' + Dimension], body['offset' + Dimension], html['client' + Dimension], html['scroll' + Dimension], html['offset' + Dimension]) : (offset = this.offset()) && offset[dimension]; } else { return this.each(function (idx) { $(this).css(dimension, value); }); } }; });['width', 'height'].forEach(function (dimension) { var offset, Dimension = dimension.replace(/./, function (m) { return m[0].toUpperCase(); }); $.fn['outer' + Dimension] = function (margin) { var elem = this; if (elem) { var size = elem[0]['offset' + Dimension], sides = { 'width': ['left', 'right'], 'height': ['top', 'bottom'] }; sides[dimension].forEach(function (side) { if (margin) { size += parseInt(elem.css('margin-' + side), 10); } }); return size; } else { return null; } }; });['width', 'height'].forEach(function (dimension) { var offset, Dimension = dimension.replace(/./, function (m) { return m[0].toUpperCase(); }); $.fn['inner' + Dimension] = function () { var elem = this; if (elem[0]['inner' + Dimension]) { return elem[0]['inner' + Dimension]; } else { var size = elem[0]['offset' + Dimension], sides = { 'width': ['left', 'right'], 'height': ['top', 'bottom'] }; sides[dimension].forEach(function (side) { size -= parseInt(elem.css('border-' + side + '-width'), 10); }); return size; } }; });["Left", "Top"].forEach(function (name, i) {
        var method = "scroll" + name; function isWindow(obj) { return obj && typeof obj === "object" && "setInterval" in obj; }
        function getWindow(elem) { return isWindow(elem) ? elem : elem.nodeType === 9 ? elem.defaultView || elem.parentWindow : false; }
        $.fn[method] = function (val) {
            var elem, win; if (val === undefined) {
                elem = this[0]; if (!elem) { return null; }
                win = getWindow(elem); return win ? ("pageXOffset" in win) ? win[i ? "pageYOffset" : "pageXOffset"] : win.document.documentElement[method] || win.document.body[method] : elem[method];
            }
            this.each(function () { win = getWindow(this); if (win) { var xCoord = !i ? val : $(win).scrollLeft(), yCoord = i ? val : $(win).scrollTop(); win.scrollTo(xCoord, yCoord); } else { this[method] = val; } });
        };
    }); $.fn.prevUntil = function (selector) {
        var n = this, array = []; while (n.length && !$(n).filter(selector).length) { array.push(n[0]); n = n.prev(); }
        return $(array);
    }; $.fn.nextUntil = function (selector) {
        var n = this, array = []; while (n.length && !n.filter(selector).length) { array.push(n[0]); n = n.next(); }
        return $(array);
    }; $._extend = $.extend; $.extend = function () { arguments[0] = arguments[0] || {}; return $._extend.apply(this, arguments); };
})(window.jQuery || window.Zepto); (function ($, undefined) {
    function testProps(props) {
        var i; for (i in props) { if (mod[props[i]] !== undefined) { return true; } }
        return false;
    }
    function testPrefix() {
        var prefixes = ['Webkit', 'Moz', 'O', 'ms'], p; for (p in prefixes) { if (testProps([prefixes[p] + 'Transform'])) { return '-' + prefixes[p].toLowerCase() + '-'; } }
        return '';
    }
    function init(that, options, args) {
        var ret = that; if (typeof options === 'object') {
            return that.each(function () {
                if (instances[this.id]) { instances[this.id].destroy(); }
                new $.mobiscroll.classes[options.component || 'Scroller'](this, options);
            });
        }
        if (typeof options === 'string') { that.each(function () { var r, inst = instances[this.id]; if (inst && inst[options]) { r = inst[options].apply(this, Array.prototype.slice.call(args, 1)); if (r !== undefined) { ret = r; return false; } } }); }
        return ret;
    }
    var id = +new Date(), instances = {}, extend = $.extend, mod = document.createElement('modernizr').style, has3d = testProps(['perspectiveProperty', 'WebkitPerspective', 'MozPerspective', 'OPerspective', 'msPerspective']), hasFlex = testProps(['flex', 'msFlex', 'WebkitBoxDirection']), prefix = testPrefix(), pr = prefix.replace(/^\-/, '').replace(/\-$/, '').replace('moz', 'Moz'); $.fn.mobiscroll = function (method) { extend(this, $.mobiscroll.components); return init(this, method, arguments); }; $.mobiscroll = $.mobiscroll || {
        version: '2.15.1', util: {
            prefix: prefix, jsPrefix: pr, has3d: has3d, hasFlex: hasFlex, testTouch: function (e, elm) {
                if (e.type == 'touchstart') { $(elm).attr('data-touch', '1'); } else if ($(elm).attr('data-touch')) { $(elm).removeAttr('data-touch'); return false; }
                return true;
            }, objectToArray: function (obj) {
                var arr = [], i; for (i in obj) { arr.push(obj[i]); }
                return arr;
            }, arrayToObject: function (arr) {
                var obj = {}, i; if (arr) { for (i = 0; i < arr.length; i++) { obj[arr[i]] = arr[i]; } }
                return obj;
            }, isNumeric: function (a) { return a - parseFloat(a) >= 0; }, isString: function (s) { return typeof s === 'string'; }, getCoord: function (e, c) { var ev = e.originalEvent || e; return ev.changedTouches ? ev.changedTouches[0]['page' + c] : e['page' + c]; }, getPosition: function (t, vertical) {
                var style = window.getComputedStyle ? getComputedStyle(t[0]) : t[0].style, matrix, px; if (has3d) { $.each(['t', 'webkitT', 'MozT', 'OT', 'msT'], function (i, v) { if (style[v + 'ransform'] !== undefined) { matrix = style[v + 'ransform']; return false; } }); matrix = matrix.split(')')[0].split(', '); px = vertical ? (matrix[13] || matrix[5]) : (matrix[12] || matrix[4]); } else { px = vertical ? style.top.replace('px', '') : style.left.replace('px', ''); }
                return px;
            }, constrain: function (val, min, max) { return Math.max(min, Math.min(val, max)); }, vibrate: function (time) { if ('vibrate' in navigator) { navigator.vibrate(time || 50); } }
        }, tapped: false, autoTheme: 'mobiscroll', presets: { scroller: {}, numpad: {}, listview: {}, menustrip: {} }, themes: { frame: {}, listview: {}, menustrip: {} }, i18n: {}, instances: instances, classes: {}, components: {}, defaults: { context: 'body', mousewheel: true, vibrate: true }, setDefaults: function (o) { extend(this.defaults, o); }, presetShort: function (name, c, p) { this.components[name] = function (s) { return init(this, extend(s, { component: c, preset: p === false ? undefined : name }), arguments); }; }
    }; $.mobiscroll.classes.Base = function (el, settings) {
        var lang, preset, s, theme, themeName, defaults, ms = $.mobiscroll, that = this; that.settings = {}; that._presetLoad = function () { }; that._init = function (ss) {
            s = that.settings; extend(settings, ss); if (that._hasDef) { defaults = ms.defaults; }
            extend(s, that._defaults, defaults, settings); if (that._hasTheme) {
                themeName = s.theme; if (themeName == 'auto' || !themeName) { themeName = ms.autoTheme; }
                if (themeName == 'default') { themeName = 'mobiscroll'; }
                settings.theme = themeName; theme = ms.themes[that._class][themeName];
            }
            if (that._hasLang) { lang = ms.i18n[s.lang]; }
            if (that._hasTheme) { that.trigger('onThemeLoad', [lang, settings]); }
            extend(s, theme, lang, defaults, settings); if (that._hasPreset) { that._presetLoad(s); preset = ms.presets[that._class][s.preset]; if (preset) { preset = preset.call(el, that); extend(s, preset, settings); } }
        }; that._destroy = function () { that.trigger('onDestroy', []); delete instances[el.id]; that = null; }; that.trigger = function (name, args) { var ret; args.push(that); $.each([defaults, theme, preset, settings], function (i, v) { if (v && v[name]) { ret = v[name].apply(el, args); } }); return ret; }; that.option = function (opt, value) {
            var obj = {}; if (typeof opt === 'object') { obj = opt; } else { obj[opt] = value; }
            that.init(obj);
        }; that.getInst = function () { return that; }; settings = settings || {}; if (!el.id) { el.id = 'mobiscroll' + (++id); }
        instances[el.id] = that;
    };
})(window.jQuery || window.Zepto); (function ($, window, document, undefined) {
    var $activeElm, preventShow, ms = $.mobiscroll, instances = ms.instances, util = ms.util, pr = util.jsPrefix, has3d = util.has3d, getCoord = util.getCoord, constrain = util.constrain, isString = util.isString, isOldAndroid = /android [1-3]/i.test(navigator.userAgent), isIOS8 = /(iphone|ipod|ipad).* os 8_/i.test(navigator.userAgent), animEnd = 'webkitAnimationEnd animationend', empty = function () { }, prevdef = function (ev) { ev.preventDefault(); }; ms.classes.Frame = function (el, settings, inherit) {
        var $ariaDiv, $ctx, $header, $markup, $overlay, $persp, $popup, $wnd, $wrapper, buttons, btn, doAnim, event, hasButtons, isModal, modalWidth, modalHeight, posEvents, preventPos, s, scrollLock, setReadOnly, wndWidth, wndHeight, that = this, $elm = $(el), elmList = [], posDebounce = {}; function onBtnStart(ev) {
            if (btn) { btn.removeClass('dwb-a'); }
            btn = $(this); if (!btn.hasClass('dwb-d') && !btn.hasClass('dwb-nhl')) { btn.addClass('dwb-a'); }
            if (ev.type === 'mousedown') { $(document).on('mouseup', onBtnEnd); }
        }
        function onBtnEnd(ev) {
            if (btn) { btn.removeClass('dwb-a'); btn = null; }
            if (ev.type === 'mouseup') { $(document).off('mouseup', onBtnEnd); }
        }
        function onWndKeyDown(ev) { if (ev.keyCode == 13) { that.select(); } else if (ev.keyCode == 27) { that.cancel(); } }
        function onShow(prevFocus) {
            if (!prevFocus) { $popup.focus(); }
            that.ariaMessage(s.ariaMessage);
        }
        function onHide(prevAnim) {
            var activeEl, value, type, focus = s.focusOnClose; $markup.remove(); if ($activeElm && !prevAnim) {
                setTimeout(function () {
                    if (focus === undefined || focus === true) {
                        preventShow = true; activeEl = $activeElm[0]; type = activeEl.type; value = activeEl.value; try { activeEl.type = 'button'; } catch (ex) { }
                        $activeElm.focus(); activeEl.type = type; activeEl.value = value;
                    } else if (focus) {
                        if (instances[$(focus).attr('id')]) { ms.tapped = false; }
                        $(focus).focus();
                    }
                }, 200);
            }
            that._isVisible = false; event('onHide', []);
        }
        function onPosition(ev) {
            clearTimeout(posDebounce[ev.type]); posDebounce[ev.type] = setTimeout(function () {
                var isScroll = ev.type == 'scroll'; if (isScroll && !scrollLock) { return; }
                that.position(!isScroll);
            }, 200);
        }
        function onFocus(ev) { if (!$popup[0].contains(ev.target)) { $popup.focus(); } }
        function show(beforeShow, $elm) {
            if (!ms.tapped) {
                if (beforeShow) { beforeShow(); }
                if ($(document.activeElement).is('input,textarea')) { $(document.activeElement).blur(); }
                $activeElm = $elm; that.show();
            }
            setTimeout(function () { preventShow = false; }, 300);
        }
        ms.classes.Base.call(this, el, settings, true); that.position = function (check) {
            var w, l, t, anchor, aw, ah, ap, at, al, arr, arrw, arrl, dh, scroll, sl, st, totalw = 0, minw = 0, css = {}, nw = Math.min($wnd[0].innerWidth || $wnd.innerWidth(), $persp.width()), nh = $wnd[0].innerHeight || $wnd.innerHeight(); if ((wndWidth === nw && wndHeight === nh && check) || preventPos) { return; }
            if (that._isFullScreen || /top|bottom/.test(s.display)) { $popup.width(nw); }
            if (event('onPosition', [$markup, nw, nh]) === false || !isModal) { return; }
            sl = $wnd.scrollLeft(); st = $wnd.scrollTop(); anchor = s.anchor === undefined ? $elm : $(s.anchor); if (that._isLiquid && s.layout !== 'liquid') { if (nw < 400) { $markup.addClass('dw-liq'); } else { $markup.removeClass('dw-liq'); } }
            if (!that._isFullScreen && /modal|bubble/.test(s.display)) { $wrapper.width(''); $('.mbsc-w-p', $markup).each(function () { w = $(this).outerWidth(true); totalw += w; minw = (w > minw) ? w : minw; }); w = totalw > nw ? minw : totalw; $wrapper.width(w).css('white-space', totalw > nw ? '' : 'nowrap'); }
            modalWidth = that._isFullScreen ? nw : $popup.outerWidth(); modalHeight = that._isFullScreen ? nh : $popup.outerHeight(true); scrollLock = modalHeight <= nh && modalWidth <= nw; that.scrollLock = scrollLock; if (s.display == 'modal') { l = Math.max(0, sl + (nw - modalWidth) / 2); t = st + (nh - modalHeight) / 2; } else if (s.display == 'bubble') {
                scroll = true; arr = $('.dw-arrw-i', $markup); ap = anchor.offset(); at = Math.abs($ctx.offset().top - ap.top); al = Math.abs($ctx.offset().left - ap.left); aw = anchor.outerWidth(); ah = anchor.outerHeight(); l = constrain(al - ($popup.outerWidth(true) - aw) / 2, sl + 3, sl + nw - modalWidth - 3); t = at - modalHeight; if ((t < st) || (at > st + nh)) { $popup.removeClass('dw-bubble-top').addClass('dw-bubble-bottom'); t = at + ah; } else { $popup.removeClass('dw-bubble-bottom').addClass('dw-bubble-top'); }
                arrw = arr.outerWidth(); arrl = constrain(al + aw / 2 - (l + (modalWidth - arrw) / 2), 0, arrw); $('.dw-arr', $markup).css({ left: arrl });
            } else { l = sl; if (s.display == 'top') { t = st; } else if (s.display == 'bottom') { t = st + nh - modalHeight; } }
            t = t < 0 ? 0 : t; css.top = t; css.left = l; $popup.css(css); $persp.height(0); dh = Math.max(t + modalHeight, s.context == 'body' ? $(document).height() : $ctx[0].scrollHeight); $persp.css({ height: dh }); if (scroll && ((t + modalHeight > st + nh) || (at > st + nh))) { preventPos = true; setTimeout(function () { preventPos = false; }, 300); $wnd.scrollTop(Math.min(t + modalHeight - nh, dh - nh)); }
            wndWidth = nw; wndHeight = nh;
        }; that.attachShow = function ($elm, beforeShow) {
            elmList.push({ readOnly: $elm.prop('readonly'), el: $elm }); if (s.display !== 'inline') {
                if (setReadOnly && $elm.is('input')) { $elm.prop('readonly', true).on('mousedown.dw', function (ev) { ev.preventDefault(); }); }
                if (s.showOnFocus) { $elm.on('focus.dw', function () { if (!preventShow) { show(beforeShow, $elm); } }); }
                if (s.showOnTap) { $elm.on('keydown.dw', function (ev) { if (ev.keyCode == 32 || ev.keyCode == 13) { ev.preventDefault(); ev.stopPropagation(); show(beforeShow, $elm); } }); that.tap($elm, function () { show(beforeShow, $elm); }); }
            }
        }; that.select = function () { if (!isModal || that.hide(false, 'set') !== false) { that._fillValue(); event('onSelect', [that._value]); } }; that.cancel = function () { if (!isModal || that.hide(false, 'cancel') !== false) { event('onCancel', [that._value]); } }; that.clear = function () {
            event('onClear', [$markup]); if (isModal && !that.live) { that.hide(false, 'clear'); }
            that.setVal(null, true);
        }; that.enable = function () { s.disabled = false; if (that._isInput) { $elm.prop('disabled', false); } }; that.disable = function () { s.disabled = true; if (that._isInput) { $elm.prop('disabled', true); } }; that.show = function (prevAnim, prevFocus) {
            var html; if (s.disabled || that._isVisible) { return; }
            if (doAnim !== false) {
                if (s.display == 'top') { doAnim = 'slidedown'; }
                if (s.display == 'bottom') { doAnim = 'slideup'; }
            }
            that._readValue(); event('onBeforeShow', []); html = '<div lang="' + s.lang + '" class="mbsc-' + s.theme + (s.baseTheme ? ' mbsc-' + s.baseTheme : '') + ' dw-' + s.display + ' ' +
            (s.cssClass || '') +
            (that._isLiquid ? ' dw-liq' : '') +
            (isOldAndroid ? ' mbsc-old' : '') +
            (hasButtons ? '' : ' dw-nobtn') + '">' + '<div class="dw-persp">' +
            (isModal ? '<div class="dwo"></div>' : '') + '<div' + (isModal ? ' role="dialog" tabindex="-1"' : '') + ' class="dw' + (s.rtl ? ' dw-rtl' : ' dw-ltr') + '">' +
            (s.display === 'bubble' ? '<div class="dw-arrw"><div class="dw-arrw-i"><div class="dw-arr"></div></div></div>' : '') + '<div class="dwwr">' + '<div aria-live="assertive" class="dw-aria dw-hidden"></div>' +
            (s.headerText ? '<div class="dwv">' + (isString(s.headerText) ? s.headerText : '') + '</div>' : '') + '<div class="dwcc">'; html += that._generateContent(); html += '</div>'; if (hasButtons) {
                html += '<div class="dwbc">'; $.each(buttons, function (i, b) {
                    b = isString(b) ? that.buttons[b] : b; if (b.handler === 'set') { b.parentClass = 'dwb-s'; }
                    if (b.handler === 'cancel') { b.parentClass = 'dwb-c'; }
                    b.handler = isString(b.handler) ? that.handlers[b.handler] : b.handler; html += '<div' + (s.btnWidth ? ' style="width:' + (100 / buttons.length) + '%"' : '') + ' class="dwbw ' + (b.parentClass || '') + '"><div tabindex="0" role="button" class="dwb' + i + ' dwb-e ' + (b.cssClass === undefined ? s.btnClass : b.cssClass) + (b.icon ? ' mbsc-ic mbsc-ic-' + b.icon : '') + '">' + (b.text || '') + '</div></div>';
                }); html += '</div>';
            }
            html += '</div></div></div></div>'; $markup = $(html); $persp = $('.dw-persp', $markup); $overlay = $('.dwo', $markup); $wrapper = $('.dwwr', $markup); $header = $('.dwv', $markup); $popup = $('.dw', $markup); $ariaDiv = $('.dw-aria', $markup); that._markup = $markup; that._header = $header; that._isVisible = true; posEvents = 'orientationchange resize'; that._markupReady($markup); event('onMarkupReady', [$markup]); if (isModal) {
                $(window).on('keydown', onWndKeyDown); if (s.scrollLock) { $markup.on('touchmove mousewheel wheel', function (ev) { if (scrollLock) { ev.preventDefault(); } }); }
                if (pr !== 'Moz') { $('input,select,button', $ctx).each(function () { if (!this.disabled) { $(this).addClass('dwtd').prop('disabled', true); } }); }
                posEvents += ' scroll'; ms.activeInstance = that; $markup.appendTo($ctx); if (has3d && doAnim && !prevAnim) { $markup.addClass('dw-in dw-trans').on(animEnd, function () { $markup.off(animEnd).removeClass('dw-in dw-trans').find('.dw').removeClass('dw-' + doAnim); onShow(prevFocus); }).find('.dw').addClass('dw-' + doAnim); }
            } else if ($elm.is('div') && !that._hasContent) { $elm.html($markup); } else { $markup.insertAfter($elm); }
            event('onMarkupInserted', [$markup]); that.position(); $wnd.on(posEvents, onPosition).on('focusin', onFocus); $markup.on('selectstart mousedown', prevdef).on('click', '.dwb-e', prevdef).on('keydown', '.dwb-e', function (ev) { if (ev.keyCode == 32) { ev.preventDefault(); ev.stopPropagation(); $(this).click(); } }).on('keydown', function (ev) {
                if (ev.keyCode == 32) { ev.preventDefault(); } else if (ev.keyCode == 9) {
                    var $focusable = $markup.find('[tabindex="0"]').filter(function () { return this.offsetWidth > 0 || this.offsetHeight > 0; }), index = $focusable.index($(':focus', $markup)), i = $focusable.length - 1, target = 0; if (ev.shiftKey) { i = 0; target = -1; }
                    if (index === i) { $focusable.eq(target).focus(); ev.preventDefault(); }
                }
            }); $('input', $markup).on('selectstart mousedown', function (ev) { ev.stopPropagation(); }); setTimeout(function () {
                $.each(buttons, function (i, b) { that.tap($('.dwb' + i, $markup), function (ev) { b = isString(b) ? that.buttons[b] : b; b.handler.call(this, ev, that); }, true); }); if (s.closeOnOverlay) { that.tap($overlay, function () { that.cancel(); }); }
                if (isModal && !doAnim) { onShow(prevFocus); }
                $markup.on('touchstart mousedown', '.dwb-e', onBtnStart).on('touchend', '.dwb-e', onBtnEnd); that._attachEvents($markup);
            }, 300); event('onShow', [$markup, that._tempValue]);
        }; that.hide = function (prevAnim, btn, force) {
            if (!that._isVisible || (!force && !that._isValid && btn == 'set') || (!force && event('onClose', [that._tempValue, btn]) === false)) { return false; }
            if ($markup) {
                if (pr !== 'Moz') { $('.dwtd', $ctx).each(function () { $(this).prop('disabled', false).removeClass('dwtd'); }); }
                if (has3d && isModal && doAnim && !prevAnim && !$markup.hasClass('dw-trans')) { $markup.addClass('dw-out dw-trans').find('.dw').addClass('dw-' + doAnim).on(animEnd, function () { onHide(prevAnim); }); } else { onHide(prevAnim); }
                $wnd.off(posEvents, onPosition).off('focusin', onFocus);
            }
            if (isModal) { $(window).off('keydown', onWndKeyDown); delete ms.activeInstance; }
        }; that.ariaMessage = function (txt) { $ariaDiv.html(''); setTimeout(function () { $ariaDiv.html(txt); }, 100); }; that.isVisible = function () { return that._isVisible; }; that.setVal = empty; that._generateContent = empty; that._attachEvents = empty; that._readValue = empty; that._fillValue = empty; that._markupReady = empty; that._processSettings = empty; that._presetLoad = function (s) { s.buttons = s.buttons || (s.display !== 'inline' ? ['set', 'cancel'] : []); s.headerText = s.headerText === undefined ? (s.display !== 'inline' ? '{value}' : false) : s.headerText; }; that.tap = function (el, handler, prevent) {
            var startX, startY, moved; if (s.tap) {
                el.on('touchstart.dw', function (ev) {
                    if (prevent) { ev.preventDefault(); }
                    startX = getCoord(ev, 'X'); startY = getCoord(ev, 'Y'); moved = false;
                }).on('touchmove.dw', function (ev) { if (Math.abs(getCoord(ev, 'X') - startX) > 20 || Math.abs(getCoord(ev, 'Y') - startY) > 20) { moved = true; } }).on('touchend.dw', function (ev) {
                    var that = this; if (!moved) { ev.preventDefault(); handler.call(that, ev); }
                    ms.tapped = true; setTimeout(function () { ms.tapped = false; }, 500);
                });
            }
            el.on('click.dw', function (ev) {
                if (!ms.tapped) { handler.call(this, ev); }
                ev.preventDefault();
            });
        }; that.destroy = function () { that.hide(true, false, true); $.each(elmList, function (i, v) { v.el.off('.dw').prop('readonly', v.readOnly); }); that._destroy(); }; that.init = function (ss) {
            that._init(ss); that._isLiquid = (s.layout || (/top|bottom/.test(s.display) ? 'liquid' : '')) === 'liquid'; that._processSettings(); $elm.off('.dw'); doAnim = isOldAndroid ? false : s.animate; buttons = s.buttons || []; isModal = s.display !== 'inline'; setReadOnly = s.showOnFocus || s.showOnTap; $wnd = $(s.context == 'body' ? window : s.context); $ctx = $(s.context); that.context = $wnd; that.live = true; $.each(buttons, function (i, b) { if (b == 'ok' || b == 'set' || b.handler == 'set') { that.live = false; return false; } }); that.buttons.set = { text: s.setText, handler: 'set' }; that.buttons.cancel = { text: (that.live) ? s.closeText : s.cancelText, handler: 'cancel' }; that.buttons.clear = { text: s.clearText, handler: 'clear' }; that._isInput = $elm.is('input'); hasButtons = buttons.length > 0; if (that._isVisible) { that.hide(true, false, true); }
            event('onInit', []); if (isModal) { that._readValue(); if (!that._hasContent) { that.attachShow($elm); } } else { that.show(); }
            $elm.on('change.dw', function () {
                if (!that._preventChange) { that.setVal($elm.val(), true, false); }
                that._preventChange = false;
            });
        }; that.buttons = {}; that.handlers = { set: that.select, cancel: that.cancel, clear: that.clear }; that._value = null; that._isValid = true; that._isVisible = false; s = that.settings; event = that.trigger; if (!inherit) { that.init(settings); }
    }; ms.classes.Frame.prototype._defaults = { lang: 'en', setText: 'Set', selectedText: 'Selected', closeText: 'Close', cancelText: 'Cancel', clearText: 'Clear', disabled: false, closeOnOverlay: true, showOnFocus: false, showOnTap: true, display: 'modal', scrollLock: true, tap: true, btnClass: 'dwb', btnWidth: true, focusOnClose: !isIOS8 }; ms.themes.frame.mobiscroll = { rows: 5, showLabel: false, headerText: false, btnWidth: false, selectedLineHeight: true, selectedLineBorder: 1, dateOrder: 'MMddyy', weekDays: 'min', checkIcon: 'ion-ios7-checkmark-empty', btnPlusClass: 'mbsc-ic mbsc-ic-arrow-down5', btnMinusClass: 'mbsc-ic mbsc-ic-arrow-up5', btnCalPrevClass: 'mbsc-ic mbsc-ic-arrow-left5', btnCalNextClass: 'mbsc-ic mbsc-ic-arrow-right5' }; $(window).on('focus', function () { if ($activeElm) { preventShow = true; } }); $(document).on('mouseover mouseup mousedown click', function (ev) { if (ms.tapped) { ev.stopPropagation(); ev.preventDefault(); return false; } });
})(window.jQuery || window.Zepto, window, document); (function ($, window, document, undefined) {
    var move, ms = $.mobiscroll, classes = ms.classes, util = ms.util, pr = util.jsPrefix, has3d = util.has3d, hasFlex = util.hasFlex, getCoord = util.getCoord, constrain = util.constrain, testTouch = util.testTouch; ms.presetShort('scroller', 'Scroller', false); classes.Scroller = function (el, settings, inherit) {
        var $markup, btn, isScrollable, itemHeight, multiple, s, scrollDebounce, trigger, click, moved, start, startTime, stop, p, min, max, target, index, lines, timer, that = this, $elm = $(el), iv = {}, pos = {}, pixels = {}, wheels = []; function onStart(ev) {
            if (testTouch(ev, this) && !move && !click && !btn && !isReadOnly(this)) {
                ev.preventDefault(); ev.stopPropagation(); move = true; isScrollable = s.mode != 'clickpick'; target = $('.dw-ul', this); setGlobals(target); moved = iv[index] !== undefined; p = moved ? getCurrentPosition(target) : pos[index]; start = getCoord(ev, 'Y'); startTime = new Date(); stop = start; scroll(target, index, p, 0.001); if (isScrollable) { target.closest('.dwwl').addClass('dwa'); }
                if (ev.type === 'mousedown') { $(document).on('mousemove', onMove).on('mouseup', onEnd); }
            }
        }
        function onMove(ev) { if (move) { if (isScrollable) { ev.preventDefault(); ev.stopPropagation(); stop = getCoord(ev, 'Y'); if (Math.abs(stop - start) > 3 || moved) { scroll(target, index, constrain(p + (start - stop) / itemHeight, min - 1, max + 1)); moved = true; } } } }
        function onEnd(ev) {
            if (move) {
                var time = new Date() - startTime, curr = constrain(Math.round(p + (start - stop) / itemHeight), min - 1, max + 1), val = curr, speed, dist, ttop = target.offset().top; ev.stopPropagation(); move = false; if (ev.type === 'mouseup') { $(document).off('mousemove', onMove).off('mouseup', onEnd); }
                if (has3d && time < 300) { speed = (stop - start) / time; dist = (speed * speed) / s.speedUnit; if (stop - start < 0) { dist = -dist; } } else { dist = stop - start; }
                if (!moved) {
                    var idx = Math.floor((stop - ttop) / itemHeight), li = $($('.dw-li', target)[idx]), valid = li.hasClass('dw-v'), hl = isScrollable; time = 0.1; if (trigger('onValueTap', [li]) !== false && valid) { val = idx; } else { hl = true; }
                    if (hl && valid) { li.addClass('dw-hl'); setTimeout(function () { li.removeClass('dw-hl'); }, 100); }
                    if (!multiple && (s.confirmOnTap === true || s.confirmOnTap[index]) && li.hasClass('dw-sel')) { that.select(); return; }
                } else { val = constrain(Math.round(p - dist / itemHeight), min, max); time = speed ? Math.max(0.1, Math.abs((val - curr) / speed) * s.timeUnit) : 0.1; }
                if (isScrollable) { calc(target, index, val, 0, time, true); }
            }
        }
        function onBtnStart(ev) {
            btn = $(this); if (testTouch(ev, this)) { step(ev, btn.closest('.dwwl'), btn.hasClass('dwwbp') ? plus : minus); }
            if (ev.type === 'mousedown') { $(document).on('mouseup', onBtnEnd); }
        }
        function onBtnEnd(ev) {
            btn = null; if (click) { clearInterval(timer); click = false; }
            if (ev.type === 'mouseup') { $(document).off('mouseup', onBtnEnd); }
        }
        function onKeyDown(ev) { if (ev.keyCode == 38) { step(ev, $(this), minus); } else if (ev.keyCode == 40) { step(ev, $(this), plus); } }
        function onKeyUp() { if (click) { clearInterval(timer); click = false; } }
        function onScroll(ev) { if (!isReadOnly(this)) { ev.preventDefault(); ev = ev.originalEvent || ev; var delta = ev.deltaY || ev.wheelDelta || ev.detail, t = $('.dw-ul', this); setGlobals(t); scroll(t, index, constrain(((delta < 0 ? -20 : 20) - pixels[index]) / itemHeight, min - 1, max + 1)); clearTimeout(scrollDebounce); scrollDebounce = setTimeout(function () { calc(t, index, Math.round(pos[index]), delta > 0 ? 1 : 2, 0.1); }, 200); } }
        function step(ev, w, func) { ev.stopPropagation(); ev.preventDefault(); if (!click && !isReadOnly(w) && !w.hasClass('dwa')) { click = true; var t = w.find('.dw-ul'); setGlobals(t); clearInterval(timer); timer = setInterval(function () { func(t); }, s.delay); func(t); } }
        function isReadOnly(wh) {
            if ($.isArray(s.readonly)) { var i = $('.dwwl', $markup).index(wh); return s.readonly[i]; }
            return s.readonly;
        }
        function generateWheelItems(i) {
            var html = '<div class="dw-bf">', w = wheels[i], l = 1, labels = w.labels || [], values = w.values || [], keys = w.keys || values; $.each(values, function (j, v) {
                if (l % 20 === 0) { html += '</div><div class="dw-bf">'; }
                html += '<div role="option" aria-selected="false" class="dw-li dw-v" data-val="' + keys[j] + '"' + (labels[j] ? ' aria-label="' + labels[j] + '"' : '') + ' style="height:' + itemHeight + 'px;line-height:' + itemHeight + 'px;">' + '<div class="dw-i"' + (lines > 1 ? ' style="line-height:' + Math.round(itemHeight / lines) + 'px;font-size:' + Math.round(itemHeight / lines * 0.8) + 'px;"' : '') + '>' + v + '</div></div>'; l++;
            }); html += '</div>'; return html;
        }
        function setGlobals(t) { multiple = t.closest('.dwwl').hasClass('dwwms'); min = $('.dw-li', t).index($(multiple ? '.dw-li' : '.dw-v', t).eq(0)); max = Math.max(min, $('.dw-li', t).index($(multiple ? '.dw-li' : '.dw-v', t).eq(-1)) - (multiple ? s.rows - (s.mode == 'scroller' ? 1 : 3) : 0)); index = $('.dw-ul', $markup).index(t); }
        function formatHeader(v) { var t = s.headerText; return t ? (typeof t === 'function' ? t.call(el, v) : t.replace(/\{value\}/i, v)) : ''; }
        function getCurrentPosition(t) { return Math.round(-util.getPosition(t, true) / itemHeight); }
        function ready(t, i) { clearTimeout(iv[i]); delete iv[i]; t.closest('.dwwl').removeClass('dwa'); }
        function scroll(t, index, val, time, active) {
            var px = -val * itemHeight, style = t[0].style; if (px == pixels[index] && iv[index]) { return; }
            pixels[index] = px; if (has3d) { style[pr + 'Transition'] = util.prefix + 'transform ' + (time ? time.toFixed(3) : 0) + 's ease-out'; style[pr + 'Transform'] = 'translate3d(0,' + px + 'px,0)'; } else { style.top = px + 'px'; }
            if (iv[index]) { ready(t, index); }
            if (time && active) { t.closest('.dwwl').addClass('dwa'); iv[index] = setTimeout(function () { ready(t, index); }, time * 1000); }
            pos[index] = val;
        }
        function getValid(val, t, dir, multiple, select) {
            var selected, cell = $('.dw-li[data-val="' + val + '"]', t), cells = $('.dw-li', t), v = cells.index(cell), l = cells.length; if (multiple) { setGlobals(t); } else if (!cell.hasClass('dw-v')) {
                var cell1 = cell, cell2 = cell, dist1 = 0, dist2 = 0; while (v - dist1 >= 0 && !cell1.hasClass('dw-v')) { dist1++; cell1 = cells.eq(v - dist1); }
                while (v + dist2 < l && !cell2.hasClass('dw-v')) { dist2++; cell2 = cells.eq(v + dist2); }
                if (((dist2 < dist1 && dist2 && dir !== 2) || !dist1 || (v - dist1 < 0) || dir == 1) && cell2.hasClass('dw-v')) { cell = cell2; v = v + dist2; } else { cell = cell1; v = v - dist1; }
            }
            selected = cell.hasClass('dw-sel'); if (select) {
                if (!multiple) { $('.dw-sel', t).removeAttr('aria-selected'); cell.attr('aria-selected', 'true'); }
                $('.dw-sel', t).removeClass('dw-sel'); cell.addClass('dw-sel');
            }
            return { selected: selected, v: multiple ? constrain(v, min, max) : v, val: cell.hasClass('dw-v') ? cell.attr('data-val') : null };
        }
        function scrollToPos(time, index, manual, dir, active) {
            if (trigger('validate', [$markup, index, time, dir]) !== false) {
                $('.dw-ul', $markup).each(function (i) { var t = $(this), multiple = t.closest('.dwwl').hasClass('dwwms'), sc = i == index || index === undefined, res = getValid(that._tempWheelArray[i], t, dir, multiple, true), selected = res.selected; if (!selected || sc) { that._tempWheelArray[i] = res.val; scroll(t, i, res.v, sc ? time : 0.1, sc ? active : false); } }); trigger('onValidated', []); that._tempValue = s.formatValue(that._tempWheelArray, that); if (that.live) { that._hasValue = manual || that._hasValue; setValue(manual, manual, 0, true); }
                that._header.html(formatHeader(that._tempValue)); if (manual) { trigger('onChange', [that._tempValue]); }
            }
        }
        function calc(t, idx, val, dir, time, active) { val = constrain(val, min, max); that._tempWheelArray[idx] = $('.dw-li', t).eq(val).attr('data-val'); scroll(t, idx, val, time, active); setTimeout(function () { scrollToPos(time, idx, true, dir, active); }, 10); }
        function plus(t) { var val = pos[index] + 1; calc(t, index, val > max ? min : val, 1, 0.1); }
        function minus(t) { var val = pos[index] - 1; calc(t, index, val < min ? max : val, 2, 0.1); }
        function setValue(fill, change, time, noscroll, temp) {
            if (that._isVisible && !noscroll) { scrollToPos(time); }
            that._tempValue = s.formatValue(that._tempWheelArray, that); if (!temp) { that._wheelArray = that._tempWheelArray.slice(0); that._value = that._hasValue ? that._tempValue : null; }
            if (fill) {
                trigger('onValueFill', [that._hasValue ? that._tempValue : '', change]); if (that._isInput) { $elm.val(that._hasValue ? that._tempValue : ''); }
                if (change) { that._preventChange = true; $elm.change(); }
            }
        }
        classes.Frame.call(this, el, settings, true); that.setVal = that._setVal = function (val, fill, change, temp, time) { that._hasValue = val !== null && val !== undefined; that._tempWheelArray = $.isArray(val) ? val.slice(0) : s.parseValue.call(el, val, that) || []; setValue(fill, change === undefined ? fill : change, time, false, temp); }; that.getVal = that._getVal = function (temp) { var val = that._hasValue || temp ? that[temp ? '_tempValue' : '_value'] : null; return util.isNumeric(val) ? +val : val; }; that.setArrayVal = that.setVal; that.getArrayVal = function (temp) { return temp ? that._tempWheelArray : that._wheelArray; }; that.setValue = function (val, fill, time, temp, change) { that.setVal(val, fill, change, temp, time); }; that.getValue = that.getArrayVal; that.changeWheel = function (idx, time, manual) {
            if ($markup) {
                var i = 0, nr = idx.length; $.each(s.wheels, function (j, wg) {
                    $.each(wg, function (k, w) {
                        if ($.inArray(i, idx) > -1) { wheels[i] = w; $('.dw-ul', $markup).eq(i).html(generateWheelItems(i)); nr--; if (!nr) { that.position(); scrollToPos(time, undefined, manual); return false; } }
                        i++;
                    }); if (!nr) { return false; }
                });
            }
        }; that.getValidCell = getValid; that.scroll = scroll; that._generateContent = function () {
            var lbl, html = '', l = 0; $.each(s.wheels, function (i, wg) {
                html += '<div class="mbsc-w-p dwc' + (s.mode != 'scroller' ? ' dwpm' : ' dwsc') + (s.showLabel ? '' : ' dwhl') + '">' + '<div class="dwwc"' + (s.maxWidth ? '' : ' style="max-width:600px;"') + '>' +
                (hasFlex ? '' : '<table class="dw-tbl" cellpadding="0" cellspacing="0"><tr>'); $.each(wg, function (j, w) {
                    wheels[l] = w; lbl = w.label !== undefined ? w.label : j; html += '<' + (hasFlex ? 'div' : 'td') + ' class="dwfl"' + ' style="' +
                    (s.fixedWidth ? ('width:' + (s.fixedWidth[l] || s.fixedWidth) + 'px;') : (s.minWidth ? ('min-width:' + (s.minWidth[l] || s.minWidth) + 'px;') : 'min-width:' + s.width + 'px;') +
                    (s.maxWidth ? ('max-width:' + (s.maxWidth[l] || s.maxWidth) + 'px;') : '')) + '">' + '<div class="dwwl dwwl' + l + (w.multiple ? ' dwwms' : '') + '">' +
                    (s.mode != 'scroller' ? '<div class="dwb-e dwwb dwwbp ' + (s.btnPlusClass || '') + '" style="height:' + itemHeight + 'px;line-height:' + itemHeight + 'px;"><span>+</span></div>' + '<div class="dwb-e dwwb dwwbm ' + (s.btnMinusClass || '') + '" style="height:' + itemHeight + 'px;line-height:' + itemHeight + 'px;"><span>&ndash;</span></div>' : '') + '<div class="dwl">' + lbl + '</div>' + '<div tabindex="0" aria-live="off" aria-label="' + lbl + '" role="listbox" class="dwww">' + '<div class="dww" style="height:' + (s.rows * itemHeight) + 'px;">' + '<div class="dw-ul" style="margin-top:' + (w.multiple ? (s.mode == 'scroller' ? 0 : itemHeight) : s.rows / 2 * itemHeight - itemHeight / 2) + 'px;">'; html += generateWheelItems(l) + '</div></div><div class="dwwo"></div></div><div class="dwwol"' +
                    (s.selectedLineHeight ? ' style="height:' + itemHeight + 'px;margin-top:-' + (itemHeight / 2 + (s.selectedLineBorder || 0)) + 'px;"' : '') + '></div></div>' +
                    (hasFlex ? '</div>' : '</td>'); l++;
                }); html += (hasFlex ? '' : '</tr></table>') + '</div></div>';
            }); return html;
        }; that._attachEvents = function ($markup) { $markup.on('keydown', '.dwwl', onKeyDown).on('keyup', '.dwwl', onKeyUp).on('touchstart mousedown', '.dwwl', onStart).on('touchmove', '.dwwl', onMove).on('touchend', '.dwwl', onEnd).on('touchstart mousedown', '.dwwb', onBtnStart).on('touchend', '.dwwb', onBtnEnd); if (s.mousewheel) { $markup.on('wheel mousewheel', '.dwwl', onScroll); } }; that._markupReady = function ($m) { $markup = $m; scrollToPos(); }; that._fillValue = function () { that._hasValue = true; setValue(true, true, 0, true); }; that._readValue = function () {
            var v = $elm.val() || ''; if (v !== '') { that._hasValue = true; }
            that._tempWheelArray = that._hasValue && that._wheelArray ? that._wheelArray.slice(0) : s.parseValue.call(el, v, that) || []; setValue();
        }; that._processSettings = function () {
            s = that.settings; trigger = that.trigger; itemHeight = s.height; lines = s.multiline; that._isLiquid = (s.layout || (/top|bottom/.test(s.display) && s.wheels.length == 1 ? 'liquid' : '')) === 'liquid'; if (s.formatResult) { s.formatValue = s.formatResult; }
            if (lines > 1) { s.cssClass = (s.cssClass || '') + ' dw-ml'; }
            if (s.mode != 'scroller') { s.rows = Math.max(3, s.rows); }
        }; that._selectedValues = {}; if (!inherit) { that.init(settings); }
    }; classes.Scroller.prototype = {
        _hasDef: true, _hasTheme: true, _hasLang: true, _hasPreset: true, _class: 'scroller', _defaults: $.extend({}, classes.Frame.prototype._defaults, {
            minWidth: 80, height: 40, rows: 3, multiline: 1, delay: 300, readonly: false, showLabel: true, confirmOnTap: true, wheels: [], mode: 'scroller', preset: '', speedUnit: 0.0012, timeUnit: 0.08, formatValue: function (d) { return d.join(' '); }, parseValue: function (value, inst) {
                var val = [], ret = [], i = 0, found, keys; if (value !== null && value !== undefined) { val = (value + '').split(' '); }
                $.each(inst.settings.wheels, function (j, wg) { $.each(wg, function (k, w) { keys = w.keys || w.values; found = keys[0]; $.each(keys, function (l, key) { if (val[i] == key) { found = key; return false; } }); ret.push(found); i++; }); }); return ret;
            }
        })
    }; ms.themes.scroller = ms.themes.frame;
})(window.jQuery || window.Zepto, window, document); (function ($, undefined) {
    var ms = $.mobiscroll, util = ms.util, isString = util.isString, defaults = { batch: 40, inputClass: '', invalid: [], rtl: false, showInput: true, groupLabel: 'Groups', checkIcon: 'checkmark', dataText: 'text', dataValue: 'value', dataGroup: 'group', dataDisabled: 'disabled' }; ms.presetShort('select'); ms.presets.scroller.select = function (inst) {
        var change, group, groupArray, groupChanged, groupTap, groupWheelIdx, i, input, optionArray, optionWheelIdx, option, origValues, prevGroup, timer, batchChanged = {}, batchStart = {}, batchEnd = {}, tempBatchStart = {}, tempBatchEnd = {}, orig = $.extend({}, inst.settings), s = $.extend(inst.settings, defaults, orig), batch = s.batch, layout = s.layout || (/top|bottom/.test(s.display) ? 'liquid' : ''), isLiquid = layout == 'liquid', elm = $(this), multiple = s.multiple || elm.prop('multiple'), id = this.id + '_dummy', lbl = $('label[for="' + this.id + '"]').attr('for', id), label = s.label !== undefined ? s.label : (lbl.length ? lbl.text() : elm.attr('name')), selectedClass = 'dw-msel mbsc-ic mbsc-ic-' + s.checkIcon, origReadOnly = s.readonly, data = s.data, hasData = !!data, hasGroups = hasData ? !!s.group : $('optgroup', elm).length, defaultValue = hasData ? (data[0] ? data[0][s.dataValue] : null) : $('option', elm).attr('value'), groupSetup = s.group, groupWheel = hasGroups && groupSetup && groupSetup.groupWheel !== false, groupSep = hasGroups && groupSetup && groupWheel && groupSetup.clustered === true, groupHdr = hasGroups && (!groupSetup || (groupSetup.header !== false && !groupSep)), values = elm.val() || [], invalid = [], selectedValues = {}, options = {}, groups = {}; function prepareData() {
            var gr, lbl, opt, txt, val, l = 0, c = 0, groupIndexes = {}; optionArray = []; groupArray = []; if (hasData) {
                $.each(s.data, function (i, v) {
                    txt = v[s.dataText]; val = v[s.dataValue]; lbl = v[s.dataGroup]; opt = { value: val, text: txt, index: i }; options[val] = opt; optionArray.push(opt); if (hasGroups) {
                        if (groupIndexes[lbl] === undefined) { gr = { text: lbl, value: c, options: [], index: c }; groups[c] = gr; groupIndexes[lbl] = c; groupArray.push(gr); c++; } else { gr = groups[groupIndexes[lbl]]; }
                        if (groupSep) { opt.index = gr.options.length; }
                        opt.group = groupIndexes[lbl]; gr.options.push(opt);
                    }
                    if (v[s.dataDisabled]) { invalid.push(val); }
                });
            } else { if (hasGroups) { $('optgroup', elm).each(function (i) { groups[i] = { text: this.label, value: i, options: [], index: i }; groupArray.push(groups[i]); $('option', this).each(function (j) { opt = { value: this.value, text: this.text, index: groupSep ? j : l++, group: i }; options[this.value] = opt; optionArray.push(opt); groups[i].options.push(opt); if (this.disabled) { invalid.push(this.value); } }); }); } else { $('option', elm).each(function (i) { opt = { value: this.value, text: this.text, index: i }; options[this.value] = opt; optionArray.push(opt); if (this.disabled) { invalid.push(this.value); } }); } }
            if (groupHdr) { optionArray = []; l = 0; $.each(groups, function (i, gr) { val = '__group' + i; opt = { text: gr.text, value: val, group: i, index: l++ }; options[val] = opt; optionArray.push(opt); invalid.push(opt.value); $.each(gr.options, function (j, opt) { opt.index = l++; optionArray.push(opt); }); }); }
        }
        function genValues(w, data, dataMap, value, index, multiple, label) {
            var i, wheel, keys = [], values = [], selectedIndex = dataMap[value] !== undefined ? dataMap[value].index : 0, start = Math.max(0, selectedIndex - batch), end = Math.min(data.length - 1, start + batch * 2); if (batchStart[index] !== start || batchEnd[index] !== end) {
                for (i = start; i <= end; i++) { values.push(data[i].text); keys.push(data[i].value); }
                batchChanged[index] = true; tempBatchStart[index] = start; tempBatchEnd[index] = end; wheel = { multiple: multiple, values: values, keys: keys, label: label }; if (isLiquid) { w[0][index] = wheel; } else { w[index] = [wheel]; }
            } else { batchChanged[index] = false; }
        }
        function genGroupWheel(w) { genValues(w, groupArray, groups, group, groupWheelIdx, false, s.groupLabel); }
        function genOptWheel(w) { genValues(w, groupSep ? groups[group].options : optionArray, options, option, optionWheelIdx, multiple, label); }
        function genWheels() {
            var w = [[]]; if (groupWheel) { genGroupWheel(w); }
            genOptWheel(w); return w;
        }
        function getOption(v) {
            if (multiple) {
                if (v && isString(v)) { v = v.split(','); }
                if ($.isArray(v)) { v = v[0]; }
            }
            option = v === undefined || v === null || v === '' ? defaultValue : v; if (groupWheel) { group = options[option].group; prevGroup = group; }
        }
        function getVal(temp, group) { var val = temp ? inst._tempWheelArray : (inst._hasValue ? inst._wheelArray : null); return val ? (s.group && group ? val : val[optionWheelIdx]) : null; }
        function onFill() {
            var txt, val, sel = [], i = 0; if (multiple) {
                val = []; for (i in selectedValues) { sel.push(options[i] ? options[i].text : ''); val.push(i); }
                txt = sel.join(', ');
            } else { val = option; txt = options[option] ? options[option].text : ''; }
            inst._tempValue = val; input.val(txt); elm.val(val);
        }
        function onTap(li) {
            var val = li.attr('data-val'), selected = li.hasClass('dw-msel'); if (multiple && li.closest('.dwwl').hasClass('dwwms')) {
                if (li.hasClass('dw-v')) { if (selected) { li.removeClass(selectedClass).removeAttr('aria-selected'); delete selectedValues[val]; } else { li.addClass(selectedClass).attr('aria-selected', 'true'); selectedValues[val] = val; } }
                return false;
            } else if (li.hasClass('dw-w-gr')) { groupTap = li.attr('data-val'); }
        }
        if (!s.invalid.length) { s.invalid = invalid; }
        if (groupWheel) { groupWheelIdx = 0; optionWheelIdx = 1; } else { groupWheelIdx = -1; optionWheelIdx = 0; }
        if (multiple) {
            elm.prop('multiple', true); if (values && isString(values)) { values = values.split(','); }
            for (i = 0; i < values.length; i++) { selectedValues[values[i]] = values[i]; }
        }
        prepareData(); getOption(elm.val()); $('#' + id).remove(); input = $('<input type="text" id="' + id + '" class="' + s.inputClass + '" placeholder="' + (s.placeholder || '') + '" readonly />'); if (s.showInput) { input.insertBefore(elm); }
        inst.attachShow(input); elm.addClass('dw-hsel').attr('tabindex', -1).closest('.ui-field-contain').trigger('create'); onFill(); inst.setVal = function (val, fill, change, temp, time) {
            if (multiple) {
                if (val && isString(val)) { val = val.split(','); }
                selectedValues = util.arrayToObject(val); val = val ? val[0] : null;
            }
            inst._setVal(val, fill, change, temp, time);
        }; inst.getVal = function (temp, group) {
            if (multiple) { return util.objectToArray(selectedValues); }
            return getVal(temp, group);
        }; inst.refresh = function () { prepareData(); batchStart = {}; batchEnd = {}; s.wheels = genWheels(); batchStart[groupWheelIdx] = tempBatchStart[groupWheelIdx]; batchEnd[groupWheelIdx] = tempBatchEnd[groupWheelIdx]; batchStart[optionWheelIdx] = tempBatchStart[optionWheelIdx]; batchEnd[optionWheelIdx] = tempBatchEnd[optionWheelIdx]; change = true; if (inst._isVisible) { inst.changeWheel(groupWheel ? [groupWheelIdx, optionWheelIdx] : [optionWheelIdx]); } }; inst.getValues = inst.getVal; inst.getValue = getVal; return {
            width: 50, layout: layout, headerText: false, anchor: input, confirmOnTap: groupWheel ? [false, true] : true, formatValue: function (d) {
                var i, opt, sel = []; if (multiple) {
                    for (i in selectedValues) { sel.push(options[i] ? options[i].text : ''); }
                    return sel.join(', ');
                }
                opt = d[optionWheelIdx]; return options[opt] ? options[opt].text : '';
            }, parseValue: function (val) { getOption(val === undefined ? elm.val() : val); return groupWheel ? [group, option] : [option]; }, onValueTap: onTap, onValueFill: onFill, onBeforeShow: function () {
                if (multiple && s.counter) { s.headerText = function () { var length = 0; $.each(selectedValues, function () { length++; }); return length + ' ' + s.selectedText; }; }
                getOption(elm.val()); if (groupWheel) { inst._tempWheelArray = [group, option]; }
                inst.refresh();
            }, onMarkupReady: function (dw) {
                dw.addClass('dw-select'); $('.dwwl' + groupWheelIdx, dw).on('mousedown touchstart', function () { clearTimeout(timer); }); $('.dwwl' + optionWheelIdx, dw).on('mousedown touchstart', function () { if (!groupChanged) { clearTimeout(timer); } }); if (groupHdr) { $('.dwwl' + optionWheelIdx, dw).addClass('dw-select-gr'); }
                if (multiple) { dw.addClass('dwms'); $('.dwwl', dw).on('keydown', function (e) { if (e.keyCode == 32) { e.preventDefault(); e.stopPropagation(); onTap($('.dw-sel', this)); } }).eq(optionWheelIdx).addClass('dwwms').attr('aria-multiselectable', 'true'); origValues = $.extend({}, selectedValues); }
            }, validate: function (dw, i, time, dir) {
                var j, v, changes = [], temp = inst.getArrayVal(true), tempGr = temp[groupWheelIdx], tempOpt = temp[optionWheelIdx], t1 = $('.dw-ul', dw).eq(groupWheelIdx), t2 = $('.dw-ul', dw).eq(optionWheelIdx); if (batchStart[groupWheelIdx] > 1) { $('.dw-li', t1).slice(0, 2).removeClass('dw-v').addClass('dw-fv'); }
                if (batchEnd[groupWheelIdx] < groupArray.length - 2) { $('.dw-li', t1).slice(-2).removeClass('dw-v').addClass('dw-fv'); }
                if (batchStart[optionWheelIdx] > 1) { $('.dw-li', t2).slice(0, 2).removeClass('dw-v').addClass('dw-fv'); }
                if (batchEnd[optionWheelIdx] < (groupSep ? groups[tempGr].options : optionArray).length - 2) { $('.dw-li', t2).slice(-2).removeClass('dw-v').addClass('dw-fv'); }
                if (!change) {
                    option = tempOpt; if (groupWheel) { group = options[option].group; if (i === undefined || i === groupWheelIdx) { group = +temp[groupWheelIdx]; groupChanged = false; if (group !== prevGroup) { option = groups[group].options[0].value; batchStart[optionWheelIdx] = null; batchEnd[optionWheelIdx] = null; groupChanged = true; s.readonly = [false, true]; } else { s.readonly = origReadOnly; } } }
                    if (hasGroups && (/__group/.test(option) || groupTap)) { option = groups[options[groupTap || option].group].options[0].value; tempOpt = option; groupTap = false; }
                    inst._tempWheelArray = groupWheel ? [tempGr, tempOpt] : [tempOpt]; if (groupWheel) { genGroupWheel(s.wheels); if (batchChanged[groupWheelIdx]) { changes.push(groupWheelIdx); } }
                    genOptWheel(s.wheels); if (batchChanged[optionWheelIdx]) { changes.push(optionWheelIdx); }
                    clearTimeout(timer); timer = setTimeout(function () {
                        if (changes.length) { change = true; groupChanged = false; prevGroup = group; batchStart[groupWheelIdx] = tempBatchStart[groupWheelIdx]; batchEnd[groupWheelIdx] = tempBatchEnd[groupWheelIdx]; batchStart[optionWheelIdx] = tempBatchStart[optionWheelIdx]; batchEnd[optionWheelIdx] = tempBatchEnd[optionWheelIdx]; inst._tempWheelArray = groupWheel ? [tempGr, option] : [option]; inst.changeWheel(changes, 0, i !== undefined); }
                        if (groupWheel) {
                            if (i === optionWheelIdx) { inst.scroll(t1, groupWheelIdx, inst.getValidCell(group, t1, dir, false, true).v, 0.1); }
                            inst._tempWheelArray[groupWheelIdx] = group;
                        }
                        s.readonly = origReadOnly;
                    }, i === undefined ? 100 : time * 1000); if (changes.length) { return groupChanged ? false : true; }
                }
                if (i === undefined && multiple) { v = selectedValues; j = 0; $('.dwwl' + optionWheelIdx + ' .dw-li', dw).removeClass(selectedClass).removeAttr('aria-selected'); for (j in v) { $('.dwwl' + optionWheelIdx + ' .dw-li[data-val="' + v[j] + '"]', dw).addClass(selectedClass).attr('aria-selected', 'true'); } }
                if (groupHdr) { $('.dw-li[data-val^="__group"]', dw).addClass('dw-w-gr'); }
                $.each(s.invalid, function (i, v) { $('.dw-li[data-val="' + v + '"]', t2).removeClass('dw-v dw-fv'); }); change = false;
            }, onClear: function (dw) { selectedValues = {}; input.val(''); $('.dwwl' + optionWheelIdx + ' .dw-li', dw).removeClass(selectedClass).removeAttr('aria-selected'); }, onCancel: function () { if (!inst.live && multiple) { selectedValues = $.extend({}, origValues); } }, onDestroy: function () { input.remove(); elm.removeClass('dw-hsel').removeAttr('tabindex'); }
        };
    };
})(window.jQuery || window.Zepto); (function ($, undefined) {
    var ms = $.mobiscroll, defaults = { invalid: [], showInput: true, inputClass: '' }; ms.presets.scroller.list = function (inst) {
        var orig = $.extend({}, inst.settings), s = $.extend(inst.settings, defaults, orig), layout = s.layout || (/top|bottom/.test(s.display) ? 'liquid' : ''), isLiquid = layout == 'liquid', origReadOnly = s.readonly, elm = $(this), input, prevent, id = this.id + '_dummy', lvl = 0, ilvl = 0, timer = {}, currLevel, currWheelVector = [], wa = s.wheelArray || createWheelArray(elm), labels = generateLabels(lvl), fwv = firstWheelVector(wa), w = generateWheelsFromVector(fwv, lvl); function setDisabled(dw, nrWheels, whArray, whVector) {
            var j, i = 0; while (i < nrWheels) {
                var currWh = $('.dwwl' + i, dw), inv = getInvalidKeys(whVector, i, whArray); for (j = 0; j < inv.length; j++) { $('.dw-li[data-val="' + inv[j] + '"]', currWh).removeClass('dw-v'); }
                i++;
            }
        }
        function getInvalidKeys(whVector, index, whArray) {
            var i = 0, n, whObjA = whArray, invalids = []; while (i < index) {
                var ii = whVector[i]; for (n in whObjA) { if (whObjA[n].key == ii) { whObjA = whObjA[n].children; break; } }
                i++;
            }
            i = 0; while (i < whObjA.length) {
                if (whObjA[i].invalid) { invalids.push(whObjA[i].key); }
                i++;
            }
            return invalids;
        }
        function createROVector(n, i) {
            var a = []; while (n) { a[--n] = true; }
            a[i] = false; return a;
        }
        function generateLabels(l) {
            var a = [], i; for (i = 0; i < l; i++) { a[i] = s.labels && s.labels[i] ? s.labels[i] : i; }
            return a;
        }
        function generateWheelsFromVector(wv, l, index) {
            var i = 0, j, obj, chInd, w = [[]], wtObjA = wa; if (l) { for (j = 0; j < l; j++) { if (isLiquid) { w[0][j] = {}; } else { w[j] = [{}]; } } }
            while (i < wv.length) {
                if (isLiquid) { w[0][i] = getWheelFromObjA(wtObjA, labels[i]); } else { w[i] = [getWheelFromObjA(wtObjA, labels[i])]; }
                j = 0; chInd = undefined; while (j < wtObjA.length && chInd === undefined) {
                    if (wtObjA[j].key == wv[i] && ((index !== undefined && i <= index) || index === undefined)) { chInd = j; }
                    j++;
                }
                if (chInd !== undefined && wtObjA[chInd].children) { i++; wtObjA = wtObjA[chInd].children; } else if ((obj = getFirstValidItemObjOrInd(wtObjA)) && obj.children) { i++; wtObjA = obj.children; } else { return w; }
            }
            return w;
        }
        function getFirstValidItemObjOrInd(wtObjA, getInd) {
            if (!wtObjA) { return false; }
            var i = 0, obj; while (i < wtObjA.length) { if (!(obj = wtObjA[i++]).invalid) { return getInd ? i - 1 : obj; } }
            return false;
        }
        function getWheelFromObjA(objA, lbl) {
            var wheel = { keys: [], values: [], label: lbl }, j = 0; while (j < objA.length) { wheel.values.push(objA[j].value); wheel.keys.push(objA[j].key); j++; }
            return wheel;
        }
        function hideWheels(dw, i) { $('.dwfl', dw).css('display', '').slice(i).hide(); }
        function firstWheelVector(wa) {
            var t = [], ndObjA = wa, obj, ok = true, i = 0; while (ok) { obj = getFirstValidItemObjOrInd(ndObjA); t[i++] = obj.key; ok = obj.children; if (ok) { ndObjA = ok; } }
            return t;
        }
        function calcLevelOfVector2(wv, index) {
            var t = [], ndObjA = wa, lvl = 0, next = false, i, childName, chInd; if (wv[lvl] !== undefined && lvl <= index) {
                i = 0; childName = wv[lvl]; chInd = undefined; while (i < ndObjA.length && chInd === undefined) {
                    if (ndObjA[i].key == wv[lvl] && !ndObjA[i].invalid) { chInd = i; }
                    i++;
                }
            } else { chInd = getFirstValidItemObjOrInd(ndObjA, true); childName = ndObjA[chInd].key; }
            next = chInd !== undefined ? ndObjA[chInd].children : false; t[lvl] = childName; while (next) {
                ndObjA = ndObjA[chInd].children; lvl++; next = false; chInd = undefined; if (wv[lvl] !== undefined && lvl <= index) {
                    i = 0; childName = wv[lvl]; chInd = undefined; while (i < ndObjA.length && chInd === undefined) {
                        if (ndObjA[i].key == wv[lvl] && !ndObjA[i].invalid) { chInd = i; }
                        i++;
                    }
                } else { chInd = getFirstValidItemObjOrInd(ndObjA, true); chInd = chInd === false ? undefined : chInd; childName = ndObjA[chInd].key; }
                next = chInd !== undefined && getFirstValidItemObjOrInd(ndObjA[chInd].children) ? ndObjA[chInd].children : false; t[lvl] = childName;
            }
            return { lvl: lvl + 1, nVector: t };
        }
        function createWheelArray(ul) {
            var wheelArray = []; lvl = lvl > ilvl++ ? lvl : ilvl; ul.children('li').each(function (index) {
                var that = $(this), c = that.clone(); c.children('ul,ol').remove(); var v = inst._processMarkup ? inst._processMarkup(c) : c.html().replace(/^\s\s*/, '').replace(/\s\s*$/, ''), inv = that.attr('data-invalid') ? true : false, wheelObj = { key: that.attr('data-val') === undefined || that.attr('data-val') === null ? index : that.attr('data-val'), value: v, invalid: inv, children: null }, nest = that.children('ul,ol'); if (nest.length) { wheelObj.children = createWheelArray(nest); }
                wheelArray.push(wheelObj);
            }); ilvl--; return wheelArray;
        }
        $('#' + id).remove(); if (s.showInput) { input = $('<input type="text" id="' + id + '" value="" class="' + s.inputClass + '" placeholder="' + (s.placeholder || '') + '" readonly />').insertBefore(elm); s.anchor = input; inst.attachShow(input); }
        if (!s.wheelArray) { elm.hide().closest('.ui-field-contain').trigger('create'); }
        return {
            width: 50, wheels: w, layout: layout, headerText: false, formatValue: function (d) {
                if (currLevel === undefined) { currLevel = calcLevelOfVector2(d, d.length).lvl; }
                return d.slice(0, currLevel).join(' ');
            }, parseValue: function (value) { return value ? (value + '').split(' ') : (s.defaultValue || fwv).slice(0); }, onBeforeShow: function () { var t = inst.getArrayVal(true); currWheelVector = t.slice(0); s.wheels = generateWheelsFromVector(t, lvl, lvl); prevent = true; }, onValueFill: function (v) { currLevel = undefined; if (input) { input.val(v); } }, onShow: function (dw) { $('.dwwl', dw).on('mousedown touchstart', function () { clearTimeout(timer[$('.dwwl', dw).index(this)]); }); }, onDestroy: function () {
                if (input) { input.remove(); }
                elm.show();
            }, validate: function (dw, index, time) {
                var args = [], t = inst.getArrayVal(true), i = (index || 0) + 1, j, o; if ((index !== undefined && currWheelVector[index] != t[index]) || (index === undefined && !prevent)) {
                    s.wheels = generateWheelsFromVector(t, null, index); o = calcLevelOfVector2(t, index === undefined ? t.length : index); currLevel = o.lvl; for (j = 0; j < t.length; j++) { t[j] = o.nVector[j] || 0; }
                    while (i < o.lvl) { args.push(i++); }
                    if (args.length) { s.readonly = createROVector(lvl, index); clearTimeout(timer[index]); timer[index] = setTimeout(function () { prevent = true; hideWheels(dw, o.lvl); currWheelVector = t.slice(0); inst.changeWheel(args, index === undefined ? time : 0, index !== undefined); s.readonly = origReadOnly; }, index === undefined ? 0 : time * 1000); return false; }
                } else { o = calcLevelOfVector2(t, t.length); currLevel = o.lvl; }
                currWheelVector = t.slice(0); setDisabled(dw, o.lvl, wa, t); hideWheels(dw, o.lvl); prevent = false;
            }
        };
    };
})(window.jQuery || window.Zepto);