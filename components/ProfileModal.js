import styles from '../styles/Profile.module.css'
import React,  { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux'
import { setProfile } from '../reducers/user';
import { storeProfile, updateProfile } from '../reducers/profile';
import { Button, Modal, Label, Checkbox, Radio, TextInput } from "flowbite-react";

function ProfileModal(props) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value)
    const profile = user.isProfileCreated ? useSelector((state) => state.profile.value) : null
    console.log('USER IN PROFIEL MODAL:', user)
    console.log('PROFILE IN PROFIEL MODAL:', profile)

    const { register, handleSubmit, setValue, reset, watch } = useForm()
    
    const updateDataProfile = (data) => {
        const profileData = {}
        console.log(data,'************************************')
        profileData.releaseTypes = data.releaseTypes
        profileData.newsletter = data.newsletter
        profileData.isPremium = data.isPremium
        console.log(data.genres)

        if (data.emailNotification === false){
            profileData.newsletter = 0
        }
        profileData.genres = data.genres.split(',')
        console.log(profileData.genres)
        return profileData
    }

    const createUserProfile = (data) => {
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

    const updateUserProfile = (data) => {
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
                dispatch(updateProfile(profileData))
                dispatch(setProfile())
                reset()
                props.closeModal()
            }
        })
    }

    const onSubmit = (data) => {
        if (user.isProfileCreated){
            updateUserProfile(data)
        } else {
            createUserProfile(data)
        }
    }

    const emailNotification = watch("emailNotification");

    useEffect(() => {
        // Check if the profile is already created, then we are in the
        // update mode, otherwise we are in the create mode
        if (user.isProfileCreated) {
            const formFields = ['newsletter', 'releaseTypes','genres', 'isPremium'];
            console.log('PROFILE DATA:', profile)
            console.log('NEWSLETTER DATA:', profile.newsletter)
            console.log('RELEASE TYPE DATA:', profile.releaseTypes)
            console.log('GENRES DATA:', profile.genres)
            console.log('ISPREMIUM:', profile.isPremium)
            formFields.forEach(field => {
                if (field === 'newsletter'){
                    console.log('FIELD:', field)
                    setValue(field, profile[field].toString())
                    if (profile[field] != 0){
                        setValue('emailNotification', true)
                    } else {
                        setValue('emailNotification', false)
                    }
                } else if (field === 'genres'){
                    setValue(field, profile[field].join(','))
                    console.log('GENRE***********************************:', profile[field].join(','))
                } else {
                    setValue(field, profile[field])
                }
            });
        } else {
            console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%')
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
                                    value='1'
                                    {...register("newsletter")}
                                />
                                <Label htmlFor="field-oneWeek"> 1 week  </Label>
                                <Radio
                                    id="field-twoweek"
                                    name="newsletter"
                                    value='2'
                                    {...register("newsletter")}
                                />
                                <Label htmlFor="field-twoWeek"> 2 week </Label>
                                <Radio
                                    id="field-oneMonth"
                                    name="newsletter"
                                    value='3'
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
                                    value="album"
                                    checked={user.isprofileCreated ? profile.releaseTypes.includes('album'): undefined}
                                />
                                <Label htmlFor="field-album"> Album  </Label>
                                <Checkbox
                                    id="field-single"
                                    {...register("releaseTypes")}
                                    name="releaseTypes"
                                    value="single"
                                    checked={user.isprofileCreated ? profile.releaseTypes.includes('single') : undefined}
                                />
                                <Label htmlFor="field-single"> Single  </Label>
                                <Checkbox
                                    id="field-ep"
                                    {...register("releaseTypes")}
                                    name="releaseTypes"
                                    value="ep"
                                    checked={user.isprofileCreated ? profile.releaseTypes.includes('ep'): undefined}
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
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="genres"
                                    value="What music genres do you prefer (maximum 5 genres)?"
                                    className="mr-5"
                                />
                            </div>             
                            <TextInput
                                id="genres"
                                type="text"
                                placeholder="Music genres"
                                {...register('genres')}
                                helperText={<React.Fragment><span className="font-normal text-xs text-blue-500">A list of your preferred music genres separated by comma (e.g: genre1,genre2,...)</span></React.Fragment>}
                              />
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

