import styles from '../styles/Profile.module.css'
import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import Select from "react-select";
import { Switch } from "@material-ui/core";
import { useSelector } from 'react-redux'
import { useState } from 'react'

  
function Profile(props) {
    const user = useSelector((state) => state.user.value)

    //const [genres, seGenres] = useState([]);
    //const [counter, setCounter] = useState(0);

    const { register, handleSubmit, watch, control } = useForm()
    const { fields, append, remove} = useFieldArray({
        control,
        name: 'genres'})
    //const { register, handleSubmit, setValue } = useForm();

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
        console.log('DATA************', data)
        const profileData = updateDataProfile(data)
        console.log('ProfileData:', profileData)
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
            <div>
                <form className={styles.formContainer} onSubmit={handleSubmit(createProfile)}>
                    <div className={styles.itemType}>
                        <p className={styles.itemTitle}>Release type:</p>
                        <label className={styles.labelName} htmlFor="field-album">
                            <input
                                {...register("releaseTypes")}
                                type="checkbox"
                                value="album"
                                id="field-album"
                            />
                            Album
                        </label>
                        <label className={styles.labelName} htmlFor="field-single">
                            <input
                                {...register("releaseTypes")}
                                type="checkbox"
                                value="single"
                                id="field-single"
                            />
                            Single
                        </label>
                        <label className={styles.labelName} htmlFor="field-ep">
                            <input
                                {...register("releaseTypes")}
                                type="checkbox"
                                value="ep"
                                id="field-ep"
                            />
                            EP
                        </label>
                    </div>
                    <div  className={styles.itemType}>
                        <p className={styles.itemTitle}>Email notification:</p>
                        <label className={styles.labelName} htmlFor="notify">
                            <input
                                {...register("emailNotification")}
                                type="checkbox"
                                value="true"
                                id="notify"
                            />
                        </label>
                    </div>
                    {emailNotification && (
                    <div className={styles.notifyFrequency}>
                        <p className={styles.itemTitle}>Notification Frequency:</p>
                        <label className={styles.labelName} htmlFor="field-oneWeek">
                            <input
                                {...register("newsletter")}
                                type="radio"
                                value="1"
                                id="field-oneweek"
                            />
                            One week
                        </label>
                        <label className={styles.labelName} htmlFor="field-twoWeeks">
                            <input
                                {...register("newsletter")}
                                type="radio"
                                value="2"
                                id="field-twoWeeks"
                            />
                            Two weeks
                        </label>
                        <label className={styles.labelName} htmlFor="field-oneMonth">
                            <input
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
                        <p className={styles.itemTitle}>Support-us:</p>
                        <label className={styles.labelName} htmlFor="support">
                            <input
                                {...register("isPremium")}
                                type="checkbox"
                                value="true"
                                id="support"
                            />
                        </label>
                    </div>
                    <div>
                        <span className={styles.itemTitle}>music genres (maximum 5 genres):</span>
                        <button type="button" onClick={() => append('')}> Add genre</button>
                        {fields.map((genre, index) => {
                            return (
                                <input
                                    key={genre.id}
                                    {...register(`genres.${index}.genre`)}
                                />
                            )
                        })}
                    </div>
                    <button className={styles.saveButton} type="submit"> Save </button>
                </form>
            </div>
        </div>
    )
}

export default Profile

