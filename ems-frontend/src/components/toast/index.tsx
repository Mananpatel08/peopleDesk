import { motion, AnimatePresence } from "framer-motion";
import { LightBulbIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon, ExclamationTriangleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { X } from "lucide-react";

export type ToastType = "success" | "failed" | "warning" | "info";

interface ToastProps {
    type: ToastType;
    title: string;
    message: string;
    onClose: () => void;
}

const toastConfig = {
    success: {
        icon: <CheckCircleIcon className="w-12 h-12 text-green-500" />,
        bg: "bg-green-50 border-green-300 hover:bg-green-50/40",
    },
    info: {
        icon: <LightBulbIcon className="w-10 h-10 bg-blue-500 rounded-full p-2 text-white" />,
        bg: "bg-blue-50 border-blue-400 hover:bg-blue-50/40",
    },
    warning: {
        icon: <ExclamationTriangleIcon className="w-10 h-10 bg-yellow-500 rounded-full p-2 text-white" />,
        bg: "bg-yellow-50 border-yellow-400 hover:bg-yellow-50/40",
    },
    failed: {
        icon: <XCircleIcon className="w-12 h-12 text-red-500" />,
        bg: "bg-red-50 border-red-400 hover:bg-red-50/40",
    }
};

const variants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
    exit: { opacity: 0, y: 50, transition: { duration: 0.25, ease: "easeIn" } }
} as const;

export function Toast({ type, title, message, onClose }: ToastProps) {
    const { icon, bg } = toastConfig[type];

    return (
        <motion.div
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            className={`flex items-center gap-3 border-[0.5px] rounded-2xl px-3 py-2.5 shadow-sm ${bg} hover:cursor-default`}
        >
            <div className={`flex items-center justify-center ${bg}`}>
                {icon}
            </div>

            <div className="flex flex-col flex-1">
                <p className="font-semibold text-gray-800 text-lg">{title}</p>
                <p className="text-gray-600 text-sm whitespace-nowrap overflow-hidden text-ellipsis">{message}</p>
            </div>

            <button
                onClick={onClose}
                className="bg-transparent rounded-xl p-2 hover:bg-white transition"
            >
                <X className="w-5 h-5 opacity-70 hover:opacity-100" />
            </button>

        </motion.div>
    );
}
