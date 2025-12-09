import { useState, useEffect } from 'react'
import ProductList from './ProductList'
import ProductForm from './ProductForm'
import '../styles/Home.css'

interface HomeProps {
  token: string
  onLogout: () => void
}

export interface Product {
  id: number
  name: string
  description: string
  price: string
  stock: number
  image_url: string
  created_at: string
  updated_at: string
}

const Home = ({ token, onLogout }: HomeProps) => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const response = await fetch('https://apiv1.billion101.online/product/get-products', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      const data = await response.json()
      if (data.success) {
        setProducts(data.data.products)
      }
    } catch (err) {
      console.error('Failed to fetch products:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  const handleDelete = async (productId: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return

    try {
      const response = await fetch(
        `https://apiv1.billion101.online/product/delete/${productId}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      )

      const data = await response.json()
      if (data.success) {
        fetchProducts()
      }
    } catch (err) {
      console.error('Failed to delete product:', err)
    }
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setShowForm(true)
  }

  const handleFormClose = () => {
    setShowForm(false)
    setEditingProduct(null)
    fetchProducts()
  }

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Product Management</h1>
        <div className="header-actions">
          <button className="btn-primary" onClick={() => setShowForm(true)}>
            Add Product
          </button>
          <button className="btn-logout" onClick={onLogout}>
            Logout
          </button>
        </div>
      </header>

      {showForm && (
        <ProductForm
          token={token}
          product={editingProduct}
          onClose={handleFormClose}
        />
      )}

      {loading ? (
        <div className="loading">Loading products...</div>
      ) : (
        <ProductList
          products={products}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  )
}

export default Home
