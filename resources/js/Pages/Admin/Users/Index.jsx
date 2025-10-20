import React, { useState } from "react";
import { router, usePage } from "@inertiajs/react";
import styles from "../partials/AdminTable/AdminTable.module.css";
import BackLayout from "@/Layouts/BackLayout";
import FlashMessage from "@/Components/FlashMessage/FlashMessage";
import Modal from "@/Components/Modals/Modal";
import AdminButton from "@/Components/Buttons/AdminPage/AdminButton";
import AdminHeader from "../../../Components/Header/AdminHeader";
import { formatUnderscore } from "@/utils/StringHelper";

export default function Users({ users: initialUsers, roles }) {
    const { can } = usePage().props;

    const [users, setUsers] = useState(initialUsers || []);
    const [editingRoleId, setEditingRoleId] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [roleEditValue, setRoleEditValue] = useState("");

    const openModal = (user) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    const closeModal = () => {
        setSelectedUser(null);
        setShowModal(false);
    };

    const confirmDelete = () => {
        if (!selectedUser) return;

        setUsers(users.filter((u) => u.id !== selectedUser.id));

        router.delete(route("admin.users.destroy", selectedUser.id), {
            preserveState: true,
            preserveScroll: true,
            onError: () => setUsers((prev) => [...prev, selectedUser]),
        });

        setSelectedUser(null);
        setShowModal(false);
    };

    const startEditRole = (user) => {
        setEditingRoleId(user.id);
        setRoleEditValue(user.role?.id || "");
    };

    const saveRole = (user) => {
        setUsers((prev) =>
            prev.map((u) =>
                u.id === user.id
                    ? { ...u, role: roles.find((r) => r.id == roleEditValue) }
                    : u
            )
        );
        setEditingRoleId(null);

        router.put(
            route("admin.users.role.update", user.id),
            { role_id: roleEditValue },
            { preserveState: true, preserveScroll: true }
        );
    };

    return (
        <>
            <AdminHeader title="Users Settings" />
            <section className={styles.container}>
                <FlashMessage />

                {showModal && (
                    <Modal show={showModal} onClose={closeModal}>
                        <>
                            <h2 className={styles.modalTitle}>
                                Confirm Deletion
                            </h2>
                            <p className={styles.modalText}>
                                Are you sure you want to delete{" "}
                                {selectedUser?.name}?
                            </p>
                            <div className={styles.modalActions}>
                                <AdminButton
                                    onClick={confirmDelete}
                                    variant="delete"
                                >
                                    Yes
                                </AdminButton>
                                <AdminButton
                                    onClick={closeModal}
                                    variant="cancel"
                                >
                                    Cancel
                                </AdminButton>
                            </div>
                        </>
                    </Modal>
                )}

                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th width="100%">Email</th>
                            <th>Role</th>
                            {can.isAdmin && <th>Actions</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => {
                            const isUserAdmin = user.role?.name === "admin";
                            return (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>
                                        <img
                                            src={
                                                user.images?.small ||
                                                "/storage/users/templateU.png"
                                            }
                                            alt={user.name}
                                            className={styles.avatar}
                                        />
                                    </td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        {editingRoleId === user.id ? (
                                            <select
                                                value={roleEditValue}
                                                onChange={(e) =>
                                                    setRoleEditValue(
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                {roles.map((role) => (
                                                    <option
                                                        key={role.id}
                                                        value={role.id}
                                                    >
                                                        {formatUnderscore(
                                                            role.name
                                                        )}
                                                    </option>
                                                ))}
                                            </select>
                                        ) : (
                                            formatUnderscore(user.role.name)
                                        )}
                                    </td>
                                    {can.isAdmin && (
                                        <td className={styles.actions}>
                                            {!isUserAdmin &&
                                                editingRoleId !== user.id && (
                                                    <>
                                                        <AdminButton
                                                            onClick={() =>
                                                                startEditRole(
                                                                    user
                                                                )
                                                            }
                                                            variant="edit"
                                                        >
                                                            Edit Role
                                                        </AdminButton>
                                                        <AdminButton
                                                            onClick={() =>
                                                                openModal(user)
                                                            }
                                                            variant="delete"
                                                        >
                                                            Delete
                                                        </AdminButton>
                                                    </>
                                                )}
                                            {editingRoleId === user.id && (
                                                <div
                                                    className={
                                                        styles.buttonGroup
                                                    }
                                                >
                                                    <AdminButton
                                                        onClick={() =>
                                                            saveRole(user)
                                                        }
                                                    >
                                                        Save
                                                    </AdminButton>
                                                    <AdminButton
                                                        onClick={() =>
                                                            setEditingRoleId(
                                                                null
                                                            )
                                                        }
                                                        variant="cancel"
                                                    >
                                                        Cancel
                                                    </AdminButton>
                                                </div>
                                            )}
                                        </td>
                                    )}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </section>
        </>
    );
}

Users.layout = (page) => <BackLayout>{page}</BackLayout>;
