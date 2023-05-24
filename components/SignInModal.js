import { useDispatch, useSelector } from "react-redux";
import { storeProfile } from "../reducers/profile";
import { login, setProfile } from "../reducers/user";
import { useForm } from "react-hook-form";
import { Button, Modal, Label,TextInput } from "flowbite-react";

function SignInModal(props) {
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    
    //Fonction pour fetch les données du profile et les stockées dans le persist store
    const fetchProfile = (tokenData) => {
        if (tokenData) {
            console.log(`Token is OK : ${tokenData}`);
            fetch(`http://localhost:3000/profiles/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token: tokenData }),
            })
            .then((response) => response.json())
            .then((data) => {
                if (!data.result) {
                    console.log("No profile Found");
                }else {
                    console.log('DATA*****:', data)
                    dispatch(storeProfile(data.profile));
                }
            });
        } else {
            console.log("Token is not stored");
        }
    };

    const connectToUserAccount = (data) => {
    // destructuring the data object
        const { username, password } = data;
        fetch("http://localhost:3000/users/signin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.result) {
                dispatch(login({ username, token: data.token }));
                dispatch(setProfile());
                fetchProfile(data.token);
                reset();
            }
            props.closeModal("signin");
        });
    };

    return (
        <Modal show={props.show} onClose={props.onClose} dismissible={true}>
            <Modal.Header>
                Connect to your account
            </Modal.Header>
            <Modal.Body>
                <form  autoComplete='off' className="flex flex-col gap-4" onSubmit={handleSubmit(connectToUserAccount)}>
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
                                htmlFor="password"
                                value="Enter your password"
                                className="mr-5"
                            />
                        </div>             
                        <TextInput
                            id="userpassword"
                            type="password"
                            placeholder="Password"
                            {...register("password", { required: "The password is required" })}
                        />
                        <p>{errors.password?.message}</p>
                    </div>
                    <Button type="submit">
                        Connect
                    </Button>
                </form>
            </Modal.Body>
        </Modal>
    );
}

export default SignInModal;
