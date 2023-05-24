import styles from '../styles/Profile.module.css'
import React,  { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux'
import { setProfile } from '../reducers/user';
import { storeProfile } from '../reducers/profile';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { Button, Modal, Label, Checkbox, Radio, TextInput } from "flowbite-react";

function ProfileModal(props) {
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
                dispatch(storeProfile(data.profile))
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
            const formFields = ['newsletter', 'releaseTypes','genres', 'isPremium'];
            console.log('PROFILE DATA:', profile[0])
            console.log('NEWSLETTER DATA:', profile[0].newsletter)
            console.log('RELEASE TYPE DATA:', profile[0].releaseTypes)
            console.log('GENRES DATA:', profile[0].genres)
            console.log('ISPREMIUM:', profile[0].isPremium)
            formFields.forEach(field => {
                if ((field === 'genres') && (profile[0][field].length != 0)){
                    for( let i = 0; i < profile[0].genres.length; i++ ){
                        setValue(`genres.${i}.genre`, profile[0].genres[i])
                    }
                } else {
                    setValue(field, profile[field].toString())
                }
            });
            if (profile.newsletter != 0){
                setValue('emailNotification', true)
            } else {
                setValue('emailNotification', false)
            }
        }
    }, [])

    let updateCreateProfile = user.isProfileCreated ? 'Update your profile' : 'Create your profile'
    return (
        <Modal show={props.show} onClose={props.onClose} dismissible={false}>
            <Modal.Header>
                {updateCreateProfile}
            </Modal.Header>
            <Modal.Body>
                <form className="flex flex-col gap-8" autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="field-notify"
                                value="Do you wante to be notified by email?"
                                className="mr-5"
                            />
                        </div>            
                            <Checkbox
                                id="field-notify"
                                name="emailNotification"
                                value="true"
                                {...register("emailNotification")}
                            />
                        </div>
                        {emailNotification && (
                        <div>
                            <Label htmlFor="field-fequency" value="How often to receive email notification?"/>
                            <div className="flex items-center gap-2">
                                <Radio
                                    id="field-oneweek"
                                    name="newsletter"
                                    value="1"
                                    {...register("newsletter")}
                                />
                                <Label htmlFor="field-oneWeek"> 1 week  </Label>
                                <Radio
                                    id="field-twoweek"
                                    name="newsletter"
                                    value="2"
                                    {...register("newsletter")}
                                />
                                <Label htmlFor="field-twoWeek"> 2 week </Label>
                                <Radio
                                    id="field-oneMonth"
                                    name="newsletter"
                                    value="3"
                                    {...register("newsletter")}
                                />
                                <Label htmlFor="field-oneMonth"> 1 month </Label>
                            </div>
                        </div>
                        )}
                        <div>
                            <Label htmlFor="release-types" value="What type of release do you prefer?"/>
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    id="field-album"
                                    {...register("releaseTypes")}
                                    name="releaseTypes"
                                    value="Album"
                                />
                                <Label htmlFor="field-album"> Album  </Label>
                                <Checkbox
                                    id="field-single"
                                    {...register("releaseTypes")}
                                    name="releaseTypes"
                                    value="Single"
                                />
                                <Label htmlFor="field-single"> Single  </Label>
                                <Checkbox
                                    id="field-ep"
                                    {...register("releaseTypes")}
                                    name="releaseTypes"
                                    value="EP"
                                />
                                <Label htmlFor="field-ep"> EP  </Label>
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="field-support" value="Do you wante to support us?"/>
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    id="field-support"
                                    name="isPremium"
                                    value="true"
                                    {...register("isPremium")}
                                />
                            </div>
                        </div>
                        <div>
                            <div>
                                <Label htmlFor="release-types" value="What music genres do you prefer (maximum 5 genres)?"/>
                                {(fields.length < 5) &&
                                    <FontAwesomeIcon className={styles.addGenreButton} icon={faCirclePlus} style={{color: "#ff8080",}} onClick={() => append('')} />
                                }
                            </div>
                            <div className="flex gap-4">
                                {fields.map((genre, index) => {
                                    return (
                                        <TextInput
                                            sizing="sm"
                                            key={genre.id}
                                            {...register(`genres.${index}.genre`)}
                                        />
                                    )
                                })}
                            </div>
                        </div>
                        <Button type="submit">
                        Save
                    </Button>
                </form>
            </Modal.Body>                
        </Modal>
    )
}

export default ProfileModal

