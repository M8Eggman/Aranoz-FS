import React, { useState } from "react";
import TextInput from "@/Components/Form/TextInput/TextInput";
import AdminButton from "@/Components/Buttons/AdminPage/AdminButton";
import Modal from "@/Components/Modals/Modal";
import { router, useForm, usePage } from "@inertiajs/react";
import styles from "./AdminTable.module.css";

export default function AdminTable({
    title,
    intialItems,
    initialLastId,
    storeRoute,
    updateRoute,
    deleteRoute,
}) {
    // Récupère les messages flash
    const { flash, errors, can } = usePage().props;
    const { data, setData, post, reset } = useForm({ name: "" });

    const [items, setCategories] = useState(intialItems || []);
    const [lastId, setLastId] = useState(initialLastId || 0);
    const [editingId, setEditingId] = useState(null);
    const [editingName, setEditingName] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const openModal = (item) => {
        setSelectedItem(item);
        setShowModal(true);
    };

    const onClose = () => {
        setSelectedItem(null);
        setShowModal(false);
    };

    const confirmDelete = () => {
        if (selectedItem) {
            handleDelete(selectedItem);
            setSelectedItem(null);
            setShowModal(false);
        }
    };

    const handleCreate = (e) => {
        e.preventDefault();
        if (!data.name.trim()) return;

        // Création côté front
        const tempId = lastId + 1;
        setLastId(tempId);
        setCategories([...items, { id: tempId, name: data.name }]);

        // Post via Inertia
        post(storeRoute, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => reset("name"),
            onError: () =>
                setCategories((prev) => prev.filter((i) => i.id !== tempId)),
        });
    };

    const handleUpdate = (item, newName) => {
        if (!newName.trim()) return;
        setCategories((prev) =>
            prev.map((i) => (i.id === item.id ? { ...i, name: newName } : i))
        );
        setEditingId(null);
        router.put(
            updateRoute(item.id),
            { name: newName },
            {
                preserveScroll: true,
                preserveState: true,
                onError: () =>
                    setCategories((prev) =>
                        prev.map((i) =>
                            i.id === item.id ? { ...i, name: item.name } : i
                        )
                    ),
            }
        );
    };

    const handleDelete = (item) => {
        setCategories((prev) => prev.filter((i) => i.id !== item.id));
        setEditingId(null);
        router.delete(deleteRoute(item.id), {
            preserveState: true,
            preserveScroll: true,
            onError: () => setCategories((prev) => [...prev, item]),
        });
    };

    return (
        <>
            {flash?.success && (
                <div className={styles.success}>{flash.success}</div>
            )}
            {flash?.error && <div className={styles.error}>{flash.error}</div>}
            {errors?.name && <div className={styles.error}>{errors.name}</div>}

            {showModal && (
                <Modal show={showModal} onClose={onClose}>
                    <>
                        <h2 className={styles.modalTitle}>Confirm Deletion</h2>
                        <p className={styles.modalText}>
                            Are you sure you want to delete this item?
                        </p>
                        <div className={styles.modalActions}>
                            <AdminButton
                                onClick={confirmDelete}
                                variant="delete"
                            >
                                Yes
                            </AdminButton>
                            <AdminButton onClick={onClose} variant="cancel">
                                Cancel
                            </AdminButton>
                        </div>
                    </>
                </Modal>
            )}

            <section className={styles.container}>
                <form className={styles.form} onSubmit={handleCreate}>
                    <TextInput
                        name="name"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        placeholder={`New ${title.slice(0, -1)}`}
                    />
                    <AdminButton type="submit">Create</AdminButton>
                </form>

                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th width="100%">Name</th>
                            <th>Modification</th>
                            {can.isAdmin && <th>Delete</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>
                                    {editingId === item.id ? (
                                        <TextInput
                                            name="name"
                                            value={editingName}
                                            style={{ width: "100%" }}
                                            onChange={(e) =>
                                                setEditingName(e.target.value)
                                            }
                                            onKeyDown={(e) =>
                                                e.key === "Enter" &&
                                                handleUpdate(item, editingName)
                                            }
                                        />
                                    ) : (
                                        item.name
                                    )}
                                </td>
                                <td>
                                    {editingId === item.id ? (
                                        <div className={styles.buttonGroup}>
                                            <AdminButton
                                                onClick={() =>
                                                    handleUpdate(
                                                        item,
                                                        editingName
                                                    )
                                                }
                                            >
                                                Save
                                            </AdminButton>
                                            <AdminButton
                                                onClick={() =>
                                                    setEditingId(null)
                                                }
                                                variant="cancel"
                                            >
                                                Cancel
                                            </AdminButton>
                                        </div>
                                    ) : (
                                        <AdminButton
                                            onClick={() => {
                                                setEditingId(item.id);
                                                setEditingName(item.name);
                                            }}
                                            variant="edit"
                                        >
                                            Edit
                                        </AdminButton>
                                    )}
                                </td>
                                {can.isAdmin && (
                                    <td>
                                        <AdminButton
                                            onClick={() => openModal(item)}
                                            variant="delete"
                                        >
                                            Delete
                                        </AdminButton>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </>
    );
}
