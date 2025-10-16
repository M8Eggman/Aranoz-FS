import React, { useState } from "react";
import { router, useForm } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import TextInput from "@/Components/Form/TextInput/TextInput";
import Button from "@/Components/Form/Buttons/Button";
import styles from "./CommentsSection.module.css";
import TextArea from "@/Components/Form/Textarea/Textarea";
import { formatDate } from "@/utils/StringHelper";
import AdminButton from "@/Components/Buttons/AdminPage/AdminButton";
import FlashMessage from "@/Components/FlashMessage/FlashMessage";

export default function CommentsSection({ productId, comments }) {
    const { auth } = usePage().props;

    const { data, setData, post, processing, errors, reset } = useForm({
        message: "",
        website: "",
        product_id: productId,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("products.comments.store"), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                reset();
                setShowForm(false);
            },
        });
    };

    const handleDelete = (id) => {
        router.delete(route("products.comments.destroy", id), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <div className={styles.commentsSection}>
            <div className={styles.commentsHeader}>
                <h3 className={styles.commentsTitle}>
                    Comments ({comments.length})
                </h3>
            </div>

            {/* Login Prompt */}
            {!auth.user && (
                <div className={styles.loginPrompt}>
                    <p>
                        <a href={route("login")} className={styles.loginLink}>
                            Login
                        </a>{" "}
                        to leave a comment.
                    </p>
                </div>
            )}

            {/* Add Comment Form */}
            {auth.user && (
                <form onSubmit={handleSubmit} className={styles.commentForm}>
                    <div className={styles.formGroup}>
                        <TextArea
                            rows="4"
                            placeholder="Write your comment here..."
                            value={data.message}
                            onChange={(e) => setData("message", e.target.value)}
                            className={styles.messageInput}
                        />
                        {errors.message && (
                            <span className={styles.error}>
                                {errors.message}
                            </span>
                        )}
                    </div>
                    <div className={styles.formGroup}>
                        <TextInput
                            type="url"
                            placeholder="Enter your website (optional)"
                            value={data.website}
                            onChange={(e) => setData("website", e.target.value)}
                            className={styles.websiteInput}
                        />
                    </div>
                    {errors.website && (
                        <span className={styles.error}>{errors.website}</span>
                    )}
                    <div className={styles.formActions}>
                        <Button
                            type="submit"
                            disabled={processing}
                            className={styles.submitBtn}
                        >
                            {processing ? "Posting..." : "Post Comment"}
                        </Button>
                    </div>
                </form>
            )}

            {/* Comments List */}
            <div className={styles.commentsList}>
                <FlashMessage />

                {comments.length > 0 ? (
                    comments.map((comment) => (
                        <div key={comment.id} className={styles.comment}>
                            <div className={styles.commentHeader}>
                                <div className={styles.userInfo}>
                                    <div className={styles.userAvatar}>
                                        {comment.user.images?.medium ? (
                                            <img
                                                src={comment.user.images.medium}
                                                alt=""
                                            />
                                        ) : (
                                            <span
                                                className={
                                                    styles.avatarPlaceholder
                                                }
                                            >
                                                {comment.user.name
                                                    .charAt(0)
                                                    .toUpperCase()}
                                            </span>
                                        )}
                                    </div>
                                    <div className={styles.userDetails}>
                                        <span className={styles.userName}>
                                            {comment.user.name}
                                        </span>
                                        {comment.website && (
                                            <div
                                                className={
                                                    styles.commentWebsite
                                                }
                                            >
                                                <a
                                                    href={comment.website}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    {comment.website}
                                                </a>
                                            </div>
                                        )}
                                        <span className={styles.commentDate}>
                                            {formatDate(comment.created_at)}
                                        </span>
                                    </div>
                                    {auth.user &&
                                        (auth.user.id === comment.user_id ||
                                            auth.user.role.name ===
                                                "admin") && (
                                            <div
                                                className={
                                                    styles.commentActions
                                                }
                                            >
                                                <AdminButton
                                                    variant="delete"
                                                    className={
                                                        styles.deleteButton
                                                    }
                                                    onClick={() => {
                                                        handleDelete(
                                                            comment.id
                                                        );
                                                    }}
                                                >
                                                    Delete
                                                </AdminButton>
                                            </div>
                                        )}
                                </div>
                            </div>
                            <div className={styles.commentContent}>
                                <p>{comment.message}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className={styles.noComments}>
                        <p>No comments yet. Be the first to comment!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
