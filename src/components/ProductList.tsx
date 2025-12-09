import { Product } from './Home'
import '../styles/ProductList.css'

interface ProductListProps {
  products: Product[]
  onEdit: (product: Product) => void
  onDelete: (productId: number) => void
}

const ProductList = ({ products, onEdit, onDelete }: ProductListProps) => {
  return (
    <div className="product-list">
      {products.length === 0 ? (
        <div className="empty-state">No products found. Add your first product!</div>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <img src={product.image_url} alt={product.name} />
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <div className="product-details">
                  <span className="product-price">${product.price}</span>
                  <span className="product-stock">Stock: {product.stock}</span>
                </div>
              </div>
              <div className="product-actions">
                <button className="btn-edit" onClick={() => onEdit(product)}>
                  Edit
                </button>
                <button className="btn-delete" onClick={() => onDelete(product.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductList
