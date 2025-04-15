interface InputProps {
  errorMessage?: string;
  id: string;
  label: string;
  name: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  type: string;
  value?: string;
}

export default function Input({
  errorMessage,
  id,
  label,
  name,
  onChange,
  placeholder,
  required,
  type,
  value,
}: InputProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="uppercase block text-xs mb-2"
      >
        {label}
        {required && <span className="text-terracotta ml-1">*</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`w-full p-2 border-1 border-gray-300 rounded-sm focus:border-primary focus:ring-primary sm:text-sm ${
          errorMessage ? 'border-red-500' : ''
        }`}
      />
      {errorMessage && (
        <p className="mt-1 text-sm text-red-500">{errorMessage}</p>
      )}
    </div>
  )
}