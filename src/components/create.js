import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Create() {
    const [form, setForm] = useState({
        name: "",
        description: "",
        progress: "",
    });
    const navigate = useNavigate();

    // These methods will update the state properties.
    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    // This function will handle the submission.
    async function onSubmit(e) {
        e.preventDefault();

        // When a post request is sent to the create url, we'll add a new record to the database.
        const newProject = { ...form };

        await fetch("http://localhost:5050/record", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newProject),
        })
            .catch(error => {
                window.alert(error);
                return;
            });

        setForm({ name: "", description: "", progress: "" });
        navigate("/");
    }

    // This following section will display the form that takes the input from the user.
    return (
        <div>
            <h3>Create New Project</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Project Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={form.name}
                        onChange={(e) => updateForm({ name: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
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
                            checked={form.level === "Ongoing"}
                            onChange={(e) => updateForm({ progress: e.target.value })}
                        />
                        <label htmlFor="positionOngoing" className="form-check-label">Ongoing</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="progressOptions"
                            id="progressComplete"
                            value="Complete"
                            checked={form.level === "Complete"}
                            onChange={(e) => updateForm({ progress: e.target.value })}
                        />
                        <label htmlFor="progressComplete" className="form-check-label">Complete</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="progressOptions"
                            id="progressR&D"
                            value="R&D"
                            checked={form.level === "R&D"}
                            onChange={(e) => updateForm({ progress: e.target.value })}
                        />
                        <label htmlFor="progressR&D" className="form-check-label">Senior</label>
                    </div>
                </div>
                <div className="form-group">
                    <input
                        type="submit"
                        value="Create project"
                        className="btn btn-primary"
                    />
                </div>
            </form>
        </div>
    );
}