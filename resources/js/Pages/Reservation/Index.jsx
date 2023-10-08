import { useState } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import AlertSuccess from "@/Components/AlertSuccess";
import AlertDanger from "@/Components/AlertDanger";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import Modal from "@/Components/Modal";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import { Transition } from "@headlessui/react";
import DangerButton from "@/Components/DangerButton";

export default function Index({ status, reservations, page }) {
    const [selectedReservation, setSelectedReservation] = useState(null);

    const {
        data,
        setData,
        post,
        put,
        errors,
        processing,
        recentlySuccessful,
        reset,
    } = useForm({
        email: "",
        seats: "",
    });

    const confirmModalOpen = (reservation) => {
        setData((values) => ({
            ...values,
            email: reservation.email,
            seats: reservation.seats,
        }));
        setSelectedReservation(reservation);
    };

    const closeModal = () => {
        setSelectedReservation(null);
        reset();
    };

    const updateReservation = (e) => {
        e.preventDefault();
        put(route("reservation.update", {id:selectedReservation.id, page}),{
            preserveScroll: true,
            onSuccess: () => closeModal()
        });
    };

    const confirmReservationCancel = (reservationId) => {
        put(route("reservation.cancel", {id:reservationId, page}));
    };

    return (
        <GuestLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Reservas
                </h2>
            }
        >
            <Head title="Reservas" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            {status === "success" && (
                                <AlertSuccess message="Usuario creado exitosamente." />
                            )}
                            {status === "danger" && (
                                <AlertDanger message="Error al crear el usuario." />
                            )}
                            <div className="flex items-center justify-between mb-6"></div>

                            <table className="table-auto w-full">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="px-4 py-2">Correo</th>
                                        <th className="px-4 py-2">Origen</th>
                                        <th className="px-4 py-2">Destino</th>
                                        <th className="px-4 py-2">Salida</th>
                                        <th className="px-4 py-2">Llegada</th>
                                        <th className="px-4 py-2">Sillas</th>
                                        <th className="px-4 py-2">Cancelado</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reservations.data.map((reservation) => (
                                        <tr key={reservation.id}>
                                            <td className="border px-4 py-2">
                                                {reservation.email}
                                            </td>
                                            <td className="border px-4 py-2">
                                                {
                                                    reservation.flight
                                                        .origin_city.name
                                                }
                                            </td>
                                            <td className="border px-4 py-2">
                                                {
                                                    reservation.flight
                                                        .destination_city.name
                                                }
                                            </td>
                                            <td className="border px-4 py-2">
                                                {
                                                    reservation.flight
                                                        .departure_datetime
                                                }
                                            </td>
                                            <td className="border px-4 py-2">
                                                {
                                                    reservation.flight
                                                        .arrival_datetime
                                                }
                                            </td>
                                            <td className="border px-4 py-2">
                                                {reservation.seats}
                                            </td>
                                            <td className="border px-4 py-2">
                                                {reservation.is_cancelled
                                                    ? "si"
                                                    : "no"}
                                            </td>

                                            <td className="border px-4 py-2">
                                                {!reservation.is_cancelled && (
                                                    <div>
                                                        <button
                                                            onClick={() =>
                                                                confirmModalOpen(
                                                                    reservation
                                                                )
                                                            }
                                                        >
                                                            <PencilSquareIcon className="h-6 w-6 text-blue-500" />
                                                        </button>
                                                        <DangerButton
                                                            onClick={(e) =>
                                                                confirmReservationCancel(
                                                                    reservation.id
                                                                )
                                                            }
                                                        >
                                                            Cancel
                                                        </DangerButton>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))}

                                    {reservations.data.length === 0 && (
                                        <tr>
                                            <td
                                                className="px-6 py-4 border-t"
                                                colSpan="4"
                                            >
                                                No se encontraron reservas.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            <Pagination
                                class="mt-6"
                                links={reservations.links}
                            />
                        </div>
                        <Modal
                            show={selectedReservation ? true : false}
                            onClose={closeModal}
                        >
                            <form onSubmit={updateReservation} className="p-6">
                                <div>
                                    <InputLabel
                                        htmlFor="email"
                                        value="Correo"
                                    />
                                    <TextInput
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="mt-1 block w-full"
                                        autoComplete="email"
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        disabled
                                    />
                                    <InputError
                                        message={errors.email}
                                        className="mt-2"
                                    />
                                </div>
                                <div>
                                    <InputLabel
                                        htmlFor="seats"
                                        value="Sillas"
                                    />
                                    <TextInput
                                        type="number"
                                        id="seats"
                                        name="seats"
                                        value={data.seats}
                                        className="mt-1 block w-full"
                                        autoComplete="seats"
                                        onChange={(e) =>
                                            setData("seats", e.target.value)
                                        }
                                        required
                                    />
                                    <InputError
                                        message={errors.seats}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="flex items-center gap-4 mt-2">
                                    <PrimaryButton disabled={processing}>
                                        Guardar
                                    </PrimaryButton>

                                    <Transition
                                        show={recentlySuccessful}
                                        enterFrom="opacity-0"
                                        leaveTo="opacity-0"
                                        className="transition ease-in-out"
                                    >
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Guardado.
                                        </p>
                                    </Transition>
                                </div>
                            </form>
                        </Modal>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
