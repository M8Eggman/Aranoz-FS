## Authentification & rôles

-   **Roles**
    -   name
    -   **Relations :**
        -   hasMany Users
-   **Users**
    -   name
    -   email
    -   image (url ou fichier)
    -   role_id → FK `roles.id`
    -   **Relations :**
        -   belongsTo Role
        -   hasMany BillingDetails
        -   hasMany Orders
        -   hasMany Comments
        -   hasMany Cart
        -   belongsToMany Products (Likes, pivot)
        -   hasMany Blogs

---

## Localisation & Billing

-   **Countries**
    -   name
    -   **Relations :**
        -   hasMany BillingDetails
-   **Billing Details**
    -   first_name
    -   last_name
    -   phone_number
    -   address
    -   number
    -   city
    -   zip
    -   company (nullable)
    -   user_id → FK `users.id`
    -   country_id → FK `countries.id`
    -   **Relations :**
        -   belongsTo User
        -   belongsTo Country

---

## Produits

-   **Product Categories**

    ## Produits

    -   **Product Categories**
        -   name
        -   **Relations :**
            -   hasMany Products
    -   **Promotions**
        -   name
        -   percentage (int)
        -   **Relations :**
            -   hasMany Products
    -   **Colors**
        -   name
        -   **Relations :**
            -   hasMany Products
    -   **Products**
        -   name
        -   description (text)
        -   price (decimal(8,2))
        -   stock (int)
        -   isPinned (boolean)
        -   image_main (url/fichier)
        -   image_rear (url/fichier)
        -   image_left_side (url/fichier)
        -   image_right_side (url/fichier)
        -   color_id → FK `colors.id`
        -   promo_id → FK `promotions.id` (nullable)
        -   category_id → FK `product_categories.id`
        -   **Relations :**
            -   belongsTo Color
            -   belongsTo Promotion
            -   belongsTo ProductCategorie
            -   hasOne Specification
            -   hasMany Comments
            -   hasMany Cart
            -   hasMany OrderItems
            -   belongsToMany Users (Likes, pivot)
    -   **Specifications**
        -   width
        -   height
        -   depth
        -   weight
        -   quality_checking (boolean)
        -   freshness_duration
        -   packaging
        -   content (int)
        -   product_id → FK `products.id`
        -   **Relations :**
            -   belongsTo Product

## Blog & communauté

-   **Blog Categories**
    -   name
    -   **Relations :**
        -   hasMany Blogs
-   **Tags**
    -   name
    -   **Relations :**
        -   belongsToMany Blogs (pivot blog_tag)
-   **Blogs**
    -   title
    -   description
    -   image (url/fichier)
    -   user_id → FK `users.id`
    -   category_id → FK `blog_categories.id`
    -   **Relations :**
        -   belongsTo BlogCategory
        -   belongsTo User
        -   hasMany Comments
        -   belongsToMany Tags (pivot blog_tag)
-   **Comments**
    -   message
    -   website (nullable)
    -   user_id → FK `users.id` (nullable)
    -   blog_id → FK `blogs.id` (nullable)
    -   product_id → FK `products.id` (nullable)
    -   **Relations :**
        -   belongsTo User
        -   belongsTo Blog
        -   belongsTo Product
-   **Blog_Tag** (pivot)
    -   blog_id
    -   tag_id

---

## Commandes & Panier

-   **Orders**
    -   order_number (unique)
    -   total_price
    -   status (enum: pending, confirmed)
    -   isArchived (boolean)
    -   user_id → FK `users.id`
    -   **Relations :**
        -   belongsTo User
        -   hasMany OrderItems
-   **OrderItems** (pivot order-product)
    -   product_name (fallback si produit supprimé)
    -   product_price (fallback)
    -   quantity
    -   order_id → FK `orders.id`
    -   product_id (nullable, FK `products.id`)
    -   **Relations :**
        -   belongsTo Order
        -   belongsTo Product
-   **Cart** (pivot user-product)
    -   quantity
    -   user_id → FK `users.id`
    -   product_id → FK `products.id`
    -   **Relations :**
        -   belongsTo User
        -   belongsTo Product
-   **Likes** (pivot user-product)
    -   user_id → FK `users.id`
    -   product_id → FK `products.id`
    -   **Relations :**
        -   belongsToMany Users
        -   belongsToMany Products

---

## Mailing & Contact

-   **Mailings**
    -   email
    -   subject
    -   message
    -   status (boolean → lu ou non)
    -   isArchived (boolean)
-   **Newsletter**
    -   email
-   **Contact Infos**
    -   street
    -   state
    -   city
    -   country_code
    -   zip_code
    -   number
    -   email
    -   phone_number
