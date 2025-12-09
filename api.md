# API Documentation

## Base URL

```
https://apiv1.billion101.online
```

## Authentication

All product management endpoints require authentication using a Bearer token obtained from the login endpoint.

### Headers

```
Authorization: Bearer {accessToken}
```

---

## Endpoints

### 1. Login (Seller)

**Endpoint:** `POST /auth/login`

**Description:** Authenticate a seller and receive an access token.

**Request Body:**

```json
{
  "phone": "99887766",
  "password": "123"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 26,
      "user_name": "Mee",
      "role": "SELLER",
      "phone": "99887766",
      "profile_url": null,
      "shop_bio": "markett"
    }
  }
}
```

---

### 2. Create Product

**Endpoint:** `POST /product/create-product`

**Description:** Create a new product (requires authentication).

**Headers:**

```
Authorization: Bearer {accessToken}
```

**Request Body:**
"Content-Type": "multipart/form-data"

```json
{
  "name": "cream",
  "description": "facecream",
  "price": 1,
  "stock": 10,
  "image_url": "cartoon.png"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "message": "Product created successfully",
    "product": {
      "id": 19,
      "name": "cream",
      "description": "facecream",
      "price": 1,
      "stock": 10,
      "image_url": "https://myaws-image-server.s3.ap-southeast-1.amazonaws.com/products/c9e2bfb3-6aeb-41c7-bec6-ac3c8f932b77.png",
      "created_at": "2025-12-08T21:22:35.366Z",
      "updated_at": "2025-12-08T21:22:35.366Z",
      "seller": {
        "id": 26,
        "user_name": "Mee",
        "role": "SELLER",
        "shop_bio": "markett",
        "phone": "99887766",
        "profile_url": null,
        "created_at": "2025-12-07T06:54:15.621Z",
        "updated_at": "2025-12-07T06:54:15.621Z"
      }
    }
  }
}
```

---

### 3. Get Products

**Endpoint:** `GET /product/get-products`

**Description:** Retrieve all products for the authenticated seller.

**Headers:**

```
Authorization: Bearer {accessToken}
```

**Response:**

```json
{
  "success": true,
  "message": "Get products successfully",
  "data": {
    "seller_id": 26,
    "total": 16,
    "products": [
      {
        "id": 19,
        "name": "cream",
        "description": "facecream",
        "price": "1.00",
        "stock": 10,
        "image_url": "https://myaws-image-server.s3.ap-southeast-1.amazonaws.com/products/c9e2bfb3-6aeb-41c7-bec6-ac3c8f932b77.png",
        "created_at": "2025-12-08T21:22:35.366Z",
        "updated_at": "2025-12-08T21:22:35.366Z",
        "seller": {
          "id": 26,
          "user_name": "Mee",
          "role": "SELLER",
          "shop_bio": "markett",
          "phone": "99887766",
          "profile_url": null,
          "created_at": "2025-12-07T06:54:15.621Z",
          "updated_at": "2025-12-07T06:54:15.621Z"
        }
      }
    ]
  }
}
```

---

### 4. Update Product

**Endpoint:** `PUT /product/update-product/{productId}`

**Description:** Update an existing product (requires authentication).

**Headers:**

```
Authorization: Bearer {accessToken}
```

**URL Parameters:**

- `productId` (integer): The ID of the product to update

**Request Body:**
"Content-Type": "multipart/form-data"

```json
{
  "name": "cccccc",
  "description": "ffffvsdvsd",
  "price": 1,
  "stock": 4,
  "image_url": "mee.jpg"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Product updated successfully",
  "data": {
    "message": "Product updated successfully",
    "product": {
      "id": 15,
      "name": "cccccc",
      "description": "ffffvsdvsd",
      "price": "1",
      "stock": "4",
      "image_url": "https://myaws-image-server.s3.ap-southeast-1.amazonaws.com/products/53509eaa-7b2a-466d-a26a-e2a60fc3bd36.jpg",
      "created_at": "2025-12-08T04:00:21.756Z",
      "updated_at": "2025-12-08T21:33:26.548Z",
      "seller": {
        "id": 26,
        "user_name": "Mee",
        "role": "SELLER",
        "shop_bio": "markett",
        "phone": "99887766",
        "profile_url": null,
        "created_at": "2025-12-07T06:54:15.621Z",
        "updated_at": "2025-12-07T06:54:15.621Z"
      }
    }
  }
}
```

---

### 5. Delete Product

**Endpoint:** `DELETE /product/delete/{productId}`

**Description:** Delete a product (requires authentication).

**Headers:**

```
Authorization: Bearer {accessToken}
```

**URL Parameters:**

- `productId` (integer): The ID of the product to delete

**Response:**

```json
{
  "success": true,
  "message": "Product deleted successfully"
}
```

---

## Response Format

All responses follow a consistent format:

```json
{
    "success": boolean,
    "message": string,
    "data": object (optional)
}
```

## Notes

- The `accessToken` obtained from the login endpoint must be included in the `Authorization` header as a Bearer token for all product management operations.
- Images are automatically uploaded to AWS S3 and the full URL is returned in the response.
- The access token expires after 15 minutes (900 seconds).
- Prices are stored and returned as decimal strings with two decimal places.
