import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import { axiosRes } from "../../api/axiosDefaults";


function CommentEditForm(props) {
    const { id, content, setShowEditForm, setComments } = props;

    const [formContent, setFormContent] = useState(content);

    const handleChange = (event) => {
    setFormContent(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axiosRes.put(`/comments/${id}/`, {
            content: formContent.trim(),
            });
            setComments((prevComments) => ({
            ...prevComments,
            results: prevComments.results.map((comment) => {
                return comment.id === id
                ? {
                    ...comment,
                    content: formContent.trim(),
                    updated_at: "now",
                }
                : comment;
            }),
        }));
            setShowEditForm(false);
        } catch (err) {
            //console.log(err);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="">
                <Form.Control
                    className="Form"
                    as="textarea"
                    value={formContent}
                    onChange={handleChange}
                    rows={2}
                />
            </Form.Group>
                <div className="minibtns">
                    <button
                    className="btnsm"
                    onClick={() => setShowEditForm(false)}
                    type="button"
                    >
                    cancel
                    </button>
                    <button
                        className="btnsm"
                        disabled={!content.trim()}
                        type="submit"
                    >
                        save
                    </button>
                </div>
            </Form>
    );
}

export default CommentEditForm;