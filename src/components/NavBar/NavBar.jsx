import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './NavBar.module.css'
import * as profileService from '../../services/profileService'
import logo from '../../assets/images/dittodeal.png'

const NavBar = ({ user, handleLogout }) => {
  const [profile, setProfile] = useState([])
  useEffect(() => {
    const handleGetProfile = async () => {
      if (user) {
        const profileData = await profileService.getProfile(user.profile)
        setProfile(profileData)
      }
    }
    handleGetProfile()
  }, [user])
  return (
    <div className={styles.navContainer}>
      <NavLink to={`/`} className={styles.logoAndAppNameContainer}>
        <img className={styles.logo} src={logo} alt="DittoDeal Logo" width='85'/>
        <p className={styles.appNameDitto}>Ditto</p>
        <p className={styles.appNameDeal}>Deal</p>
      </NavLink>
      <div className={styles.otherLinksContainer}>
        {user ?
        <NavLink to={`/listings/new`}>
          Create Listing
        </NavLink>
          :
          ''
        }
      </div>
      <div className={styles.avatarAndUserNameContainer}>
        {!user ?
        <>
          <NavLink to={`/auth/login`}>
            Log In
          </NavLink>
          <NavLink to={`/auth/signup`}>
            Sign Up
          </NavLink>
        </>
        :
        <>
          <NavLink className={styles.username} to={`/profiles/${user.profile}`}>
            {profile.name}
          </NavLink>
          <div className={styles.avatar} style={{backgroundImage: `url(${profile.photo})`}} alt="Users Profile Picture"></div>
          <i onClick={handleLogout} id={styles.logout} className="fa-solid fa-door-open"></i>
        </>
        }
      </div>
    </div>
  )
}

export default NavBar
