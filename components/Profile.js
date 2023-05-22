import styles from '../styles/Profile.module.css'
import React,  { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux'
import { setProfile } from '../reducers/user';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

function Profile(props) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value)
    const profile = user.isProfileCreated ? useSelector((state) => state.profile.value) : null
    const { register, handleSubmit, setValue, reset, watch, control } = useForm()
    const { fields, push, append, remove} = useFieldArray({
            control,
            name: 'genres'}
        )

    const updateDataProfile = (data) => {
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
                dispatch(setProfile())
                reset()
                props.closeModal()
            }
        })
    }

    const updateProfile = (data) => {
        const profileData = updateDataProfile(data)
        // Check and extract the usefull data
        fetch("http://localhost:3000/profiles/update", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                token: user.token,
                releaseTypes: profileData.releaseTypes,
                newsletter: profileData.newsletter,
                genres: profileData.genres
            }),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.result) {
                dispatch(setProfile())
                reset()
                props.closeModal()
            }
        })
    }

    const onSubmit = (data) => {
        if (profile){
            updateProfile(data)
        } else {
            createProfile(data)
        }
    }

    const emailNotification = watch("emailNotification");

    useEffect(() => {
        // Check if the profile is already created, then we are in the
        // update mode, otherwise we are in the create mode
        if (user.isProfileCreated) {
            const formFields = ['newsletter', 'releaseTypes','genres'];
            formFields.forEach(field => {
                console.log('FIELD:', field, profile[0][field])

                if (field === 'genres'){
                    for(let genre of profile[0].genres){
                        append({'name': genre})
                    }
                } else {
                    setValue(field, profile[0][field].toString())
                }
                console.log('GENRES:', fields)

            });
            if (profile[0].newsletter != 0){
                setValue('emailNotification', true)
            } else {
                setValue('emailNotification', false)
            }
        }
    }, [])

    return (
        <div className={styles.notifyContainer}>
            { user.isProfileCreated ? 
            (
                <p className={styles.title}>Update your profile</p>
            ):
            (
                <p className={styles.title}>Create your profile</p>
            )}
            <form autoComplete='off' className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
                <div  className={styles.itemType}>
                    <p className={styles.itemTitle}>Do you wante to be notified by email?</p>
                    <label className={styles.labelName} htmlFor="field-notify">
                        <input
                            className={styles.buttonStyles}
                            {...register("emailNotification")}
                            type="checkbox"
                            value="true"
                            id="field-notify"
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
                    <p className={styles.itemTitle}>Do you want to support-us</p>
                    <label className={styles.labelName} htmlFor="field-support">
                        <input
                            className={styles.buttonStyles}
                            {...register("isPremium")}
                            type="checkbox"
                            value="true"
                            id="field-support"
                        />
                    </label>
                </div>
                <div className={styles.itemType}>
                    <div className={styles.genreItem}>
                        <span className={styles.itemTitle}> What music genres do you prefer (maximum 5 genres)?</span>
                        {(fields.length < 5) &&
                            <FontAwesomeIcon className={styles.addGenreButton} icon={faCirclePlus} style={{color: "#ff8080",}} onClick={() => append('')} />
                        }
                    </div>
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

