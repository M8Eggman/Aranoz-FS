import AdminHeader from "@/Components/Header/Header";
import BackLayout from "@/Layouts/BackLayout";
import { router, useForm } from "@inertiajs/react";
import React, { useState } from "react";
import styles from "../AdminPage.module.css";
import TextInput from "@/Components/Form/TextInput/TextInput";
import AdminButton from "@/Components/Buttons/AdminPage/AdminButton";
import Modal from "@/Components/Modals/Modal";

export default function BlogCategories({
    categories: initialCategories,
    lastId: initialLastId,
}) {
    const { data, setData, post } = useForm({ name: "" });

    // State tampon local
    const [categories, setCategories] = useState(initialCategories || []);
    const [lastId, setLastId] = useState(initialLastId || 0);
    const [editingId, setEditingId] = useState(null);
    const [editingName, setEditingName] = useState("");

    const [showModal, setShowModal] = useState(false);
    const [selectedCat, setSelectedCat] = useState(null);

    const openModal = (cat) => {
        setSelectedCat(cat);
        setShowModal(true);
    };

    const confirmDelete = () => {
        if (selectedCat) {
            handleDelete(selectedCat);
            setSelectedCat(null);
            setShowModal(false);
        }
    };

    function handleCreate(e) {
        e.preventDefault();
        if (!data.name.trim()) return;

        // Ajouter instantanément coté front
        const tempId = lastId + 1;
        setLastId(tempId);
        setCategories([...categories, { id: tempId, name: data.name }]);

        // Reset l'input
        setData("name", "");

        post(route("admin.blogs-categories.store"), {
            preserveState: true,
            preserveScroll: true,
            // Si y'a une erreur supprimer le temp
            onError: () => {
                setCategories((prev) => prev.filter((c) => c.id !== tempId));
            },
        });
    }

    function handleEdit(cat) {
        setEditingId(cat.id);
        setEditingName(cat.name);
    }

    function handleUpdate(cat) {
        if (!editingName.trim()) return;

        // Mise à jour instantanée côté front
        setCategories((prev) =>
            prev.map((c) => (c.id === cat.id ? { ...c, name: editingName } : c))
        );
        setEditingId(null);

        // Envoyer la requête au serveur
        router.put(
            route("admin.blogs-categories.update", cat.id),
            {
                name: editingName,
            },
            {
                preserveState: true,
                preserveScroll: true,
                onError: (errors) => {
                    // Si erreur, revenir à l'ancienne valeur
                    setCategories((prev) =>
                        prev.map((c) =>
                            c.id === cat.id ? { ...c, name: cat.name } : c
                        )
                    );
                },
            }
        );
    }

    function handleDelete(cat) {
        // Suppression instantanée côté front
        setCategories((prev) => prev.filter((c) => c.id !== cat.id));
        setEditingId(null);

        // Envoyer la requête au serveur
        router.delete(route("admin.blogs-categories.destroy", cat.id), {
            preserveState: true,
            preserveScroll: true,
            onError: () => {
                // Si erreur, remettre la catégorie
                setCategories((prev) => [...prev, cat]);
            },
        });
    }

    return (
        <>
            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <>
                    <h2 className="text-h3 font-semibold mb-md">
                        Confirm Deletion
                    </h2>
                    <p className="text-sm mb-lg">
                        Are you sure you want to delete this category?
                    </p>
                    <div className="flex gap-xs justify-end">
                        <AdminButton
                            onClick={confirmDelete}
                            variant="delete"
                            className="bg-dark-pink text-white px-lg py-sm rounded hover:bg-pink-700 transition"
                        >
                            Yes
                        </AdminButton>
                        <AdminButton
                            onClick={() => setShowModal(false)}
                            variant="cancel"
                            className="bg-rose-pale text-charcoal px-lg py-sm rounded hover:bg-pink-200 transition"
                        >
                            Cancel
                        </AdminButton>
                    </div>
                </>
            </Modal>
            <AdminHeader title="Blog Categories Settings" />
            <section className={styles.container}>
                <form onSubmit={handleCreate} className={styles.form}>
                    <TextInput
                        name="name"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        placeholder="New category name"
                    />
                    <AdminButton type="submit">Create Category</AdminButton>
                </form>

                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th width="100%">Name</th>
                            <th>Modification</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((cat) => (
                            <tr key={cat.id}>
                                <td>{cat.id}</td>
                                <td>
                                    {editingId === cat.id ? (
                                        <TextInput
                                            name="name"
                                            value={editingName}
                                            style={{ width: "100%" }}
                                            onChange={(e) =>
                                                setEditingName(e.target.value)
                                            }
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter")
                                                    handleUpdate(cat);
                                            }}
                                        />
                                    ) : (
                                        cat.name
                                    )}
                                </td>
                                <td>
                                    {editingId === cat.id ? (
                                        <div className={styles.buttonGroup}>
                                            <AdminButton
                                                onClick={() =>
                                                    handleUpdate(cat)
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
                                            onClick={() => handleEdit(cat)}
                                        >
                                            Edit
                                        </AdminButton>
                                    )}
                                </td>
                                <td>
                                    <AdminButton
                                        onClick={() => openModal(cat)}
                                        variant="delete"
                                    >
                                        Delete
                                    </AdminButton>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </>
    );
}

BlogCategories.layout = (page) => <BackLayout>{page}</BackLayout>;
