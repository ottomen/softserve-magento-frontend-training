/**
 * Copyright © SoftServe, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

define(["jquery"], function ($) {
    "use strict";
    $.widget("softserve.increaseDecreasePrice", {
        options: {
            minValue: 1,
            maxValue: 10,
            inputElement: null,
            container: null,
            increaseMarkup:
                '<span class="control__btn control__btn--plus">+</span>',
            decreaseMarkup:
                '<span class="control__btn control__btn--minus">-</span>',
            inputWrapSelector: ".field.qty .control",
            inputSelector: ".field.qty .control input",
            increaseSelector: ".control__btn--plus",
            decreaseSelector: ".control__btn--minus",
        },
        /** @inheritdoc */
        _create: function () {
            var self = this;
            this.options.container = this.element;
            this.options.inputElement = this.element.find(
                this.options.inputSelector
            );
            this._appendMarkup();
            this.options.container.on(
                "click",
                this.options.decreaseSelector,
                function () {
                    self._decrease();
                }
            );
            this.options.container.on(
                "click",
                this.options.increaseSelector,
                function () {
                    self._increase();
                }
            );
        },
        /**
         * @private
         */
        _appendMarkup: function () {
            var $targetContainer = this.options.container.find(
                this.options.inputWrapSelector
            );
            var value = parseInt(this.options.inputElement.val());
            $targetContainer.prepend(this.options.decreaseMarkup);
            $targetContainer.append(this.options.increaseMarkup);
            if (value <= this.options.minValue) {
                $(this.options.decreaseSelector).addClass("disabled");
            } else if (value >= this.options.maxValue) {
                $(this.options.increaseSelector).addClass("disabled");
            }
        },
        /**
         * @private
         */
        _increase: function () {
            var value = parseInt(this.options.inputElement.val()) + 1;
            if (value < this.options.maxValue) {
                this.options.inputElement.val(value);
                $(this.options.increaseSelector).removeClass("disabled");
                $(this.options.decreaseSelector).removeClass("disabled");
            } else if (value === this.options.maxValue) {
                this.options.inputElement.val(value);
                $(this.options.increaseSelector).addClass("disabled");
            } else {
                $(this.options.increaseSelector).addClass("disabled");
            }
        },
        /**
         * @private
         */
        _decrease: function () {
            var value = parseInt(this.options.inputElement.val()) - 1;
            if (value > this.options.minValue) {
                this.options.inputElement.val(value);
                $(this.options.decreaseSelector).removeClass("disabled");
                $(this.options.increaseSelector).removeClass("disabled");
            } else if (value === this.options.minValue) {
                this.options.inputElement.val(value);
                $(this.options.decreaseSelector).addClass("disabled");
            } else {
                $(this.options.decreaseSelector).addClass("disabled");
            }
        },
    });

    return $.softserve.increaseDecreasePrice;
});
