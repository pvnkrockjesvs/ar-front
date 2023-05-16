import styles from '../styles/Profile.module.css'
import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useSelector } from 'react-redux'

  
function Profile(props) {
    const user = useSelector((state) => state.user.value)

    const { register, handleSubmit, watch, control } = useForm()
    const { fields, append, remove} = useFieldArray({
            control,
            name: 'genres'}
        )

    const addGenre = () => {
        setGenres(prevGenres => [...prevGenres, counter]);
        setCounter(prevCounter => prevCounter + 1);
    };

    const updateDataProfile = (data) => {
        console.log(data)
        const profileData = {}
        profileData.releaseTypes = data.releaseTypes
        profileData.newsletter = data.newsletter
        profileData.isPremium = data.isPremium

        if (data.emailNotification == false){
            profileData.newsletter = 0
        }
        profileData.genres = []
        for (let genre of data.genres){
            profileData.genres.push(genre.genre)
        }

        return profileData
    }


    const createProfile = (data) => {
        const profileData = updateDataProfile(data)
        // Check and extract the usefull data
        fetch("http://localhost:3000/profiles/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                token: user.token,
                releaseTypes: profileData.releaseTypes,
                newsletter: profileData.newsletter,
                isPremium: profileData.isPremium,
                genres: profileData.genres
            }),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.result) {
                console.log(data)
            }
        })
    }

    const emailNotification = watch("emailNotification");

    return (
        <div className={styles.notifyContainer}>
            <p className={styles.title}>Create your profile</p>
            <form className={styles.formContainer} onSubmit={handleSubmit(createProfile)}>
                <div className={styles.itemType}>
                    <p className={styles.itemTitle}>What type of release do you prefer?</p>
                    <label className={styles.labelName} htmlFor="field-album">
                        <input
                            className={styles.buttonStyles}
                            {...register("releaseTypes")}
                            type="checkbox"
                            value="album"
                            id="field-album"
                        />
                        Album
                    </label>
                    <label className={styles.labelName} htmlFor="field-single">
                        <input
                            className={styles.buttonStyles}
                            {...register("releaseTypes")}
                            type="checkbox"
                            value="single"
                            id="field-single"
                        />
                        Single
                    </label>
                    <label className={styles.labelName} htmlFor="field-ep">
                        <input
                            className={styles.buttonStyles}
                            {...register("releaseTypes")}
                            type="checkbox"
                            value="ep"
                            id="field-ep"
                        />
                        EP
                    </label>
                </div>
                <div  className={styles.itemType}>
                    <p className={styles.itemTitle}>Do you wante to be notified by email?</p>
                    <label className={styles.labelName} htmlFor="notify">
                        <input
                            className={styles.buttonStyles}
                            {...register("emailNotification")}
                            type="checkbox"
                            value="true"
                            id="notify"
                        />
                    </label>
                </div>
                {emailNotification && (
                    <div className={styles.notifyFrequency}>
                        <p className={styles.itemTitle}>How often to receive email notification?</p>
                        <label className={styles.labelName} htmlFor="field-oneWeek">
                            <input
                                className={styles.buttonStyles}
                                {...register("newsletter")}
                                type="radio"
                                value="1"
                                id="field-oneweek"
                            />
                            One week
                        </label>
                        <label className={styles.labelName} htmlFor="field-twoWeeks">
                            <input
                                className={styles.buttonStyles}
                                {...register("newsletter")}
                                type="radio"
                                value="2"
                                id="field-twoWeeks"
                            />
                            Two weeks
                        </label>
                        <label className={styles.labelName} htmlFor="field-oneMonth">
                            <input
                                className={styles.buttonStyles}
                                {...register("newsletter")}
                                type="radio"
                                value="3"
                                id="field-oneMonth"
                            />
                            One month
                        </label>
                    </div>
                )}
                <div  className={styles.itemType}>
                    <p className={styles.itemTitle}>Do you want to support-us</p>
                    <label className={styles.labelName} htmlFor="support">
                        <input
                            className={styles.buttonStyles}
                            {...register("isPremium")}
                            type="checkbox"
                            value="true"
                            id="support"
                        />
                    </label>
                </div>
                <div>
                    <span className={styles.itemTitle}> What music genres do you prefer (maximum 5 genres)?</span>
                    <button className={styles.addGenreButton} type="button" onClick={() => append('')}>+</button>
                    <div>
                    {fields.map((genre, index) => {
                        return (
                            <input
                                className={styles.genreInput}
                                key={genre.id}
                                {...register(`genres.${index}.genre`)}
                            />
                        )
                    })}
                    </div>
                </div>
                <button className={styles.saveButton} type="submit"> Save </button>
            </form>
        </div>
    )
}

export default Profile

