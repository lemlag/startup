import React from 'react';
import { useNavigate } from 'react-router-dom';



export function Authenticated(props) {
    const navigate = useNavigate();

    function logout() {
        localStorage.removeItem('userName');
        props.onLogout();
    }

    return (
        <div>
            <div className='playerName'>{props.userName}</div>
            <button onClick={() => navigate('/scores')}>
                View Scoreboard
            </button>
            <button onClick={() => logout()}>
                Log Out
            </button>
        </div>
    );
}