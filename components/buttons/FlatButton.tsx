function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function FlatButton({
    id = null,
    as = `span`,
    type = null,
    className = null,
    children,
    onClick = null,
}) {
    const Component = `${as}` as any
    return (
        <Component
            data-attr={id}
            type={type}
            onClick={onClick}
            className={classNames(
                className ? className : '',
                'px-4 py-2 text-md font-bold text-center rounded-standard text-white bg-purple-1 hover:shadow-md hover:shadow-purple-2/50 active:bg-purple-1/70 cursor-pointer'
            )}>
            {children}
        </Component>
    )
}
