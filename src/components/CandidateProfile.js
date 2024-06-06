import { useState } from "react";
import { useAuth } from "./context/AuthContext";
import axios from "axios";

export default function CandidateProfile() {
    const { user, dispatch } = useAuth();
    const [form, setForm] = useState({
        firstname: user.profile ? user.profile.firstname : '',
        lastname: user.profile ? user.profile.lastname : '',
        mobile: user.profile ? user.profile.mobile : '',
        address: user.profile ? user.profile.address : '',
        clientSideErrors: {},
        serverSideErrors: null,
        isEdit: false
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleToggle = () => {
        setForm({ ...form, isEdit: !form.isEdit });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = user.profile
                ? await axios.put(`http://localhost:3068/api/candidates/profile`, form, {
                      headers: {
                          Authorization: localStorage.getItem('token')
                      }
                  })
                : await axios.post(`http://localhost:3068/api/candidates/profile`, form, {
                      headers: {
                          Authorization: localStorage.getItem('token')
                      }
                  });
            
            alert('Profile created');
            dispatch({ type: 'SET_PROFILE', payload: response.data });
        } catch (error) {
            console.error('Error submitting form:', error);
            setForm({ ...form, serverSideErrors: error.message });
        }
    };

    return (
        <div>
            <h2>Candidate Profile</h2>
            <button onClick={handleToggle}>{form.isEdit ? 'Cancel' : 'Edit'}</button>
            <form onSubmit={handleSubmit}>
                <label htmlFor="firstname">Firstname</label><br />
                <input
                    type="text"
                    id="firstname"
                    name="firstname"
                    disabled={!form.isEdit}
                    value={form.firstname}
                    onChange={handleChange}
                />
                <br />

                <label htmlFor="lastname">Lastname</label><br />
                <input
                    type="text"
                    id="lastname"
                    name="lastname"
                    disabled={!form.isEdit}
                    value={form.lastname}
                    onChange={handleChange}
                />
                <br />

                <label htmlFor="mobile">Mobile</label><br />
                <input
                    type="text"
                    id="mobile"
                    name="mobile"
                    disabled={!form.isEdit}
                    value={form.mobile}
                    onChange={handleChange}
                />
                <br />

                <label htmlFor="address">Address</label><br />
                <input
                    type="text"
                    id="address"
                    name="address"
                    disabled={!form.isEdit}
                    value={form.address}
                    onChange={handleChange}
                />
                <br />
                {form.isEdit && <input type="submit" />}
            </form>
        </div>
    );
}
