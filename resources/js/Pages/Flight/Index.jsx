import { useState, useRef } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head,  useForm, router } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import AlertSuccess from "@/Components/AlertSuccess";
import AlertDanger from "@/Components/AlertDanger";
import Modal from "@/Components/Modal";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import { ViewfinderCircleIcon } from "@heroicons/react/24/outline";
import PrimaryButton from "@/Components/PrimaryButton";
import { Transition } from "@headlessui/react";

export default function Index({ status, flights, page, conditions }) {

    const [searchParams, setSearchParams] = useState({
        origin_city: conditions.origin_city || '',
    });
    const {
        data,
        setData,
        post,
        errors,
        processing,
        recentlySuccessful,
        reset,
    } = useForm({
        flight_id: "",
        email: "",
        seats: 1,
    });

    const [selectedFlight, setSelectedFlight] = useState(null);
    const seatsInput = useRef();

    const confirmModalOpen = (flight) => {
        setData("flight_id", flight.id);
        setSelectedFlight(flight);
    };

    const closeModal = () => {
        setSelectedFlight(null);
        reset();
    };


    const createReservation = (e) => {
        e.preventDefault();
        post(route("reservation.store",{page}), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => seatsInput.current.focus()
        });
    };

    const handleSearchChange = (e) => {
        const { name, value } = e.target;
        setSearchParams({
            ...searchParams,
            [name]: value,
        });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route("flight.index"), {
           ...searchParams
        });
    };

    return (
        <GuestLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Vuelos
                </h2>
            }
        >
            <Head title="Vuelos" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                        <div className="mb-4 flex space-x-4 items-center">
                                <div>
                                    <TextInput
                                        name="origin_city"
                                        value={searchParams.origin_city}
                                        onChange={handleSearchChange}
                                        placeholder="Ciudad origen"
                                    />
                                </div>
                                <button
                                    onClick={handleSearch}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
                                >
                                    Buscar
                                </button>
                            </div>

                            <table className="table-auto w-full">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="px-4 py-2">Origen</th>
                                        <th className="px-4 py-2">Destino</th>
                                        <th className="px-4 py-2">Salida</th>
                                        <th className="px-4 py-2">LLegada</th>
                                        <th className="px-4 py-2">
                                            Cupos disponibles
                                        </th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {flights.data.map((flight) => (
                                        <tr key={flight.id}>
                                            <td className="border px-4 py-2">
                                                {flight.origin_city.name}
                                            </td>
                                            <td className="border px-4 py-2">
                                                {flight.destination_city.name}
                                            </td>
                                            <td className="border px-4 py-2">
                                                {flight.departure_datetime}
                                            </td>
                                            <td className="border px-4 py-2">
                                                {flight.arrival_datetime}
                                            </td>
                                            <td className="border px-4 py-2">
                                                {flight.available_seats}
                                            </td>
                                            <td className="border px-4 py-2">
                                                <button
                                                    onClick={() =>
                                                        confirmModalOpen(flight)
                                                    }
                                                >
                                                    <ViewfinderCircleIcon className="h-6 w-6 text-blue-500" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}

                                    {flights.data.length === 0 && (
                                        <tr>
                                            <td
                                                className="px-6 py-4 border-t"
                                                colSpan="4"
                                            >
                                                No se encontraron vuelos.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            <Pagination class="mt-6" links={flights.links} />
                        </div>
                        <Modal
                            show={selectedFlight ? true : false}
                            onClose={closeModal}
                        >
                            <form onSubmit={createReservation} className="p-6">
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
                                        required
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
                                        ref={seatsInput}
                                        value={data.seats}
                                        className="mt-1 block w-full"
                                        autoComplete="email"
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
