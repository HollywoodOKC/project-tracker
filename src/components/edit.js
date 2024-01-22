import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

export default function Edit() {
    const [form, setForm] = useState({
        name: "",
        position: "",
        description: "",
        progress: [],
    });
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const id = params.id.toString();
            const response = await fetch(`http://192.168.0.6:5000/record/${params.id.toString()}`);

            if (!response.ok) {
                const message = `An error has occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const record = await response.json();
            if (!record) {
                window.alert(`Project with id ${id} not found`);
                navigate("/");
                return;
            }

            setForm(record);
        }

        fetchData();

        return;
    }, [params.id, navigate]);

    // These methods will update the state properties.
    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    async function onSubmit(e) {
        e.preventDefault();
        const editedProject = {
            name: form.name,
            description: form.description,
            progress: form.progress,
        };

        // This will send a post request to update the data in the database.
        await fetch(`http://192.168.0.6:5000/records/${params.id}`, {
            method: "PATCH",
            body: JSON.stringify(editedProject),
            headers: {
                'Content-Type': 'application/json'
            },
        });

        navigate("/");
    }

    // This following section will display the form that takes input from the user to update the data.
    return (
        <div>
            <h3>Update Record</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Project Name: </label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={form.name}
                        onChange={(e) => updateForm({ name: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input
                        type="text"
                        className="form-control"
                        id="description"
                        value={form.description}
                        onChange={(e) => updateForm({ description: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="progressOptions"
                            id="progressOngoing"
                            value="Ongoing"
                            checked={form.progress === "Ongoing"}
                            onChange={(e) => updateForm({ progress: e.target.value })}
                        />
                        <label htmlFor="progressOutgoing" className="form-check-label">Complete</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="progressOptions"
                            id="progressComplete"
                            value="Complete"
                            checked={form.progress === "Complete"}
                            onChange={(e) => updateForm({ progress: e.target.value })}
                        />
                        <label htmlFor="progressComplete" className="form-check-label">R&D</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="progressOptions"
                            id="progressR&D"
                            value="R&D"
                            checked={form.progress === "R&D"}
                            onChange={(e) => updateForm({ progress: e.target.value })}
                        />
                        <label htmlFor="progressR&D" className="form-check-label">Senior</label>
                    </div>
                </div>
                <br />

                <div className="form-group">
                    <input
                        type="submit"
                        value="Update Project"
                        className="btn btn-primary"
                    />
                </div>
            </form>
        </div>
    );
}