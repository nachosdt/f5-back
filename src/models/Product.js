class Product {
    constructor(
        id,
        description,
        source,
        image,
        url,
        category,
        subcategory,
        type
    ) {
        this.id = id;
        this.description = description;
        this.source = source;
        this.image = image;
        this.url = url;
        this.category = category;
        this.subcategory = subcategory;
        this.type = type;
    }
}

module.exports = { Product };
