import { Dropdown, Avatar, Button, Modal, Label,TextInput, Checkbox, Radio } from "flowbite-react";
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const ConflictSearchModal = (props) => {
  const [username, setUsername] = useState('')
  const [period, setPeriod] = useState('3month')
  const [limit, setLimit] = useState('100')
  const [min, setMin] = useState('0')
  const [required, setRequired] = useState({ display : 'none'})

  const user = useSelector((state) => state.user.value);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();


  
  return (
    
  <Modal show={props.show} onClose={props.onClose} dismissible={true}>
    <Modal.Header>
      {props.artistName} Conflict
    </Modal.Header>
    <Modal.Body>

    </Modal.Body>
    <Modal.Footer>
      <Button onClick={props.onClose}>
        Close
      </Button >
    </Modal.Footer>
  </Modal>
  )
}

export default ConflictSearchModal