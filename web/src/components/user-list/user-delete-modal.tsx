"use client";

import React, { FC, useState } from 'react'
import { AlertModalCore } from '../ui/modals';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    data: any
}
export const UserDeleteModal: FC<Props> = (props) => {
    const { isOpen, onClose, data } = props;
    const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

    const handleClose = () => {
        onClose();
        setDeleteLoading(false);
    };

    const handleDeletion = () => {
        setDeleteLoading(true);
        try {
            // delete user API
        } catch (error) {
            console.error(error);
        } finally {
            setDeleteLoading(false);
        }
    }

    return (
        <AlertModalCore
            handleClose={handleClose}
            handleSubmit={handleDeletion}
            isSubmitting={deleteLoading}
            isOpen={isOpen}
            title="Delete User"
            content={
                <>
                    {`Are you sure you want to delete user `}
                    <span className="break-words font-medium text-custom-text-100">
                        {data?.email}
                    </span>
                    {` ? They will lose access to their account and data. This action cannot be undone.`}
                </>
            }
        />
    )
}
