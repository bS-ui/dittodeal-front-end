// css
import styles from './Index.module.css'
import { useState, useEffect } from 'react'

import * as listingService from '../../services/listingService'

const Index = ({ user }) => {
  const [listings, setListings] = useState([])
  useEffect(() => {
    const handleGetListings = async () => {
      const listingsData = await listingService.getListings()
      setListings(listingsData)
    }
    handleGetListings()
  }, [user])

  return (
    <main className={styles.mainContainer}>
      {listings.map(listing => 
      <div className={styles.listingContainer} key={listing._id}>
        <div className={styles.titleAndDateCreated}>
          <h2>{listing.title}</h2>
          <h2>{listing.createdAt}</h2>
        </div>
        <img className={styles.listingImage} src={listing.picture} alt="Listing Picture" />
        <div>
          <h2 className={styles.descriptionTitle}>Description:</h2>
          <p className={styles.descriptionText}>{listing.description}</p>
        </div>
        <div>
          <h2 className={styles.priceTitle}>Price:</h2>
          <p className={styles.priceText}>{listing.price}</p>
        </div>
      </div>)}
    </main>
  )
}

export default Index