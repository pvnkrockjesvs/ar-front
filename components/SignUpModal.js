//import styles from '../styles/Sign.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../reducers/user';
import { useForm } from "react-hook-form";
import { Button, Modal, Label,TextInput } from "flowbite-react";
import { useState } from 'react'


const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function SignUpModal (props) {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value)
    const { register, handleSubmit, reset, formState: { errors }  } = useForm();

    const CreateUserAccount = (data) => {
        // destructuring the data object
        const { username, email, password } = data
        fetch("http://localhost:3000/users/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password }),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.result) {
                dispatch(login({ username, token: data.token }))
                // reset the value of the form to the defautl values
                reset()          
                // reverse data flow to close the signup model
                props.closeModal('signup')
            } else {
                reset()
            }           
        });
    };

    return (
        <Modal show={props.show} onClose={props.onClose} dismissible={false}>
            <Modal.Header>
                Create your account
            </Modal.Header>
            <Modal.Body>
                <form  autoComplete='off' className="flex flex-col gap-8" onSubmit={handleSubmit(CreateUserAccount)}>
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="username"
                                value="Enter a valid username"
                                className="mr-5"
                            />
                        </div>             
                        <TextInput
                            id="username"
                            type="text"
                            placeholder="Username"
                            {...register("username", { required: "username is required" })}
                        />
                        <p>{errors.username?.message}</p>
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="email"
                                value="Enter a valid email"
                                className="mr-5"
                            />
                        </div>
                        <TextInput
                            id="useremail"
                            type="email"
                            placeholder="Email"
                            {...register("email", {
                                required: "email is required",
                                pattern: { value: EMAIL_REGEX, message: 'The required email shoud be valid'}
                            })}
                        />
                        <p>{errors.email?.message}</p>
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="password"
                                value="Enter a valid password"
                                className="mr-5"
                            />
                        </div>
                        <TextInput
                            id="userpassword"
                            type="password"
                            placeholder="Password"
                            {...register("password", {required: "password is required" })}
                        />
                        <p>{errors.password?.message}</p>
                    </div>
                    <Button type="submit">
                        Create
                    </Button>
                </form>
            </Modal.Body>
        </Modal>
    )

}

export default SignUpModal