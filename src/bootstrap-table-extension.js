/**
 * @author zhixin wen <wenzhixin2010@gmail.com>
 * extensions: https://github.com/kayalshri/tableExport.jquery.plugin
 */

(function ($) {
    'use strict';

    $.extend($.fn.bootstrapTable.defaults, {
        showResetSearch: false,
        showPageListOnTop: false,
        showActionButtons: function () {
            return '';
        }
    });

    var BootstrapTable = $.fn.bootstrapTable.Constructor,
        _initToolbar = BootstrapTable.prototype.initToolbar,
        _initPagination = BootstrapTable.prototype.initPagination;

    BootstrapTable.prototype.initToolbar = function () {
        this.showToolbar = this.options.showResetSearch;

        _initToolbar.apply(this, Array.prototype.slice.apply(arguments));

        if (this.options.showResetSearch) {
            var that = this,
                $btnGroup = this.$toolbar.find('>.btn-group'),
                $resetsearch = $btnGroup.find('div.resetsearch');

            if (!$resetsearch.length) {
                $resetsearch = $([
                    '<button class="btn btn-default"',
                        ' type="button" name="resetsearch" title="Reset Search"' +
                            'data-toggle="dropdown" type="button">',
                            '<i class="glyphicon glyphicon-remove"></i>',
                    '</button>'].join('')).appendTo($btnGroup);
            }

            if (this.options.showResetSearch) {
                this.$toolbar.find('button[name="resetsearch"]')
                    .off('click').on('click', $.proxy(this.resetSearch, this, ''));
            }
        }     
    }

    BootstrapTable.prototype.initPagination = function () {
        _initPagination.apply(this, Array.prototype.slice.apply(arguments));

        if (this.options.showActionButtons().length > 0) {
            var that = this, $pagination;

            //Make sure we only add the actions buttons at the bottom of pagination, ignore the top pagination.
            if (this.options.paginationVAlign === 'top' || this.options.paginationVAlign === 'bottom') {
                $pagination = this.$pagination.find('span.pagination-info');
            } else if (this.options.paginationVAlign === 'both') {
                $pagination = $(this.$pagination[1]).find('span.pagination-info');
            }

            var $actionbuttons = $pagination.find('div.actionbutton');

            if (!$actionbuttons.length) {
                $actionbuttons = $(this.options.showActionButtons()).appendTo($pagination);
            }           
        }

        //If the pagination for top or both, then remove the page list dropdown list.
        if (this.options.paginationVAlign === 'top' || this.options.paginationVAlign === 'both') {
            if (!this.options.showPageListOnTop) {
                $(this.$pagination[0]).find('span.page-list').hide();
            }
        }
    }
})(jQuery);
