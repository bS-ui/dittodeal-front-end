import { useState, useEffect } from "react"
import { useParams, NavLink} from "react-router-dom"

import NewReview from "../../components/NewReview/NewReview"
// import ReviewCard from "../../components/ReviewCard/ReviewCard"
import Reviews from "../../components/Reviews/Reviews"

import * as profileService from '../../services/profileService'

import styles from './ProfilePage.module.css'


const ProfilePage = ({ user, handleAddFavorite, handleRemoveFavorite }) => {
  const { id } = useParams()
  const [profile, setProfile] = useState(null)

  const handleAddReview = async (reviewFormData) => {
    const newReview = await profileService.createReview(id, reviewFormData)
    setProfile({...profile, reviews: [...profile.reviews, newReview]}) 
  }

  const handleDeleteReview = async (profileId, reviewId) => {
    console.log(id)
    await profileService.deleteReview(profileId, reviewId)
    setProfile({...profile, reviews: profile.reviews.filter(rev => rev._id !== reviewId)})
  }

  const handlePlusFavorite = e => {
    e.preventDefault()
    handleAddFavorite(id)
  }

  const handleMinusFavorite = e => {
    e.preventDefault()
    handleRemoveFavorite(id)
  }

  useEffect(() => {
    const fetchProfile = async () => {
      const profileData = await profileService.getProfile(id)
      setProfile(profileData)
    }

    fetchProfile()
  }, [id])

  if (!profile) {
    return (
      <h1>Loading...</h1>
    )
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.profileContainer}>
        <div className={styles.imageAndName}>
          <div className={styles.favoriteSelect}>
            <h1 className={styles.profileName}>{profile.name}</h1>
            {id !== user.profile && 
              <div style={{display: 'flex', gap: '10px'}}>
                <h1 onClick={handlePlusFavorite} style={{cursor: 'pointer'}}>⭐️</h1>
                <h1 onClick={handleMinusFavorite} style={{cursor: 'pointer'}}>❌</h1>
              </div>
            }

          </div>
          
          <img className={styles.avatar} src={profile.photo} alt="users avatar" />
        </div>
        <div className={styles.titlesAndForm}>
          <h1 className={styles.listingsTitle}>Listings</h1>
          {id !== user.profile && <NewReview handleAddReview={handleAddReview} />}
          {id === user.profile && <h1 className={styles.reviewsTitle}>Reviews</h1>}
          <h1 className={styles.favoritesTitle}>Favorites</h1>
        </div>
        <div className={styles.reviewsListingsAndFavorites}>
          <div className={styles.listings}>
            {profile.listings.map(listing => 
              <div className={styles.listing} key={listing._id}>
                <div>
                  <NavLink 
                    to={`/listings/${listing._id}`} 
                    style={listing.category === "Vehicles" ? {color: "#FF9494"} 
                    : listing.category === "Apparel" ? {color: "#FFE37F"}
                    : listing.category === "Electronics" ? {color: "#7FFFC3"}
                    : listing.category === "Entertainment" ? {color: "#FE92D1"}
                    : listing.category === "Garden & Outdoor" ? {color: "#73FF94"}
                    : listing.category === "Home Goods" ? {color: "#FAFF7D"}
                    : listing.category === "Home Improvement" ? {color: "#FFB855"}
                    : listing.category === "Music" ? {color: "#E57FFF"}
                    : listing.category === "Office Supplies" ? {color: "#FF7F7F"}
                    : listing.category === "Pet Supplies" ? {color: "#7FFDFF"}
                    : listing.category === "Sporting Goods" ? {color: "#C4FE92"}
                    : {color: "#92ADFE"}
                  }
                  >
                    {listing.title}
                  </NavLink>
                </div>
              </div>
            )}
          </div>
          <div className={styles.reviews}>
            <Reviews profile={profile} user={user} id={id} handleDeleteReview={handleDeleteReview} />
          </div>
          <div className={styles.favorites}>
            {profile.favorites.map(favorite => 
              <div className={styles.listing} key={favorite._id}>
                <div className={styles.favoriteListing}>
                  <NavLink to={`/profiles/${favorite._id}`} className={styles.favoriteListing}>
                    <img src={favorite.photo} alt="favorites avatar" className={styles.favoriteImage} />
                    {favorite.name}
                    </NavLink>
                </div>
              </div>
            )}



          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage