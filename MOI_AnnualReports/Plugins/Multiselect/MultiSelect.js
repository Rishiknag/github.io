(function($) {
    'use strict';
    $.fn.mselect = function(options) {
        if ('string' === typeof options) {
            var settings = options;
        } else {
            var settings = $.extend({
                placeholder: 'Please select',
                numDisplayed: 5,
                overflowText: '{n} selected',
                searchText: 'Search',
                showSearch: true,
                optionFormatter: false
            }, options);
        }
        /**
         * Constructor
         */
        function mselect(select, settings) {
            this.$select = $(select);
            this.settings = settings;
            this.create();
        }
        /**
         * Prototype class
         */
        mselect.prototype = {
            create: function() {
                this.settings.multiple = this.$select.is('[multiple]');
                var multiple = this.settings.multiple ? ' multiple' : '';
                this.$select.wrap('<div class="ms-wrap' + multiple + '" tabindex="0" />');
                this.$select.before('<div class="ms-label-wrap"><div class="ms-label">' + this.settings.placeholder + '</div><span class="ms-arrow"></span></div>');
                this.$select.before('<div class="ms-dropdown hidden"><div class="ms-options"></div></div>');
                this.$select.addClass('hidden');
                this.$wrap = this.$select.closest('.ms-wrap');
                this.$wrap.data('id', window.mselect.num_items);
                window.mselect.num_items++;
                this.reload();
            },
            reload: function() {
                if (this.settings.showSearch) {
                    var search = '<div class="ms-search"><input type="search" class="form-control" placeholder="' + this.settings.searchText + '" /></div>';
                    this.$wrap.find('.ms-dropdown').prepend(search);
                }
                this.idx = 0;
                this.optgroup = 0;
                this.selected = [].concat(this.$select.val()); // force an array
                var choices = this.buildOptions(this.$select);
                this.$wrap.find('.ms-options').html(choices);
                this.reloadDropdownLabel();
            },
            destroy: function() {
                this.$wrap.find('.ms-label-wrap').remove();
                this.$wrap.find('.ms-dropdown').remove();
                this.$select.unwrap().removeClass('hidden');
            },
            buildOptions: function($element) {
                var $this = this;
                var choices = '';
                $element.children().each(function(i, el) {
                    var $el = $(el);
                    if ('optgroup' == $el.prop('nodeName').toLowerCase()) {
                        choices += '<div class="ms-optgroup-label" data-group="' + $this.optgroup + '">' + $el.prop('label') + '</div>';
                        choices += $this.buildOptions($el);
                        $this.optgroup++;
                    } else {
                        var val = $el.prop('value');
                        // exclude the first option in multi-select mode
                        if (0 < $this.idx || '' != val || !$this.settings.multiple) {
                            var disabled = $el.is(':disabled') ? ' disabled' : '';
                            var selected = -1 < $.inArray(val, $this.selected) ? ' selected' : '';
                            var group = ' g' + $this.optgroup;
                            var row = '<div class="ms-option' + selected + disabled + group + '" data-value="' + val + '" data-index="' + $this.idx + '"><span class="ms-checkbox"><i></i></span><div class="ms-option-label">' + $el.html() + '</div></div>';
                            if ('function' === typeof $this.settings.optionFormatter) {
                                row = $this.settings.optionFormatter(row);
                            }
                            choices += row;
                            $this.idx++;
                        }
                    }
                });
                return choices;
            },
            reloadDropdownLabel: function() {
                var settings = this.settings;
                var labelText = [];
                this.$wrap.find('.ms-option.selected').each(function(i, el) {
                    labelText.push($(el).find('.ms-option-label').text());
                });
                if (labelText.length < 1) {
                    labelText = settings.placeholder;
                } else if (labelText.length > settings.numDisplayed) {
                    labelText = settings.overflowText.replace('{n}', labelText.length);
                } else {
                    labelText = labelText.join(', ');
                }
                this.$wrap.find('.ms-label').html(labelText);
                //$('#comment').text(labelText,).attr('readonly', 'readonly'); // custom textarea
                this.$wrap.toggleClass('ms-default', labelText === settings.placeholder);
                this.$select.change();
            }
        }
        /**
         * Loop through each matching element
         */
        return this.each(function() {
            var data = $(this).data('mselect');
            if (!data) {
                data = new mselect(this, settings);
                $(this).data('mselect', data);
            }
            if ('string' === typeof settings) {
                data[settings]();
            }
        });
    }
    /**
     * Events
     */
    window.mselect = {
        'num_items': 0,
        'active_id': null,
        'active_el': null,
        'last_choice': null,
        'idx': -1
    };
    $(document).on('click', '.ms-option:not(.hidden, .disabled)', function(e) {
        var $wrap = $(this).closest('.ms-wrap');
        var do_close = false;
        if ($wrap.hasClass('multiple')) {
            var selected = [];
            // shift + click support
            if (e.shiftKey && null != window.mselect.last_choice) {
                var current_choice = parseInt($(this).attr('data-index'));
                var addOrRemove = !$(this).hasClass('selected');
                var min = Math.min(window.mselect.last_choice, current_choice);
                var max = Math.max(window.mselect.last_choice, current_choice);
                for (i = min; i <= max; i++) {
                    $wrap.find('.ms-option[data-index=' + i + ']').not('.hidden, .disabled').each(function() {
                        $(this).toggleClass('selected', addOrRemove);
                    });
                }
            } else {
                window.mselect.last_choice = parseInt($(this).attr('data-index'));
                $(this).toggleClass('selected');
            }
            $wrap.find('.ms-option.selected').each(function(i, el) {
                selected.push($(el).attr('data-value'));
            });
        } else {
            var selected = $(this).attr('data-value');
            $wrap.find('.ms-option').removeClass('selected');
            $(this).addClass('selected');
            do_close = true;
        }
        $wrap.find('select').val(selected);
        $wrap.find('select').mselect('reloadDropdownLabel');
        // fire an event
        $(document).trigger('ms:changed', $wrap);
        if (do_close) {
            closeDropdown($wrap);
        }
    });
    $(document).on('keyup', '.ms-search input', function(e) {
        if (40 == e.which) { // down
            $(this).blur();
            return;
        }
        var $wrap = $(this).closest('.ms-wrap');
        var matchOperators = /[|\\{}()[\]^$+*?.]/g;
        var keywords = $(this).val().replace(matchOperators, '\\$&');
        $wrap.find('.ms-option, .ms-optgroup-label').removeClass('hidden');
        if ('' != keywords) {
            $wrap.find('.ms-option').each(function() {
                var regex = new RegExp(keywords, 'gi');
                if (null === $(this).find('.ms-option-label').text().match(regex)) {
                    $(this).addClass('hidden');
                }
            });
            $wrap.find('.ms-optgroup-label').each(function() {
                var group = $(this).attr('data-group');
                var num_visible = $(this).closest('.ms-options').find('.ms-option.g' + group + ':not(.hidden)').length;
                if (num_visible < 1) {
                    $(this).addClass('hidden');
                }
            });
        }
        setIndexes($wrap);
    });
    $(document).on('click', function(e) {
        var $el = $(e.target);
        var $wrap = $el.closest('.ms-wrap');
        if (0 < $wrap.length) {
            // user clicked another mselect box
            if ($wrap.data('id') !== window.mselect.active_id) {
                closeDropdown();
            }
            // mselect box was toggled
            if ($el.hasClass('ms-label') || $el.hasClass('ms-arrow')) {
                var is_hidden = $wrap.find('.ms-dropdown').hasClass('hidden');
                if (is_hidden) {
                    openDropdown($wrap);
                } else {
                    closeDropdown($wrap);
                }
            }
        }
        // clicked outside, close all mselect boxes
        else {
            closeDropdown();
        }
    });
    $(document).on('keydown', function(e) {
        var $wrap = window.mselect.active_el;
        var $target = $(e.target);
        // toggle the dropdown on space
        if ($target.hasClass('ms-wrap')) {
            if (32 == e.which) {
                $target.find('.ms-label').trigger('click');
                return;
            }
        }
        // preserve spaces during search
        else if (0 < $target.closest('.ms-search').length) {
            if (32 == e.which) {
                return;
            }
        } else if (null === $wrap) {
            return;
        }
        if (38 == e.which) { // up
            e.preventDefault();
            $wrap.find('.ms-option.hl').removeClass('hl');
            var $current = $wrap.find('.ms-option[data-index=' + window.mselect.idx + ']');
            var $prev = $current.prevAll('.ms-option:not(.hidden, .disabled)');
            if ($prev.length > 0) {
                window.mselect.idx = parseInt($prev.attr('data-index'));
                $wrap.find('.ms-option[data-index=' + window.mselect.idx + ']').addClass('hl');
                setScroll($wrap);
            } else {
                window.mselect.idx = -1;
                $wrap.find('.ms-search input').focus();
            }
        } else if (40 == e.which) { // down
            e.preventDefault();
            var $current = $wrap.find('.ms-option[data-index=' + window.mselect.idx + ']');
            if ($current.length < 1) {
                var $next = $wrap.find('.ms-option:not(.hidden, .disabled):first');
            } else {
                var $next = $current.nextAll('.ms-option:not(.hidden, .disabled)');
            }
            if ($next.length > 0) {
                window.mselect.idx = parseInt($next.attr('data-index'));
                $wrap.find('.ms-option.hl').removeClass('hl');
                $wrap.find('.ms-option[data-index=' + window.mselect.idx + ']').addClass('hl');
                setScroll($wrap);
            }
        } else if (32 == e.which || 13 == e.which) { // space, enter
            e.preventDefault();
            $wrap.find('.ms-option.hl').click();
        } else if (27 == e.which) { // esc
            closeDropdown($wrap);
        }
    });

    function setIndexes($wrap) {
        $wrap.find('.ms-option.hl').removeClass('hl');
        $wrap.find('.ms-search input').focus();
        window.mselect.idx = -1;
    }

    function setScroll($wrap) {
        var $container = $wrap.find('.ms-options');
        var $selected = $wrap.find('.ms-option.hl');
        var itemMin = $selected.ofmset().top + $container.scrollTop();
        var itemMax = itemMin + $selected.outerHeight();
        var containerMin = $container.ofmset().top + $container.scrollTop();
        var containerMax = containerMin + $container.outerHeight();
        if (itemMax > containerMax) { // scroll down
            var to = $container.scrollTop() + itemMax - containerMax;
            $container.scrollTop(to);
        } else if (itemMin < containerMin) { // scroll up
            var to = $container.scrollTop() - containerMin - itemMin;
            $container.scrollTop(to);
        }
    }

    function openDropdown($wrap) {
        window.mselect.active_el = $wrap;
        window.mselect.active_id = $wrap.data('id');
        window.mselect.initial_values = $wrap.find('select').val();
        $wrap.find('.ms-dropdown').removeClass('hidden');
        $wrap.addClass('ms-open');
        setIndexes($wrap);
    }

    function closeDropdown($wrap) {
        if ('undefined' == typeof $wrap && null != window.mselect.active_el) {
            $wrap = window.mselect.active_el;
        }
        if ('undefined' !== typeof $wrap) {
            // only trigger if the values have changed
            var initial_values = window.mselect.initial_values;
            var current_values = $wrap.find('select').val();
            if (JSON.stringify(initial_values) != JSON.stringify(current_values)) {
                $(document).trigger('ms:closed', $wrap);
            }
        }
        $('.ms-wrap').removeClass('ms-open');
        $('.ms-dropdown').addClass('hidden');
        window.mselect.active_el = null;
        window.mselect.active_id = null;
        window.mselect.last_choice = null;
    }
})(jQuery);