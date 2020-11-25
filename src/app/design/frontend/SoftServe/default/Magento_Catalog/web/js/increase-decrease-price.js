define(["jquery"], function ($) {
    $.widget("softserve.increaseDecreasePrice", {
        options: {
            minValue: 1,
            maxValue: 10,
            $inputElement: null,
            $container: null,
        },
        _create: function () {
            var $self = this;
            this.options.$container = this.element;
            this.options.$inputElement = this.element.find(
                ".field.qty .control input"
            );
            this._appendMarkup();
            this.options.$container.on("click", ".control__btn--minus", function () {
                $self._decrease();
            });
            this.options.$container.on("click", ".control__btn--plus", function () {
                $self._increase();
            });
        },
        _appendMarkup: function () {
            var $targetContainer = this.options.$container.find(
                ".field.qty .control"
            );
            $targetContainer.prepend(
                '<span class="control__btn control__btn--minus">-</span>'
            );
            $targetContainer.append(
                '<span class="control__btn control__btn--plus">+</span>'
            );
        },
        _increase: function () {
            var value = parseInt(this.options.$inputElement.val()) + 1;
            if (value <= this.options.maxValue) {
                this.options.$inputElement.val(value);
            }
        },
        _decrease: function () {
            var value = parseInt(this.options.$inputElement.val()) - 1;
            if (value >= this.options.minValue) {
                this.options.$inputElement.val(value);
            }
        },
    });
    return $.softserve.increaseDecreasePrice;
});
