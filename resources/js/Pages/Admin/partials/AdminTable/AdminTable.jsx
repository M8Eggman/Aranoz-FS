import React, { useState } from "react";
import TextInput from "@/Components/Form/TextInput/TextInput";
import AdminButton from "@/Components/Buttons/AdminPage/AdminButton";
import Modal from "@/Components/Modals/Modal";
import { router, useForm, usePage } from "@inertiajs/react";
import styles from "./AdminTable.module.css";
import FlashMessage from "@/Components/FlashMessage/FlashMessage";

export default function AdminTable({
    title,
    intialItems,
    initialLastId,
    storeRoute,
    updateRoute,
    deleteRoute,
    secondInput = "",
}) {
    const { flash, errors, can } = usePage().props;

    // Initialise le formulaire avec un input secondaire si second input existe
    const initialForm = { name: "" };
    if (secondInput.trim().length > 0) {
        initialForm[secondInput] = "";
    }
    const { data, setData, post, reset } = useForm(initialForm);

    const [items, setItems] = useState(intialItems || []);
    const [lastId, setLastId] = useState(initialLastId || 0);
    const [editingId, setEditingId] = useState(null);
    const [editingName, setEditingName] = useState("");
    const [editingSecond, setEditingSecond] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    function singularize(word) {
        if (word.endsWith("ies")) return word.slice(0, -3) + "y";
        if (word.endsWith("s")) return word.slice(0, -1);
        return word;
    }

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

        const tempId = lastId + 1;
        setLastId(tempId);

        const newItem = { id: tempId, name: data.name };
        if (secondInput) newItem[secondInput] = data[secondInput];

        setItems([...items, newItem]);

        post(storeRoute, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => reset(),
            onError: () =>
                setItems((prev) => prev.filter((i) => i.id !== tempId)),
        });
    };

    const handleUpdate = (item, newName, newSecond) => {
        if (!newName.trim()) return;

        const updatedItem = { ...item, name: newName };
        if (secondInput) updatedItem[secondInput] = newSecond;

        setItems((prev) =>
            prev.map((i) => (i.id === item.id ? updatedItem : i))
        );

        setEditingId(null);

        router.put(
            updateRoute(item.id),
            {
                name: newName,
                ...(secondInput ? { [secondInput]: newSecond } : {}),
            },
            {
                preserveScroll: true,
                preserveState: true,
                onError: () =>
                    setItems((prev) =>
                        prev.map((i) => (i.id === item.id ? item : i))
                    ),
            }
        );
    };

    const handleDelete = (item) => {
        setItems((prev) => prev.filter((i) => i.id !== item.id));
        setEditingId(null);
        router.delete(deleteRoute(item.id), {
            preserveState: true,
            preserveScroll: true,
            onError: () => setItems((prev) => [...prev, item]),
        });
    };

    return (
        <>
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
                <FlashMessage />

                {errors?.name && (
                    <div className="flashError">{errors.name}</div>
                )}

                <form className={styles.form} onSubmit={handleCreate}>
                    <TextInput
                        name="name"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        placeholder={`New ${singularize(title.toLowerCase())}`}
                    />
                    {secondInput.trim().length > 0 && (
                        <TextInput
                            name={secondInput}
                            value={data[secondInput]}
                            onChange={(e) =>
                                setData(secondInput, e.target.value)
                            }
                            placeholder={`New ${singularize(
                                secondInput.toLowerCase()
                            )}`}
                        />
                    )}
                    <AdminButton type="submit">Create</AdminButton>
                </form>

                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th
                                width={
                                    secondInput.trim().length <= 0
                                        ? "100%"
                                        : "50%"
                                }
                            >
                                Name
                            </th>
                            {secondInput && <th width="50%">{secondInput}</th>}
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
                                                handleUpdate(
                                                    item,
                                                    editingName,
                                                    editingSecond
                                                )
                                            }
                                        />
                                    ) : (
                                        item.name
                                    )}
                                </td>

                                {secondInput && (
                                    <td>
                                        {editingId === item.id ? (
                                            <TextInput
                                                name={secondInput}
                                                value={editingSecond}
                                                style={{ width: "100%" }}
                                                onChange={(e) =>
                                                    setEditingSecond(
                                                        e.target.value
                                                    )
                                                }
                                                onKeyDown={(e) =>
                                                    e.key === "Enter" &&
                                                    handleUpdate(
                                                        item,
                                                        editingName,
                                                        editingSecond
                                                    )
                                                }
                                            />
                                        ) : (
                                            item[secondInput]
                                        )}
                                    </td>
                                )}

                                <td>
                                    {editingId === item.id ? (
                                        <div className={styles.buttonGroup}>
                                            <AdminButton
                                                onClick={() =>
                                                    handleUpdate(
                                                        item,
                                                        editingName,
                                                        editingSecond
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
                                                if (secondInput)
                                                    setEditingSecond(
                                                        item[secondInput]
                                                    );
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
