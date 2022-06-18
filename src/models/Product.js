class Product {
    constructor(
        id,
        description,
        source,
        image,
        url,
        category,
        subcategory,
        type,
        outOfStock
    ) {
        this.id = id;
        this.description = description;
        this.source = source;
        this.image = image;
        this.url = url;
        this.category = category;
        this.subcategory = subcategory;
        this.type = type;
        this.outOfStock = outOfStock;
    }
}

module.exports = { Product };
