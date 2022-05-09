import classNames from 'classnames';

export default function TextInputField({
    type,
    disabled = false,
    defaultValue = '',
    placeholder,
    id,
    name,
    label = null,
    icon = null,
    button = null,
    register = () => {},
    value,
    className
}) {
    let classes = classNames(
        'text-dark-1 font-semibold bg-white text-md ring-gradient-left outline-none block w-full',
        icon ? 'pl-12' : '',
        className
    );

    return (
        <div className="">
            {label && name && (
                <label
                    htmlFor={name}
                    className="ml-2 mb-2 block text-sm font-medium text-dark-2"
                >
                    {label}
                </label>
            )}

            <div className="p-2 flex input-shadow focus:input-shadow border-2 border-transparent focus-within:border-purple-1 rounded-standard">
                <div className="relative flex items-stretch flex-grow focus-within:z-10">
                    <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                        {icon}
                    </div>

                    <input
                        placeholder={placeholder}
                        defaultValue={defaultValue}
                        data-attr={id}
                        id={id}
                        type={type}
                        {...register(name)}
                        value={value}
                        className={classes}
                        disabled={disabled}
                    />
                </div>
                <div className="-ml-px relative">{button}</div>
            </div>
        </div>
    );
}
