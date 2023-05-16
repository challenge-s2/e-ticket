import React from 'react';
import styles from "./Menu.module.scss"

const Menu = () => {
    return (
        <>
            <nav className={styles.container}>
                <div className={styles.left}> {/* Logo */}
                    eTickets
                </div>

                <div className={styles.middle}> {/* Boutons du milieu */}
                </div>

                <div className={styles.right}> {/* Boutton de connexion */}
                    <div className={styles.rigth_button_container}>
                        <button className='bttn bttn-drk'>Connexion</button>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Menu
