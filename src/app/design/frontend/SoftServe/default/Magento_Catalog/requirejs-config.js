var config = {
    config: {
        map: {
            '*': {
                increaseDecreasePrice: 'Magento_Catalog/js/increase-decrease-price'
            }
        },
        mixins: {
            "Magento_Catalog/js/price-utils": {
                "Magento_Catalog/js/product-utils-mixin": true,
            },
        },
    },
};
