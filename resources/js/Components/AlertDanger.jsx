export default function AlertDanger({ message = 'Operación fallida.', className = '' }) {
    return message ? (
        <div className={'p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 ' + className} role="alert">
            <span className="font-medium">{message}</span>
        </div>
    ) : null;
}
