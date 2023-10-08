import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import DangerButton from '@/Components/DangerButton';
import SecondaryButton from '@/Components/SecondaryButton';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
export default function ImageForm({onChangeImageForm, avatar = {}}) {

    const [modalOpen, setModalOpen] = useState(false);
    const [image, setImage] = useState(avatar.url || null);
   
    const {
        data,
        setData,
        errors,
        reset,
        processing,
    } = useForm({
        title: avatar.title || '',
        alt: avatar.alt || '',
        upload: ''
    });
    const confirmModalOpen = () => {
        setModalOpen(true);
    };
    const submit = (e) => {
        e.preventDefault();
        onChangeImageForm(data);
        setModalOpen(false);
    };
    const cancel = () => {
        onChangeImageForm({});
        setModalOpen(false);
        reset();
       
    };
    function handleImageChange(e) {
        const selectedImage = e.target.files[0];

        // Verificar si se seleccionó una imagen
        if (selectedImage) {
        const reader = new FileReader();
            // Configurar una función de devolución de llamada cuando la lectura del archivo esté completa
            reader.onload = (event) => {
                setImage(event.target.result); // Establecer la vista previa de la imagen
                setData("upload", selectedImage);
            };
            // Leer el archivo como una URL de datos (base64)
            reader.readAsDataURL(selectedImage);
        }

       
    }
    return (
        <div className="mt-4">
            <SecondaryButton onClick={confirmModalOpen}>Imagen</SecondaryButton>
            <Modal show={modalOpen} onClose={cancel}>
                <form onSubmit={submit} className="p-6">
                    <div>
                        <InputLabel htmlFor="upload" value="Subir imagen" />

                        <input  id="upload" name="upload" type="file" onChange={handleImageChange} required={avatar.url ? false : true}  />
                        <InputError className="mt-2" message={errors.upload} />
                        {image && (
                            <div className="mt-2 mb-2">
                                 <img src={image}  alt="Preview" style={{ maxWidth: '100%', 'margin': '0 auto' }} />
                            </div>
                            
                        )}
                    </div>
                    <div>
                        <InputLabel htmlFor="title" value="Title" />

                        <TextInput
                            id="title"
                            name="title"
                            value={data.title}
                            className="mt-1 block w-full"
                            isFocused={true}
                            onChange={(e) => setData('title', e.target.value)}
                        />

                        <InputError className="mt-2" message={errors.title} />
                    </div>
                    <div>
                        <InputLabel htmlFor="alt" value="alt" />

                        <TextInput
                            id="alt"
                            name="alt"
                            value={data.alt}
                            className="mt-1 block w-full"
                            isFocused={true}
                            onChange={(e) => setData('alt', e.target.value)}
                        />

                        <InputError className="mt-2" message={errors.alt} />
                    </div>

                   
                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={cancel}>Cancel</SecondaryButton>

                        <PrimaryButton className="ml-3" disabled={processing}>
                            OK
                        </PrimaryButton>
                    </div>

                </form>
            </Modal>
        </div>
    );
}