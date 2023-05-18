import Head from 'next/head';
import ConnectionHeader from './ConnectionHeader'
import UserHeader from './UserHeader'
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
    
    let userConnected = (user.token) && (user.isProfileCreated)
    let userNotConnected = !user.isProfileCreated

    return (
        <div>
            { userConnected && 
                <div>
                    <UserHeader />
                </div>
            }
            { userNotConnected &&
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
            </>)
            }
            </div>
  );
}

export default Home;
