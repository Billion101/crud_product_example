# Product Management Frontend

A React TypeScript frontend for managing products with authentication.

## Features

- **Login Page**: Authenticate sellers with phone and password
- **Product List**: View all products in a grid layout
- **Add Product**: Create new products with image upload
- **Edit Product**: Update existing products
- **Delete Product**: Remove products with confirmation
- **Image Upload**: Upload images as files (multipart/form-data)

## Getting Started

1. Install dependencies:

```bash
bun install
```

2. Run the development server:

```bash
bun run dev
```

3. Open your browser to the URL shown (usually http://localhost:5173)

## Usage

### Login

- Use your seller phone number and password
- Token is stored in localStorage for persistence

### Managing Products

- Click "Add Product" to create a new product
- Fill in name, description, price, stock, and upload an image
- Click "Edit" on any product card to update it
- Click "Delete" to remove a product (with confirmation)

## Technical Details

- Images are uploaded as File objects using FormData
- API endpoint handles multipart/form-data automatically
- Token authentication via Bearer token in headers
- Responsive grid layout for product cards
