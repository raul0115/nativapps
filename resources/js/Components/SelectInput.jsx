import Select from "react-tailwindcss-select";

export default function SelectInput({ className = '', isFocused = false, ...props }) {

    return (
        <Select {...props} className={className} />
    );
}
