import BackLayout from "@/Layouts/BackLayout";
import React from "react";
import AdminHeader from "../partials/Header/AdminHeader";

export default function Users({ users }) {
    return (
        <>
            <AdminHeader title="Users Settings" />
            <section>
                
            </section>
        </>
    );
}

Users.layout = (page) => <BackLayout>{page}</BackLayout>;
