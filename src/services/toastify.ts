import { Bounce, toast, ToastOptions, Id } from "react-toastify";

export const notify = {
    sucesso: (mensagem: string, options?: ToastOptions) => {
        const id: Id | undefined = options?.toastId;
        if (id !== undefined && toast.isActive(id)) {
            return;
        }

        toast.success(mensagem, {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            ...(id !== undefined ? { toastId: id } : {}),
            ...options
        });
    },
    erro: (mensagem: string, options?: ToastOptions) => {
        const id: Id | undefined = options?.toastId;
        if (id !== undefined && toast.isActive(id)) {
            return;
        }

        toast.error(mensagem, {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            ...(id !== undefined ? { toastId: id } : {}),
            ...options
        });
    }
}
