import Head from 'next/head';
import styles from '../styles/Home.module.css';
import ConnectionHeader from './ConnectionHeader'
import Header from './Header'
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import Profile from '../components/Profile'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Modal } from "antd";

function Home() {

    const user = useSelector((state) => state.user.value)
    const [isSignInModalOpen, setSignInModalOpen] = useState(false);
    const [isSignUpModalOpen, setSignUpModalOpen] = useState(false);
    const [isProfileModalOpen, setProfileModalOpen] = useState(false);


    const handleSignInCancel = () => {
        setSignInModalOpen(false);
    };

    const handleSignUpCancel = () => {
        setSignUpModalOpen(false);
    };

    const selectSignOption = (buttonType) => {
        if (buttonType === 'signup'){
            setSignUpModalOpen(true);
        } else if (buttonType === 'signin'){
            setSignInModalOpen(true);
        }
    }

    const handleProfileCancel = () => {
        console.log('Yes')
        setProfileModalOpen(false)
    }

    const closeModal = (modalType) => {
        switch(modalType) {
            case 'signup':
                setSignUpModalOpen(false)
                setProfileModalOpen(true)
                break
            case 'signin':
                setSignInModalOpen(false);
                break
            case 'profile':
                setProfileModalOpen(false);
                break
        }
    }

    return (
        <div>
            <Head>
                <title>Album Release - Home</title>
            </Head>
            { (!user.token) || (true) ?
            (<>
                <ConnectionHeader selectSignOption={selectSignOption}/>
                <div id="react-modals">
                    <Modal
                        className="modalStyle"
                        width={700}
                        open={isSignInModalOpen}
                        onCancel={handleSignInCancel}
                        footer={null}>
                        <SignIn closeModal={closeModal} />
                    </Modal>
                </div>
                <div id="react-modals">
                    <Modal
                        className="modalStyle"
                        width={700}
                        open={isSignUpModalOpen}
                        onCancel={handleSignUpCancel}
                        footer={null}>
                        <SignUp closeModal={closeModal}/>
                    </Modal>
                </div>
                <div id="react-modals">
                    <Modal
                        className="modalStyle"
                        width={700}
                        open={isProfileModalOpen}
                        onCancel={handleProfileCancel}
                        footer={null}>
                        <Profile closeModal={closeModal}/>
                    </Modal>
                </div>
            </>) : 
            ( <Header />
            )}
            </div>
  );
}

export default Home;
