/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

define(["jquery", "jquery-ui-modules/widget", "star_rating"], function ($) {
    "use strict";
    $(".my-rating").starRating({
        initialRating: 4,
        strokeColor: "#894A00",
        strokeWidth: 10,
        starSize: 25,
        callback: function (currentRating, $el) {
            localStorage.setItem("test-rating", currentRating);
        },
    });
});
