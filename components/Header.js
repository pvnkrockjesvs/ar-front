import ConnectionHeader from "./ConnectionHeader";
import UserHeader from "./UserHeader";
import SignInModal from "../components/SignInModal";
import SignUpModal from "../components/SignUpModal";
import ProfileModal from "../components/ProfileModal";
import { useState } from "react";
import { useSelector } from "react-redux";

function Home() {
    const user = useSelector((state) => state.user.value);
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
        if (buttonType === "signup") {
            setSignUpModalOpen(true);
        } else if (buttonType === "signin") {
            setSignInModalOpen(true);
        }
    };

    const handleProfileCancel = () => {
        setProfileModalOpen(false);
    };

    const closeModal = (modalType) => {
        switch (modalType) {
        case "signup":
            setSignUpModalOpen(false);
            setProfileModalOpen(true);
            break;
        case "signin":
            setSignInModalOpen(false);
            break;
        case "profile":
            setProfileModalOpen(false);
            break;
        }
    };

    let userConnected = user.token && user.isProfileCreated;
    let userNotConnected = !user.isProfileCreated;

    return (
        <div>
            {userConnected && (
        <div>
            <UserHeader />
        </div>
        )}
            {userNotConnected && (
        <>
            <ConnectionHeader selectSignOption={selectSignOption} />
                <div id="react-modals">
                    <SignInModal 
                        closeModal={closeModal}
                        show={isSignInModalOpen}
                        dismissible={true}
                        onClose={handleSignInCancel}
                    />
                </div>
                <div id="react-modals">
                    <SignUpModal
                        width={300}
                        closeModal={closeModal}
                        show={isSignUpModalOpen}
                        dismissible={true}
                        onClose={handleSignUpCancel}
                    />
                </div>
                <div id="react-modals">
                    <ProfileModal
                        width={700}
                        closeModal={closeModal}
                        show={isProfileModalOpen}
                        dismissible={true}
                        onClose={handleProfileCancel}
                    />
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
