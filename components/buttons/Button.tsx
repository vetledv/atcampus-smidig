function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function FlatButton({
    id = null,
    as = `span`,
    type = null,
    className = null,
    onClick = null,
    children,
}) {
    const Component = `${as}` as any
    return (
        <Component
            data-attr={id}
            type={type}
            onClick={onClick}
            className={classNames(
                className ? className : '',
                'px-4 py-2 text-md font-bold cursor-pointer text-center rounded-standard text-white bg-purple-1 hover:bg-purple-2 hover:shadow-purple-2/50 active:bg-purple-1/70 '
            )}>
            {children}
        </Component>
    )
}
