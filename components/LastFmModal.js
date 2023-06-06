import { Dropdown, Avatar, Button, Modal, Label,TextInput, Checkbox, Radio } from "flowbite-react";
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { storeProfile } from "../reducers/profile";

const LastFmModal = (props) => {
  const [username, setUsername] = useState('')
  const [period, setPeriod] = useState('3month')
  const [limit, setLimit] = useState('100')
  const [min, setMin] = useState('0')
  const [required, setRequired] = useState({ display : 'none'})
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.value);

  const importLFM = (data) => {
    fetch('http://ar-back-git-main-pvnkrockjesvs.vercel.app/profiles/import-last-fm', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        period: data.period,
        limit: data.limit,
        min: data.scrobbles,
        user: data.username,
        token: user.token
      }),
    })
    .then(response => response.json()).then(data => {
      fetch(`http://ar-back-git-main-pvnkrockjesvs.vercel.app/profiles/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: user.token }),
      })
      .then((response) => response.json())
      .then((res) => {
          if (!res.result) {
            console.log("No profile Found");
          } else {
            dispatch(storeProfile(res.profile));
            props.onClose()
          }
      });
    })


  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  
  return (
    
  <Modal show={props.show} onClose={props.onClose} dismissible={true}>
    <Modal.Header>
      Import artists
    </Modal.Header>
    <Modal.Body>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(importLFM)}>
        <div>
          <div className="mb-2 block">
            <Label
              htmlFor="username"
              value="Last.fm username"
              className="mr-5"
            />             
            <Label style={required}>Required</Label>

          </div>
          <TextInput
            id="username"
            type="text"
            placeholder=""
            {...register("username", { required: "username is required" })}

          />
        </div>
        <Label htmlFor="period" value="Time period" />
        <div className="flex items-center gap-2">
          <Radio
            id="1month"
            name="period"
            value="1month"
            {...register("period")}
          />
          <Label htmlFor="1month">
            1 month
          </Label>
          <Radio
            id="3months"
            name="period"
            value="3month"
            defaultChecked={true}
            {...register("period")}
          />
          <Label htmlFor="3months">
            3 months
          </Label>
          <Radio
            id="6months"
            name="period"
            value="6month"
            {...register("period")}
          />
          <Label htmlFor="6months">
            6 months
          </Label>
          <Radio
            id="12months"
            name="period"
            value="12month"
            {...register("period")}
          />
          <Label htmlFor="12months">
            1 year
          </Label>
          <Radio
            id="overall"
            name="period"
            value="overall"
            {...register("period")}
          />
          <Label htmlFor="overall">
            Overall
          </Label>
        </div>
        <div >
          <Label htmlFor="limit" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Maximum artists</Label>
          <TextInput type="number" id="visitors" className="bg-gray-50 border border-gray-300 
          text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
          block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
          dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
          dark:focus:border-blue-500" 
          defaultValue='100'
          {...register("limit")} 
          /> 
        </div>
        <div >
          <Label htmlFor="scrobbles" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Minimum artist listens</Label>
          <TextInput type="number" id="visitors" className="bg-gray-50 border border-gray-300 
          text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
          block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
          dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
          dark:focus:border-blue-500" 
          defaultValue='0'
          {...register("scrobbles")}

          /> 
        </div>
        <Button type="submit">
          Submit
        </Button >
      </form>
    </Modal.Body>
  </Modal>
  )
}

export default LastFmModal