import React, { createContext, useState, useContext } from 'react';

const ModalContext = createContext();

const ModalWindow = ({ isOpen, closeModal, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                {children}
                <button onClick={closeModal}>Закрыть</button>
            </div>
        </div>
    );
};

export const ModalProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <ModalContext.Provider value={{ isOpen, openModal, closeModal }}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = () => useContext(ModalContext);

const MainPage = () => {
    const { openModal } = useModal();

    return (
        <div>
            <h1>Main Page</h1>
            <button onClick={openModal}>Открыть модальное окно</button>
        </div>
    );
};

const About = () => {
    const { isOpen, closeModal } = useModal();

    return (
        <div>
            <h1>About</h1>
            <ModalWindow isOpen={isOpen} closeModal={closeModal}>
                <p>Любой контент здесь</p>
            </ModalWindow>
        </div>
    );
};

const App = () => {
    return (
        <ModalProvider>
            <MainPage />
            <About />
        </ModalProvider>
    );
};

export default App;
