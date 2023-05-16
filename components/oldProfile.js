import styles from '../styles/Profile.module.css'
import React from "react";
import ReactDOM from "react-dom";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { Switch } from "@material-ui/core";

//import "./styles.css";


const options = [
    { label: 'Album', value: 'album' },
    { label: 'Single', value: 'single' },
    { label: 'EP', value: 'ep' },
  ];
  
function Profile(props) {
    const { register, handleSubmit, watch, setValue, errors, control } = useForm()
    //const { register, handleSubmit, setValue } = useForm();
    const onSubmit = (data) => {
        alert(JSON.stringify(data));
    };

    const emailNotification = watch("emailNotification");

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
        <div>
            <label className="reactSelectLabel">Release Types</label>
            <Controller
                name="filters"
                control={control}
                render={({ field }) => {
                    return (
                        <Select
                            className="reactSelect"
                            name="filters"
                            placeholder="Filters"
                            options={options}
                            isMulti
                            {...field}
                        />
                    );
                }}
            />
        </div>
        <div>
            <select className={styles.labelText} {...register("ageGroup")}>
                <option value="1">1</option>
                <option value="2">2</option>
            </select>
        </div>

        <div className={styles.emailNotification}>
            <label className={styles.labelText}>Email notification</label>
                <Controller
                    name="switch"
                    control={control}
                    render={({ field }) => (
                        <Switch onChange={(e) => field.onChange(e.target.checked)}  checked={field.value}/>
                    )}
                />
        </div>
        <div>
            <label >Emain notification</label>
            <input type="checkbox" {...register("emailNotification")} />
        </div>
        {emailNotification && (
            <div>
                <label>Notification frequency</label>
                <select {...register("ageGroup")}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                </select>
            </div>
        )}

      <input type="submit" />
    </form>
  );
}

export default Profile

