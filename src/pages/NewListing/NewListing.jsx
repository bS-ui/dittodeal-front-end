// css
import styles from './NewListing.module.css'

// npm modules
import { useState } from 'react'

const NewListing = (props) => {
  const [formData, setFormData] = useState({
    title: '',
    text: '',
    category: 'Vehicles'
  })

  const handleSubmit = evt => {
    evt.preventDefault()
    props.handleAddListing(formData)
  }

  const handleChange = evt => {
    setFormData({...formData, [evt.target.name]: evt.target.value})
  }

  return ( 
    <div className={styles.mainContainer}>
      <div className={styles.newListingContainer}>
        <h1 className={styles.createListingTitle}>Create A New Listing</h1>
        <form className={styles.newListingForm} onSubmit={handleSubmit}>
          <label className={styles.normalInputLabel} htmlFor="title-input">Title:
          <input className={styles.normalInput}
          required
          type="text" 
          name="title"
          id="title-input"
          placeholder='Title'
          value={formData.title}
          onChange={handleChange}
          />
          </label>
          <div className={styles.descriptionInputContainer}>
          <label className={styles.descriptionInputLabel} htmlFor="description-input">Description:
          </label>
          <textarea className={styles.descriptionInput}
          required
          type="text" 
          name="description"
          id="description-input"
          placeholder='Description'
          value={formData.description}
          onChange={handleChange}
          />
          </div>
          <label className={styles.normalInputLabel} htmlFor="price-input">Price:
          <input className={styles.normalInput}
          required
          type="number"
          min="0"
          max=""
          name="price"
          id="price-input"
          placeholder='Price in $'
          value={formData.price}
          onChange={handleChange}
          />
          </label>
          <label className={styles.normalInputLabel} htmlFor="category-input">Category:
          <select className={styles.categoryInput}
          required
          name="category"
          id="category-input"
          value={formData.category}
          onChange={handleChange}
          >
            <option value="Vehicles">Vehicles</option>
            <option value="Apparel">Apparel</option>
            <option value="Electronics">Electronics</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Garden & Outdoor">Garden & Outdoor</option>
            <option value="Home Goods">Home Goods</option>
            <option value="Home Improvement">Home Improvement</option>
            <option value="Music">Music</option>
            <option value="Office Supplies">Office Supplies</option>
            <option value="Pet Supplies">Pet Supplies</option>
            <option value="Sporting Goods">Sporting Goods</option>
            <option value="Toys & Games">Toys & Games</option>
          </select>
          </label>
          <label className={styles.normalInputLabel} htmlFor="photos-input">Photos:
          <input className={styles.normalInput}
          required
          type="text" 
          name="photos"
          id="photos-input"
          placeholder='Photos'
          value={formData.photos}
          onChange={handleChange}
          />
          </label>
          <button className={styles.submitButton} type="submit">Create Listing</button>
        </form>
      </div>
    </div>
  );
}

export default NewListing;